import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/animations.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('IoTRoot - IoT Ecosystem Management Platform');
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [deviceCount, setDeviceCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Animate counters
    const deviceTimer = setInterval(() => {
      setDeviceCount(prev => prev < 1000 ? prev + 200 : 1000);
    }, 100);
    const messageTimer = setInterval(() => {
      setMessageCount(prev => prev < 50000 ? prev + 8000 : 50000);
    }, 100);
    
    // Auto-rotate features
    const featureTimer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6);
    }, 3000);

    return () => {
      clearInterval(deviceTimer);
      clearInterval(messageTimer);
      clearInterval(featureTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              🚀 Now supporting 1M+ connected devices
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              IoT Ecosystem Management Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Provision, manage, and control IoT devices securely with real-time communication, 
              automation, and analytics across edge and cloud environments.
            </p>
            
            {/* Live Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{deviceCount.toLocaleString()}+</div>
                <div className="text-sm text-gray-500">Devices Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{messageCount.toLocaleString()}+</div>
                <div className="text-sm text-gray-500">Messages/Day</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="shimmer-text">Start Free</span> 🚀
              </button>
              <button 
                onClick={() => navigate('/docs')}
                className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 bg-white hover:bg-blue-50"
              >
                View Docs 📚
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for IoT
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive platform for device management, communication, and automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '📱', title: 'Device Management', desc: 'Device registry, provisioning, OTA updates, and lifecycle management with unique identity for each device.', color: 'blue', index: 0 },
              { icon: '⚡', title: 'Real-time Communication', desc: 'MQTT pub/sub messaging and REST APIs for persistent and non-persistent communication patterns.', color: 'green', index: 1 },
              { icon: '🔒', title: 'Enterprise Security', desc: 'TLS encryption, device certificates, OAuth2/JWT authentication, and topic-level access control.', color: 'red', index: 2 },
              { icon: '🤖', title: 'Smart Automation', desc: 'Time-based schedules, event triggers, alerts, and notifications via email, SMS, and webhooks.', color: 'purple', index: 3 },
              { icon: '📊', title: 'Data Analytics', desc: 'Device shadows, digital twins, time-series data collection with powerful query APIs and insights.', color: 'yellow', index: 4 },
              { icon: '☁️', title: 'Edge & Cloud Control', desc: 'Local rule engines for offline-first operations and centralized cloud orchestration for global control.', color: 'indigo', index: 5 }
            ].map((feature) => (
              <div 
                key={feature.index}
                className={`bg-white p-6 rounded-xl border-2 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeFeature === feature.index 
                    ? `border-${feature.color}-500 shadow-xl shadow-${feature.color}-100` 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
                onMouseEnter={() => setActiveFeature(feature.index)}
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 ${activeFeature === feature.index ? 'animate-bounce' : ''}`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
                {activeFeature === feature.index && (
                  <div className="mt-4 text-sm text-blue-600 font-medium animate-pulse">
                    ✨ Featured Solution
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Scale
            </h2>
            <p className="text-lg text-gray-600">
              Modern architecture designed for enterprise IoT deployments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Enterprise-Ready Architecture</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure MQTT Broker</h4>
                    <p className="text-gray-600">VerneMQ with TLS encryption and per-device certificates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Spring Boot Backend</h4>
                    <p className="text-gray-600">REST APIs, authentication, and orchestration services</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">React Dashboard</h4>
                    <p className="text-gray-600">Real-time updates via WebSocket with modern UI</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Multi-Database</h4>
                    <p className="text-gray-600">MongoDB for device data, PostgreSQL for time-series</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl border border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
              <div className="text-center relative">
                <div className="text-6xl mb-4 animate-pulse">🏗️</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Scalable Infrastructure</h4>
                <p className="text-gray-600 mb-4">
                  Designed to handle millions of devices with high availability and low latency
                </p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="bg-white px-3 py-1 rounded-full shadow">
                    <span className="text-green-600">●</span> 99.9% Uptime
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full shadow">
                    <span className="text-blue-600">●</span> Auto-scaling
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-ping"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to build your IoT solution?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join <span className="font-bold text-white">10,000+</span> developers and enterprises using IoTRoot
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started <span className="shimmer-text">Free</span> 🚀
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105">
              Schedule Demo 📅
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;