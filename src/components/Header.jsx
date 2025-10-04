import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="IoTRoot" className="w-8 h-8 animate-float" />
            <span className="text-2xl font-bold text-gray-900">IoTRoot</span>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</button>

            <div className="relative">
              
              <button 
                onMouseEnter={() => setShowProductsDropdown(true)}
                onMouseLeave={() => setShowProductsDropdown(false)}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center"
              >
                Products ▼
              </button>
              
              {showProductsDropdown && (
                <div 
                  onMouseEnter={() => setShowProductsDropdown(true)}
                  onMouseLeave={() => setShowProductsDropdown(false)}
                  className="absolute top-full left-0 mt-0.5 w-[600px] bg-white rounded-xl shadow-xl border border-gray-200 p-6 z-50"
                >
                  <div className="flex gap-8">
                    {/* Left Side - Description */}
                    <div className="w-1/3">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Products</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get to market quickly and securely with products that can scale globally
                      </p>
                      <button 
                        onClick={() => navigate('/products')}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Go to all Products →
                      </button>
                    </div>
                    
                    {/* Right Side - Product Links */}
                    <div className="w-2/3 grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">📱</span>
                          <h4 className="font-medium text-gray-900 text-sm">Device Management</h4>
                        </div>
                        <p className="text-xs text-gray-600">Provision & monitor</p>
                      </div>
                      
                      <div className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">⚡</span>
                          <h4 className="font-medium text-gray-900 text-sm">Real-time Messaging</h4>
                        </div>
                        <p className="text-xs text-gray-600">MQTT communication</p>
                      </div>
                      
                      <div className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">🔒</span>
                          <h4 className="font-medium text-gray-900 text-sm">Security Suite</h4>
                        </div>
                        <p className="text-xs text-gray-600">Enterprise security</p>
                      </div>
                      
                      <div className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">📊</span>
                          <h4 className="font-medium text-gray-900 text-sm">Analytics Dashboard</h4>
                        </div>
                        <p className="text-xs text-gray-600">Real-time insights</p>
                      </div>
                      
                      <div className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">🤖</span>
                          <h4 className="font-medium text-gray-900 text-sm">Automation Engine</h4>
                        </div>
                        <p className="text-xs text-gray-600">Smart automation</p>
                      </div>
                      
                      <div className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">☁️</span>
                          <h4 className="font-medium text-gray-900 text-sm">Cloud Integration</h4>
                        </div>
                        <p className="text-xs text-gray-600">Multi-cloud support</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => navigate('/ecommerce')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">E-commerce</button>
            <button onClick={() => navigate('/pricing')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</button>
            <button onClick={() => navigate('/docs')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Docs</button>
            <button onClick={() => navigate('/support')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Support</button>
            <button onClick={() => navigate('/blog')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Blog</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/signup')}
              className="hidden sm:block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <span className="shimmer-text">Start Free</span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => { navigate('/products'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">Products</button>
              <button onClick={() => { navigate('/ecommerce'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">E-commerce</button>
              <button onClick={() => { navigate('/pricing'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">Pricing</button>
              <button onClick={() => { navigate('/docs'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">Docs</button>
              <button onClick={() => { navigate('/support'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">Support</button>
              <button onClick={() => { navigate('/blog'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">Blog</button>
              <button
                onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-md transition-all duration-300 font-medium"
              >
                <span className="shimmer-text">Start Free</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;