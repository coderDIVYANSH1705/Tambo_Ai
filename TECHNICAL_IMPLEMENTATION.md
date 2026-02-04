# 🔧 IntelliDoc AI - Technical Implementation Guide

## Project Structure

```
intellidoc-ai/
├── frontend/                      # React + Tambo AI
│   ├── src/
│   │   ├── components/
│   │   │   ├── generative/       # Tambo generative components
│   │   │   │   ├── DocumentViewer.tsx
│   │   │   │   ├── DataExtractionTable.tsx
│   │   │   │   ├── ComplianceChecklist.tsx
│   │   │   │   ├── InsightChart.tsx
│   │   │   │   ├── ComparisonView.tsx
│   │   │   │   ├── TimelineView.tsx
│   │   │   │   └── RiskHeatmap.tsx
│   │   │   ├── interactable/     # Tambo interactable components
│   │   │   │   ├── DocumentWorkspace.tsx
│   │   │   │   ├── AnnotationLayer.tsx
│   │   │   │   ├── ExtractionForm.tsx
│   │   │   │   └── AuditLog.tsx
│   │   │   └── ui/               # Base UI components
│   │   ├── lib/
│   │   │   ├── tambo-config.ts   # Tambo configuration
│   │   │   ├── document-utils.ts
│   │   │   └── api-client.ts
│   │   ├── hooks/
│   │   │   ├── useDocumentAnalysis.ts
│   │   │   └── useDocumentUpload.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── backend/                       # API Server
│   ├── src/
│   │   ├── routes/
│   │   │   ├── documents.ts
│   │   │   ├── analysis.ts
│   │   │   └── tambo.ts
│   │   ├── services/
│   │   │   ├── document-processor.ts
│   │   │   ├── ocr-service.ts
│   │   │   ├── ai-service.ts
│   │   │   └── vector-store.ts
│   │   ├── middleware/
│   │   └── server.ts
│   └── package.json
├── mcp-servers/                   # Custom MCP Servers
│   ├── document-processing/
│   │   ├── src/
│   │   │   ├── tools/
│   │   │   │   ├── extract-text.ts
│   │   │   │   ├── ocr-scan.ts
│   │   │   │   ├── convert-format.ts
│   │   │   │   └── classify-document.ts
│   │   │   └── index.ts
│   │   └── package.json
│   ├── analysis/
│   │   ├── src/
│   │   │   ├── tools/
│   │   │   │   ├── extract-entities.ts
│   │   │   │   ├── sentiment-analysis.ts
│   │   │   │   ├── summarize.ts
│   │   │   │   └── compare-documents.ts
│   │   │   └── index.ts
│   │   └── package.json
│   └── compliance/
│       ├── src/
│       │   ├── tools/
│       │   │   ├── validate-gdpr.ts
│       │   │   ├── validate-hipaa.ts
│       │   │   └── check-requirements.ts
│       │   └── index.ts
│       └── package.json
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── USER_GUIDE.md
├── docker-compose.yml
├── .env.example
└── README.md
```

## Core Implementation Files

### 1. Frontend - Tambo Configuration

**`frontend/src/lib/tambo-config.ts`**

