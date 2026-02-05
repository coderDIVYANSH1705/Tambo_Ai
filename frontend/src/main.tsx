import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

function App() {
  const [messages, setMessages] = React.useState<Array<{id: string, role: string, content: string}>>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I received: "${input}". The full Tambo AI integration is being set up. This demo shows the chat interface is working!`
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Show success message
    const fileNames = newFiles.map(f => f.name).join(', ');
    const successMsg = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `✅ Successfully uploaded: ${fileNames}. You can now ask questions about ${newFiles.length === 1 ? 'this document' : 'these documents'}!`
    };
    setMessages(prev => [...prev, successMsg]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <aside style={{ width: '320px', background: 'white', borderRight: '1px solid #e5e7eb', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>IntelliDoc AI</h1>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Document Intelligence</p>
        </div>

        {/* Upload Area */}
        <div style={{ marginBottom: '24px' }}>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,image/*"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '24px',
              background: isDragging ? '#eff6ff' : '#f9fafb',
              borderRadius: '8px',
              border: isDragging ? '2px dashed #3b82f6' : '2px dashed #e5e7eb',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
            <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#111827' }}>
              {isDragging ? 'Drop files here' : 'Upload Documents'}
            </p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
              Drag & drop or click to browse
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>
              PDF, DOC, DOCX, or images
            </p>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Uploaded Files ({uploadedFiles.length})
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {uploadedFiles.map(file => (
                <div
                  key={file.id}
                  style={{
                    padding: '12px',
                    background: '#f9fafb',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '16px' }}>📄</span>
                    <p style={{ fontSize: '13px', fontWeight: '500', color: '#111827', margin: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {file.name}
                    </p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, paddingLeft: '24px' }}>
                    {formatFileSize(file.size)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Queries */}
        <div style={{ fontSize: '12px', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
          <p style={{ fontWeight: '500', marginBottom: '8px' }}>💡 Try asking:</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
            <li>Extract invoice data</li>
            <li>Show spending chart</li>
            <li>Check compliance</li>
            <li>Show timeline</li>
          </ul>
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Document Analysis Chat</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>Ask questions about your documents</p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '100px auto' }}>
              <div style={{ width: '64px', height: '64px', background: '#3b82f6', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px' }}>
                🤖
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Welcome to IntelliDoc AI</h3>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>Upload documents and ask questions to get instant insights</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
                {['Extract invoice data', 'Show vendor spending', 'Check compliance', 'Show timeline'].map(q => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    style={{ padding: '12px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '12px', marginBottom: '16px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>🤖</div>
                )}
                <div style={{ maxWidth: '600px', padding: '12px 16px', borderRadius: '8px', background: msg.role === 'user' ? '#3b82f6' : 'white', color: msg.role === 'user' ? 'white' : '#111827', border: msg.role === 'assistant' ? '1px solid #e5e7eb' : 'none' }}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div style={{ width: '32px', height: '32px', background: '#e5e7eb', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>🤖</div>
              <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'white', border: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>Analyzing...</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: 'white', borderTop: '1px solid #e5e7eb', padding: '24px' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your documents..."
              disabled={isLoading}
              style={{ flex: 1, padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{ padding: '10px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
            >
              Send
            </button>
          </form>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>Powered by Tambo AI • Press Enter to send</p>
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
