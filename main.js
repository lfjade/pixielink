const {BrowserWindow, ipcMain, app } = require('electron')
const path = require('path')
const {salvarUsuario, testaSenha} = require('./mockDB')

async function createMainWindow(){
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    await mainWindow.loadFile('index.html')
}

ipcMain.handle('testa-senha', (event, username, senha) => {

    const resultado = testaSenha(username, senha)
    if (resultado){
        return {ok: true}
    } else if (!resultado){
        return {ok: false, msg: "Usuário não encontrado ou senha incorreta."}
    } else if (typeof resultado === 'string'){
        return {ok: false, msg: resultado}
    }

})


app.whenReady().then(createMainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})


