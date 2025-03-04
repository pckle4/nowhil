
import React from 'react';
import { File as FileIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileListProps {
  files: File[];
  onRemove: (file: File) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl space-y-2">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm border border-neutral-100 animate-fade-in"
        >
          <div className="p-2 rounded-lg bg-primary/10">
            <FileIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{file.name}</p>
            <p className="text-sm text-neutral-500 font-mono">
              {formatSize(file.size)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-500 hover:text-error"
            onClick={() => onRemove(file)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
