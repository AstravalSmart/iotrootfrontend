import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';

const MainDashboard = ({ userId, email, onLogout }) => {
  const navigate = useNavigate();
  const { section } = useParams();
  const [activeSection, setActiveSection] = useState(section || 'overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(true);

  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
  }, [section]);

  const handleSectionChange = (newSection) => {
    setActiveSection(newSection);
    navigate(`/dashboard/${newSection}`);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">IoTRoot Platform Overview</h2>
      <p className="text-gray-600 mb-6">
        End-to-end IoT ecosystem management platform that enables developers, businesses, and enterprises 
        to provision, manage, and control IoT devices securely with real-time communication, automation, 
        and analytics across edge and cloud.
      </p>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">1,247</div>
          <div className="text-sm text-gray-600">Connected Devices</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">98.9%</div>
          <div className="text-sm text-gray-600">Uptime</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">45.2K</div>
          <div className="text-sm text-gray-600">Messages/Hour</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">23</div>
          <div className="text-sm text-gray-600">Active Automations</div>
        </div>
      </div>

      {/* Mock Chart */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Device Activity (Last 24 Hours)</h3>
        <div className="h-64 bg-white rounded border flex items-center justify-center">
          <div className="text-gray-400">📈 Real-time Analytics Chart</div>
        </div>
      </div>
    </div>
  );

  const renderDevices = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Device View</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">📋 Device Registry</h3>
            <p className="text-gray-600 text-sm">Unique identity for each device with comprehensive metadata management.</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔧 Thing Abstraction</h3>
            <p className="text-gray-600 text-sm">Logical representation of physical devices with digital twin capabilities.</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">📦 Codebase & OTA</h3>
            <p className="text-gray-600 text-sm">Remote firmware updates with version control and rollback support.</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔗 Device Provisioning</h3>
            <p className="text-gray-600 text-sm">Onboarding flow with QR codes, tokens, and pre-shared keys.</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">⚙️ Device Management</h3>
            <p className="text-gray-600 text-sm">Health monitoring, status tracking, metrics, and lifecycle management.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📊 Device Statistics</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Online: <span className="font-semibold">1,247</span></div>
              <div>Offline: <span className="font-semibold">23</span></div>
              <div>Updating: <span className="font-semibold">5</span></div>
              <div>Error: <span className="font-semibold">2</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunication = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Communication</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📡 Persistent: MQTT</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Publish Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Subscribe Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Pub/Sub (Two-way)</span>
            </div>
          </div>
          <div className="mt-4 bg-green-50 p-3 rounded">
            <div className="text-sm text-green-800">Active Connections: 1,247</div>
            <div className="text-sm text-green-800">Messages/sec: 156</div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🌐 Non-Persistent: REST APIs</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Send Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Receive Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Full Duplex</span>
            </div>
          </div>
          <div className="mt-4 bg-blue-50 p-3 rounded">
            <div className="text-sm text-blue-800">API Calls/hour: 12.3K</div>
            <div className="text-sm text-blue-800">Avg Response: 45ms</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Security</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">🔐 Device Authentication</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• TLS + Certificates</li>
            <li>• Token-based auth</li>
            <li>• Per-device credentials</li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">👤 App Authentication</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• OAuth2 integration</li>
            <li>• JWT-based access</li>
            <li>• Role-based permissions</li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">🛡️ Access Control</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Topic-level ACLs</li>
            <li>• Tenant isolation</li>
            <li>• Audit logging</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-semibold text-red-900 mb-2">Security Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>Certificates: <span className="font-semibold text-green-600">Valid</span></div>
          <div>TLS Status: <span className="font-semibold text-green-600">Active</span></div>
          <div>Failed Logins: <span className="font-semibold text-red-600">3</span></div>
          <div>Security Score: <span className="font-semibold text-green-600">98/100</span></div>
        </div>
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Automation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">⏰ Schedules</h3>
          <p className="text-gray-600 text-sm mb-3">Time-based tasks and recurring operations</p>
          <div className="bg-blue-50 p-3 rounded">
            <div className="text-sm">Active: <span className="font-semibold">12</span></div>
            <div className="text-sm">Pending: <span className="font-semibold">3</span></div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">⚡ Triggers</h3>
          <p className="text-gray-600 text-sm mb-3">Event-based workflows and conditions</p>
          <div className="bg-green-50 p-3 rounded">
            <div className="text-sm">Active: <span className="font-semibold">8</span></div>
            <div className="text-sm">Triggered: <span className="font-semibold">156</span></div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">🔔 Alerts & Notifications</h3>
          <p className="text-gray-600 text-sm mb-3">Multi-channel notification system</p>
          <div className="space-y-1 text-sm">
            <div>📧 Email</div>
            <div>📱 SMS</div>
            <div>📲 Push</div>
            <div>🔗 Webhooks</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderData = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Layer</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">👥 Device Shadow</h3>
            <p className="text-gray-600 text-sm">Last reported state and device status synchronization</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔄 Device Twin</h3>
            <p className="text-gray-600 text-sm">Sync between cloud and edge shadow states</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">📊 Data Collection</h3>
            <p className="text-gray-600 text-sm">Timeseries data ingestion, storage, and query APIs</p>
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-4">Data Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Data Points/Day:</span>
              <span className="font-semibold">2.4M</span>
            </div>
            <div className="flex justify-between">
              <span>Storage Used:</span>
              <span className="font-semibold">1.2TB</span>
            </div>
            <div className="flex justify-between">
              <span>Query Response:</span>
              <span className="font-semibold">23ms</span>
            </div>
            <div className="flex justify-between">
              <span>Data Retention:</span>
              <span className="font-semibold">2 Years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderControl = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Control</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🏠 Edge Control</h3>
          <p className="text-gray-600 mb-4">Local rule engine with offline-first capabilities</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Local Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-sm">Offline Operation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="text-sm">Real-time Response</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">☁️ Cloud Control</h3>
          <p className="text-gray-600 mb-4">Centralized orchestration and global management</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span className="text-sm">Global Orchestration</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-sm">Policy Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span className="text-sm">Cross-device Coordination</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIML = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">AI & ML</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔬 Edge ML</h3>
          <p className="text-gray-600 mb-4">Lightweight models for real-time inference</p>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded">
              <div className="font-semibold text-blue-900">TensorFlow Lite</div>
              <div className="text-sm text-blue-700">Optimized for mobile and embedded</div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <div className="font-semibold text-green-900">Edge Impulse</div>
              <div className="text-sm text-green-700">End-to-end ML platform</div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">☁️ Cloud ML</h3>
          <p className="text-gray-600 mb-4">Training and inference pipelines on IoT data</p>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded">
              <div className="font-semibold text-purple-900">Model Training</div>
              <div className="text-sm text-purple-700">Automated ML pipelines</div>
            </div>
            <div className="bg-orange-50 p-3 rounded">
              <div className="font-semibold text-orange-900">Data Analytics</div>
              <div className="text-sm text-orange-700">Predictive insights</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">ML Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>Models Deployed: <span className="font-semibold">12</span></div>
          <div>Inference/sec: <span className="font-semibold">1.2K</span></div>
          <div>Accuracy: <span className="font-semibold">94.2%</span></div>
          <div>Latency: <span className="font-semibold">15ms</span></div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'devices': return renderDevices();
      case 'communication': return renderCommunication();
      case 'security': return renderSecurity();
      case 'automation': return renderAutomation();
      case 'data': return renderData();
      case 'control': return renderControl();
      case 'ai-ml': return renderAIML();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        email={email}
        onLogout={onLogout}
      />
      
      <RightSidebar 
        email={email}
      />
      
      {/* Main Content */}
      <div className={`${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} md:mr-16 ml-0 mr-12 transition-all duration-300 h-screen overflow-y-auto`}>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;