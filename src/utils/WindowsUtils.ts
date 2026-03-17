import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import type { WindowOptions } from '../types';

export const createWin = (options: WindowOptions) => {
    const webview = new WebviewWindow(options.label, {
        url: options.url,
        title: options.title,
        width: options.width,
        height: options.height,
        minWidth: options.minWidth,
        minHeight: options.minHeight,
        maxWidth: options.maxWidth,
        maxHeight: options.maxHeight,
        resizable: options.resizable,
        x: options.x,
        y: options.y,
        center: options.center,
        alwaysOnTop: options.alwaysOnTop,
        fullscreen: options.fullscreen,
        decorations: options.decorations,
        skipTaskbar: options.skipTaskbar,
        contentProtected: options.contentProtected,
        focus: options.focus,
        visible: options.visible,
    });

    webview.once("tauri://destroyed", options.onDestroyed ?? function () {});
    webview.once("tauri://created", options.onCreated ?? function () {});
    webview.once("tauri://error", options.onError ?? function () {});
};

export const closeWin = async (label: string) => {
    try {
        const win = await WebviewWindow.getByLabel(label);
        if (win) {
            await win.close();
        }
    } catch {
    }
};

export const hideWin = async (label: string) => {
    try {
        const win = await WebviewWindow.getByLabel(label);
        if (win) {
            await win.hide();
        }
    } catch {
    }
};

export const showWin = async (label: string) => {
    try {
        const win = await WebviewWindow.getByLabel(label);
        if (win) {
            await win.show();
        }
    } catch {
    }
};

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
