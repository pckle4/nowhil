
import React from 'react';
import { 
  FileText, 
  Image, 
  Music, 
  Video, 
  Archive, 
  File as FileIcon, 
  Code, 
  X,
  Clock,
  Shield
} from 'lucide-react';
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

  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    // Images
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
      return <Image className="w-6 h-6 text-[#06b6d4]" />;
    }
    
    // Documents
    if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
      return <FileText className="w-6 h-6 text-primary" />;
    }
    
    // Audio
    if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
      return <Music className="w-6 h-6 text-[#8b5cf6]" />;
    }
    
    // Video
    if (['mp4', 'webm', 'avi', 'mov', 'wmv'].includes(extension)) {
      return <Video className="w-6 h-6 text-[#ec4899]" />;
    }
    
    // Archives
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
      return <Archive className="w-6 h-6 text-[#f97316]" />;
    }
    
    // Code
    if (['js', 'ts', 'html', 'css', 'json', 'py', 'java', 'c', 'cpp', 'php'].includes(extension)) {
      return <Code className="w-6 h-6 text-[#14b8a6]" />;
    }
    
    // Default
    return <FileIcon className="w-6 h-6 text-neutral-500" />;
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-neutral-700">Files to share ({files.length})</h3>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Shield className="w-4 h-4 text-success" />
          <span>End-to-end encrypted</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center gap-4 p-4 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors animate-fade-in"
          >
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5">
              {getFileIcon(file)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                <span className="flex items-center">
                  {formatSize(file.size)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(new Date())}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-error hover:bg-error/10"
              onClick={() => onRemove(file)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
