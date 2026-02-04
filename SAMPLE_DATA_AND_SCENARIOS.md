# 📊 IntelliDoc AI - Sample Data & Testing Scenarios

## Sample Documents for Demo

### 1. Invoice Samples (25 documents)

**Invoice Types to Include:**
- Standard invoices (PDF)
- Scanned invoices (images)
- International invoices (different currencies)
- Invoices with errors (tax miscalculations)
- Invoices with discounts
- Recurring invoices
- One-time invoices

**Sample Invoice Data Structure:**
```json
{
  "invoiceNumber": "INV-2025-001",
  "vendor": "Acme Corp",
  "date": "2025-12-15",
  "dueDate": "2026-01-15",
  "amount": 5420.00,
  "tax": 542.00,
  "total": 5962.00,
  "currency": "USD",
  "items": [
    {
      "description": "Software License",
      "quantity": 10,
      "unitPrice": 500.00,
      "total": 5000.00
    },
    {
      "description": "Support Services",
      "quantity": 1,
      "unitPrice": 420.00,
      "total": 420.00
    }
  ],
  "paymentTerms": "Net 30",
  "status": "unpaid"
}
```

**Vendors to Use:**
- Acme Corp (5 invoices, $25,000 total)
- TechSupply Inc (4 invoices, $18,500 total)
- Global Services Ltd (3 invoices, $32,000 total)
- DataSystems Pro (4 invoices, $15,200 total)
- CloudHost Solutions (3 invoices, $8,900 total)
- Office Supplies Co (2 invoices, $3,400 total)
- Marketing Agency (2 invoices, $12,000 total)
- Legal Services (2 invoices, $28,000 total)

**Intentional Errors:**
- Invoice #7: Tax calculated at 8% instead of 10%
- Invoice #12: Duplicate line item
- Invoice #19: Total doesn't match sum of items

### 2. Contract Samples (10 documents)

**Contract Types:**
- Vendor Service Agreement (3)
- Software License Agreement (2)
- Consulting Agreement (2)
- NDA (1)
- Employment Agreement (1)
- Lease Agreement (1)

**Key Clauses to Include:**
- Auto-renewal clauses (6 contracts)
- Termination clauses (all)
- Payment terms (all)
- Liability caps (8 contracts)
- Data privacy clauses (7 contracts)
- Intellectual property (5 contracts)

**Sample Contract Data:**
```json
{
  "contractId": "CONT-2025-001",
  "title": "Software License Agreement",
  "parties": ["Your Company Inc", "Acme Software Corp"],
  "effectiveDate": "2025-01-01",
  "expirationDate": "2026-12-31",
  "value": 120000,
  "paymentTerms": "Annual, Net 30",
  "autoRenewal": true,
  "renewalNotice": "90 days",
  "terminationClause": "Either party may terminate with 90 days written notice",
  "liabilityCap": 500000,
  "governingLaw": "State of California",
  "keyTerms": [
    "Unlimited user licenses",
    "24/7 support included",
    "Annual price increase capped at 5%",
    "Data stored in US only"
  ],
  "risks": [
    {
      "type": "Auto-renewal",
      "severity": "medium",
      "description": "Contract auto-renews unless notice given 90 days prior"
    },
    {
      "type": "Liability",
      "severity": "high",
      "description": "Liability cap of $500K may be insufficient"
    }
  ]
}
```

**Renewal Timeline:**
- 3 contracts expiring in next 60 days
- 2 contracts expiring in 60-90 days
- 3 contracts expiring in 90-180 days
- 2 contracts expiring in 180+ days

### 3. Medical Records (5 documents)

**Document Types:**
- Patient intake form
- Lab results
- Prescription history
- Doctor's notes
- Insurance claim

**Sample Medical Record:**
```json
{
  "patientId": "P-12345",
  "patientName": "[PATIENT NAME]",
  "dateOfBirth": "1985-06-15",
  "visitDate": "2025-12-01",
  "chiefComplaint": "Annual checkup",
  "medications": [
    {
      "name": "Lisinopril",
      "dosage": "10mg",
      "frequency": "Once daily",
      "startDate": "2024-03-15"
    },
    {
      "name": "Metformin",
      "dosage": "500mg",
      "frequency": "Twice daily",
      "startDate": "2024-03-15"
    }
  ],
  "allergies": ["Penicillin"],
  "labResults": {
    "bloodPressure": "128/82",
    "cholesterol": 195,
    "glucose": 102
  },
  "diagnosis": "Hypertension, Type 2 Diabetes - controlled",
  "followUp": "6 months"
}
```

