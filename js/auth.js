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
      localStorage.setItem("expiracao", data.expiration);
      alert(
        `Seja bem-vindo(a), ${email}! Seu token expira em ${data.expiration}`
      );
      window.location.href = "../welcome.html"; // Ajuste o caminho se precisar
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

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  loginUsuario();
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  cadastrarUsuario();
});
