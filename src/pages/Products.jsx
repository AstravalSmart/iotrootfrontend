import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Products = () => {
  useDocumentTitle('Products - IoTRoot');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              IoT Products & Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive IoT platform with device management, real-time communication, and advanced analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '📱', title: 'Device Management', desc: 'Complete device lifecycle management with provisioning, monitoring, and OTA updates' },
              { icon: '⚡', title: 'Real-time Messaging', desc: 'MQTT broker with pub/sub messaging for instant device communication' },
              { icon: '🔒', title: 'Security Suite', desc: 'Enterprise-grade security with TLS encryption and device certificates' },
              { icon: '📊', title: 'Analytics Dashboard', desc: 'Real-time insights and historical data analysis with custom reports' },
              { icon: '🤖', title: 'Automation Engine', desc: 'Smart rules and triggers for automated device responses' },
              { icon: '☁️', title: 'Cloud Integration', desc: 'Seamless integration with AWS, Azure, and Google Cloud platforms' }
            ].map((product, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;