**HIPAA Compliance Items:**
- Patient consent forms
- Privacy notices
- Data encryption requirements
- Access logs
- Breach notification procedures

### 4. Resumes (8 documents)

**Candidate Profiles:**
- Senior Software Engineer (Python, ML)
- Full Stack Developer (React, Node.js)
- Data Scientist (Python, R, SQL)
- DevOps Engineer (AWS, Kubernetes)
- Product Manager (5+ years)
- UX Designer (Figma, user research)
- Marketing Manager (B2B SaaS)
- Sales Executive (enterprise sales)

**Sample Resume Data:**
```json
{
  "candidateId": "C-001",
  "name": "[CANDIDATE NAME]",
  "email": "[EMAIL]",
  "phone": "[PHONE]",
  "location": "San Francisco, CA",
  "summary": "Senior Software Engineer with 8+ years experience in Python, ML, and distributed systems",
  "experience": [
    {
      "company": "Tech Corp",
      "title": "Senior Software Engineer",
      "duration": "2020-Present",
      "responsibilities": [
        "Led team of 5 engineers building ML pipeline",
        "Reduced model training time by 60%",
        "Implemented CI/CD for ML models"
      ]
    }
  ],
  "skills": ["Python", "TensorFlow", "AWS", "Docker", "Kubernetes"],
  "education": [
    {
      "degree": "MS Computer Science",
      "school": "Stanford University",
      "year": 2016
    }
  ],
  "matchScore": 95
}
```

### 5. Real Estate Documents (5 documents)

**Document Types:**
- Lease agreement
- Property inspection report
- Title search results
- Purchase agreement
- HOA documents

**Sample Lease Agreement:**
```json
{
  "propertyAddress": "123 Main St, Apt 4B, San Francisco, CA",
  "landlord": "Property Management Co",
  "tenant": "[TENANT NAME]",
  "leaseStart": "2026-02-01",
  "leaseEnd": "2027-01-31",
  "monthlyRent": 3500,
  "securityDeposit": 7000,
  "petDeposit": 500,
  "utilities": "Tenant responsible for electricity and internet",
  "parking": "1 space included",
  "terms": [
    "No smoking",
    "Pets allowed with deposit",
    "30-day notice required for termination",
    "Rent due on 1st of month"
  ]
}
```

---

## Demo Scenarios

### Scenario 1: Invoice Processing & Analysis

**Setup:**
- Upload 25 invoices (mix of PDF and images)

**Demo Flow:**

**Query 1:**
```
"Extract all invoice data into a table"
```

**Expected Response:**
- AI renders DataExtractionTable
- Shows all 25 invoices with columns: Invoice #, Vendor, Date, Amount, Tax, Total, Status
- Table is sortable and filterable

**Query 2:**
```
"Which vendors are we paying the most?"
```

**Expected Response:**
- AI renders InsightChart (bar chart)
- Shows top 10 vendors by total spending
- Interactive tooltips with exact amounts

**Query 3:**
```
"Are there any invoices with tax calculation errors?"
```

**Expected Response:**
- AI identifies 3 invoices with errors
- Renders DataExtractionTable with highlighted rows
- Provides explanation for each error

**Query 4:**
```
"Show me payment due dates on a timeline"
```

**Expected Response:**
- AI renders TimelineView
- Shows all due dates chronologically
- Highlights overdue invoices in red

**Query 5:**
```
"Export all invoice data to CSV"
```

**Expected Response:**
- AI triggers export functionality
- Downloads CSV file with all data

---

### Scenario 2: Contract Analysis & Risk Assessment

**Setup:**
- Upload 10 vendor contracts

**Demo Flow:**

**Query 1:**
```
"Which contracts have auto-renewal clauses?"
```

**Expected Response:**
- AI renders DataExtractionTable
- Shows 6 contracts with auto-renewal
- Includes renewal terms and notice periods

**Query 2:**
```
"Show all contract renewal dates on a timeline"
```

**Expected Response:**
- AI renders TimelineView
- Shows 10 contracts with expiration dates
- Color-coded by urgency (red < 60 days, yellow < 90 days)

