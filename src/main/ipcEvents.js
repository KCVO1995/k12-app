const { ipcMain, dialog } = require('electron/main')

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'CSV', extensions: ['csv'] }],
    properties: ['openFile']
  })
  if (!canceled) {
    const filePath = filePaths[0]
    const fileName = filePath.split('/').pop()
    return fileName
  }
}

export const initEvents = () => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
}
