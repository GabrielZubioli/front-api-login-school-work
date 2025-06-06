const apiBaseUrl =
  "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao";

function senhaEhForte(senha) {
  const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regexSenhaForte.test(senha);
}

async function loginUsuario() {
  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginPassword").value.trim();

  const body = { email, senha };

  try {
    const response = await fetch(apiBaseUrl + "/autenticar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("email", email);
      localStorage.setItem("expiracao", data.dataExpiracao);
      redirecionarParaWelcome();
    } else {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.mensagem || "Erro ao realizar login. Verifique seus dados.";
      alert(`Erro: ${errorMessage}`);
    }
  } catch (error) {
    console.error(error);
    alert("Erro de conexão com o servidor.");
  }
}

async function cadastrarUsuario() {
  const email = document.getElementById("registerEmail").value.trim();
  const senha = document.getElementById("registerPassword").value.trim();
  const senhaConfirmada = document.getElementById("senhaConfirmada").value.trim();

  if (!email || !senha || !senhaConfirmada) {
    alert("Preencha todos os campos.");
    return;
  }

  if (senha !== senhaConfirmada) {
    alert("As senhas não coincidem.");
    return;
  }

  if (!senhaEhForte(senha)) {
    alert(
      "A senha é fraca. Ela deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número."
    );
    return;
  }

  const body = { email, senha, senhaConfirmada };

  try {
    const response = await fetch(apiBaseUrl + "/registar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const container = document.querySelector(".container");
      alert("Usuário cadastrado com sucesso!");
      container.classList.remove("active");
    } else {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.mensagem ||
        "Erro ao cadastrar. Verifique se o email já está cadastrado ou se os dados estão corretos.";
      alert(`Erro: ${errorMessage}`);
    }
  } catch (error) {
    console.error(error);
    alert("Erro de conexão com o servidor.");
  }
}

function redirecionarParaWelcome() {
  const url = window.location.href;

  if (url.includes("localhost")) {
    window.location.href = "/welcome.html";
  } else {
    window.location.href =
      "https://gabrielzubioli.github.io/login-screen-school-work/welcome";
  }
}

function formatarData(dataISO) {
  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  loginUsuario();
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  cadastrarUsuario();
});

const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
