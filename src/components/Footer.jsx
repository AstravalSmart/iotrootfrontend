import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="IoTRoot" className="w-6 h-6" />
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
          <p>&copy; 2025 IoTRoot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;