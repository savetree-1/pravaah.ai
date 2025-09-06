import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { VantaBackground } from './VantaBackground';
import { motion, AnimatePresence } from 'framer-motion';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-bg text-white relative overflow-hidden">
      {/* Vanta.js background */}
      <VantaBackground effect="NET" />
      
      {/* Background shards */}
      <div className="shard shard-1" />
      <div className="shard shard-2" />
      
      {/* Header */}
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-70 flex-shrink-0"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main content */}
        <motion.main 
          className="flex-1 overflow-hidden relative z-10"
          layout
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="h-full overflow-auto p-6">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
