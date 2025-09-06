import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, File, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { UploadFormData, UploadProgress } from '../types';

interface FileWithProgress extends File {
  id: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  preview?: string;
}

export function Upload() {
  const [uploadQueue, setUploadQueue] = useState<FileWithProgress[]>([]);
  const [formData, setFormData] = useState<Partial<UploadFormData>>({
    department: 'Engineering',
    tags: [],
    confidential: false,
    notifyRoles: [],
    priority: 'medium'
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileWithProgress[] = acceptedFiles.map(file => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'uploading',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setUploadQueue(prev => [...prev, ...newFiles]);
    
    // Simulate upload process for each file
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  }, []);

  const simulateUpload = async (fileId: string) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadQueue(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, progress }
            : file
        )
      );
    }
    
    // Simulate processing
    setUploadQueue(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, status: 'processing', progress: 0 }
          : file
      )
    );
    
    // Simulate processing stages
    const stages = ['OCR', 'Extract', 'Summarize', 'Route'];
    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const progress = ((i + 1) / stages.length) * 100;
      setUploadQueue(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, progress }
            : file
        )
      );
    }
    
    // Complete
    setUploadQueue(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, status: 'completed', progress: 100 }
          : file
      )
    );
  };

  const removeFile = (fileId: string) => {
    setUploadQueue(prev => prev.filter(file => file.id !== fileId));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold mb-2">Upload Documents</h1>
        <p className="text-muted">Upload documents for OCR processing and stakeholder routing</p>
      </div>

      {/* Upload area */}
      <motion.section 
        className="card p-8 relative overflow-hidden"
        whileHover={{ y: -2 }}
      >
        <div 
          {...getRootProps()} 
          className={`
            border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer
            ${isDragActive 
              ? 'border-accent bg-accent/5 drag-active' 
              : 'border-muted/30 hover:border-accent/50'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <motion.div
            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
              <UploadIcon size={32} className="text-accent" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {isDragActive ? 'Drop files here' : 'Drag & drop documents'}
              </h3>
              <p className="text-muted">
                PDF, images, Word documents • Up to 10MB each
              </p>
              <p className="text-sm text-muted mt-2">
                or <span className="text-accent font-medium">click to browse</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Form settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Document Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Department</label>
              <select 
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
              >
                <option value="Engineering">Engineering</option>
                <option value="Operations">Operations</option>
                <option value="Procurement">Procurement</option>
                <option value="HR">Human Resources</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map(priority => (
                  <button
                    key={priority}
                    onClick={() => setFormData(prev => ({ ...prev, priority }))}
                    className={`
                      px-4 py-2 rounded-lg font-medium text-sm transition-all
                      ${formData.priority === priority
                        ? priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : priority === 'medium' ? 'bg-accent2/20 text-accent2 border border-accent2/30'
                          : 'bg-accent/20 text-accent border border-accent/30'
                        : 'bg-white/5 text-muted hover:bg-white/10'
                      }
                    `}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="confidential"
                checked={formData.confidential}
                onChange={(e) => setFormData(prev => ({ ...prev, confidential: e.target.checked }))}
                className="w-4 h-4 text-accent bg-bg border-white/20 rounded focus:ring-accent/20"
              />
              <label htmlFor="confidential" className="text-sm">
                Mark as confidential
              </label>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          
          <div className="space-y-3">
            {['Station Controller', 'Department Head', 'Procurement Team'].map(role => (
              <div key={role} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={role}
                  className="w-4 h-4 text-accent bg-bg border-white/20 rounded focus:ring-accent/20"
                />
                <label htmlFor={role} className="text-sm">
                  {role}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload queue */}
      <AnimatePresence>
        {uploadQueue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Upload Queue</h3>
            
            <div className="space-y-3">
              {uploadQueue.map(file => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-4 p-4 bg-bg/50 rounded-lg border border-white/10"
                >
                  {/* File icon */}
                  <div className="flex-shrink-0">
                    {file.preview ? (
                      <img src={file.preview} alt="" className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center">
                        <File size={20} className="text-accent" />
                      </div>
                    )}
                  </div>
                  
                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2">
                        {file.status === 'uploading' && (
                          <Loader size={16} className="text-accent animate-spin" />
                        )}
                        {file.status === 'processing' && (
                          <Loader size={16} className="text-accent2 animate-spin" />
                        )}
                        {file.status === 'completed' && (
                          <CheckCircle size={16} className="text-green-500" />
                        )}
                        {file.status === 'error' && (
                          <AlertCircle size={16} className="text-red-500" />
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          file.status === 'uploading' ? 'bg-accent' :
                          file.status === 'processing' ? 'bg-accent2' :
                          file.status === 'completed' ? 'bg-green-500' :
                          'bg-red-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    {/* Status text */}
                    <p className="text-xs text-muted mt-1">
                      {file.status === 'uploading' && 'Uploading...'}
                      {file.status === 'processing' && 'Processing...'}
                      {file.status === 'completed' && 'Processing complete'}
                      {file.status === 'error' && 'Upload failed'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
