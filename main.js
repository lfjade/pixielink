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
    if (resultado===true){
        return {ok: true}
    }
    if (typeof resultado === 'string'){
        return {ok: false, msg: resultado}
    }
    return {ok: false, msg: "Usuário não encontrado ou senha incorreta."}

})

ipcMain.handle('salvar-usuario', async (event, username, senha) => {
    try {
        await salvarUsuario(username, senha)
        return { ok: true }
    } catch (err) {
        return { ok: false, msg: err.message }
    }
});

app.whenReady().then(createMainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})


