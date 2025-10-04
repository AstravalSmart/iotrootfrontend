import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/animations.css';

const Docs = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      items: [
        { id: 'quick-start', title: 'Quick Start Guide' },
        { id: 'installation', title: 'Installation' },
        { id: 'first-device', title: 'Connect Your First Device' }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: '📡',
      items: [
        { id: 'authentication', title: 'Authentication' },
        { id: 'devices-api', title: 'Devices API' },
        { id: 'messaging-api', title: 'Messaging API' }
      ]
    },
    {
      id: 'protocols',
      title: 'Protocols',
      icon: '⚡',
      items: [
        { id: 'mqtt', title: 'MQTT' },
        { id: 'http', title: 'HTTP/HTTPS' },
        { id: 'websocket', title: 'WebSocket' }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: '🔒',
      items: [
        { id: 'certificates', title: 'Device Certificates' },
        { id: 'encryption', title: 'TLS Encryption' },
        { id: 'access-control', title: 'Access Control' }
      ]
    }
  ];

  const content = {
    'getting-started': {
      title: 'Getting Started with IoTRoot',
      content: `
# Welcome to IoTRoot

IoTRoot is a comprehensive IoT platform that helps you manage, monitor, and control your connected devices at scale.

## What you'll learn

- How to set up your first IoT project
- Connect devices using MQTT
- Monitor device data in real-time
- Set up alerts and automation

## Prerequisites

- Basic understanding of IoT concepts
- A device capable of MQTT communication
- Internet connectivity

Let's get started! 🚀
      `
    },
    'quick-start': {
      title: 'Quick Start Guide',
      content: `
# Quick Start Guide

Get up and running with IoTRoot in under 5 minutes.

## Step 1: Create Your Account

\`\`\`bash
# Sign up at https://iotroot.com/signup
# Verify your email address
\`\`\`

## Step 2: Create a Project

\`\`\`javascript
// Navigate to Dashboard > Projects > New Project
const project = {
  name: "My First IoT Project",
  description: "Learning IoTRoot basics"
};
\`\`\`

## Step 3: Add Your First Device

\`\`\`json
{
  "deviceId": "sensor-001",
  "deviceType": "temperature-sensor",
  "location": "office-room-1"
}
\`\`\`

## Step 4: Connect via MQTT

\`\`\`python
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.username_pw_set("your-device-id", "your-device-token")
client.connect("mqtt.iotroot.com", 8883, 60)

# Publish sensor data
client.publish("devices/sensor-001/telemetry", '{"temperature": 23.5}')
\`\`\`

That's it! Your device is now connected. 🎉
      `
    },
    'mqtt': {
      title: 'MQTT Protocol Guide',
      content: `
# MQTT Protocol

MQTT is the primary communication protocol for IoTRoot devices.

## Connection Details

- **Host**: mqtt.iotroot.com
- **Port**: 8883 (TLS) / 1883 (Plain)
- **Protocol**: MQTT 3.1.1 / 5.0

## Authentication

\`\`\`javascript
const mqtt = require('mqtt');

const client = mqtt.connect('mqtts://mqtt.iotroot.com:8883', {
  username: 'device-id',
  password: 'device-token',
  clientId: 'unique-client-id'
});
\`\`\`

## Topic Structure

\`\`\`
devices/{deviceId}/telemetry    # Send sensor data
devices/{deviceId}/commands     # Receive commands
devices/{deviceId}/status       # Device status updates
\`\`\`

## Publishing Data

\`\`\`python
import json
import paho.mqtt.client as mqtt

def publish_sensor_data():
    data = {
        "timestamp": "2025-01-15T10:30:00Z",
        "temperature": 24.5,
        "humidity": 65.2,
        "battery": 87
    }
    
    client.publish(
        "devices/sensor-001/telemetry", 
        json.dumps(data)
    )
\`\`\`
      `
    }
  };

  const getCurrentContent = () => {
    return content[activeSection] || content['getting-started'];
  };

  const renderMarkdown = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold text-gray-900 mb-4 mt-8">{line.substring(3)}</h2>;
      }
      if (line.startsWith('```')) {
        return <div key={index} className="bg-gray-900 text-green-400 p-4 rounded-lg my-4 overflow-x-auto"><code>{line}</code></div>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="text-gray-700 mb-2">{line.substring(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-gray-700 mb-4">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} alt="IoTRoot" className="w-8 h-8 animate-float" />
              <span className="text-2xl font-bold text-gray-900">IoTRoot Docs</span>
            </div>
            
            {/* Search */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/signup')}
                className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105"
              >
                <span className="shimmer-text">Start Free</span>
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-4">
                {sections.map((section) => (
                  <div key={section.id}>
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-2">
                      <span className="mr-2">{section.icon}</span>
                      {section.title}
                    </h3>
                    <ul className="space-y-1 ml-6">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              setActiveSection(item.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                              activeSection === item.id
                                ? 'bg-blue-100 text-blue-700 font-medium'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
              
              <button
                onClick={() => { navigate('/signup'); setIsMobileMenuOpen(false); }}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all duration-300 font-medium"
              >
                <span className="shimmer-text">Start Free</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-80 bg-gray-50 min-h-screen border-r border-gray-200 sticky top-16">
          <div className="p-6">
            <nav className="space-y-6">
              {sections.map((section) => (
                <div key={section.id}>
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </h3>
                  <ul className="space-y-2 ml-6">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveSection(item.id)}
                          className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                            activeSection === item.id
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
              <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
              <span>/</span>
              <span>Documentation</span>
              <span>/</span>
              <span className="text-gray-900">{getCurrentContent().title}</span>
            </nav>

            {/* Content */}
            <article className="prose prose-lg max-w-none">
              {renderMarkdown(getCurrentContent().content)}
            </article>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                ← Previous: Installation
              </button>
              <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                Next: API Reference →
              </button>
            </div>
          </div>
        </main>

        {/* Table of Contents */}
        <aside className="w-64 bg-gray-50 min-h-screen border-l border-gray-200 sticky top-16 hidden xl:block">
          <div className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">On this page</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Prerequisites
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Installation
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Configuration
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Examples
              </a>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Docs;