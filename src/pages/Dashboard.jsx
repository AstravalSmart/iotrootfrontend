import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const Dashboard = ({ userId, email, onLogout }) => {
  const navigate = useNavigate();
  const [userTopics, setUserTopics] = useState([]);
  const [websocketSensorData, setWebsocketSensorData] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [websocketStats, setWebsocketStats] = useState({ count: 0, lastUpdate: null });
  const [stompClient, setStompClient] = useState(null);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const processedMessageIds = useRef(new Set());
  const connectionRef = useRef(false);

  useEffect(() => {
    if (userId) {
      fetchUserTopics();
      loadWebSocketDataFromDB();
      
      // WebSocket method - real-time (prevent duplicate connections)
      if (!stompClient) {
        connectWebSocket();
      }
      
      return () => {
        disconnectWebSocket();
      };
    }
  }, [userId]);
  
  const loadWebSocketDataFromDB = () => {
    api.get(`/sensor-data/${userId}`)
      .then(res => {
        setWebsocketSensorData(res.data.slice(0, 10));
        setWebsocketStats({ 
          count: res.data.length, 
          lastUpdate: new Date().toLocaleTimeString() 
        });
      })
      .catch(err => console.error(err));
  };
  
  const connectWebSocket = () => {
    if (connectionRef.current || (stompClient && isWebSocketConnected)) return;
    
    connectionRef.current = true;
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);
    
    client.connect({}, () => {
      setIsWebSocketConnected(true);
      client.subscribe(`/topic/sensor-data/${userId}`, (message) => {
        const newData = JSON.parse(message.body);
        
        // Prevent duplicate processing with unique key
        const messageKey = `${newData.id}-${newData.timestamp}`;
        if (processedMessageIds.current.has(messageKey)) {
          console.log('Duplicate message blocked:', messageKey);
          return;
        }
        
        processedMessageIds.current.add(messageKey);
        
        setWebsocketSensorData(prev => {
          // Double check for duplicates in state
          const exists = prev.some(item => item.id === newData.id && item.timestamp === newData.timestamp);
          if (exists) return prev;
          return [newData, ...prev.slice(0, 9)];
        });
        
        setWebsocketStats(prev => ({ 
          count: prev.count + 1, 
          lastUpdate: new Date().toLocaleTimeString() 
        }));
      });
    });
    
    setStompClient(client);
  };
  
  const disconnectWebSocket = () => {
    if (stompClient && isWebSocketConnected) {
      stompClient.disconnect();
      setStompClient(null);
      setIsWebSocketConnected(false);
      connectionRef.current = false;
      processedMessageIds.current.clear();
    }
  };

  const fetchUserTopics = () => {
    api.get(`/topics/${userId}`)
      .then(res => setUserTopics(res.data))
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const copyTopic = (topic) => {
    navigator.clipboard.writeText(topic);
    alert("Topic copied to clipboard!");
  };

  const addDevice = async () => {
    if (!deviceName.trim()) return;
    
    try {
      const res = await api.post(`/topics/${userId}`, { deviceName });
      if (res.data.success) {
        fetchUserTopics();
        setDeviceName("");
        setShowAddDevice(false);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Failed to create device topic");
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-400">🌐 IoT Dashboard</h1>
            <div className={`flex items-center space-x-2 ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-sm">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">User ID</p>
                <p className="text-lg font-mono text-green-400">{userId}</p>
              </div>
              <div className="text-3xl">🆔</div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Device Topics</p>
                <p className="text-2xl font-bold text-purple-400">{userTopics.length}</p>
              </div>
              <div className="text-3xl">📡</div>
            </div>
          </div>
          
          <div className="bg-green-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Real-time Messages</p>
                <p className="text-2xl font-bold text-green-300">{websocketStats.count}</p>
                <p className="text-xs text-green-200">Last: {websocketStats.lastUpdate}</p>
              </div>
              <div className="text-3xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Device Topics */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Device Topics</h2>
            <button
              onClick={() => setShowAddDevice(true)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
            >
              ➕ Add Device
            </button>
          </div>
          
          {userTopics.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">📱</div>
              <p>No devices added yet</p>
              <p className="text-sm mt-2">Click "Add Device" to create your first MQTT topic</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTopics.map((topic) => (
                <div key={topic.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-blue-400">{topic.deviceName}</h3>
                    <button
                      onClick={() => copyTopic(topic.topicName)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      📋
                    </button>
                  </div>
                  <code className="text-xs bg-gray-900 p-2 rounded block text-green-400 mb-2">
                    {topic.topicName}
                  </code>
                  
                  {/* Last received message */}
                  {topic.lastReceivedMessage ? (
                    <div className="bg-gray-800 p-2 rounded mb-2">
                      <p className="text-gray-300 text-xs mb-1">📨 Last Message:</p>
                      <div className="bg-gray-900 p-2 rounded font-mono text-xs text-yellow-400 break-all">
                        {topic.lastReceivedMessage}
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(topic.lastMessageTimestamp).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-2 rounded mb-2 text-center">
                      <p className="text-gray-500 text-xs">💭 No messages received yet</p>
                    </div>
                  )}
                  
                  <p className="text-gray-400 text-xs">
                    Created: {new Date(topic.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Device Modal */}
        {showAddDevice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h3 className="text-xl font-bold mb-4">Add New Device</h3>
              <input
                type="text"
                placeholder="Device name (e.g., esp32-1)"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded mb-4 text-white"
                onKeyPress={(e) => e.key === 'Enter' && addDevice()}
              />
              <div className="flex space-x-3">
                <button
                  onClick={addDevice}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded transition"
                >
                  Create Topic
                </button>
                <button
                  onClick={() => { setShowAddDevice(false); setDeviceName(""); }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Real-time Data Stream */}
        <div className="bg-green-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-200">⚡ Real-time Data Stream</h2>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isWebSocketConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className={`text-sm ${isWebSocketConnected ? 'text-green-300' : 'text-red-300'}`}>
                {isWebSocketConnected ? 'Live' : 'Disconnected'}
              </span>
              <button
                onClick={isWebSocketConnected ? disconnectWebSocket : connectWebSocket}
                className={`px-2 py-1 rounded text-xs ${isWebSocketConnected ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isWebSocketConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
          
          {websocketSensorData.length === 0 ? (
            <div className="text-center py-8 text-green-300">
              <div className="text-4xl mb-2">💭</div>
              <p>No real-time data yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {websocketSensorData.map((data, index) => (
                <div key={`ws-${data.id}`} className="bg-green-800 p-3 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-green-200 font-mono text-xs">{data.topic}</span>
                    <span className="text-green-400 text-xs">{formatTimestamp(data.timestamp)}</span>
                  </div>
                  <div className="bg-green-950 p-2 rounded font-mono text-xs text-green-200">
                    {data.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;