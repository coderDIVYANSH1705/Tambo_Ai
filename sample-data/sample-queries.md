# Sample Queries for Testing IntelliDoc AI

## Invoice Analysis

### Query 1: Extract Invoice Data
```
Extract all invoice data into a table
```

**Expected Response**: DataExtractionTable with columns:
- Invoice Number
- Vendor
- Date
- Amount
- Tax
- Total
- Status

### Query 2: Vendor Spending Analysis
```
Which vendors are we paying the most? Show me a chart.
```

**Expected Response**: InsightChart (bar chart) showing vendor spending

### Query 3: Find Errors
```
Are there any invoices with tax calculation errors?
```

**Expected Response**: DataExtractionTable highlighting invoices with errors

## Contract Analysis

### Query 4: Auto-Renewal Clauses
```
Which contracts have auto-renewal clauses?
```

**Expected Response**: DataExtractionTable with filtered contracts

### Query 5: Renewal Timeline
```
Show all contract renewal dates on a timeline
```

**Expected Response**: TimelineView with renewal events

### Query 6: Risk Assessment
```
What are the biggest risks across all contracts?
```

**Expected Response**: Text analysis with risk summary

## Compliance Checking

### Query 7: GDPR Compliance
```
Check this document for GDPR compliance
```

**Expected Response**: ComplianceChecklist with GDPR requirements

### Query 8: HIPAA Compliance
```
Verify HIPAA compliance for these medical records
```

**Expected Response**: ComplianceChecklist with HIPAA requirements

## Complex Queries

### Query 9: Multi-Part Analysis
```
Prepare for Q1 vendor review: show spending by vendor, contracts expiring in Q1, and any compliance issues
```

**Expected Response**: Multiple components:
- InsightChart (spending)
- TimelineView (expirations)
- ComplianceChecklist (issues)

### Query 10: Comparison
```
Compare the payment terms across all vendor contracts
```

**Expected Response**: DataExtractionTable with payment terms comparison
