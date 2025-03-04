
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
  Clock
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
      return <Image className="w-6 h-6 text-accent" />;
    }
    
    // Documents
    if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
      return <FileText className="w-6 h-6 text-primary" />;
    }
    
    // Audio
    if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
      return <Music className="w-6 h-6 text-secondary" />;
    }
    
    // Video
    if (['mp4', 'webm', 'avi', 'mov', 'wmv'].includes(extension)) {
      return <Video className="w-6 h-6 text-success" />;
    }
    
    // Archives
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
      return <Archive className="w-6 h-6 text-warning" />;
    }
    
    // Code
    if (['js', 'ts', 'html', 'css', 'json', 'py', 'java', 'c', 'cpp', 'php'].includes(extension)) {
      return <Code className="w-6 h-6 text-[#06b6d4]" />;
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
    <div className="w-full max-w-2xl space-y-3">
      <h3 className="text-sm font-medium text-neutral-500 mb-1">Files to share ({files.length})</h3>
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm border border-neutral-100 hover:shadow-md transition-all animate-fade-in"
        >
          <div className="p-2 rounded-full bg-primary/10">
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
  );
}
