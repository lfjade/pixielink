const {contextBridge} = require('electron')
const bcrypt = require('bcrypt')

contextBridge.exposeInMainWorld('cryptoAPI', {
    hashSenha: async (senha) => await bcrypt.hash(senha, 10),
    compararSenha: async (senha, hash) => await bcrypt.compare(senha, hash)
})