import React, { useState } from 'react';

const FeaturesGrid = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { icon: '📱', title: 'Device Management', desc: 'Device registry, provisioning, OTA updates, and lifecycle management with unique identity for each device.', color: 'blue', index: 0 },
    { icon: '⚡', title: 'Real-time Communication', desc: 'MQTT pub/sub messaging and REST APIs for persistent and non-persistent communication patterns.', color: 'green', index: 1 },
    { icon: '🔒', title: 'Enterprise Security', desc: 'TLS encryption, device certificates, OAuth2/JWT authentication, and topic-level access control.', color: 'red', index: 2 },
    { icon: '🤖', title: 'Smart Automation', desc: 'Time-based schedules, event triggers, alerts, and notifications via email, SMS, and webhooks.', color: 'purple', index: 3 },
    { icon: '📊', title: 'Data Analytics', desc: 'Device shadows, digital twins, time-series data collection with powerful query APIs and insights.', color: 'yellow', index: 4 },
    { icon: '☁️', title: 'Edge & Cloud Control', desc: 'Local rule engines for offline-first operations and centralized cloud orchestration for global control.', color: 'indigo', index: 5 }
  ];

  return (
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
          {features.map((feature) => (
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
  );
};

export default FeaturesGrid;