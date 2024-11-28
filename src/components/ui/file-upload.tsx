import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileSelect: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
}

export function FileUpload({
  onFileSelect,
  accept,
  maxFiles = 1,
  className,
  ...props
}: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative cursor-pointer rounded-lg border-2 border-dashed border-neutral-3 bg-neutral-7/50 p-4 transition-colors hover:border-blue-600/50 hover:bg-blue-50/50',
        isDragActive && 'border-blue-600 bg-blue-50',
        className
      )}
      {...props}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-3">
        <Upload className="h-6 w-6" />
        <p>
          {isDragActive ? (
            '松开以上传文件'
          ) : (
            <>
              拖拽文件到此处，或者
              <span className="mx-1 text-blue-600">点击上传</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
