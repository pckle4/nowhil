
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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
      className={`relative w-full max-w-2xl p-12 rounded-2xl border-2 border-dashed transition-all duration-300 
        ${isDragging 
          ? 'border-primary bg-primary/5 animate-pulse-border' 
          : 'border-neutral-200 hover:border-primary/50'
        }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className={`p-4 rounded-full bg-primary/10 transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
          <Upload 
            className={`w-10 h-10 text-primary transition-all duration-300 ${isDragging ? 'scale-110' : ''}`} 
          />
        </div>
        <div>
          <h3 className="text-xl font-display font-semibold mb-2">
            Drop your files here
          </h3>
          <p className="text-neutral-500">
            or click to select files
          </p>
        </div>
      </div>
    </div>
  );
}
