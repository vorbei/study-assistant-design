import React from 'react';
import { cn } from '@/lib/utils';

interface PDFViewerProps {
  className?: string;
  pdfUrl?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ 
  className,
  pdfUrl
}) => {
  if (!pdfUrl) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center bg-neutral-7", className)}>
        <p className="text-muted-foreground">请选择或上传 PDF 文件</p>
      </div>
    );
  }

  return (
    <iframe
      src={`${pdfUrl}#toolbar=0`}
      className={cn("w-full h-full border-0 bg-neutral-7", className)}
      title="PDF Viewer"
    />
  );
};