```typescript
import { TamboComponent } from '@tambo-ai/react';
import { z } from 'zod';

// Generative Components
import DocumentViewer from '@/components/generative/DocumentViewer';
import DataExtractionTable from '@/components/generative/DataExtractionTable';
import ComplianceChecklist from '@/components/generative/ComplianceChecklist';
import InsightChart from '@/components/generative/InsightChart';
import ComparisonView from '@/components/generative/ComparisonView';
import TimelineView from '@/components/generative/TimelineView';
import RiskHeatmap from '@/components/generative/RiskHeatmap';

// Interactable Components
import { DocumentWorkspace } from '@/components/interactable/DocumentWorkspace';
import { AnnotationLayer } from '@/components/interactable/AnnotationLayer';
import { ExtractionForm } from '@/components/interactable/ExtractionForm';
import { AuditLog } from '@/components/interactable/AuditLog';

export const generativeComponents: TamboComponent[] = [
  {
    name: 'DocumentViewer',
    description: 'Interactive document viewer with zoom, annotations, and highlighting. Use for displaying PDF or image documents.',
    component: DocumentViewer,
    propsSchema: z.object({
      documentId: z.string(),
      documentUrl: z.string().url(),
      highlights: z.array(z.object({
        page: z.number(),
        text: z.string(),
        color: z.enum(['yellow', 'green', 'red', 'blue']),
      })).optional(),
      annotations: z.array(z.object({
        page: z.number(),
        x: z.number(),
        y: z.number(),
        text: z.string(),
      })).optional(),
    }),
  },
  {
    name: 'DataExtractionTable',
    description: 'Displays extracted data in an interactive, sortable, filterable table. Perfect for invoice data, contract terms, or any structured information.',
    component: DataExtractionTable,
    propsSchema: z.object({
      title: z.string(),
      columns: z.array(z.object({
        key: z.string(),
        label: z.string(),
        type: z.enum(['text', 'number', 'date', 'currency', 'boolean']),
      })),
      data: z.array(z.record(z.any())),
      exportable: z.boolean().optional(),
      editable: z.boolean().optional(),
    }),
  },
  {
    name: 'ComplianceChecklist',
    description: 'Visual compliance verification checklist with pass/fail status. Use for regulatory compliance, document validation, or requirement checking.',
    component: ComplianceChecklist,
    propsSchema: z.object({
      title: z.string(),
      standard: z.enum(['GDPR', 'HIPAA', 'SOC2', 'ISO27001', 'Custom']),
      items: z.array(z.object({
        requirement: z.string(),
        status: z.enum(['pass', 'fail', 'warning', 'pending']),
        details: z.string().optional(),
        reference: z.string().optional(),
      })),
      overallScore: z.number().min(0).max(100).optional(),
    }),
  },
  {
    name: 'InsightChart',
    description: 'Auto-generated charts from document data. Supports bar, line, pie, area, and scatter charts.',
    component: InsightChart,
    propsSchema: z.object({
      title: z.string(),
      type: z.enum(['bar', 'line', 'pie', 'area', 'scatter']),
      data: z.array(z.record(z.union([z.string(), z.number()]))),
      xAxis: z.string().optional(),
      yAxis: z.string().optional(),
      colors: z.array(z.string()).optional(),
    }),
  },
  {
    name: 'ComparisonView',
    description: 'Side-by-side document comparison with difference highlighting. Perfect for contract comparison or version analysis.',
    component: ComparisonView,
    propsSchema: z.object({
      documents: z.array(z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
      })),
      differences: z.array(z.object({
        type: z.enum(['added', 'removed', 'modified']),
        location: z.string(),
        description: z.string(),
        severity: z.enum(['high', 'medium', 'low']).optional(),
      })),
      comparisonType: z.enum(['text', 'clause', 'term']),
    }),
  },
  {
    name: 'TimelineView',
    description: 'Visual timeline for dates, milestones, and deadlines extracted from documents.',
    component: TimelineView,
    propsSchema: z.object({
      title: z.string(),
      events: z.array(z.object({
        date: z.string(),
        title: z.string(),
        description: z.string().optional(),
        type: z.enum(['deadline', 'milestone', 'renewal', 'payment', 'other']),
        documentId: z.string().optional(),
      })),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
  },
  {
    name: 'RiskHeatmap',
    description: 'Visual risk assessment heatmap across documents or document sections.',
    component: RiskHeatmap,
    propsSchema: z.object({
      title: z.string(),
      risks: z.array(z.object({
        category: z.string(),
        level: z.enum(['critical', 'high', 'medium', 'low']),
        count: z.number(),
        documents: z.array(z.string()),
        description: z.string().optional(),
      })),
      layout: z.enum(['grid', 'matrix', 'list']).optional(),
    }),
  },
];

export const interactableComponents = {
  DocumentWorkspace,
  AnnotationLayer,
  ExtractionForm,
  AuditLog,
};

// MCP Server Configuration
export const mcpServers = [
  {
    name: 'document-processing',
    description: 'Document processing tools: OCR, text extraction, format conversion',
    url: process.env.VITE_MCP_DOCUMENT_PROCESSING_URL,
  },
  {
    name: 'analysis',
    description: 'Document analysis tools: entity extraction, summarization, comparison',
    url: process.env.VITE_MCP_ANALYSIS_URL,
  },
  {
    name: 'compliance',
    description: 'Compliance validation tools: GDPR, HIPAA, SOC2 checking',
    url: process.env.VITE_MCP_COMPLIANCE_URL,
  },
];
```

