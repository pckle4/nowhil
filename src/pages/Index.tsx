
import React, { useState } from 'react';
import { DropZone } from '@/components/DropZone';
import { FileList } from '@/components/FileList';
import { QRCode } from '@/components/QRCode';
import { Button } from '@/components/ui/button';
import { Send, Link, Copy, QrCode } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [shareLink, setShareLink] = useState<string>('');
  const [showQR, setShowQR] = useState(false);

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleFileRemove = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleUpload = () => {
    // This is where we'll implement the actual file transfer logic
    const dummyLink = `https://shareflow.app/${Math.random().toString(36).substring(2, 10)}`;
    setShareLink(dummyLink);
    toast({
      title: "Link generated",
      description: "Your shareable link is ready!",
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link copied",
      description: "The shareable link has been copied to your clipboard",
    });
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
          </div>
        )}

        {shareLink && (
          <div className="w-full max-w-2xl space-y-4 animate-fade-in">
            {!showQR ? (
              <div className="p-6 rounded-xl bg-white shadow-sm border border-neutral-100">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display font-semibold text-lg text-neutral-800">Shareable Link</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-accent"
                      onClick={() => setShowQR(true)}
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Show QR
                    </Button>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                    <div className="flex items-center gap-2">
                      <Link className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-sm font-mono text-neutral-700 truncate flex-1">
                        {shareLink}
                      </p>
                      <Button
                        onClick={copyLink}
                        size="sm"
                        variant="outline"
                        className="h-8"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-success/10 p-3 rounded-lg">
                    <p className="text-sm text-success/80">
                      Link will expire in 24 hours. Anyone with this link can access these files.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-semibold text-lg text-neutral-800">QR Code</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary"
                    onClick={() => setShowQR(false)}
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Show Link
                  </Button>
                </div>
                <QRCode value={shareLink} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
