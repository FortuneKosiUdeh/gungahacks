#!/bin/bash

# GungaHacks Deployment Checklist
# Run this script to verify everything is ready for deployment

echo "================================"
echo "GungaHacks Deployment Checklist"
echo "================================"
echo ""

# Check Node version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "  Node: $NODE_VERSION"
echo ""

# Check npm version
echo "✓ Checking npm version..."
NPM_VERSION=$(npm -v)
echo "  npm: $NPM_VERSION"
echo ""

# Check if node_modules exists
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✓ node_modules found"
else
    echo "  ✗ node_modules not found - run 'npm install'"
    exit 1
fi
echo ""

# Check package.json
echo "✓ Checking package.json..."
if [ -f "package.json" ]; then
    echo "  ✓ package.json found"
else
    echo "  ✗ package.json not found"
    exit 1
fi
echo ""

# Check build script
echo "✓ Checking build configuration..."
if grep -q "\"build\":" package.json; then
    echo "  ✓ Build script configured"
else
    echo "  ✗ Build script not found"
    exit 1
fi
echo ""

# Test build
echo "✓ Testing production build..."
if npm run build > /dev/null 2>&1; then
    echo "  ✓ Build successful"
    if [ -d "dist" ]; then
        SIZE=$(du -sh dist | awk '{print $1}')
        echo "  ✓ Output directory: dist ($SIZE)"
    fi
else
    echo "  ✗ Build failed"
    exit 1
fi
echo ""

# Check git
echo "✓ Checking Git status..."
if [ -d ".git" ]; then
    echo "  ✓ Git repository initialized"
    COMMITS=$(git rev-list --count HEAD 2>/dev/null || echo "0")
    echo "  ✓ Commits: $COMMITS"
else
    echo "  ⚠ Git not initialized - run 'git init' before pushing"
fi
echo ""

# Check key files
echo "✓ Checking required files..."
FILES=("vite.config.js" "tailwind.config.js" "package.json" "index.html" "src/main.jsx" "src/App.jsx" "src/pages/home.jsx" ".gitignore" "README.md" "DEPLOYMENT.md")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file missing"
    fi
done
echo ""

# Check Vercel config
echo "✓ Checking Vercel configuration..."
if [ -f "vercel.json" ]; then
    echo "  ✓ vercel.json found"
else
    echo "  ⚠ vercel.json not found (optional)"
fi
echo ""

echo "================================"
echo "Checklist Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Verify the site locally: npm run dev"
echo "2. Test production build: npm run preview"
echo "3. Push to GitHub: git push -u origin main"
echo "4. Deploy to Vercel (see DEPLOYMENT.md for details)"
echo ""
