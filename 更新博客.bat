@echo off
setlocal enabledelayedexpansion

echo.
echo ========================================
echo   博客更新工具 - 启动
echo ========================================
echo.

cd /d "E:\Project\blog"
if %errorlevel% neq 0 (
    echo [错误] 无法切换到 E:\Project\blog\
    echo 请检查路径是否存在
    pause
    exit /b 1
)
echo 当前目录: %cd%
echo.

echo [1/3] 扫描 content 目录...
echo 执行: node build.js
node build.js
if %errorlevel% neq 0 (
    echo.
    echo [错误] build.js 执行失败 (错误码: %errorlevel%)
    echo 请确认:
    echo   1. Node.js 已安装: https://nodejs.org/
    echo   2. content 目录存在
    echo   3. build.js 文件存在
    echo.
    pause
    exit /b 1
)
echo 扫描完成
echo.

echo [2/3] 提交到 Git...
git add -A
if %errorlevel% neq 0 (
    echo [警告] git add 失败，尝试继续...
)
git commit -m "更新博客 %date% %time%"
if %errorlevel% neq 0 (
    echo (可能是没有新内容需要提交)
)
echo.

echo [3/3] 推送到 GitHub...
git push 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   [错误] 推送失败! (错误码: %errorlevel%)
    echo ========================================
    echo.
    echo 可能原因:
    echo   1. 网络不通 (GFW 屏蔽)
    echo   2. SSH 密钥过期
    echo   3. GitHub 仓库权限问题
    echo.
    echo 手动测试: ssh -T git@github.com
    echo.
    pause
    exit /b 1
)
echo.
echo ========================================
echo   部署成功！等 1~2 分钟后刷新:
echo   https://zsA051214z.github.io/my-blog
echo ========================================
echo.
echo 按任意键关闭...
pause >nul
