import React, { useCallback, useState } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatBytes } from '@/lib/utils';
import type { Document, UploadProgress } from '@/types';

interface DocumentUploadProps {
  onUploadComplete?: (documents: Document[]) => void;
}

export function DocumentUpload({ onUploadComplete }: DocumentUploadProps) {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const newUploads: UploadProgress[] = fileArray.map((file) => ({
        file,
        progress: 0,
        status: 'uploading',
      }));

      setUploads((prev) => [...prev, ...newUploads]);

      // Simulate upload and processing
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        
        try {
          // Simulate upload progress
          for (let progress = 0; progress <= 100; progress += 20) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            setUploads((prev) =>
              prev.map((upload) =>
                upload.file === file
                  ? { ...upload, progress }
                  : upload
              )
            );
          }

          // Simulate processing
          setUploads((prev) =>
            prev.map((upload) =>
              upload.file === file
                ? { ...upload, status: 'processing' }
                : upload
            )
          );

          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Create document
          const newDoc: Document = {
            id: `doc-${Date.now()}-${i}`,
            name: file.name,
            type: file.type,
            size: file.size,
            uploadedAt: new Date().toISOString(),
            status: 'ready',
          };

          setDocuments((prev) => [...prev, newDoc]);
          setUploads((prev) =>
            prev.map((upload) =>
              upload.file === file
                ? { ...upload, status: 'complete' }
                : upload
            )
          );

          if (onUploadComplete) {
            onUploadComplete([newDoc]);
          }
        } catch (error) {
          setUploads((prev) =>
            prev.map((upload) =>
              upload.file === file
                ? {
                    ...upload,
                    status: 'error',
                    error: 'Upload failed',
                  }
                : upload
            )
          );
        }
      }
    },
    [onUploadComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeUpload = (file: File) => {
    setUploads((prev) => prev.filter((upload) => upload.file !== file));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upload Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
        >
          <input
            type="file"
            id="file-upload"
            multiple
            accept=".pdf,.doc,.docx,image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="text-sm font-medium">
              Drop files here or click to upload
            </div>
            <div className="text-xs text-muted-foreground">
              PDF, DOC, DOCX, or images
            </div>
          </label>
        </div>

        {uploads.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Uploading</div>
            {uploads.map((upload, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {upload.file.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatBytes(upload.file.size)}
                  </div>
                  {upload.status === 'uploading' && (
                    <div className="mt-1 h-1 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${upload.progress}%` }}
                      />
                    </div>
                  )}
                  {upload.status === 'processing' && (
                    <div className="text-xs text-primary mt-1">
                      Processing...
                    </div>
                  )}
                </div>
                {upload.status === 'complete' && (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                )}
                {upload.status === 'error' && (
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
                {upload.status !== 'complete' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUpload(upload.file)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        {documents.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">
              Uploaded ({documents.length})
            </div>
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 bg-card border rounded-lg"
              >
                <File className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{doc.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatBytes(doc.size)}
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
