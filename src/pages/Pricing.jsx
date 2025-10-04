import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';
import '../styles/animations.css';

const Pricing = () => {
  useDocumentTitle('Pricing - IoTRoot');
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small projects',
      monthlyPrice: 2400,
      annualPrice: 24000,
      savings: '2 months free',
      features: [
        '1,000 devices',
        '100K messages/month',
        'Basic analytics',
        'Email support',
        'REST API access',
        '99.9% uptime SLA'
      ],
      color: 'blue',
      popular: false
    },
    {
      name: 'Professional',
      description: 'Most popular for growing businesses',
      monthlyPrice: 8200,
      annualPrice: 82000,
      savings: '2 months free',
      features: [
        '10,000 devices',
        '1M messages/month',
        'Advanced analytics',
        'Priority support',
        'Full API access',
        'Custom integrations',
        'Real-time monitoring',
        '99.95% uptime SLA'
      ],
      color: 'purple',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large-scale deployments',
      monthlyPrice: 24800,
      annualPrice: 248000,
      savings: '2 months free',
      features: [
        'Unlimited devices',
        'Unlimited messages',
        'Custom analytics',
        'Dedicated support',
        'White-label solution',
        'On-premise deployment',
        'Custom SLA',
        'Advanced security'
      ],
      color: 'green',
      popular: false
    }
  ];

  const getPrice = (plan) => isAnnual ? plan.annualPrice : plan.monthlyPrice * 12;
  const getMonthlyPrice = (plan) => isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your IoT needs. Start free, scale as you grow.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Save 17%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                } ${hoveredPlan === index ? 'shadow-2xl' : ''}`}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium animate-pulse">
                      🔥 Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">₹{getMonthlyPrice(plan).toLocaleString()}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    
                    {isAnnual && (
                      <div className="text-sm text-green-600 font-medium mb-4">
                        💰 {plan.savings} • Save ₹{((plan.monthlyPrice * 12) - plan.annualPrice).toLocaleString()}/year
                      </div>
                    )}
                    
                    <button
                      onClick={() => navigate('/signup')}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      <span className={plan.popular ? 'shimmer-text' : ''}>
                        {plan.popular ? 'Start Free Trial' : 'Get Started'}
                      </span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Everything included:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                          plan.popular ? 'bg-purple-100' : 'bg-blue-100'
                        }`}>
                          <span className={`text-xs ${plan.popular ? 'text-purple-600' : 'text-blue-600'}`}>✓</span>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted by 10,000+ companies worldwide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-gray-400 font-semibold">🏢 Fortune 500</div>
            <div className="text-gray-400 font-semibold">🚀 Startups</div>
            <div className="text-gray-400 font-semibold">🏭 Manufacturing</div>
            <div className="text-gray-400 font-semibold">🏥 Healthcare</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                q: "Is there a free trial?",
                a: "Yes, all plans come with a 14-day free trial. No credit card required to start."
              },
              {
                q: "What happens if I exceed my limits?",
                a: "We'll notify you before you reach your limits. You can upgrade or purchase additional capacity."
              },
              {
                q: "Do you offer custom enterprise solutions?",
                a: "Yes! Contact our sales team for custom pricing and enterprise features."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of companies already using IoTRoot</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="shimmer-text">Start Free Trial</span>
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing;