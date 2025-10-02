import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🌐</div>
              <span className="text-2xl font-bold text-gray-900">IoTRoot</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md transition"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              IoT Ecosystem Management Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Provision, manage, and control IoT devices securely with real-time communication, 
              automation, and analytics across edge and cloud environments.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition"
              >
                Start Building
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium transition">
                View Docs
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
            {/* Device Management */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Device Management</h3>
              <p className="text-gray-600">
                Device registry, provisioning, OTA updates, and lifecycle management with unique identity for each device.
              </p>
            </div>

            {/* Real-time Communication */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Communication</h3>
              <p className="text-gray-600">
                MQTT pub/sub messaging and REST APIs for persistent and non-persistent communication patterns.
              </p>
            </div>

            {/* Security */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-gray-600">
                TLS encryption, device certificates, OAuth2/JWT authentication, and topic-level access control.
              </p>
            </div>

            {/* Automation */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Automation</h3>
              <p className="text-gray-600">
                Time-based schedules, event triggers, alerts, and notifications via email, SMS, and webhooks.
              </p>
            </div>

            {/* Data Analytics */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Analytics</h3>
              <p className="text-gray-600">
                Device shadows, digital twins, time-series data collection with powerful query APIs and insights.
              </p>
            </div>

            {/* Edge & Cloud */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">☁️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Edge & Cloud Control</h3>
              <p className="text-gray-600">
                Local rule engines for offline-first operations and centralized cloud orchestration for global control.
              </p>
            </div>
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
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🏗️</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Scalable Infrastructure</h4>
                <p className="text-gray-600">
                  Designed to handle millions of devices with high availability and low latency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build your IoT solution?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join developers and enterprises using IoTRoot to power their connected devices
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium transition"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🌐</span>
                <span className="text-xl font-bold">IoTRoot</span>
              </div>
              <p className="text-gray-400">
                End-to-end IoT ecosystem management platform for the modern connected world.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Device Management</li>
                <li>Real-time Communication</li>
                <li>Security & Auth</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Developers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>SDKs</li>
                <li>Examples</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Support</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 IoTRoot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;