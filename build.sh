#!/bin/bash
# Build and package the Pineapple Pager Dev extension
# Requires: Node.js 18+, npm

set -e

echo "🍍 Pineapple Pager Dev — Build Script"
echo "======================================"

# Check prerequisites
if ! command -v node &>/dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org"
    exit 1
fi

if ! command -v npm &>/dev/null; then
    echo "❌ npm not found."
    exit 1
fi

NODE_VER=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VER" -lt 18 ]; then
    echo "❌ Node.js 18+ required (found v$(node -v))"
    exit 1
fi

echo "✅ Node $(node -v), npm $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Generate icon if missing
if [ ! -f resources/icon.png ]; then
    echo "🎨 Generating icon..."
    node -e "
const fs = require('fs');
// Create a simple 128x128 PNG icon (1x1 green pixel scaled)
// For production, replace with a proper icon
const { createCanvas } = require('canvas');
" 2>/dev/null || echo "   (icon.png placeholder — replace with real icon for marketplace)"
    # Create a minimal placeholder
    touch resources/icon.png
fi

# Compile TypeScript
echo ""
echo "🔨 Compiling TypeScript..."
npx tsc -p ./

# Package VSIX
echo ""
echo "📦 Packaging VSIX..."
npx vsce package --no-dependencies

echo ""
echo "✅ Build complete!"
echo ""
echo "Install with:"
echo "  code --install-extension pineapple-pager-dev-*.vsix"
echo ""
echo "Or in VS Code:"
echo "  Ctrl+Shift+P → 'Install from VSIX' → select the .vsix file"
