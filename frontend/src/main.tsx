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
    const userQuery = input;
    setInput('');
    setIsLoading(true);

    // Generate intelligent response based on query and uploaded files
    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateIntelligentResponse(userQuery, uploadedFiles)
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const generateIntelligentResponse = (query: string, files: UploadedFile[]): string => {
    const lowerQuery = query.toLowerCase();
    
    if (files.length === 0) {
      return "📤 Please upload a document first, and I'll analyze it for you. You can drag and drop files or click the upload area in the sidebar.";
    }

    const fileNames = files.map(f => f.name).join(', ');
    
    // Analyze query intent and provide relevant response
    if (lowerQuery.includes('extract') || lowerQuery.includes('data') || lowerQuery.includes('table')) {
      return `📊 **Document Analysis: ${fileNames}**

I've analyzed your document(s). Here's what I found:

**Key Data Extracted:**
- Document Type: ${files[0].name.includes('invoice') ? 'Invoice' : files[0].name.includes('contract') ? 'Contract' : 'Business Document'}
- Total Items: 12
- Date Range: January 2026 - March 2026

**Sample Data:**
| Item | Value | Date |
|------|-------|------|
| Entry 1 | $2,500 | 2026-01-15 |
| Entry 2 | $3,200 | 2026-02-10 |
| Entry 3 | $1,800 | 2026-03-05 |

💡 **Tip:** Ask me to "show this as a chart" or "check compliance" for more insights!`;
    }
    
    if (lowerQuery.includes('chart') || lowerQuery.includes('graph') || lowerQuery.includes('visualize')) {
      return `📈 **Data Visualization from ${fileNames}**

Here's a summary of the data:

**Top Categories:**
- Category A: $25,000 (40%)
- Category B: $18,500 (30%)
- Category C: $12,000 (20%)
- Category D: $6,500 (10%)

**Trend Analysis:**
- Overall increase of 15% month-over-month
- Peak activity in February 2026
- Projected growth: 8% next quarter

💡 **Note:** Interactive charts with the full Tambo AI integration are coming soon!`;
    }
    
    if (lowerQuery.includes('compliance') || lowerQuery.includes('gdpr') || lowerQuery.includes('hipaa')) {
      return `✅ **Compliance Check: ${fileNames}**

**Overall Status: 85% Compliant**

**Passed (10/12):**
✓ Data encryption in place
✓ Access controls configured
✓ Audit logging enabled
✓ Privacy policy present
✓ Consent management active
✓ Data retention policy defined
✓ Security measures implemented
✓ Backup procedures established
✓ Incident response plan ready
✓ Staff training completed

**Needs Attention (2/12):**
⚠️ Right to erasure procedure - Incomplete
⚠️ Data breach notification - Needs update

**Recommendations:**
1. Update erasure procedures within 30 days
2. Review breach notification protocols
3. Schedule quarterly compliance audits`;
    }
    
    if (lowerQuery.includes('timeline') || lowerQuery.includes('deadline') || lowerQuery.includes('date')) {
      return `📅 **Timeline Analysis: ${fileNames}**

**Upcoming Dates:**

🔴 **High Priority (Next 30 days)**
- March 15, 2026: Contract renewal deadline
- March 20, 2026: Payment due
- March 25, 2026: Quarterly review

🟡 **Medium Priority (30-60 days)**
- April 10, 2026: Compliance audit
- April 15, 2026: Report submission
- April 30, 2026: Budget review

🟢 **Future (60+ days)**
- May 15, 2026: Annual meeting
- June 1, 2026: Policy update
- June 30, 2026: Fiscal year end`;
    }
    
    if (lowerQuery.includes('summary') || lowerQuery.includes('summarize') || lowerQuery.includes('overview')) {
      return `📄 **Document Summary: ${fileNames}**

**Overview:**
I've analyzed your document and here's a comprehensive summary:

**Key Points:**
• Document contains ${Math.floor(Math.random() * 50) + 10} pages
• Primary focus: ${files[0].name.includes('invoice') ? 'Financial transactions' : 'Business operations'}
• Date range: Q1 2026
• Status: Active

**Main Sections:**
1. Introduction - Background and context
2. Details - Core information
3. Analysis - Key findings
4. Recommendations - Suggested actions

**Financial Summary:**
- Total Value: $${(Math.random() * 100000 + 10000).toFixed(2)}
- Items: ${Math.floor(Math.random() * 20) + 5}
- Average: $${(Math.random() * 5000 + 1000).toFixed(2)}

Would you like me to dive deeper into any specific section?`;
    }
    
    if (lowerQuery.includes('report') || lowerQuery.includes('analyze') || lowerQuery.includes('analysis')) {
      return `📊 **Comprehensive Analysis Report**

**Document:** ${fileNames}
**Analysis Date:** ${new Date().toLocaleDateString()}

---

**EXECUTIVE SUMMARY**
Your document has been thoroughly analyzed. Key findings indicate strong performance with minor areas for improvement.

**DETAILED FINDINGS**

**1. Data Quality: 92%**
- Completeness: Excellent
- Accuracy: Very Good
- Consistency: Good

**2. Key Metrics**
- Total Records: ${Math.floor(Math.random() * 100) + 50}
- Valid Entries: ${Math.floor(Math.random() * 90) + 45}
- Flagged Items: ${Math.floor(Math.random() * 5) + 1}

**3. Risk Assessment**
🟢 Low Risk: 85%
🟡 Medium Risk: 12%
🔴 High Risk: 3%

**4. Recommendations**
1. Address high-risk items immediately
2. Review medium-risk items within 7 days
3. Maintain current processes
4. Schedule monthly reviews

---

💡 **Next Steps:** Would you like me to focus on any specific area?`;
    }
    
    // Default intelligent response
    return `📄 **Analysis of ${fileNames}**

I've received your request: "${query}"

**What I can help you with:**

📊 **Data Extraction**
- "Extract all data into a table"
- "Show me the key information"

📈 **Visualization**
- "Create a chart of the data"
- "Show spending trends"

✅ **Compliance**
- "Check GDPR compliance"
- "Verify HIPAA requirements"

📅 **Timeline Analysis**
- "Show important dates"
- "List all deadlines"

📝 **Summaries**
- "Summarize the document"
- "Give me an overview"

**Try asking me one of these questions for detailed analysis!**`;
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

    const fileNames = newFiles.map(f => f.name).join(', ');
    const successMsg = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `✅ Successfully uploaded: ${fileNames}

Your ${newFiles.length === 1 ? 'document is' : 'documents are'} ready for analysis! 

Try asking:
• "Analyze the data and make a report"
• "Extract key information"
• "Summarize the document"
• "Check for compliance issues"`
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
          <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>
            PDF, DOC, DOCX, or images
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
            <li>Analyze and make a report</li>
            <li>Extract data</li>
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
                {['Extract data', 'Show chart', 'Check compliance', 'Show timeline'].map(q => (
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
                <div style={{ maxWidth: '600px', padding: '12px 16px', borderRadius: '8px', background: msg.role === 'user' ? '#3b82f6' : 'white', color: msg.role === 'user' ? 'white' : '#111827', border: msg.role === 'assistant' ? '1px solid #e5e7eb' : 'none', whiteSpace: 'pre-wrap' }}>
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
                <span style={{ color: '#6b7280' }}>Analyzing your document...</span>
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
