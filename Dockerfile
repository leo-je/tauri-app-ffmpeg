# 使用 Windows Server Core 作为基础镜像
FROM mcr.microsoft.com/windows/servercore:ltsc2025

# 安装必要的依赖工具
RUN powershell -Command \
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force; \
    Invoke-WebRequest -Uri https://aka.ms/vs/17/release/vs_installer.exe -OutFile "vs_installer.exe"; \
    Start-Process -Wait -FilePath vs_installer.exe -ArgumentList "--add Microsoft.VisualStudio.Workload.NetDesktop --includeOptional --quiet --norestart"; \
    Remove-Item -Force vs_installer.exe

# 安装 Rust 和 Tauri CLI
RUN powershell -Command \
    Invoke-WebRequest -Uri https://win.rustup.rs -OutFile rustup-init.exe; \
    Start-Process -Wait -FilePath rustup-init.exe -ArgumentList "-y"; \
    Remove-Item -Force rustup-init.exe; \
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force; \
    rustup default stable-x86_64-pc-windows-msvc; \
    cargo install tauri-cli

# 安装 Node.js
RUN powershell -Command \
    Invoke-WebRequest -Uri https://nodejs.org/dist/v16.13.1/node-v16.13.1-x64.msi -OutFile nodejs.msi; \
    Start-Process -Wait -FilePath msiexec.exe -ArgumentList '/i', 'nodejs.msi', '/quiet', '/norestart'; \
    Remove-Item -Force nodejs.msi

# 设置工作目录
WORKDIR /app

# 复制应用代码到容器中
COPY . /app

# 安装应用依赖
RUN npm install

# 构建 Tauri 应用
RUN npm run tauri build --release

# 启动构建过程
CMD ["npm", "run", "tauri", "build"]
