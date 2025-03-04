
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { QRCode } from '@/components/QRCode';
import { Button } from '@/components/ui/button';
import { FileList } from '@/components/FileList';
import { 
  Download, 
  Share2, 
  ShieldCheck, 
  FileText,
  Link as LinkIcon, 
  QrCode,
  Copy,
  Clock,
  User,
  Globe,
  Fingerprint,
  CheckCircle2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadIp?: string;
  deviceInfo?: string;
  uniqueId: string;
  isOwner?: boolean;
}

const DownloadPage = () => {
  const { fileId } = useParams();
  const location = useLocation();
  const [fileData, setFileData] = useState<FileMetadata | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"qr" | "link">("link");
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Check if user is owner based on URL parameters
  const isOwner = new URLSearchParams(location.search).get('owner') === 'true';

  // In a real app, this would fetch file data from a backend
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Create a mock File object
      const mockFile = new File([""], "presentation.pdf", { type: "application/pdf" });
      setFiles([mockFile]);
      
      // Mock data for demonstration
      setFileData({
        name: "presentation.pdf",
        size: 2457600,
        type: "application/pdf",
        uploadedAt: new Date().toISOString(),
        uploadIp: isOwner ? "192.168.1.1" : undefined,
        deviceInfo: isOwner ? "Chrome 121.0.6167.189 / Windows 11" : undefined,
        uniqueId: fileId || Math.random().toString(36).substring(2, 15),
        isOwner: isOwner
      });
      
      setLoading(false);
    }, 1000);
  }, [fileId, isOwner]);

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
      second: 'numeric'
    }).format(new Date(dateString));
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
    setCopySuccess(true);
    
    toast({
      title: "Link copied",
      description: "Download link has been copied to clipboard",
    });
    
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const cancelShare = () => {
    toast({
      title: "Share cancelled",
      description: "This download link is now inactive",
      variant: "destructive"
    });
    
    // In a real app, this would call an API to invalidate the share
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
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
                {isOwner ? "Your Shared File" : "Ready to Download"}
              </h1>
              <p className="text-neutral-600">
                {isOwner 
                  ? "This file is now available for others to download" 
                  : "This file was shared with you through ShareFlow Connect"}
              </p>
            </div>
            
            {files.length > 0 && <FileList files={files} onRemove={() => {}} isOwner={isOwner} />}
            
            <div className="bg-neutral-50 rounded-xl p-6 my-8 border border-neutral-100">
              <h2 className="font-bold text-lg mb-4 text-neutral-800">
                {isOwner ? "Share Information" : "File Details"}
              </h2>
              
              <div className="space-y-5">
                {isOwner && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-neutral-100">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-neutral-700">Upload Source</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-mono">
                        {fileData.uploadIp || "Unknown"}
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-neutral-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Globe className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-neutral-700">Device Info</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-mono truncate">
                        {fileData.deviceInfo || "Unknown"}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-neutral-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-neutral-700">Uploaded at</span>
                    </div>
                    <p className="text-sm text-neutral-600 font-mono">
                      {formatDate(fileData.uploadedAt)}
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
                
                <div className="bg-white p-3 rounded-lg border border-neutral-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Fingerprint className="w-4 h-4 text-[#8b5cf6]" />
                    <span className="text-sm font-medium text-neutral-700">File Identifier</span>
                  </div>
                  <p className="text-sm text-neutral-600 font-mono break-all">
                    {fileData.uniqueId}
                  </p>
                </div>
              </div>
            </div>
            
            {isOwner ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-neutral-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-primary" />
                      <span className="font-medium text-neutral-800">Shareable Link</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={shareLink} 
                      className="h-8 gap-1 text-xs"
                    >
                      {copySuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copySuccess ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-neutral-50 py-2 px-3 rounded-l-md border border-neutral-200 flex-1 overflow-hidden">
                      <p className="text-xs font-mono text-neutral-600 truncate">{window.location.href}</p>
                    </div>
                    <Button 
                      size="sm"
                      className="rounded-l-none h-9"
                      onClick={shareLink}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  variant="destructive"
                  className="w-full"
                  onClick={cancelShare}
                >
                  Cancel Sharing
                </Button>
              </div>
            ) : (
              <Button 
                onClick={downloadFile}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download File
              </Button>
            )}
            
            {!isOwner && (
              <div className="mt-6 text-center">
                <button 
                  onClick={shareLink}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share this download link
                </button>
              </div>
            )}
          </div>
          
          <div className="order-1 md:order-2">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "qr" | "link")}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="qr" className="flex items-center gap-1.5">
                      <QrCode className="w-4 h-4" />
                      QR Code
                    </TabsTrigger>
                    <TabsTrigger value="link" className="flex items-center gap-1.5">
                      <LinkIcon className="w-4 h-4" />
                      Link
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="qr" className="mt-0">
                    <QRCode value={window.location.href} />
                  </TabsContent>
                  
                  <TabsContent value="link" className="mt-0">
                    <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="font-medium text-neutral-800">How to Share</h3>
                      </div>
                      <ol className="space-y-2 text-sm text-neutral-600 list-decimal pl-5">
                        <li>Copy the link below</li>
                        <li>Send it to the recipient via email, messaging app, etc.</li>
                        <li>They can download the file directly in their browser</li>
                      </ol>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="bg-primary/5 p-3 rounded-t-md border border-primary/10">
                        <p className="text-xs font-medium text-primary">Your shareable link:</p>
                      </div>
                      <div className="border border-t-0 border-neutral-200 p-3 rounded-b-md bg-white break-all">
                        <p className="text-xs font-mono text-neutral-600">{window.location.href}</p>
                      </div>
                      <Button 
                        onClick={shareLink} 
                        size="sm" 
                        className="mt-2 gap-1.5"
                      >
                        {copySuccess ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copySuccess ? "Copied to clipboard!" : "Copy link"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                <p className="text-sm text-primary/90">
                  This link will remain available until cancelled or your browser session ends. For security, we recommend cancelling the share after use.
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
