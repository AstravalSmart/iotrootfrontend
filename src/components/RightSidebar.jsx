import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from './Icons';

const RightSidebar = ({ email, onLogout }) => {
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('system');
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const rightMenuItems = [
    { id: 'profile', label: 'Profile', icon: <Icons.Profile /> },
    { id: 'theme', label: 'Theme', icon: <Icons.Theme /> },
    { id: 'notifications', label: 'Notifications', icon: <Icons.Notification /> },
    { id: 'help', label: 'Help', icon: <Icons.Help /> },
  ];

  const themeOptions = [
    { id: 'light', label: 'Light', icon: '☀️' },
    { id: 'dark', label: 'Dark', icon: '🌙' },
    { id: 'system', label: 'System', icon: '💻' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !rightSidebarCollapsed) {
        setRightSidebarCollapsed(true);
        setShowThemeOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [rightSidebarCollapsed]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRightSidebarClick = (e) => {
    if (rightSidebarCollapsed && !e.target.closest('button')) {
      setRightSidebarCollapsed(false);
    }
  };

  const handleMenuItemClick = (itemId) => {
    if (itemId === 'theme') {
      setShowThemeOptions(!showThemeOptions);
    } else {
      console.log(`Clicked: ${itemId}`);
    }
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    setShowThemeOptions(false);
    console.log(`Theme changed to: ${themeId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    if (onLogout) onLogout();
    window.location.href = '/';
  };

  return (
    <div 
      ref={sidebarRef}
      className={`${rightSidebarCollapsed ? 'w-12 md:w-16' : 'w-48 md:w-64'} bg-white shadow-lg transition-all duration-300 flex flex-col cursor-pointer h-screen fixed right-0 top-0 z-10`}
      onClick={handleRightSidebarClick}
    >
      {/* Time Display */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-center">
        {!rightSidebarCollapsed ? (
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xs text-gray-500">
              {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>
        ) : (
          <div className="text-xs font-bold text-gray-900">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>

      {/* Toggle Button
      <div className="px-4 py-2 border-b">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setRightSidebarCollapsed(!rightSidebarCollapsed);
          }}
          className="w-full flex items-center justify-start p-2 rounded-md hover:bg-gray-200 transition"
        >
          <div className="w-6 h-1 bg-gray-400 rounded"></div>
        </button>
      </div> */}
      
      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {rightMenuItems.map((item) => (
          <div key={item.id} className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMenuItemClick(item.id);
              }}
              className={`w-full flex items-center ${rightSidebarCollapsed ? 'justify-center' : 'space-x-3'} px-2 py-1 rounded-md text-left text-sm transition group text-gray-700 hover:bg-gray-100`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {!rightSidebarCollapsed && <span>{item.label}</span>}
              
              {/* Hover Tooltip */}
              {rightSidebarCollapsed && (
<div className="fixed right-20 bg-gray-900/60 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60]">                  {item.label}
                </div>
              )}
            </button>
            
            {/* Theme Options */}
            {item.id === 'theme' && showThemeOptions && !rightSidebarCollapsed && (
              <div className="ml-6 mt-2 space-y-1">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThemeChange(theme.id);
                    }}
                    className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-sm transition ${
                      currentTheme === theme.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{theme.icon}</span>
                    <span>{theme.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {/* Logout Button */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className={`w-full flex items-center ${rightSidebarCollapsed ? 'justify-center' : 'space-x-2'} px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition group`}
          >
            <Icons.Logout />
            {!rightSidebarCollapsed && <span>Logout</span>}
            
            {/* Hover Tooltip */}
            {rightSidebarCollapsed && (
              <div className="fixed right-20 bg-gray-900/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60]">
                Logout
              </div>
            )}
          </button>
        </div>
      </nav>
      
      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        {!rightSidebarCollapsed && (
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icons.Profile className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 truncate">{email}</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;