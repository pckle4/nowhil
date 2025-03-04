
import React from 'react';
import QRCodeReact from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

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

  return (
    <div className="p-6 rounded-xl bg-white shadow-sm border border-neutral-100">
      <div className="bg-white p-4 rounded-lg">
        <QRCodeReact
          id="qr-code"
          value={value}
          size={200}
          level="H"
          includeMargin
          className="mx-auto"
        />
      </div>
      <Button
        onClick={downloadQR}
        className="mt-4 w-full"
        variant="outline"
      >
        <Download className="w-4 h-4 mr-2" />
        Download QR Code
      </Button>
    </div>
  );
}
