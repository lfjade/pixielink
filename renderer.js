function init() {
    const username = document.getElementById('username')
    const senha = document.getElementById('senha')
    const login = document.getElementById('login')
    const btnCadastro = document.getElementById('cadastro')
    const cadastroBtn = document.getElementById('cadastroBtn')

    if (login && username && senha) {
        login.addEventListener('click', async () => {
            const resultado = await window.authAPI.testaSenha(username.value, senha.value)
            if (resultado.ok) {
                alert("Login realizado com sucesso!")
                window.location.href = 'bemVinde.html'
            } else {
                alert(`Erro: ${resultado.msg}`)
            }
        });
    }

    if (btnCadastro) {
        btnCadastro.addEventListener('click', () => {
            window.location.href = 'cadastro.html'
        });
    }

    if (window.location.pathname.includes('cadastro.html') && cadastroBtn) {
        cadastroBtn.addEventListener('click', async () => {
            if (!username.value || !senha.value) {
                alert("Preencha todos os campos.")
                return
            }

            const resultado = await window.authAPI.salvarUsuario(username.value, senha.value)
            if (resultado.ok) {
                alert("Usuário cadastrado com sucesso!")
                window.location.replace('index.html')
            } else {
                alert(`Erro: ${resultado.msg}`)
            }
        });
    }
}

// Fallback para garantir execução do init
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // DOM já carregado, executa imediatamente
    init()
} else {
    // Espera o carregamento do DOM
    window.addEventListener('load', init)
}
