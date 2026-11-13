@echo off
setlocal
cd /d "%~dp0"
echo.
echo =====================================================
echo      Married Nepal - Original Elegant Design V8 · Admin Only
echo =====================================================
echo.
where node >nul 2>&1
if errorlevel 1 (
 echo Node.js is missing. Install Node.js 22 or newer.
 pause
 exit /b 1
)
where npm >nul 2>&1
if errorlevel 1 (
 echo npm is missing. Repair the Node.js installation.
 pause
 exit /b 1
)
if not exist ".env.local" (
 if exist ".env.local.example" copy /Y ".env.local.example" ".env.local" >nul
 echo Firebase Web App configuration copied. Review .env.local before using.
)
if not exist "node_modules\next\dist\bin\next" (
 echo Next.js dependency is not fully installed. Installing dependencies...
 call npm install --no-audit --no-fund
 if errorlevel 1 (
  echo.
  echo Installation failed. Check npm errors above and your internet connection.
  pause
  exit /b 1
 )
)
echo.
echo Open http://localhost:3000 after Next.js reports ready.
echo Port 8000 runs the older Python website and is NOT this project.
echo.
call npm run dev
if errorlevel 1 echo Start failed. Read the error above.
pause
endlocal
