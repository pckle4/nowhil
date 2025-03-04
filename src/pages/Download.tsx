
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCode } from '@/components/QRCode';
import { Button } from '@/components/ui/button';
import { Download, Clock, ShieldCheck, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  expiresAt: string;
}

const DownloadPage = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState<FileMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, this would fetch file data from a backend
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data for demonstration
      setFileData({
        name: "presentation.pdf",
        size: 2457600,
        type: "application/pdf",
        uploadedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
      setLoading(false);
    }, 1000);
  }, [fileId]);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(dateString));
  };

  const calculateTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const downloadFile = () => {
    // In a real app, this would trigger the actual download
    toast({
      title: "Download started",
      description: "Your file is being prepared for download",
    });
  };

  const shareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Download link has been copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">File Not Found</h2>
          <p className="text-neutral-600 mb-6">The file you're looking for may have been removed or the link has expired.</p>
          <Button onClick={() => window.location.href = '/'}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 py-12 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="grid gap-8 md:grid-cols-[1fr_350px]">
          <div className="bg-white rounded-2xl shadow-xl p-8 order-2 md:order-1">
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Ready to Download
              </h1>
              <p className="text-neutral-600">
                This file was shared with you through ShareFlow Connect
              </p>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-100">
              <h2 className="font-bold text-lg mb-4 text-neutral-800">File Details</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800">{fileData.name}</h3>
                    <p className="text-sm text-neutral-500">{formatSize(fileData.size)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-3 rounded-lg border border-neutral-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-neutral-700">Expires in</span>
                    </div>
                    <p className="text-sm text-neutral-600 font-mono">
                      {calculateTimeRemaining(fileData.expiresAt)}
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-neutral-100">
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-neutral-700">Secure Transfer</span>
                    </div>
                    <p className="text-sm text-neutral-600 font-mono">
                      End-to-end
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={downloadFile}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download File
            </Button>
            
            <div className="mt-6 text-center">
              <button 
                onClick={shareLink}
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share this download link
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h2 className="font-semibold text-lg mb-4 text-neutral-800">Scan to Download</h2>
                <QRCode value={window.location.href} />
              </div>
              
              <div className="bg-success/10 p-4 rounded-xl">
                <p className="text-sm text-success/80">
                  This download link will expire in 24 hours. Make sure to download your file before it expires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
