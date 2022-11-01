const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "/public/assets/favicon-240x240.png"),
  });
  mainWindow.loadFile(path.join(__dirname, "public/index.html"));

  mainWindow.on("closed", () => {
    app.quit();
  });
});
