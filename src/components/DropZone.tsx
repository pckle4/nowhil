
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileUp, File } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DropZoneProps {
  onFileSelect: (files: File[]) => void;
}

export function DropZone({ onFileSelect }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles);
      toast({
        title: "Files added",
        description: `Added ${acceptedFiles.length} file(s)`,
      });
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 
        ${isDragging 
          ? 'border-primary bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg scale-[1.02]' 
          : 'border-neutral-200 bg-white hover:border-primary/50 hover:shadow-md'
        }`}
    >
      <input {...getInputProps()} />
      
      {isDragging && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse"></div>
      )}
      
      <div className="relative py-14 px-8 flex flex-col items-center justify-center gap-6 text-center z-10">
        <div className={`p-5 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
          <Upload 
            className={`w-12 h-12 text-primary transition-all duration-300 ${isDragging ? 'text-accent scale-110' : ''}`} 
          />
        </div>
        
        <div>
          <h3 className="text-2xl font-display font-semibold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Drop your files here
          </h3>
          <p className="text-neutral-500 mb-4">
            or click to select files from your device
          </p>
          
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <FileUp className="w-4 h-4" />
            <span>Select Files</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 w-full max-w-lg mt-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#06b6d4]/10 flex items-center justify-center">
              <File className="w-5 h-5 text-[#06b6d4]" />
            </div>
            <span className="text-sm text-neutral-600">Any file type</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-neutral-600">Secure transfer</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#f97316]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm text-neutral-600">Fast delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
