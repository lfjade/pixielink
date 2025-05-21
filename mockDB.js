const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')

const arquivo = path.join(__dirname, 'usuarios.json')

function garantirArquivo() {
    if (!fs.existsSync(arquivo)){
        fs.writeFileSync(arquivo, JSON.stringify([]))
    }
}

function lerUsuarios(){
    garantirArquivo()
    const conteudo = fs.readFileSync(arquivo, 'utf8') || []
    try {
        return JSON.parse(conteudo)
    } catch {
        fs.writeFileSync(arquivo, JSON.stringify([]))
        return []
    }
}

function procuraUsuario(username){
    garantirArquivo()
    const usuarios = lerUsuarios()
    return usuarios.find(el => el.username === username)
}

// console.log(procuraUsuario("johann"))

async function salvarUsuario(username, senhaPlana){
    const usuarios = lerUsuarios()
    if (procuraUsuario(username)) throw new Error ("Usuário já cadastrado.")
    
        const senhaHash = await bcrypt.hash(senhaPlana, 10)
    usuarios.push({
        username: username,
        senha: senhaHash,
        tentativas: 0
    })
    
    fs.writeFileSync(arquivo, JSON.stringify(usuarios, null, 2))
}

function testaSenha(username, senhaPlana){
    const usuarios = lerUsuarios()
    const usuario = usuarios.find(el => el.username === username)
    if (!usuario) return false // aqui posso pensar em um alert pra dizer que deu errado e acho que a logica de bloquear depois de 3 tentativas pode ficar aqui tbm
    
    if (usuario.bloqueado){
        return "Usuário bloqueado."
    }

    const senhaCorreta = bcrypt.compareSync(senhaPlana, usuario.senha)
    if (senhaCorreta){
        usuario.tentativas = 0
        fs.writeFileSync(arquivo, JSON.stringify(usuarios, null, 2))
        return true
    } else {
        usuario.tentativas = (usuario.tentativas || 0)+1
        if (usuario.tentativas>=3){
            usuario.bloqueado=true
            fs.writeFileSync(arquivo, JSON.stringify(usuarios, null, 2))
            return "Usuário bloqueado após 3 tentativas."
        }
        fs.writeFileSync(arquivo, JSON.stringify(usuarios, null, 2))
        return false
    }
    
}


module.exports = {salvarUsuario, testaSenha}