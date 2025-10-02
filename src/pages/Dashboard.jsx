import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Dashboard = ({ userId, email, onLogout }) => {
  const navigate = useNavigate();
  const [userTopics, setUserTopics] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [deviceName, setDeviceName] = useState("");

  useEffect(() => {
    if (userId) {
      fetchUserTopics();
      fetchSensorData();
      
      // Poll for new data every 5 seconds
      const interval = setInterval(fetchSensorData, 5000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  const fetchUserTopics = () => {
    api.get(`/topics/${userId}`)
      .then(res => setUserTopics(res.data))
      .catch(err => console.error(err));
  };

  const fetchSensorData = () => {
    api.get(`/sensor-data/${userId}`)
      .then(res => setSensorData(res.data.slice(0, 10)))
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
                <p className="text-gray-400 text-sm">Total Messages</p>
                <p className="text-2xl font-bold text-blue-400">{sensorData.length}</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>
          
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
                  <code className="text-xs bg-gray-900 p-2 rounded block text-green-400">
                    {topic.topicName}
                  </code>
                  <p className="text-gray-400 text-xs mt-2">
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

        {/* Real-time Data */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Real-time Sensor Data</h2>
            <button
              onClick={fetchSensorData}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition"
            >
              🔄 Refresh
            </button>
          </div>
          
          {sensorData.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">💭</div>
              <p>No sensor data received yet</p>
              <p className="text-sm mt-2">Create a device topic first, then publish data to it</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sensorData.map((data, index) => (
                <div key={data.id} className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-blue-400 font-mono text-sm">{data.topic}</span>
                        <span className="text-gray-500 text-xs">{formatTimestamp(data.timestamp)}</span>
                      </div>
                      <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                        {data.message}
                      </div>
                    </div>
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
