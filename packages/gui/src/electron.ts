import { app, BrowserWindow } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
  });

  const isDev = !app.isPackaged && process.env.NODE_ENV !== "production";

  if (isDev) {
    win.loadURL("http://localhost:5173");
    installExtension(REACT_DEVELOPER_TOOLS);
  } else {
    const indexPath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "index.html"
    );
    win.loadFile(indexPath);
  }
};

app.whenReady().then(createWindow);