### 2. Main App Component

**`frontend/src/App.tsx`**

```typescript
import { TamboProvider, useTambo } from '@tambo-ai/react';
import { generativeComponents, mcpServers } from './lib/tambo-config';
import { DocumentUpload } from './components/DocumentUpload';
import { ChatInterface } from './components/ChatInterface';

function IntelliDocApp() {
  const { messages, sendMessage, isLoading } = useTambo();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          IntelliDoc AI
        </h1>
        <DocumentUpload />
      </aside>

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col">
        <ChatInterface 
          messages={messages}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <TamboProvider
      apiKey={import.meta.env.VITE_TAMBO_API_KEY}
      components={generativeComponents}
      mcpServers={mcpServers}
      config={{
        model: 'gpt-4-vision-preview',
        systemPrompt: `You are IntelliDoc AI, an expert document analysis assistant.
        
Your capabilities:
- Analyze documents (PDFs, images, scanned documents)
- Extract structured data (tables, forms, invoices)
- Compare multiple documents
- Check compliance (GDPR, HIPAA, SOC2)
- Identify risks and anomalies
- Generate insights and visualizations

When users ask questions:
1. Use appropriate MCP tools to process documents
2. Render the most suitable component for the answer
3. Provide clear, actionable insights
4. Suggest follow-up questions

Always prioritize accuracy and cite specific document sections.`,
      }}
    >
      <IntelliDocApp />
    </TamboProvider>
  );
}
```

### 3. Example Generative Component

**`frontend/src/components/generative/DataExtractionTable.tsx`**

