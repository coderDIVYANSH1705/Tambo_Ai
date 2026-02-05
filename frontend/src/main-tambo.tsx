import React from 'react';
import ReactDOM from 'react-dom/client';
import { TamboProvider, useTambo } from '@tambo-ai/react';
import { z } from 'zod';
import './index.css';

// Define Tambo components for document analysis
const tamboComponents = [
  {
    name: 'DataTable',
    description: 'Displays extracted data in a structured table format with columns and rows',
    component: ({ title, columns, data }: any) => (
      <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{title}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                {columns.map((col: any) => (
                  <th key={col.key} style={{ padding: '8px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row: any, idx: number) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  {columns.map((col: any) => (
                    <td key={col.key} style={{ padding: '8px', fontSize: '14px' }}>
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    propsSchema: z.object({
      title: z.string(),
      columns: z.array(z.object({
        key: z.string(),
        label: z.string(),
      })),
      data: z.array(z.record(z.any())),
    }),
  },
  {
    name: 'Chart',
    description: 'Displays data as a visual chart with bars showing values and percentages',
    component: ({ title, data }: any) => (
      <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.map((item: any, idx: number) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px' }}>
                <span>{item.label}</span>
                <span style={{ fontWeight: '600' }}>{item.value}</span>
              </div>
              <div style={{ background: '#e5e7eb', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: '#3b82f6', height: '100%', width: `${item.percentage}%`, transition: 'width 0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    propsSchema: z.object({
      title: z.string(),
      data: z.array(z.object({
        label: z.string(),
        value: z.union([z.string(), z.number()]),
        percentage: z.number(),
      })),
    }),
  },
  {
    name: 'ComplianceChecklist',
    description: 'Shows compliance status with checkmarks and warnings for various requirements',
    component: ({ title, items, score }: any) => (
      <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600' }}>{title}</h3>
          {score && (
            <span style={{ fontSize: '20px', fontWeight: '700', color: score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444' }}>
              {score}%
            </span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: '8px', padding: '8px', background: '#f9fafb', borderRadius: '6px' }}>
              <span style={{ fontSize: '18px' }}>
                {item.status === 'pass' ? '✅' : item.status === 'fail' ? '❌' : '⚠️'}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{item.requirement}</div>
                {item.details && (
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{item.details}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    propsSchema: z.object({
      title: z.string(),
      items: z.array(z.object({
        requirement: z.string(),
        status: z.enum(['pass', 'fail', 'warning']),
        details: z.string().optional(),
      })),
      score: z.number().optional(),
    }),
  },
  {
    name: 'Timeline',
    description: 'Displays events and deadlines in a chronological timeline with priority indicators',
    component: ({ title, events }: any) => (
      <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {events.map((event: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  background: event.priority === 'high' ? '#ef4444' : event.priority === 'medium' ? '#f59e0b' : '#10b981' 
                }} />
                {idx < events.length - 1 && (
                  <div style={{ width: '2px', height: '100%', minHeight: '24px', background: '#e5e7eb' }} />
                )}
              </div>
              <div style={{ flex: 1, paddingBottom: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{event.title}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{event.date}</div>
                {event.description && (
                  <div style={{ fontSize: '13px', marginTop: '4px' }}>{event.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    propsSchema: z.object({
      title: z.string(),
      events: z.array(z.object({
        title: z.string(),
        date: z.string(),
        description: z.string().optional(),
        priority: z.enum(['high', 'medium', 'low']),
      })),
    }),
  },
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

function ChatApp() {
  const { messages, sendMessage, isLoading } = useTambo();
  const [input, setInput] = React.useState('');
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');

    // Add context about uploaded files
    const context = uploadedFiles.length > 0 
      ? `\n\nContext: User has uploaded ${uploadedFiles.length} document(s): ${uploadedFiles.map(f => f.name).join(', ')}`
      : '';

    await sendMessage(userMessage + context);
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

    // Send a message to Tambo about the uploaded files
    const fileNames = newFiles.map(f => f.name).join(', ');
    await sendMessage(`I've uploaded the following document(s): ${fileNames}. Please analyze them and let me know what insights you can provide.`);
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
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Powered by Tambo AI</p>
        </div>

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
            transition: 'all 0.2s',
            marginBottom: '24px'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
          <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#111827' }}>
            {isDragging ? 'Drop files here' : 'Upload Documents'}
          </p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
            Drag & drop or click to browse
          </p>
        </div>

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

        <div style={{ fontSize: '12px', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
          <p style={{ fontWeight: '500', marginBottom: '8px' }}>💡 Try asking:</p>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
            <li>Extract data as a table</li>
            <li>Show me a chart</li>
            <li>Check compliance</li>
            <li>Show timeline</li>
          </ul>
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Document Analysis Chat</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>AI-powered document intelligence</p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '100px auto' }}>
              <div style={{ width: '64px', height: '64px', background: '#3b82f6', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px' }}>
                🤖
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Welcome to IntelliDoc AI</h3>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>Upload documents and ask questions to get instant AI-powered insights</p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', gap: '12px', marginBottom: '16px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  {msg.role === 'assistant' && (
                    <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>🤖</div>
                  )}
                  <div style={{ maxWidth: '600px' }}>
                    {msg.role === 'user' ? (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', background: '#3b82f6', color: 'white' }}>
                        {msg.content}
                      </div>
                    ) : (
                      <div>
                        {msg.content && (
                          <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'white', border: '1px solid #e5e7eb', whiteSpace: 'pre-wrap', marginBottom: '8px' }}>
                            {msg.content}
                          </div>
                        )}
                        {msg.components && msg.components.length > 0 && (
                          <div>
                            {msg.components.map((comp: any, idx: number) => (
                              <div key={idx}>{comp}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div style={{ width: '32px', height: '32px', background: '#e5e7eb', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>🤖</div>
                  <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'white', border: '1px solid #e5e7eb' }}>
                    <span style={{ color: '#6b7280' }}>Analyzing with Tambo AI...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
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
              style={{ padding: '10px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', opacity: (isLoading || !input.trim()) ? 0.5 : 1 }}
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

function App() {
  const apiKey = import.meta.env.VITE_TAMBO_API_KEY;

  if (!apiKey) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#ef4444' }}>⚠️ API Key Missing</h1>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>
            Please add your Tambo AI API key to the .env file:
          </p>
          <code style={{ display: 'block', background: '#f9fafb', padding: '12px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px' }}>
            VITE_TAMBO_API_KEY=your_api_key_here
          </code>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Then restart the development server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <TamboProvider
      apiKey={apiKey}
      components={tamboComponents}
      systemPrompt={`You are IntelliDoc AI, an expert document analysis assistant.

Your role is to analyze documents and provide insights through interactive components.

When users ask questions:
- For data extraction: Use the DataTable component to show structured data
- For visualizations: Use the Chart component to show data with bars and percentages
- For compliance: Use the ComplianceChecklist component with pass/fail status
- For timelines: Use the Timeline component with events and priorities

Always provide clear, actionable insights and use the appropriate component to visualize the information.

Available components:
1. DataTable - For structured data with columns and rows
2. Chart - For visual data representation with bars
3. ComplianceChecklist - For compliance status with checkmarks
4. Timeline - For chronological events with priorities

Be helpful, accurate, and use components to make information easy to understand.`}
    >
      <ChatApp />
    </TamboProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
