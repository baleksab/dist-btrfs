import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";


function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    const indexPath = fileURLToPath(new URL("../dist/index.html", import.meta.url));
    win.loadFile(indexPath);
  }
}

app.whenReady().then(createWindow);
