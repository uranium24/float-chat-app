"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MapPin, Bot, User, Waves, Database, BarChart3, Globe, Download, Filter, Calendar, Moon, Sun } from 'lucide-react';

const FloatChat = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  type Message = {
    id: number;
    type: string;
    content: string;
    timestamp: string; // Changed to string
    hasData?: boolean;
  };

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      type: 'bot', 
      content: 'Welcome to Float Chat! I can help you explore ARGO oceanographic data. Try asking me about salinity profiles, temperature data, or BGC parameters from specific regions and time periods.',
      timestamp: new Date().toLocaleTimeString() // Store as string
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sample quick query suggestions
  const quickQueries = [
    "Show salinity profiles near the equator in March 2023",
    "Compare BGC parameters in Arabian Sea last 6 months", 
    "Find nearest ARGO floats to 20°N, 65°E",
    "Temperature profiles at 200m depth in Indian Ocean"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString() // Store as string
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      setIsLoading(true);

      // Simulate AI processing with oceanographic context
      setTimeout(() => {
        const responses = [
          `Searching ARGO float database for: "${inputMessage}". Found 23 matching profiles in the specified region. Processing CTD data...`,
          `Analyzing NetCDF files for your query. Retrieved temperature and salinity data from 15 active floats. Would you like me to generate visualizations?`,
          `Query processed successfully! Found BGC sensor data from 8 floats. The data shows interesting patterns in chlorophyll concentrations. Shall I display the depth profiles?`,
          `Searching Indian Ocean ARGO database... Located 12 matching float trajectories. Temperature anomalies detected at 500m depth. Would you like to see the geospatial distribution?`
        ];
        
        const aiResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString(), // Store as string
          hasData: true
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleQuickQuery = (query: string) => {
    setInputMessage(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMap = () => {
    setIsMapVisible(!isMapVisible);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Theme classes
  const theme = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-cyan-50',
    chatBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    border: isDarkMode ? 'border-gray-700' : 'border-blue-200',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    quickQueryBg: isDarkMode ? 'bg-gray-700' : 'bg-blue-50',
    quickQueryBorder: isDarkMode ? 'border-gray-600' : 'border-blue-100',
    quickQueryText: isDarkMode ? 'text-gray-200' : 'text-blue-700',
    quickQueryButtonBg: isDarkMode ? 'bg-gray-600' : 'bg-white',
    quickQueryButtonBorder: isDarkMode ? 'border-gray-500' : 'border-blue-200',
    quickQueryButtonHover: isDarkMode ? 'hover:bg-gray-500' : 'hover:bg-blue-50',
    quickQueryButtonText: isDarkMode ? 'text-gray-200' : 'text-blue-800',
    messageBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
    messageBorder: isDarkMode ? 'border-gray-600' : 'border-gray-200',
    messageText: isDarkMode ? 'text-gray-200' : 'text-gray-800',
    inputBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-200',
    inputField: isDarkMode ? 'bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800',
    botAvatar: isDarkMode ? 'bg-cyan-800 text-cyan-200 border-cyan-700' : 'bg-cyan-100 text-cyan-700 border-cyan-200',
    loadingBg: isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600',
  };

  // ARGO Float Map Component with oceanographic visualization
  const ArgoMapComponent = () => (
    <div className="h-full w-full relative bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 bg-blue-900/90 backdrop-blur-sm p-4 border-b border-blue-600 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-blue-300" />
              <h3 className="font-semibold text-blue-100">ARGO Float Distribution</h3>
            </div>
            <div className="flex items-center gap-4 text-sm text-blue-200">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Active Floats
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Recent Data
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                BGC Sensors
              </span>
            </div>
          </div>
          <button
            onClick={toggleMap}
            className="p-1 hover:bg-blue-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-blue-200" />
          </button>
        </div>
      </div>

      {/* Ocean Map Content */}
      <div className="pt-16 h-full relative">
        {/* Ocean grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* ARGO Float Positions */}
        <div className="absolute top-24 left-16 w-3 h-3 bg-green-400 rounded-full border border-white shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Float WMO_5906468 - Active" />
        <div className="absolute top-32 right-28 w-3 h-3 bg-yellow-400 rounded-full border border-white shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Float WMO_2903741 - Recent" />
        <div className="absolute top-48 left-32 w-3 h-3 bg-red-400 rounded-full border border-white shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Float WMO_5906469 - BGC Sensors" />
        <div className="absolute bottom-40 right-20 w-3 h-3 bg-green-400 rounded-full border border-white shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Float WMO_2903742 - Active" />
        <div className="absolute bottom-32 left-24 w-3 h-3 bg-yellow-400 rounded-full border border-white shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Float WMO_5906470 - Recent" />
        <div className="absolute top-40 center w-3 h-3 bg-red-400 rounded-full border border-white shadow-lg animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Float WMO_2903743 - BGC Sensors" />
        
        {/* Ocean current indicators */}
        <div className="absolute top-36 left-40 text-blue-300 opacity-70">
          <div className="flex items-center text-xs">→ 0.3 m/s</div>
        </div>
        <div className="absolute bottom-48 right-32 text-blue-300 opacity-70">
          <div className="flex items-center text-xs">↗ 0.5 m/s</div>
        </div>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-blue-800 text-blue-100 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-700 transition-colors border border-blue-600">
            <span className="text-lg font-semibold">+</span>
          </button>
          <button className="w-10 h-10 bg-blue-800 text-blue-100 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-700 transition-colors border border-blue-600">
            <span className="text-lg font-semibold">-</span>
          </button>
        </div>

        {/* Map tools */}
        <div className="absolute top-20 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-blue-800 text-blue-100 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-700 transition-colors border border-blue-600" title="Filters">
            <Filter className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 bg-blue-800 text-blue-100 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-700 transition-colors border border-blue-600" title="Time Range">
            <Calendar className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 bg-blue-800 text-blue-100 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-700 transition-colors border border-blue-600" title="Download Data">
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Depth indicator */}
        <div className="absolute bottom-20 left-4 bg-blue-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-blue-600">
          <div className="text-blue-200 text-xs font-medium">Indian Ocean</div>
          <div className="text-blue-100 text-lg font-bold">2000m depth</div>
        </div>

        {/* Data summary box */}
        <div className="absolute top-20 left-4 bg-blue-900/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-blue-600 max-w-xs">
          <div className="text-blue-100 text-sm font-medium mb-2">Active Query Results</div>
          <div className="space-y-1 text-xs text-blue-200">
            <div className="flex justify-between">
              <span>Active Floats:</span>
              <span className="text-green-400">127</span>
            </div>
            <div className="flex justify-between">
              <span>Recent Profiles:</span>
              <span className="text-yellow-400">23</span>
            </div>
            <div className="flex justify-between">
              <span>BGC Data:</span>
              <span className="text-red-400">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`h-screen w-full ${theme.bg} flex`}>
      {/* Chat Section */}
      <div className={`${isMapVisible ? 'w-1/2' : 'w-full'} transition-all duration-500 ease-in-out flex flex-col ${theme.chatBg} border-r ${theme.border}`}>
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Waves className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Float Chat</h1>
                <p className="text-blue-100 text-sm">ARGO Oceanographic Data Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-4 mr-4 text-sm">
                <div className="flex items-center gap-1">
                  <Database className="w-4 h-4" />
                  <span>NetCDF</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>BGC</span>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleMap}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isMapVisible 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={isMapVisible ? 'Hide Ocean Map' : 'Show Ocean Map'}
              >
                <Globe className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Query Suggestions */}
        {messages.length === 1 && (
          <div className={`p-4 ${theme.quickQueryBg} border-b ${theme.quickQueryBorder}`}>
            <div className={`text-sm ${theme.quickQueryText} font-medium mb-3`}>Quick Query Examples:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuery(query)}
                  className={`text-left p-3 ${theme.quickQueryButtonBg} border ${theme.quickQueryButtonBorder} rounded-lg ${theme.quickQueryButtonHover} transition-colors text-sm ${theme.quickQueryButtonText}`}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : `${theme.botAvatar} border-2`
              }`}>
                {message.type === 'user' ? <User className="w-5 h-5" /> : <Waves className="w-5 h-5" />}
              </div>
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                message.type === 'user' ? 'items-end' : 'items-start'
              }`}>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : `${theme.messageBg} ${theme.messageText} rounded-bl-md border ${theme.messageBorder}`
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                {message.hasData && (
                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      View Profiles
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Export NetCDF
                    </button>
                  </div>
                )}
                <div className={`text-xs text-gray-500 mt-1 ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.botAvatar} border-2`}>
                <Waves className="w-5 h-5" />
              </div>
              <div className={`${theme.loadingBg} px-4 py-3 rounded-2xl rounded-bl-md border`}>
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full"></div>
                  <span className="text-sm">Processing oceanographic data...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 ${theme.inputBg} border-t ${theme.inputBorder}`}>
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about ARGO float data, CTD profiles, salinity, temperature, or BGC parameters..."
                rows={1}
                className={`w-full p-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm ${theme.inputField}`}
                style={{ minHeight: '48px', maxHeight: '120px' }}
                disabled={isLoading}
              />
              <div className={`absolute right-3 bottom-3 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Enter to send
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Ocean Map Section */}
      {isMapVisible && (
        <div className="w-1/2 transition-all duration-500 ease-in-out animate-in slide-in-from-right">
          <ArgoMapComponent />
        </div>
      )}
    </div>
  );
};

export default FloatChat;