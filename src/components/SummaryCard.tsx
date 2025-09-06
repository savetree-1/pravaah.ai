import React from 'react';
import { motion } from 'framer-motion';
import { Summary, SummaryCardProps } from '../types';
import { Clock, User, FileText, ExternalLink, Check, UserPlus, Ticket } from 'lucide-react';

export function SummaryCard({ summary, onView, onAcknowledge, onAssign, onCreateTicket }: SummaryCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-accent2';
      case 'low': return 'border-accent';
      default: return 'border-muted';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400 bg-green-400/20';
    if (confidence >= 0.6) return 'text-accent2 bg-accent2/20';
    return 'text-red-400 bg-red-400/20';
  };

  return (
    <motion.div
      className={`card p-5 relative ${getPriorityColor(summary.priority)} border-l-4`}
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white leading-tight mb-2">
            {summary.text}
          </h4>
          <div className="flex items-center gap-3 text-sm text-muted">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{summary.stakeholder}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{new Date(summary.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText size={14} />
              <span>{summary.provenance.length} sources</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Confidence badge */}
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(summary.confidence)}`}>
            {Math.round(summary.confidence * 100)}% confidence
          </div>
          
          {/* Priority badge */}
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            summary.priority === 'high' ? 'bg-red-500/20 text-red-400' :
            summary.priority === 'medium' ? 'bg-accent2/20 text-accent2' :
            'bg-accent/20 text-accent'
          }`}>
            {summary.priority.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Preview of provenance */}
      {summary.provenance.length > 0 && (
        <div className="mb-4 p-3 bg-bg/50 rounded-lg border border-white/10">
          <p className="text-sm text-muted mb-1">Source excerpt:</p>
          <p className="text-sm italic">"{summary.provenance[0].snippet}"</p>
          <p className="text-xs text-muted mt-1">Page {summary.provenance[0].page}</p>
        </div>
      )}

      {/* Due date */}
      {summary.dueDate && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <Clock size={14} className="text-accent2" />
          <span>Due: {new Date(summary.dueDate).toLocaleDateString()}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onView(summary.id)}
          className="btn-primary flex items-center gap-2"
        >
          <ExternalLink size={14} />
          View Details
        </motion.button>

        {!summary.acknowledged && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAcknowledge(summary.id)}
            className="btn-ghost flex items-center gap-2"
          >
            <Check size={14} />
            Acknowledge
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAssign(summary.id, '')}
          className="btn-ghost flex items-center gap-2"
        >
          <UserPlus size={14} />
          Assign
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCreateTicket(summary.id)}
          className="btn-ghost flex items-center gap-2"
        >
          <Ticket size={14} />
          Create Ticket
        </motion.button>
      </div>

      {/* Acknowledged indicator */}
      {summary.acknowledged && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={12} className="text-white" />
          </div>
        </div>
      )}

      {/* Routed to indicator */}
      {summary.routedTo.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-muted">
            Routed to: {summary.routedTo.slice(0, 2).join(', ')}
            {summary.routedTo.length > 2 && ` +${summary.routedTo.length - 2} more`}
          </p>
        </div>
      )}
    </motion.div>
  );
}
