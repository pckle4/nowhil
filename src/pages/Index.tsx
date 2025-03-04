
import React, { useState } from 'react';
import { DropZone } from '@/components/DropZone';
import { FileList } from '@/components/FileList';
import { Button } from '@/components/ui/button';
import { Send, ArrowRight, Clock, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleFileRemove = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to share",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Generate a unique file ID (in a real app, this would come from the server)
          const fileId = Math.random().toString(36).substring(2, 10);
          // Navigate to the download page after upload completes
          setTimeout(() => {
            navigate(`/download/${fileId}`);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5">
      <div className="container py-12 min-h-screen flex flex-col items-center justify-center gap-8">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h1 className="text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            ShareFlow Connect
          </h1>
          <p className="text-neutral-500 text-lg">
            Securely share files with anyone, anywhere - instantly.
          </p>
        </div>

        {isUploading ? (
          <div className="w-full max-w-2xl animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-display font-semibold mb-2">Uploading Files</h2>
                <p className="text-neutral-500">Please wait while we process your files...</p>
              </div>
              
              <div className="mb-8">
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-neutral-500">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-neutral-600">
                  <div className={`rounded-full p-1 ${uploadProgress >= 30 ? 'bg-success/10 text-success' : 'bg-neutral-100 text-neutral-400'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Processing files</span>
                </div>
                
                <div className="flex items-center gap-4 text-neutral-600">
                  <div className={`rounded-full p-1 ${uploadProgress >= 60 ? 'bg-success/10 text-success' : 'bg-neutral-100 text-neutral-400'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Encrypting data</span>
                </div>
                
                <div className="flex items-center gap-4 text-neutral-600">
                  <div className={`rounded-full p-1 ${uploadProgress >= 90 ? 'bg-success/10 text-success' : 'bg-neutral-100 text-neutral-400'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Generating secure link</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <DropZone onFileSelect={handleFileSelect} />

            {files.length > 0 && (
              <div className="w-full max-w-2xl animate-fade-in">
                <FileList files={files} onRemove={handleFileRemove} />
                <Button
                  className="mt-4 w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                  size="lg"
                  onClick={handleUpload}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Generate Shareable Link
                </Button>
                
                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-neutral-800 mb-1">Files available for 24 hours</h3>
                      <p className="text-sm text-neutral-600">
                        Your shared files will automatically expire after 24 hours for security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
