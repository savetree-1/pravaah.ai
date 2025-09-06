// Core data models for Pravah.ai
export interface Document {
  id: string;
  title?: string;
  uploader: string;
  department: string;
  uploadedAt: string;
  status: 'queued' | 'processing' | 'processed' | 'qc' | 'error';
  rawUrl: string;
  processedUrl?: string;
  versions: DocumentVersion[];
  tags: string[];
  confidential: boolean;
  priority: 'low' | 'medium' | 'high';
  fileType: string;
  fileSize: number;
}

export interface DocumentVersion {
  version: number;
  url: string;
  createdAt: string;
  type: 'original' | 'ocr' | 'corrected';
}

export interface Summary {
  id: string;
  documentId: string;
  stakeholder: string;
  text: string;
  confidence: number;
  provenance: ProvenanceItem[];
  createdAt: string;
  routedTo: string[]; // emails/userIDs
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  actions: SummaryAction[];
}

export interface ProvenanceItem {
  page: number;
  snippet: string;
  bbox?: number[]; // bounding box coordinates
  confidence: number;
}

export interface SummaryAction {
  type: 'acknowledge' | 'assign' | 'ticket' | 'comment';
  label: string;
  handler: string;
}

export interface AuditEvent {
  id: string;
  documentId: string;
  event: string;
  user?: string;
  timestamp: string;
  meta?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'station_controller' | 'procurement' | 'hr' | 'viewer';
  department: string;
  avatar?: string;
  permissions: string[];
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  stages: ProcessingStage[];
}

export interface ProcessingStage {
  name: 'queued' | 'ocr' | 'extract' | 'summarize' | 'routing';
  status: 'pending' | 'processing' | 'completed' | 'error';
  startedAt?: string;
  completedAt?: string;
  message?: string;
}

export interface Connector {
  id: string;
  name: string;
  type: 'sharepoint' | 'maximo' | 'imap' | 'whatsapp';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  config: ConnectorConfig;
  stats: ConnectorStats;
}

export interface ConnectorConfig {
  enabled: boolean;
  syncSchedule: string;
  departmentMapping: Record<string, string>;
  credentials?: Record<string, string>;
}

export interface ConnectorStats {
  totalDocuments: number;
  documentsThisWeek: number;
  lastSyncStatus: 'success' | 'error';
  errors: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface DashboardStats {
  totalDocuments: number;
  processingQueue: number;
  pendingActions: number;
  completedToday: number;
  departmentBreakdown: Record<string, number>;
  priorityBreakdown: Record<string, number>;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form types
export interface UploadFormData {
  files: File[];
  department: string;
  tags: string[];
  confidential: boolean;
  notifyRoles: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface SearchFilters {
  query?: string;
  department?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: string;
  priority?: string;
  stakeholder?: string;
}

// Component prop types
export interface SummaryCardProps {
  summary: Summary;
  onView: (id: string) => void;
  onAcknowledge: (id: string) => void;
  onAssign: (id: string, assignee: string) => void;
  onCreateTicket: (id: string) => void;
}

export interface DocumentViewerProps {
  document: Document;
  summaries: Summary[];
  onHighlight: (page: number, bbox: number[]) => void;
}

export interface QCEditorProps {
  document: Document;
  ocrText: string;
  onSave: (correctedText: string) => void;
  onReprocess: () => void;
}
