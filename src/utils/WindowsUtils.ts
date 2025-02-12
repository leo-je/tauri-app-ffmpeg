// import { Window } from "@tauri-apps/api/window";
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

// 创建新窗口
export const createWin = (options: any) => {
    const webview = new WebviewWindow(options.label, {
        url: options.url, // 窗口的URL
        title: options.title, // 窗口的标题
        width: options.width, // 初始宽度 (number)
        height: options.height, // 初始高度 (number)
        minWidth: options.minWidth, // 窗口的最小宽度 (number)
        minHeight: options.minHeight, // 窗口的最小高度 (number)
        maxWidth: options.maxWidth, // 窗口的最大宽度 (number)
        maxHeight: options.maxHeight, // 窗口的最大高度 (number)
        resizable: options.resizable, // 窗口是否可调整大小 (boolean)
        x: options.x, // 窗口左上角的水平位置 (number)
        y: options.y, // 窗口左上角的垂直位置 (number)
        center: options.center, // 是否位于屏幕中央显示窗口 (boolean)
        alwaysOnTop: options.alwaysOnTop, // 窗口是否应始终位于其他窗口之上 (boolean)
        fullscreen: options.fullscreen, // 窗口是否应全屏显示 (boolean)
        decorations: options.decorations, // 窗口是否应具有装饰边框和条 (boolean)
        // fileDropEnabled: options.fileDropEnabled, // 窗口是否应接收文件拖放 (boolean)
        skipTaskbar: options.skipTaskbar, // 是否将窗口添加到任务栏 (boolean)
        contentProtected: options.contentProtected, // 防止窗口内容被其他应用程序捕获 (boolean)
        focus: options.focus, // 窗口是否应自动获取焦点 (boolean)
        visible: options.visible, // 窗口是否应可见 (boolean)

    });

    webview.once("tauri://destroyed", options.onDestroyed ? options.onDestroyed : function (e) {
        console.log("tauri://destroyed", e);
    });

    // 窗口创建成功触发
    webview.once("tauri://created", options.onCreated ? options.onCreated :function () {
        console.log(options.title + "创建成功！！！");
    });

    // 窗口创建失败触发
    webview.once("tauri://error", options.onError ? options.onError :function (e) {
        console.log(options.title + "创建失败！！！", e);
    });
};

// 关闭窗口
export const closeWin = (label: string) => {
    WebviewWindow.getByLabel(label).then(win => {
        if (win) {
            win.close();
        } else {
            console.error(`无法找到标签为 ${label} 的窗口`);
        }
    });

};

// 隐藏窗口
export const hideWin = (label: string) => {
    WebviewWindow.getByLabel(label).then(win => {
        if (win) {
            win.hide();
        } else {
            console.error(`无法找到标签为 ${label} 的窗口`);
        }
    });

};

// 显示窗口
export const showWin = (label: string) => {
    WebviewWindow.getByLabel(label).then(win => {
        if (win) {
            win.show();
        } else {
            console.error(`无法找到标签为 ${label} 的窗口`);
        }
    });

};

// 免责声明窗口
export const disclaimerWin = () => {
    createWin({
        label: "Disclaimer",
        title: "免责声明",
        url: "/disclaimer",
        center: true,
        width: 800,
        height: 740,
        resizable: false,
    });
};

export const getCurrent = WebviewWindow.getCurrent;
export const getByLabel = WebviewWindow.getByLabel;
