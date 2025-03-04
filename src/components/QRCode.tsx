
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download, Link, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QRCodeProps {
  value: string;
}

export function QRCode({ value }: QRCodeProps) {
  const downloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = url;
      link.click();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Link copied",
      description: "The shareable link has been copied to your clipboard",
    });
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-sm border border-neutral-100">
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-violet-100 to-fuchsia-100 p-4 rounded-lg">
          <QRCodeCanvas
            id="qr-code"
            value={value}
            size={200}
            level="H"
            includeMargin
            className="mx-auto"
          />
        </div>
        
        <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
          <div className="flex items-center gap-2">
            <Link className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-sm font-mono text-neutral-700 truncate flex-1">
              {value}
            </p>
            <Button
              onClick={copyLink}
              size="icon"
              variant="ghost"
              className="h-8 w-8"
            >
              <Copy className="w-4 h-4 text-neutral-500" />
            </Button>
          </div>
        </div>
        
        <Button
          onClick={downloadQR}
          className="w-full"
          variant="outline"
        >
          <Download className="w-4 h-4 mr-2" />
          Download QR Code
        </Button>
      </div>
    </div>
  );
}