**Query 3:**
```
"Compare the termination clauses in Contract A and Contract B"
```

**Expected Response:**
- AI renders ComparisonView
- Side-by-side comparison of termination clauses
- Highlights key differences

**Query 4:**
```
"What are the biggest risks across all contracts?"
```

**Expected Response:**
- AI renders RiskHeatmap
- Shows risk categories: Auto-renewal, Liability, Data Privacy, Payment Terms
- Color-coded by severity (red = high, yellow = medium, green = low)

**Query 5:**
```
"Prepare a summary for our Q1 vendor review meeting"
```

**Expected Response:**
- AI renders multiple components:
  - InsightChart: Total spending by vendor
  - TimelineView: Contracts expiring in Q1
  - RiskHeatmap: Risk assessment
  - Summary card with action items

---

### Scenario 3: Compliance Checking

**Setup:**
- Upload privacy policy document

**Demo Flow:**

**Query 1:**
```
"Check this document for GDPR compliance"
```

**Expected Response:**
- AI renders ComplianceChecklist
- Shows 15 GDPR requirements
- 12 pass, 2 fail, 1 warning
- Overall compliance score: 80%

**Query 2:**
```
"What are we missing for full GDPR compliance?"
```

**Expected Response:**
- AI lists missing items:
  1. Data retention policy
  2. Right to erasure procedure
- Provides recommendations for each

**Query 3:**
```
"Check all contracts for data privacy clauses"
```

**Expected Response:**
- AI analyzes all 10 contracts
- Renders DataExtractionTable showing which have data privacy clauses
- Highlights 3 contracts missing clauses

---

### Scenario 4: Medical Records Analysis

**Setup:**
- Upload patient medical records

**Demo Flow:**

**Query 1:**
```
"Summarize the patient's medication history"
```

**Expected Response:**
- AI renders TimelineView
- Shows all medications with start dates
- Includes dosages and frequencies

**Query 2:**
```
"Are there any potential drug interactions?"
```

**Expected Response:**
- AI analyzes medications
- Renders RiskHeatmap if interactions found
- Provides detailed explanation

**Query 3:**
```
"Check this record for HIPAA compliance"
```

**Expected Response:**
- AI renders ComplianceChecklist
- Shows HIPAA requirements
- Identifies any missing elements

---

### Scenario 5: Resume Screening

**Setup:**
- Upload 8 resumes

**Demo Flow:**

**Query 1:**
```
"Find candidates with 5+ years Python experience and ML background"
```

**Expected Response:**
- AI renders DataExtractionTable
- Shows 3 matching candidates
- Includes match score and key qualifications

**Query 2:**
```
"Compare the top 3 candidates"
```

**Expected Response:**
- AI renders ComparisonView
- Side-by-side comparison of experience, skills, education
- Highlights strengths of each

**Query 3:**
```
"Show me a skills breakdown across all candidates"
```

**Expected Response:**
- AI renders InsightChart (bar chart)
- Shows most common skills
- Helps identify skill gaps

---

## Testing Checklist

### Functional Testing

**Document Upload:**
- [ ] Upload single PDF
- [ ] Upload multiple PDFs
- [ ] Upload images (JPG, PNG)
- [ ] Upload scanned documents
- [ ] Upload DOCX files
- [ ] Test file size limits
- [ ] Test invalid file types
- [ ] Test corrupted files

**Text Extraction:**
- [ ] Extract from clean PDF
- [ ] Extract from scanned PDF
- [ ] Extract from image
- [ ] Extract from multi-page document
- [ ] Extract tables
- [ ] Extract forms
- [ ] Handle non-English text
- [ ] Handle handwritten text

**Component Rendering:**
- [ ] DataExtractionTable renders correctly
- [ ] InsightChart renders all chart types
- [ ] ComplianceChecklist shows all states
- [ ] ComparisonView handles 2+ documents
- [ ] TimelineView displays dates correctly
- [ ] RiskHeatmap color-codes properly
- [ ] DocumentViewer displays PDFs

**Query Handling:**
- [ ] Simple queries work
- [ ] Complex queries work
- [ ] Follow-up questions work
- [ ] Context is maintained
- [ ] Error messages are clear
- [ ] Loading states show

### Edge Cases

**Documents:**
- [ ] Empty document
- [ ] Very large document (1000+ pages)
- [ ] Document with no text
- [ ] Document with only images
- [ ] Password-protected PDF
- [ ] Corrupted file
- [ ] Non-standard format

