import axios from 'axios';
import { ApiResponse, PaginatedResponse } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // This will be proxied by Vite in development
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Upload API
export const uploadApi = {
  uploadFile: async (file: File, metadata: any): Promise<ApiResponse<{ documentId: string }>> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        // Emit progress event if needed
      },
    });
    return response.data;
  },

  getUploadStatus: async (uploadId: string): Promise<ApiResponse<any>> => {
    const response = await api.get(`/upload/${uploadId}/status`);
    return response.data;
  },
};

// Documents API
export const documentsApi = {
  getDocuments: async (params?: any): Promise<PaginatedResponse<any>> => {
    const response = await api.get('/documents', { params });
    return response.data;
  },

  getDocument: async (id: string): Promise<ApiResponse<any>> => {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },

  reprocessDocument: async (id: string, correctedText: string): Promise<ApiResponse<any>> => {
    const response = await api.post(`/documents/${id}/reprocess`, { correctedText });
    return response.data;
  },
};

// Summaries API
export const summariesApi = {
  getSummaries: async (params?: any): Promise<PaginatedResponse<any>> => {
    const response = await api.get('/summaries', { params });
    return response.data;
  },

  acknowledgeSummary: async (id: string): Promise<ApiResponse<any>> => {
    const response = await api.post(`/summaries/${id}/acknowledge`);
    return response.data;
  },

  assignSummary: async (id: string, assignee: string): Promise<ApiResponse<any>> => {
    const response = await api.post(`/summaries/${id}/assign`, { assignee });
    return response.data;
  },
};

// Connectors API
export const connectorsApi = {
  getConnectors: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get('/connectors');
    return response.data;
  },

  configureConnector: async (type: string, config: any): Promise<ApiResponse<any>> => {
    const response = await api.post(`/connectors/${type}/configure`, config);
    return response.data;
  },

  syncConnector: async (type: string): Promise<ApiResponse<any>> => {
    const response = await api.post(`/connectors/${type}/sync`);
    return response.data;
  },
};

// Audit API
export const auditApi = {
  getAuditEvents: async (params?: any): Promise<PaginatedResponse<any>> => {
    const response = await api.get('/audit', { params });
    return response.data;
  },

  exportAuditLog: async (params?: any): Promise<Blob> => {
    const response = await api.get('/audit/export', { 
      params, 
      responseType: 'blob' 
    });
    return response.data;
  },
};

export default api;
