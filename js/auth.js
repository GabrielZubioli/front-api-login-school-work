const apiBaseUrl =
  "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao";

async function loginUsuario() {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginPassword").value;

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
      const dataFormatada = formatarData(data.dataExpiracao);
      alert(
        `Seja bem-vindo(a), ${email}! Seu token expira em ${dataFormatada}`
      );
      redirecionarParaWelcome();
    } else {
      const errorMessage = await response.text();
      alert(`Erro: ${errorMessage}`);
    }
  } catch (error) {
    console.error(error);
    alert("Erro de conexão com o servidor.");
  }
}

async function cadastrarUsuario() {
  const email = document.getElementById("registerEmail").value;
  const senha = document.getElementById("registerPassword").value;
  const senhaConfirmada = document.getElementById("senhaConfirmada").value;

  const body = { email, senha, senhaConfirmada };

  try {
    const response = await fetch(apiBaseUrl + "/registar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
      document.querySelector(".register").classList.remove("active");
      document.querySelector(".login").classList.add("active");
    } else {
      const errorMessage = await response.text();
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
