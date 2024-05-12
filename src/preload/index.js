const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  transformFile: (filePath) => ipcRenderer.invoke('transformFile', filePath),
  saveFile: () => ipcRenderer.invoke('dialog:saveFile')
})
