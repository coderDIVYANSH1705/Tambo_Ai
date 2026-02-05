# 🎯 IntelliDoc AI - Quick Reference Card

## ⚡ Installation (30 seconds)

```bash
./install.sh
# OR
npm install && cd frontend && npm install && cd .. && cd backend && npm install && cd ..
```

## 🚀 Run (10 seconds)

```bash
npm run dev
```

Open: **http://localhost:5173**

## 🧪 Test Queries

### DataExtractionTable
```
Show me a table with 10 sample invoices including vendor, amount, date, and status
```

### InsightChart
```
Create a bar chart of vendor spending: Acme Corp $25000, TechSupply $18500, Global Services $32000, DataSystems $15200
```

### ComplianceChecklist
```
Check GDPR compliance: data retention policy, right to erasure, consent management, data encryption, breach notification
```

### TimelineView
```
Show contract renewal timeline: Contract A (March 15, 2026), Contract B (April 20, 2026), Contract C (June 10, 2026)
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `frontend/src/App.tsx` | Main app with Tambo |
| `frontend/src/lib/tambo-config.ts` | Component registry |
| `frontend/src/components/generative/` | 4 components |
| `backend/src/server.ts` | API server |
| `.env` | API keys (configured) |

## 🎨 Components

| Component | Use For |
|-----------|---------|
| DataExtractionTable | Structured data, invoices, contracts |
| InsightChart | Visualizations, trends, comparisons |
| ComplianceChecklist | GDPR, HIPAA, SOC2 checks |
| TimelineView | Dates, deadlines, milestones |

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | `lsof -ti:5173 \| xargs kill -9` |
| Module not found | `cd frontend && npm install` |
| Tambo not responding | Check `.env` file, refresh browser |
| Backend error | `cd backend && npm install && npm run dev` |

## 📊 Ports

- Frontend: **5173**
- Backend: **3000**

## 🎯 Demo Flow (5 min)

1. **Open app** → Welcome screen
2. **Query 1** → "Show invoice table" → DataExtractionTable
3. **Query 2** → "Show vendor spending chart" → InsightChart
4. **Query 3** → "Check GDPR compliance" → ComplianceChecklist
5. **Query 4** → "Show renewal timeline" → TimelineView
6. **Wow moment** → All components working perfectly!

## 🏆 Win Checklist

- [ ] App running smoothly
- [ ] All 4 components tested
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Demo script practiced
- [ ] Backup video ready
- [ ] Confident and ready!

## 📞 Emergency Commands

```bash
# Kill all processes
lsof -ti:5173,3000 | xargs kill -9

# Fresh install
rm -rf node_modules frontend/node_modules backend/node_modules
./install.sh

# Check status
curl http://localhost:3000/api/health
```

## 💡 Pro Tips

- Use sample queries from `sample-data/sample-queries.md`
- Check browser console for debugging
- Components render based on AI understanding
- Tambo chooses the right component automatically
- System prompt guides AI behavior

## 🎬 Presentation Tips

- Start with the problem ($20B market)
- Show the solution (conversational UI)
- Demo each component (2 min)
- Highlight Tambo integration
- Show technical architecture
- End with business impact

## ✅ Success Indicators

- ✅ Chat responds instantly
- ✅ Components render beautifully
- ✅ No errors in console
- ✅ Smooth animations
- ✅ Professional appearance
- ✅ Fast performance

---

**You're ready to win! 🚀**

Print this card and keep it handy during the hackathon!
