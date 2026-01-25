import { app, BrowserWindow } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  const isDev = !app.isPackaged && process.env.NODE_ENV !== "production";

  if (isDev) {
    win.loadURL("http://localhost:5173");
    installExtension(REACT_DEVELOPER_TOOLS);
  } else {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const indexPath = path.join(__dirname, "index.html");

    win.loadFile(indexPath).catch((err) => {
      console.error("Failed to load index.html:", err);
    });
  }
};

app.whenReady().then(createWindow);
