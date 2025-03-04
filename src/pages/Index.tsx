
import React, { useState } from 'react';
import { DropZone } from '@/components/DropZone';
import { FileList } from '@/components/FileList';
import { QRCode } from '@/components/QRCode';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [shareLink, setShareLink] = useState<string>('');

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleFileRemove = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleUpload = () => {
    // This is where we'll implement the actual file transfer logic
    const dummyLink = `https://example.com/share/${Math.random().toString(36).substring(7)}`;
    setShareLink(dummyLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10">
      <div className="container py-12 min-h-screen flex flex-col items-center justify-center gap-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Share Files Securely
          </h1>
          <p className="text-neutral-500">
            Drag and drop your files to share them instantly with anyone, anywhere.
          </p>
        </div>

        <DropZone onFileSelect={handleFileSelect} />

        {files.length > 0 && (
          <div className="w-full max-w-2xl animate-fade-in">
            <FileList files={files} onRemove={handleFileRemove} />
            <Button
              className="mt-4 w-full"
              size="lg"
              onClick={handleUpload}
            >
              <Send className="w-4 h-4 mr-2" />
              Share Files
            </Button>
          </div>
        )}

        {shareLink && (
          <div className="w-full max-w-2xl animate-fade-in">
            <QRCode value={shareLink} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
