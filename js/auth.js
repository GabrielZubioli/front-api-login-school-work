const baseUrl = "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com";
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

function loginUsuario() {
    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginPassword").value.trim();

    if (email === "" || senha === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const data = {
        email: email,
        senha: senha
    };

    fetch(baseUrl + "/Autenticacao/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async (response) => {
        if (response.ok) {
            const json = await response.json();
            localStorage.setItem("email", email);
            localStorage.setItem("token", json.token);
            localStorage.setItem("expiracao", json.dataExpiracao);
            window.location.href = "welcome.html";
        } else {
            alert(await response.text());
        }
    })
    .catch(error => {
        console.error("Erro de conexão:", error);
        alert("Erro de conexão com o servidor.");
    });
}

function cadastrarUsuario() {
    const email = document.getElementById("registerEmail").value.trim();
    const senha = document.getElementById("registerPassword").value.trim();
    const senhaConfirmada = document.getElementById("senhaConfirmada").value.trim();

    if (email === "" || senha === "" || senhaConfirmada === "") {
        alert("Preencha todos os campos.");
        return;
    }

    if (senha !== senhaConfirmada) {
        alert("As senhas não coincidem.");
        return;
    }

    const data = {
        email: email,
        senha: senha,
        senhaConfirmada: senhaConfirmada
    };

    fetch(baseUrl + "/Autenticacao/registar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async (response) => {
        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            container.classList.remove('active');
        } else {
            alert(await response.text());
        }
    })
    .catch(error => {
        console.error("Erro de conexão:", error);
        alert("Erro de conexão com o servidor.");
    });
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    loginUsuario();
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrarUsuario();
});
