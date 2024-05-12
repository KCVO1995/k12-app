const { ipcMain, dialog } = require('electron/main')

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'CSV', extensions: ['csv'] }],
    properties: ['openFile']
  })
  if (!canceled) {
    return filePaths[0]
  }
}

export const initEvents = () => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
}
