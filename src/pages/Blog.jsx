import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';
import '../styles/animations.css';

const Blog = () => {
  useDocumentTitle('Blog - IoTRoot');
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'tutorials', 'industry', 'updates', 'security'];

  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with IoT Device Management in 2025',
      excerpt: 'Learn the fundamentals of IoT device management and best practices for scaling your connected infrastructure.',
      category: 'tutorials',
      author: 'Sarah Chen',
      date: '2025-01-15',
      readTime: '8 min read',
      image: '🚀',
      featured: true
    },
    {
      id: 2,
      title: 'MQTT vs HTTP: Choosing the Right Protocol for IoT',
      excerpt: 'A comprehensive comparison of communication protocols to help you make the right choice for your IoT project.',
      category: 'tutorials',
      author: 'Mike Johnson',
      date: '2025-01-12',
      readTime: '6 min read',
      image: '⚡'
    },
    {
      id: 3,
      title: 'IoT Security: Protecting Your Connected Devices',
      excerpt: 'Essential security practices and strategies to safeguard your IoT infrastructure from cyber threats.',
      category: 'security',
      author: 'Alex Rodriguez',
      date: '2025-01-10',
      readTime: '10 min read',
      image: '🔒'
    },
    {
      id: 4,
      title: 'The Future of Industrial IoT: Trends for 2025',
      excerpt: 'Explore emerging trends and technologies shaping the industrial IoT landscape this year.',
      category: 'industry',
      author: 'Emma Wilson',
      date: '2025-01-08',
      readTime: '7 min read',
      image: '🏭'
    },
    {
      id: 5,
      title: 'IoTRoot Platform Update: New Analytics Dashboard',
      excerpt: 'Discover the latest features in our analytics dashboard and how they can improve your IoT insights.',
      category: 'updates',
      author: 'David Kim',
      date: '2025-01-05',
      readTime: '5 min read',
      image: '📊'
    },
    {
      id: 6,
      title: 'Building Scalable IoT Applications with Microservices',
      excerpt: 'Learn how to architect IoT applications using microservices for better scalability and maintainability.',
      category: 'tutorials',
      author: 'Lisa Park',
      date: '2025-01-03',
      readTime: '12 min read',
      image: '🏗️'
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            IoTRoot Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Insights, tutorials, and updates from the world of IoT
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center space-x-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === 'all' && featuredPost && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-12">
                  <div className="text-8xl">{featuredPost.image}</div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ Featured
                    </span>
                    <span className="ml-3 text-sm text-gray-500">{featuredPost.category}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-600 mb-6 text-lg">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{featuredPost.author.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{featuredPost.author}</div>
                        <div className="text-sm text-gray-500">{featuredPost.date} • {featuredPost.readTime}</div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                      <span className="shimmer-text">Read More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === 'all' ? regularPosts : filteredPosts).map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                  <div className="text-6xl">{post.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.category === 'tutorials' ? 'bg-blue-100 text-blue-800' :
                      post.category === 'industry' ? 'bg-green-100 text-green-800' :
                      post.category === 'updates' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-semibold">{post.author.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.date}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{post.readTime}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest IoT insights and tutorials delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-r-lg font-medium transition-all duration-300">
              <span className="shimmer-text">Subscribe</span>
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;