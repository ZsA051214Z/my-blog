@echo off
cd /d E:\Project\blog

echo [1/3] Scanning articles...
node build.js
if errorlevel 1 goto :fail_build

echo [2/3] Committing...
git add -A
git commit -m "update blog"

echo [3/3] Pushing to GitHub...
git push
if errorlevel 1 goto :fail_push

echo.
echo ===================================
echo Done! Wait 1-2 min then refresh:
echo https://zsA051214z.github.io/my-blog
echo ===================================
pause
exit /b 0

:fail_build
echo ERROR: build.js failed
echo Check that Node.js is installed and build.js exists
pause
exit /b 1

:fail_push
echo ERROR: git push failed
echo Check internet connection and SSH key
pause
exit /b 1
