@echo off
REM Build and package the Pineapple Pager Dev extension
REM Requires: Node.js 18+, npm

echo 🍍 Pineapple Pager Dev — Build Script
echo ======================================

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Install from https://nodejs.org
    exit /b 1
)

echo ✅ Node.js found

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🔨 Compiling TypeScript...
call npx tsc -p .

echo.
echo 📦 Packaging VSIX...
call npx vsce package --no-dependencies

echo.
echo ✅ Build complete!
echo.
echo Install with:
echo   code --install-extension pineapple-pager-dev-1.0.0.vsix
echo.
echo Or in VS Code: Ctrl+Shift+P → "Install from VSIX"
pause
