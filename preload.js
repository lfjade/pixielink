const {contextBridge, ipcRenderer} = require('electron')
// const bcrypt = require('bcrypt')

// contextBridge.exposeInMainWorld('cryptoAPI', {
//     hashSenha: async (senha) => await bcrypt.hash(senha, 10),
//     compararSenha: async (senha, hash) => await bcrypt.compare(senha, hash)
// })

contextBridge.exposeInMainWorld('authAPI', {
    testaSenha: (username, senha) => ipcRenderer.invoke('testa-senha', username, senha),
    salvarUsuario: (username, hashSenha) => ipcRenderer.invoke('salvar-usuario', username, hashSenha)
})
