# ⚡ IntelliDoc AI - Quickstart Guide

## Get Running in 2 Minutes!

---

## Prerequisites

Make sure you have:
- ✅ **Node.js 18+** installed ([Download here](https://nodejs.org/))
- ✅ **npm** (comes with Node.js)
- ✅ **Terminal/Command Prompt** access

Check your versions:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

---

## Step 1: Install Dependencies (1 minute)

Open your terminal in the project folder and run:

```bash
# Option A: Use the install script (Recommended)
./install.sh
```

**OR**

```bash
# Option B: Manual installation
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

This will install all required packages for frontend and backend.

---

## Step 2: Start the Application (30 seconds)

```bash
npm run dev
```

This single command starts:
- ✅ Frontend on http://localhost:5173
- ✅ Backend on http://localhost:3000

You'll see output like:
```
> intellidoc-ai@1.0.0 dev
> concurrently "npm run dev:frontend" "npm run dev:backend"

[0] VITE v5.0.8  ready in 500 ms
[0] ➜  Local:   http://localhost:5173/
[1] ✅ IntelliDoc API server running on http://localhost:3000
```

---

## Step 3: Open the App (10 seconds)

Open your browser and go to:

```
http://localhost:5173
```

You should see the IntelliDoc AI interface! 🎉

---

## Step 4: Test It! (1 minute)

Try these sample queries in the chat:

### Test 1: Data Table
```
Show me a table with sample invoice data including vendor, amount, and date
```
**Expected**: DataExtractionTable component renders with sample data

### Test 2: Chart
```
Create a bar chart showing vendor spending: Acme Corp $25000, TechSupply $18500, Global Services $32000
```
**Expected**: InsightChart (bar chart) renders

### Test 3: Compliance
```
Check GDPR compliance with these requirements: data retention policy, right to erasure, consent management, data encryption
```
**Expected**: ComplianceChecklist component renders

### Test 4: Timeline
```
Show a timeline of contract renewals: Contract A on March 15 2026, Contract B on April 20 2026, Contract C on June 10 2026
```
**Expected**: TimelineView component renders

---

## ✅ Success!

If all 4 queries work, your MVP is fully functional! 🎉

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@tambo-ai/react'"

**Solution:**
```bash
cd frontend
npm install @tambo-ai/react --force
cd ..
```

### Issue: "Port 5173 already in use"

**Solution:**
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Then restart
npm run dev
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Then restart
npm run dev
```

### Issue: Backend not starting

**Solution:**
```bash
cd backend
npm install
npm run dev
```

### Issue: Frontend not starting

**Solution:**
```bash
cd frontend
npm install
npm run dev
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Clean install everything
rm -rf node_modules frontend/node_modules backend/node_modules
./install.sh
```

### Issue: Tambo AI not responding

**Solution:**
1. Check `.env` file exists and has the API key
2. Refresh your browser
3. Check browser console for errors (F12)
4. Verify internet connection

---

## 🎯 What's Running?

When you run `npm run dev`, these services start:

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | React app with Tambo AI |
| Backend | http://localhost:3000 | API server for documents |

---

## 🛑 Stopping the Application

Press `Ctrl+C` in the terminal where `npm run dev` is running.

Or kill the processes:
```bash
lsof -ti:5173,3000 | xargs kill -9
```

---

## 📁 Project Structure

```
intellidoc-ai/
├── frontend/          # React + Tambo AI app
│   ├── src/
│   │   ├── App.tsx                    # Main app
│   │   ├── components/generative/     # 4 Tambo components
│   │   └── lib/tambo-config.ts        # Tambo setup
│   └── package.json
├── backend/           # Node.js API
│   ├── src/server.ts
│   └── package.json
├── .env              # API keys (configured)
└── package.json      # Root config
```

---

## 🔑 Environment Variables

The `.env` file is already configured with your Tambo AI API key:

```env
VITE_TAMBO_API_KEY=tambo_Fh6iiafGqOUY+L/JFylK++sWLkfQR7TFXeBTgWiRsfZyKdhak4WvbHBSYitgrpW46cLAKYe7ckJtLxLYg4toYbo90+LXDKfEsu9HnPbjHS0=
```

If you need to add OpenAI (optional):
```env
VITE_OPENAI_API_KEY=your_openai_key_here
```

---

## 🚀 Next Steps

Now that your app is running:

1. ✅ Test all 4 components (see Step 4 above)
2. 📖 Read **DEMO_SCRIPT.md** for presentation guide
3. 🎬 Practice your demo
4. 🏆 Win the hackathon!

---

## 💡 Quick Commands Reference

```bash
# Install everything
./install.sh

# Start development
npm run dev

# Start frontend only
cd frontend && npm run dev

# Start backend only
cd backend && npm run dev

# Build for production
cd frontend && npm run build

# Check for errors
cd frontend && npm run lint

# Kill all processes
lsof -ti:5173,3000 | xargs kill -9
```

---

## 📊 Component Overview

| Component | Use For | Test Query |
|-----------|---------|------------|
| DataExtractionTable | Structured data, invoices | "Show invoice table" |
| InsightChart | Visualizations, trends | "Show spending chart" |
| ComplianceChecklist | GDPR, HIPAA checks | "Check GDPR compliance" |
| TimelineView | Dates, deadlines | "Show renewal timeline" |

---

## 🎯 Demo-Ready Checklist

- [ ] App running on http://localhost:5173
- [ ] All 4 test queries work
- [ ] No errors in browser console (F12)
- [ ] Components render correctly
- [ ] Chat responds to messages
- [ ] UI looks professional

---

## 🆘 Need More Help?

- **Detailed Setup**: Read `SETUP_AND_RUN.md`
- **Complete Guide**: Read `FINAL_SUMMARY.md`
- **Demo Prep**: Read `DEMO_SCRIPT.md`
- **Quick Reference**: Read `QUICK_REFERENCE.md`
- **Troubleshooting**: Read `MVP_STATUS.md`

---

## ✅ You're Ready!

If you can:
- ✅ Open http://localhost:5173
- ✅ See the IntelliDoc AI interface
- ✅ Send a message and get a response
- ✅ See components render

**Then you're ready to demo and win! 🏆**

---

## 🎉 Summary

```bash
# 1. Install (1 minute)
./install.sh

# 2. Run (30 seconds)
npm run dev

# 3. Open (10 seconds)
# Go to http://localhost:5173

# 4. Test (1 minute)
# Try the 4 sample queries

# Total time: ~3 minutes
```

**That's it! You're running! 🚀**

---

*Need help? Check the troubleshooting section above or read the detailed guides.*
