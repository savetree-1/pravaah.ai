import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SummaryCard } from '../components/SummaryCard';
import { Summary, DashboardStats, SearchFilters } from '../types';
import { Search, Filter, TrendingUp, Clock, FileText, AlertTriangle } from 'lucide-react';

// Mock data
const mockSummaries: Summary[] = [
  {
    id: '1',
    documentId: 'doc-1',
    stakeholder: 'Station Controller',
    text: 'Emergency brake system requires immediate inspection and calibration.',
    confidence: 0.92,
    provenance: [
      {
        page: 2,
        snippet: 'During routine inspection, anomalies detected in brake response time',
        confidence: 0.92,
        bbox: [100, 200, 300, 250]
      }
    ],
    createdAt: '2024-01-15T10:30:00Z',
    routedTo: ['station.controller@kmrl.org', 'safety.team@kmrl.org'],
    acknowledged: false,
    priority: 'high',
    dueDate: '2024-01-20T00:00:00Z',
    actions: []
  },
  {
    id: '2',
    documentId: 'doc-2',
    stakeholder: 'Procurement',
    text: 'Purchase requisition for replacement rail components needs approval.',
    confidence: 0.85,
    provenance: [
      {
        page: 1,
        snippet: 'Rail section R-205 showing signs of wear, replacement recommended',
        confidence: 0.85,
        bbox: [150, 300, 400, 350]
      }
    ],
    createdAt: '2024-01-15T09:15:00Z',
    routedTo: ['procurement@kmrl.org'],
    acknowledged: true,
    acknowledgedBy: 'john.doe@kmrl.org',
    acknowledgedAt: '2024-01-15T11:00:00Z',
    priority: 'medium',
    actions: []
  },
  {
    id: '3',
    documentId: 'doc-3',
    stakeholder: 'HR',
    text: 'Staff training schedule for new safety protocols requires coordination.',
    confidence: 0.78,
    provenance: [
      {
        page: 3,
        snippet: 'Updated safety protocols must be implemented across all stations',
        confidence: 0.78,
        bbox: [200, 400, 500, 450]
      }
    ],
    createdAt: '2024-01-15T08:45:00Z',
    routedTo: ['hr@kmrl.org', 'training@kmrl.org'],
    acknowledged: false,
    priority: 'low',
    actions: []
  }
];

const mockStats: DashboardStats = {
  totalDocuments: 156,
  processingQueue: 8,
  pendingActions: 23,
  completedToday: 12,
  departmentBreakdown: {
    Engineering: 45,
    Operations: 38,
    Procurement: 32,
    HR: 28,
    Safety: 13
  },
  priorityBreakdown: {
    high: 8,
    medium: 15,
    low: 24
  }
};

export function Dashboard() {
  const [summaries, setSummaries] = useState<Summary[]>(mockSummaries);
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);

  const handleView = (id: string) => {
    setSelectedSummary(id);
    // Navigate to document view or open side panel
  };

  const handleAcknowledge = (id: string) => {
    setSummaries(prev => 
      prev.map(summary => 
        summary.id === id 
          ? { ...summary, acknowledged: true, acknowledgedAt: new Date().toISOString() }
          : summary
      )
    );
  };

  const handleAssign = (id: string, assignee: string) => {
    // Handle assignment logic
    console.log('Assigning', id, 'to', assignee);
  };

  const handleCreateTicket = (id: string) => {
    // Handle ticket creation
    console.log('Creating ticket for', id);
  };

  const filteredSummaries = summaries.filter(summary => {
    if (filters.priority && summary.priority !== filters.priority) return false;
    if (filters.stakeholder && summary.stakeholder !== filters.stakeholder) return false;
    if (filters.query) {
      const query = filters.query.toLowerCase();
      return summary.text.toLowerCase().includes(query) ||
             summary.stakeholder.toLowerCase().includes(query);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Dashboard</h1>
          <p className="text-muted">Monitor document processing and stakeholder actions</p>
        </div>
        
        <div className="flex gap-3">
          <button className="btn-secondary">Export Report</button>
          <button className="btn-primary">Upload Documents</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="card p-6"
          whileHover={{ y: -2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Total Documents</p>
              <p className="text-3xl font-bold text-white">{stats.totalDocuments}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-accent" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card p-6"
          whileHover={{ y: -2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Processing Queue</p>
              <p className="text-3xl font-bold text-white">{stats.processingQueue}</p>
            </div>
            <div className="w-12 h-12 bg-accent2/10 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-accent2" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card p-6"
          whileHover={{ y: -2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Pending Actions</p>
              <p className="text-3xl font-bold text-white">{stats.pendingActions}</p>
            </div>
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card p-6"
          whileHover={{ y: -2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Completed Today</p>
              <p className="text-3xl font-bold text-white">{stats.completedToday}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-green-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                placeholder="Search summaries..."
                value={filters.query || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-bg border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
              />
            </div>
          </div>
          
          <select
            value={filters.priority || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value || undefined }))}
            className="px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent/50"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select
            value={filters.stakeholder || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, stakeholder: e.target.value || undefined }))}
            className="px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent/50"
          >
            <option value="">All Stakeholders</option>
            <option value="Station Controller">Station Controller</option>
            <option value="Procurement">Procurement</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
          
          <button className="btn-ghost flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Summary Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSummaries.map((summary, index) => (
          <motion.div
            key={summary.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SummaryCard
              summary={summary}
              onView={handleView}
              onAcknowledge={handleAcknowledge}
              onAssign={handleAssign}
              onCreateTicket={handleCreateTicket}
            />
          </motion.div>
        ))}
      </div>

      {filteredSummaries.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-muted" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No summaries found</h3>
          <p className="text-muted">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
