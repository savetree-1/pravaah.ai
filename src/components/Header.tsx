import React, { useState } from 'react';
import { Search, Bell, Menu, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  return (
    <header className="h-16 bg-panel border-b border-white/10 flex items-center justify-between px-6 relative z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </motion.button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent2 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <h1 className="text-xl font-heading font-semibold">
            Pravah<span className="text-accent">.ai</span>
          </h1>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents, summaries, or actions..."
            className="w-full pl-10 pr-4 py-2 bg-bg border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded text-muted hover:text-white transition-colors"
              onClick={() => setSearchQuery('')}
            >
              ×
            </motion.button>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Quick actions */}
        <div className="hidden md:flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 text-sm text-muted hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
          >
            Docs
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 text-sm text-muted hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
          >
            Connectors
          </motion.button>
        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Bell size={20} />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-medium"
            >
              {notifications}
            </motion.span>
          )}
        </motion.button>

        {/* User menu */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent2 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="hidden sm:block text-sm font-medium">John Doe</span>
          </motion.button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-48 bg-panel border border-white/10 rounded-xl shadow-xl py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted">Station Controller</p>
                </div>
                
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors text-red-400">
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search overlay backdrop */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setSearchQuery('')}
        />
      )}
    </header>
  );
}