```typescript
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Filter, Search } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'boolean';
}

interface DataExtractionTableProps {
  title: string;
  columns: Column[];
  data: Record<string, any>[];
  exportable?: boolean;
  editable?: boolean;
}

export default function DataExtractionTable({
  title,
  columns,
  data,
  exportable = true,
  editable = false,
}: DataExtractionTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const formatValue = (value: any, type: Column['type']) => {
    if (value === null || value === undefined) return '-';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? '✓' : '✗';
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      default:
        return value;
    }
  };

  const handleExport = () => {
    const csv = [
      columns.map(col => col.label).join(','),
      ...data.map(row =>
        columns.map(col => row[col.key]).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.csv`;
    a.click();
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          {exportable && (
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    if (sortColumn === column.key) {
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortColumn(column.key);
                      setSortDirection('asc');
                    }
                  }}
                >
                  {column.label}
                  {sortColumn === column.key && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {formatValue(row[column.key], column.type)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredData.length} of {data.length} rows
      </div>
    </div>
  );
}
```

### 4. Custom MCP Server - Document Processing

**`mcp-servers/document-processing/src/index.ts`**

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import Tesseract from 'tesseract.js';
import pdf from 'pdf-parse';
import { z } from 'zod';

// Tool Schemas
const ExtractTextSchema = z.object({
  documentUrl: z.string().url(),
  format: z.enum(['pdf', 'image']),
});

const OCRScanSchema = z.object({
  imageUrl: z.string().url(),
  language: z.string().default('eng'),
});

const ClassifyDocumentSchema = z.object({
  documentUrl: z.string().url(),
  text: z.string().optional(),
});

// Create MCP Server
const server = new Server(
  {
    name: 'document-processing',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'extract_text',
        description: 'Extract text content from PDF or image documents',
        inputSchema: {
          type: 'object',
          properties: {
            documentUrl: {
              type: 'string',
              description: 'URL of the document to process',
            },
            format: {
              type: 'string',
              enum: ['pdf', 'image'],
              description: 'Document format',
            },
          },
          required: ['documentUrl', 'format'],
        },
      },
      {
        name: 'ocr_scan',
        description: 'Perform OCR on scanned documents or images',
        inputSchema: {
          type: 'object',
          properties: {
            imageUrl: {
              type: 'string',
              description: 'URL of the image to scan',
            },
            language: {
              type: 'string',
              description: 'OCR language code (default: eng)',
              default: 'eng',
            },
          },
          required: ['imageUrl'],
        },
      },
      {
        name: 'classify_document',
        description: 'Classify document type (invoice, contract, resume, etc.)',
        inputSchema: {
          type: 'object',
          properties: {
            documentUrl: {
              type: 'string',
              description: 'URL of the document',
            },
            text: {
              type: 'string',
              description: 'Optional pre-extracted text',
            },
          },
          required: ['documentUrl'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'extract_text': {
        const { documentUrl, format } = ExtractTextSchema.parse(args);
        
        if (format === 'pdf') {
          const response = await fetch(documentUrl);
          const buffer = await response.arrayBuffer();
          const data = await pdf(Buffer.from(buffer));
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  text: data.text,
                  pages: data.numpages,
                  metadata: data.info,
                }),
              },
            ],
          };
        } else {
          const result = await Tesseract.recognize(documentUrl, 'eng');
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  text: result.data.text,
                  confidence: result.data.confidence,
                }),
              },
            ],
          };
        }
      }

      case 'ocr_scan': {
        const { imageUrl, language } = OCRScanSchema.parse(args);
        const result = await Tesseract.recognize(imageUrl, language);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                text: result.data.text,
                confidence: result.data.confidence,
                words: result.data.words.length,
              }),
            },
          ],
        };
      }

      case 'classify_document': {
        const { documentUrl, text } = ClassifyDocumentSchema.parse(args);
        
        // Simple classification based on keywords
        const content = text || '';
        const lower = content.toLowerCase();
        
        let type = 'unknown';
        let confidence = 0;
        
        if (lower.includes('invoice') || lower.includes('bill to')) {
          type = 'invoice';
          confidence = 0.85;
        } else if (lower.includes('agreement') || lower.includes('contract')) {
          type = 'contract';
          confidence = 0.9;
        } else if (lower.includes('resume') || lower.includes('curriculum vitae')) {
          type = 'resume';
          confidence = 0.88;
        } else if (lower.includes('medical') || lower.includes('patient')) {
          type = 'medical_record';
          confidence = 0.82;
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                documentType: type,
                confidence,
                documentUrl,
              }),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: error instanceof Error ? error.message : 'Unknown error',
          }),
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Document Processing MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
```

## Environment Variables

**`.env.example`**

```env
# Tambo AI
VITE_TAMBO_API_KEY=your_tambo_api_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# MCP Servers
VITE_MCP_DOCUMENT_PROCESSING_URL=http://localhost:3001
VITE_MCP_ANALYSIS_URL=http://localhost:3002
VITE_MCP_COMPLIANCE_URL=http://localhost:3003

# Backend
VITE_API_URL=http://localhost:3000

# Storage
AWS_S3_BUCKET=intellidoc-documents
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# Vector Database
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=us-east-1-aws

# OCR Services (optional)
GOOGLE_CLOUD_VISION_API_KEY=your_google_vision_key
```

## Quick Start Commands

```bash
# Install dependencies
npm install

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev

# MCP Servers
cd mcp-servers/document-processing
npm install
npm run build
npm start

# Docker (all services)
docker-compose up
```

## Key Dependencies

**Frontend:**
- @tambo-ai/react
- react, react-dom
- @tanstack/react-query
- recharts (for charts)
- react-pdf (for PDF viewing)
- lucide-react (icons)
- tailwindcss

**Backend:**
- express / fastify
- @modelcontextprotocol/sdk
- openai
- pdf-parse
- tesseract.js
- @pinecone-database/pinecone
- aws-sdk

**MCP Servers:**
- @modelcontextprotocol/sdk
- tesseract.js
- pdf-parse
- natural (NLP)
- zod

---

This implementation provides a solid foundation for building IntelliDoc AI with Tambo's generative UI capabilities!
