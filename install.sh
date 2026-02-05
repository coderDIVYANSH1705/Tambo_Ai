#!/bin/bash

echo "🚀 Installing IntelliDoc AI..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..
echo ""

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads
echo ""

echo "✅ Installation complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Run 'npm run dev' to start the application"
echo "2. Open http://localhost:5173 in your browser"
echo "3. Start analyzing documents!"
echo ""
echo "📚 See SETUP_AND_RUN.md for more details"
