
window.addEventListener('DOMContentLoaded', ()=> {
    const username = document.getElementById('username')
    const senha = document.getElementById('senha')
    const login = document.getElementById('login')
    
    login.addEventListener('click', async () => {
        if (!username || !senha){
            alert("Preencha os campos.")
        }

        const resultado = await window.authAPI.testaSenha(username, senha)
        if (resultado.ok) {
            alert("Login realizado com sucesso!")
            window.location.href = 'bemVinde.html' // ou o próximo passo
        } else {
            alert(`Erro: ${resultado.msg}`)
        }
    })

})



document.getElementById('cadastro').addEventListener('click', () => {
    window.location.href='cadastro.html'
})


async function hashSenha(senha) {
    return await window.cryptoAPI.hashSenha(senha)
}