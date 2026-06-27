@echo off
cd /d E:\Project\blog
echo [1/3] 扫描文章...
node build.js
if %errorlevel% neq 0 (
    echo 扫描失败，请检查 build.js
    pause
    exit /b 1
)
echo.
echo [2/3] 提交代码...
git add -A
git commit -m "更新博客 %date%"
echo.
echo [3/3] 推送到线上...
set GIT_SSH_COMMAND=ssh -i C:\Users\ZsA\.ssh\id_rsa_github -o StrictHostKeyChecking=accept-new
git push
echo.
echo ======================
echo 部署完成！等 1 分钟后刷新：
echo https://zsA051214z.github.io/my-blog
echo ======================
pause
