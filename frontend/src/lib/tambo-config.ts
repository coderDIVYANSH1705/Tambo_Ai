import { z } from 'zod';
import DataExtractionTable from '@/components/generative/DataExtractionTable';
import InsightChart from '@/components/generative/InsightChart';
import ComplianceChecklist from '@/components/generative/ComplianceChecklist';
import TimelineView from '@/components/generative/TimelineView';

export const tamboComponents = [
  {
    name: 'DataExtractionTable',
    description:
      'Displays extracted data in an interactive, sortable, filterable table. Perfect for invoice data, contract terms, or any structured information extracted from documents.',
    component: DataExtractionTable,
    propsSchema: z.object({
      title: z.string().describe('Title of the table'),
      columns: z
        .array(
          z.object({
            key: z.string().describe('Data key for this column'),
            label: z.string().describe('Display label for column header'),
            type: z
              .enum(['text', 'number', 'date', 'currency', 'boolean'])
              .describe('Data type for formatting'),
          })
        )
        .describe('Column definitions'),
      data: z
        .array(z.record(z.any()))
        .describe('Array of data rows'),
      exportable: z
        .boolean()
        .optional()
        .describe('Whether to show export button'),
      editable: z
        .boolean()
        .optional()
        .describe('Whether table is editable'),
    }),
  },
  {
    name: 'InsightChart',
    description:
      'Auto-generated charts from document data. Supports bar, line, and pie charts. Use for visualizing spending, trends, distributions, or any numerical data.',
    component: InsightChart,
    propsSchema: z.object({
      title: z.string().describe('Chart title'),
      type: z
        .enum(['bar', 'line', 'pie'])
        .describe('Type of chart to render'),
      data: z
        .array(z.record(z.union([z.string(), z.number()])))
        .describe('Chart data array'),
      xAxis: z
        .string()
        .optional()
        .describe('Key for x-axis data'),
      yAxis: z
        .string()
        .optional()
        .describe('Key for y-axis data'),
      colors: z
        .array(z.string())
        .optional()
        .describe('Custom color palette'),
    }),
  },
  {
    name: 'ComplianceChecklist',
    description:
      'Visual compliance verification checklist with pass/fail status. Use for regulatory compliance (GDPR, HIPAA, SOC2), document validation, or requirement checking.',
    component: ComplianceChecklist,
    propsSchema: z.object({
      title: z.string().describe('Checklist title'),
      standard: z
        .enum(['GDPR', 'HIPAA', 'SOC2', 'ISO27001', 'Custom'])
        .describe('Compliance standard'),
      items: z
        .array(
          z.object({
            requirement: z.string().describe('Requirement description'),
            status: z
              .enum(['pass', 'fail', 'warning', 'pending'])
              .describe('Compliance status'),
            details: z
              .string()
              .optional()
              .describe('Additional details'),
            reference: z
              .string()
              .optional()
              .describe('Reference to standard section'),
          })
        )
        .describe('Compliance items'),
      overallScore: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe('Overall compliance score percentage'),
    }),
  },
  {
    name: 'TimelineView',
    description:
      'Visual timeline for dates, milestones, and deadlines extracted from documents. Perfect for contract renewals, payment schedules, or project milestones.',
    component: TimelineView,
    propsSchema: z.object({
      title: z.string().describe('Timeline title'),
      events: z
        .array(
          z.object({
            date: z.string().describe('Event date (ISO format)'),
            title: z.string().describe('Event title'),
            description: z
              .string()
              .optional()
              .describe('Event description'),
            type: z
              .enum(['deadline', 'milestone', 'renewal', 'payment', 'other'])
              .describe('Event type'),
            documentId: z
              .string()
              .optional()
              .describe('Related document ID'),
          })
        )
        .describe('Timeline events'),
      startDate: z
        .string()
        .optional()
        .describe('Timeline start date'),
      endDate: z
        .string()
        .optional()
        .describe('Timeline end date'),
    }),
  },
];

export const systemPrompt = `You are IntelliDoc AI, an expert document analysis assistant built with advanced AI capabilities.

Your role is to help users analyze, extract insights from, and understand documents through natural conversation.

CAPABILITIES:
- Analyze documents (PDFs, images, scanned documents)
- Extract structured data (tables, forms, invoices, contracts)
- Compare multiple documents
- Check compliance (GDPR, HIPAA, SOC2, ISO27001)
- Identify risks and anomalies
- Generate insights and visualizations
- Answer questions about document content

AVAILABLE COMPONENTS:
1. DataExtractionTable - Use for displaying structured data in tables (invoices, contract terms, extracted information)
2. InsightChart - Use for visualizing numerical data (spending trends, comparisons, distributions)
3. ComplianceChecklist - Use for compliance verification (GDPR, HIPAA, SOC2 checks)
4. TimelineView - Use for date-based information (contract renewals, deadlines, milestones)

INSTRUCTIONS:
- When users ask questions, analyze their intent and choose the most appropriate component
- For data extraction queries, use DataExtractionTable
- For "show me", "visualize", "chart" queries about numbers, use InsightChart
- For compliance questions, use ComplianceChecklist
- For date/timeline questions, use TimelineView
- Always provide clear, actionable insights
- Cite specific document sections when relevant
- If you need more information, ask clarifying questions
- Be concise but thorough

EXAMPLE INTERACTIONS:
User: "Extract all invoice data"
→ Use DataExtractionTable with invoice fields

User: "Which vendors cost the most?"
→ Use InsightChart (bar chart) showing vendor spending

User: "Check GDPR compliance"
→ Use ComplianceChecklist with GDPR requirements

User: "Show contract renewal dates"
→ Use TimelineView with renewal events

Always prioritize accuracy and provide helpful, actionable information.`;