**Queries:**
- [ ] Ambiguous query
- [ ] Query with no results
- [ ] Query requiring multiple tools
- [ ] Query in different language
- [ ] Very long query
- [ ] Query with typos

**Data:**
- [ ] Missing data fields
- [ ] Invalid dates
- [ ] Negative numbers
- [ ] Very large numbers
- [ ] Special characters
- [ ] Unicode characters

### Performance Testing

- [ ] Upload 100 documents
- [ ] Process 100-page document
- [ ] Render table with 1000 rows
- [ ] Handle 10 concurrent users
- [ ] Test on slow network
- [ ] Test on mobile device

### Security Testing

- [ ] SQL injection attempts
- [ ] XSS attempts
- [ ] File upload exploits
- [ ] API rate limiting
- [ ] Authentication bypass
- [ ] Data exposure

---

## Sample Queries for Testing

### Basic Queries
```
"What documents have been uploaded?"
"Show me all invoices"
"Extract data from this document"
"Summarize this contract"
"What is this document about?"
```

### Data Extraction
```
"Extract all invoice numbers and amounts"
"Find all dates mentioned in these contracts"
"List all vendors and their contact information"
"Extract the payment terms from all contracts"
"Get all medication names and dosages"
```

### Analysis
```
"Which vendor has the highest total spending?"
"What are the most common contract terms?"
"Are there any duplicate invoices?"
"Show me spending trends over time"
"What skills are most common across resumes?"
```

### Comparison
```
"Compare Contract A and Contract B"
"What are the differences between these invoices?"
"Which candidate is most qualified?"
"Compare payment terms across all contracts"
"Show differences between old and new policy"
```

### Compliance
```
"Check for GDPR compliance"
"Verify HIPAA requirements"
"Are all contracts compliant with our standards?"
"Find any missing required clauses"
"Check for data privacy issues"
```

### Visualization
```
"Show spending by vendor as a chart"
"Display renewal dates on a timeline"
"Create a risk heatmap"
"Show a comparison table"
"Visualize the data"
```

### Complex Queries
```
"Find all contracts expiring in Q1, check for auto-renewal, and show risks"
"Extract invoice data, identify errors, and calculate total spending by vendor"
"Analyze all resumes, rank by qualification, and compare top 3"
"Check all documents for compliance issues and create an action plan"
"Compare these 5 contracts and identify the best terms"
```

---

## Mock Data Generation Scripts

### Generate Sample Invoices (JavaScript)

```javascript
const generateInvoices = (count) => {
  const vendors = [
    'Acme Corp', 'TechSupply Inc', 'Global Services Ltd',
    'DataSystems Pro', 'CloudHost Solutions', 'Office Supplies Co',
    'Marketing Agency', 'Legal Services'
  ];
  
  const invoices = [];
  
  for (let i = 1; i <= count; i++) {
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];
    const amount = Math.floor(Math.random() * 50000) + 1000;
    const tax = amount * 0.1;
    
    // Introduce errors in some invoices
    const hasError = i % 8 === 0;
    const actualTax = hasError ? amount * 0.08 : tax;
    
    invoices.push({
      invoiceNumber: `INV-2025-${String(i).padStart(3, '0')}`,
      vendor,
      date: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      dueDate: new Date(2026, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      amount,
      tax: actualTax,
      total: amount + actualTax,
      currency: 'USD',
      status: Math.random() > 0.3 ? 'unpaid' : 'paid',
      hasError
    });
  }
  
  return invoices;
};

console.log(JSON.stringify(generateInvoices(25), null, 2));
```

---

## Success Criteria

### Demo Success
- [ ] All queries return appropriate responses
- [ ] All components render correctly
- [ ] No errors or crashes
- [ ] Performance is acceptable
- [ ] Demo flows smoothly

### User Experience
- [ ] Interface is intuitive
- [ ] Loading states are clear
- [ ] Error messages are helpful
- [ ] Results are accurate
- [ ] Visualizations are clear

### Technical Excellence
- [ ] Code is clean and documented
- [ ] Architecture is scalable
- [ ] Security best practices followed
- [ ] Performance is optimized
- [ ] Tests pass

---

**With this sample data and testing scenarios, you're ready to build and demo a winning project! 🚀**
