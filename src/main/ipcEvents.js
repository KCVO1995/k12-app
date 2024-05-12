const { ipcMain, dialog } = require('electron/main')
import { handleTransformFile, saveResultFile } from './controller/fileTransform'

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'CSV', extensions: ['csv'] }],
    properties: ['openFile']
  })
  if (!canceled) {
    return filePaths[0]
  }
}
async function handleFileSave() {
  const { canceled, filePath } = await dialog.showSaveDialog()
  if (!canceled) {
    console.log(filePath, 'ppp')
    await saveResultFile(filePath)
  }
}

export const initEvents = () => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('transformFile', handleTransformFile)
  ipcMain.handle('dialog:saveFile', handleFileSave)
}
