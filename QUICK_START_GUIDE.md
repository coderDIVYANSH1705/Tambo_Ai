# 🚀 IntelliDoc AI - Quick Start Guide

## 🎯 What You're Building

**IntelliDoc AI** - An enterprise document analysis platform with conversational AI that dynamically renders visualizations using Tambo AI's generative UI framework.

**Why It Wins:**
- ✅ Solves real $20B+ market problem
- ✅ Showcases Tambo AI's core capabilities perfectly
- ✅ Production-ready, industry-level code
- ✅ Impressive visual demo
- ✅ Multiple industry applications

---

## 📋 Prerequisites (15 minutes)

### 1. Install Required Software
```bash
# Node.js 18+
node --version  # Should be 18.0.0 or higher

# npm or yarn
npm --version

# Git
git --version
```

### 2. Get API Keys
- **Tambo AI**: Sign up at [tambo.co](https://tambo.co) → Get API key
- **OpenAI**: Sign up at [platform.openai.com](https://platform.openai.com) → Create API key

### 3. Clone/Create Project
```bash
mkdir intellidoc-ai
cd intellidoc-ai
git init
```

---

## ⚡ Fast Track Setup (2 hours)

### Step 1: Frontend Setup (30 min)

```bash
# Create React app with Vite
npm create vite@latest frontend -- --template react-ts
cd frontend

# Install dependencies
npm install @tambo-ai/react
npm install @tanstack/react-query
npm install recharts
npm install react-pdf
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui (optional but recommended)
npx shadcn-ui@latest init
```

**Create `.env` file:**
```env
VITE_TAMBO_API_KEY=your_tambo_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_API_URL=http://localhost:3000
```

**Key Files to Create:**
1. `src/lib/tambo-config.ts` - Component registry
2. `src/App.tsx` - Main app with TamboProvider
3. `src/components/generative/` - 7 generative components
4. `src/components/ChatInterface.tsx` - Chat UI

### Step 2: Backend Setup (30 min)

```bash
# Create backend
cd ..
mkdir backend
cd backend
npm init -y

# Install dependencies
npm install express cors dotenv
npm install openai pdf-parse tesseract.js
npm install multer
npm install -D typescript @types/node @types/express ts-node nodemon
npx tsc --init
```

**Create `.env` file:**
```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
UPLOAD_DIR=./uploads
```

**Key Files to Create:**
1. `src/server.ts` - Express server
2. `src/routes/documents.ts` - Document endpoints
3. `src/services/document-processor.ts` - OCR & extraction
4. `src/services/ai-service.ts` - OpenAI integration

### Step 3: MCP Server Setup (30 min)

```bash
# Create MCP server
cd ..
mkdir mcp-servers
cd mcp-servers/document-processing
npm init -y

# Install dependencies
npm install @modelcontextprotocol/sdk
npm install tesseract.js pdf-parse
npm install zod
npm install -D typescript @types/node ts-node
npx tsc --init
```

**Key Files to Create:**
1. `src/index.ts` - MCP server with tools
2. `src/tools/extract-text.ts` - Text extraction tool
3. `src/tools/ocr-scan.ts` - OCR tool

### Step 4: First Test (30 min)

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev

# Terminal 3 - MCP Server
cd mcp-servers/document-processing
npm run build && npm start
```

**Test in browser:**
1. Open http://localhost:5173
2. Type: "Hello, can you help me analyze documents?"
3. Verify Tambo responds

---

## 🎨 Build Core Components (4 hours)

### Priority 1: DataExtractionTable (1 hour)

**Why First:** Most versatile, used in multiple scenarios

```typescript
// src/components/generative/DataExtractionTable.tsx
interface DataExtractionTableProps {
  title: string;
  columns: Array<{
    key: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'currency';
  }>;
  data: Record<string, any>[];
  exportable?: boolean;
}

export default function DataExtractionTable(props: DataExtractionTableProps) {
  // Implement sortable, filterable table
  // Add export to CSV functionality
  // Style with Tailwind
}
```

**Register with Tambo:**
```typescript
// src/lib/tambo-config.ts
import { z } from 'zod';

export const components = [
  {
    name: 'DataExtractionTable',
    description: 'Displays extracted data in sortable, filterable table',
    component: DataExtractionTable,
    propsSchema: z.object({
      title: z.string(),
      columns: z.array(z.object({
        key: z.string(),
        label: z.string(),
        type: z.enum(['text', 'number', 'date', 'currency']),
      })),
      data: z.array(z.record(z.any())),
      exportable: z.boolean().optional(),
    }),
  },
];
```

### Priority 2: InsightChart (1 hour)

**Why Second:** Visual impact for demo

```typescript
// src/components/generative/InsightChart.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface InsightChartProps {
  title: string;
  type: 'bar' | 'line' | 'pie';
  data: Array<Record<string, string | number>>;
  xAxis?: string;
  yAxis?: string;
}

export default function InsightChart(props: InsightChartProps) {
  // Render appropriate chart type
  // Add interactive tooltips
  // Make responsive
}
```

### Priority 3: ComplianceChecklist (1 hour)

**Why Third:** Unique differentiator

```typescript
// src/components/generative/ComplianceChecklist.tsx
interface ComplianceChecklistProps {
  title: string;
  standard: 'GDPR' | 'HIPAA' | 'SOC2';
  items: Array<{
    requirement: string;
    status: 'pass' | 'fail' | 'warning';
    details?: string;
  }>;
  overallScore?: number;
}

export default function ComplianceChecklist(props: ComplianceChecklistProps) {
  // Render checklist with status icons
  // Show overall score
  // Expandable details
}
```

### Priority 4: TimelineView (1 hour)

**Why Fourth:** Great for contract demos

```typescript
// src/components/generative/TimelineView.tsx
interface TimelineViewProps {
  title: string;
  events: Array<{
    date: string;
    title: string;
    description?: string;
    type: 'deadline' | 'milestone' | 'renewal';
  }>;
}

export default function TimelineView(props: TimelineViewProps) {
  // Render horizontal timeline
  // Color-code by type
  // Show tooltips on hover
}
```

**Skip for MVP:** ComparisonView, RiskHeatmap, DocumentViewer (add if time permits)

---

## 🔧 Build Backend API (3 hours)

### Essential Endpoints

```typescript
// src/routes/documents.ts
import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// 1. Upload document
router.post('/upload', upload.single('file'), async (req, res) => {
  // Save file
  // Extract text (OCR if needed)
  // Store metadata
  // Return document ID
});

// 2. Get document
router.get('/:id', async (req, res) => {
  // Retrieve document metadata
  // Return document info
});

// 3. Analyze document
router.post('/:id/analyze', async (req, res) => {
  // Get document text
  // Call OpenAI for analysis
  // Return structured data
});

export default router;
```

### Document Processing Service

```typescript
// src/services/document-processor.ts
import pdf from 'pdf-parse';
import Tesseract from 'tesseract.js';
import fs from 'fs';

export class DocumentProcessor {
  async extractText(filePath: string, fileType: string): Promise<string> {
    if (fileType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } else if (fileType.startsWith('image/')) {
      const result = await Tesseract.recognize(filePath, 'eng');
      return result.data.text;
    }
    throw new Error('Unsupported file type');
  }
  
  async classifyDocument(text: string): Promise<string> {
    // Simple keyword-based classification
    const lower = text.toLowerCase();
    if (lower.includes('invoice')) return 'invoice';
    if (lower.includes('contract')) return 'contract';
    if (lower.includes('resume')) return 'resume';
    return 'unknown';
  }
}
```

---

## 🤖 Build MCP Server (2 hours)

### Document Processing MCP Server

```typescript
// mcp-servers/document-processing/src/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  { name: 'document-processing', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'extract_text',
        description: 'Extract text from PDF or image',
        inputSchema: {
          type: 'object',
          properties: {
            documentUrl: { type: 'string' },
            format: { type: 'string', enum: ['pdf', 'image'] },
          },
          required: ['documentUrl', 'format'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === 'extract_text') {
    // Implement text extraction
    const text = await extractText(args.documentUrl, args.format);
    return {
      content: [{ type: 'text', text: JSON.stringify({ text }) }],
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
```

---

## 🎬 Prepare Demo (2 hours)

### 1. Create Sample Documents (30 min)

**Generate 25 sample invoices:**
- Use online invoice generators
- Or create simple PDFs with invoice data
- Include 2-3 with intentional errors

**Create 10 sample contracts:**
- Download contract templates
- Modify with different terms
- Ensure variety in clauses

### 2. Test Demo Flow (30 min)

**Test each query:**
```
1. "Extract all invoice data into a table"
2. "Which vendors are we paying the most?"
3. "Are there any invoices with errors?"
4. "Show renewal dates on a timeline"
5. "Check for GDPR compliance"
```

**Verify:**
- [ ] Each query returns appropriate component
- [ ] Data is accurate
- [ ] Visualizations are clear
- [ ] No errors or crashes

### 3. Record Backup Demo (30 min)

```bash
# Use screen recording software
# Record full demo flow
# Save as backup.mp4
```

### 4. Create Pitch Deck (30 min)

**Use Canva, Google Slides, or PowerPoint:**
- 12-15 slides
- Follow PITCH_DECK_OUTLINE.md
- Include screenshots
- Keep it visual

---

## 📊 Demo Day Checklist

### Before You Present

**Technical:**
- [ ] All services running
- [ ] Sample documents uploaded
- [ ] Test queries work
- [ ] Backup video ready
- [ ] Internet connection tested

**Materials:**
- [ ] Laptop fully charged
- [ ] Charger packed
- [ ] HDMI/USB-C adapters
- [ ] Backup laptop (if available)
- [ ] Business cards
- [ ] One-pager handouts

**Presentation:**
- [ ] Practiced 10+ times
- [ ] Timed (under 7 minutes)
- [ ] Q&A answers prepared
- [ ] Confident and ready

---

## 🎯 Minimum Viable Demo (If Short on Time)

### Must Have (Core Demo)
1. ✅ Document upload working
2. ✅ DataExtractionTable component
3. ✅ InsightChart component
4. ✅ Basic chat interface
5. ✅ 2-3 demo queries working

### Nice to Have (If Time)
6. ⚠️ ComplianceChecklist component
7. ⚠️ TimelineView component
8. ⚠️ MCP server integration
9. ⚠️ Multiple document types
10. ⚠️ Advanced queries

### Can Skip (Add Later)
- ❌ ComparisonView
- ❌ RiskHeatmap
- ❌ DocumentViewer
- ❌ Interactable components
- ❌ User authentication
- ❌ Database integration

---

## 🚨 Troubleshooting

### Tambo Not Responding
```bash
# Check API key
echo $VITE_TAMBO_API_KEY

# Check network
curl https://api.tambo.co/health

# Check browser console for errors
```

### Components Not Rendering
```typescript
// Verify component is registered
console.log(components);

// Check props schema matches
console.log(propsSchema);

// Test component in isolation
```

### MCP Server Not Connecting
```bash
# Check server is running
ps aux | grep mcp

# Check logs
tail -f mcp-server.log

# Test with MCP inspector
npx @modelcontextprotocol/inspector
```

### OCR Not Working
```bash
# Install Tesseract
# macOS: brew install tesseract
# Ubuntu: sudo apt-get install tesseract-ocr

# Verify installation
tesseract --version
```

---

## 💡 Pro Tips

### Development
- Use hot reload for faster iteration
- Test components in isolation first
- Keep sample data in JSON files
- Use TypeScript for type safety
- Add console.logs for debugging

### Demo
- Practice on the actual presentation laptop
- Have backup for everything
- Start with most impressive feature
- Pause after key moments
- Show enthusiasm

### Presentation
- Make eye contact with judges
- Speak clearly and confidently
- Explain the "why" not just "what"
- Show real-world impact
- End with strong call to action

---

## 📚 Resources

### Documentation
- [Tambo AI Docs](https://tambo.co/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [MCP Protocol](https://modelcontextprotocol.io)
- [React Docs](https://react.dev)

### Tools
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Postman](https://www.postman.com)
- [Figma](https://www.figma.com)

### Sample Data
- [Invoice Templates](https://www.invoicesimple.com/invoice-template)
- [Contract Templates](https://www.pandadoc.com/contract-templates)

---

## 🏆 Success Checklist

### Technical Excellence
- [ ] Clean, documented code
- [ ] TypeScript with strict mode
- [ ] Error handling everywhere
- [ ] Loading states
- [ ] Responsive design

### Demo Quality
- [ ] All queries work
- [ ] Components render correctly
- [ ] No errors or crashes
- [ ] Fast performance
- [ ] Smooth flow

### Presentation
- [ ] Clear problem statement
- [ ] Impressive demo
- [ ] Real-world impact
- [ ] Technical innovation
- [ ] Confident delivery

---

## 🎉 You're Ready!

You now have everything you need to build and demo IntelliDoc AI:

✅ **Complete project plan**
✅ **Technical implementation guide**
✅ **Sample data and scenarios**
✅ **Demo script**
✅ **Pitch deck outline**
✅ **Implementation checklist**

**Time to build something amazing and win that hackathon! 🚀**

---

**Questions? Issues? Remember:**
- Check documentation first
- Test in isolation
- Have backups ready
- Stay confident
- You've got this! 💪

**Good luck! 🍀**
