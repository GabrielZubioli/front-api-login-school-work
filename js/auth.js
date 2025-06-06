var baseUrl = "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com";

function senhaEhForte(senha) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(senha);
}

function login() {
  var email = document.getElementById("emailLog").value.trim();
  var password = document.getElementById("passwordLog").value.trim();

  if (email === "" || password === "") {
    alert("Preencha todos os campos.");
    return;
  }

  var data = {
    email: email,
    senha: password,
  };

  fetch(baseUrl + "/Autenticacao/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (response.ok) {
        var json = await response.json();
        document.cookie = "email=" + email + "; path=/;";
        document.cookie = "token=" + json.token + "; path=/;";
        document.cookie = "dataExpiracao=" + json.dataExpiracao + "; path=/;";
        alert("Login realizado com sucesso!");
        window.location.href = "welcome.html";
      } else {
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          alert("Erro: " + json.mensagem || text);
        } catch {
          alert("Erro: " + text);
        }
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    });
}

function register() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (email === "" || password === "" || confirmPassword === "") {
    alert("Preencha todos os campos.");
    return;
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  if (!senhaEhForte(password)) {
    alert("A senha é fraca. Use pelo menos 8 caracteres, com uma letra maiúscula, uma minúscula e um número.");
    return;
  }

  var data = {
    email: email,
    senha: password,
    senhaConfirmada: confirmPassword,
  };

  fetch(baseUrl + "/Autenticacao/registar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (response.ok) {
        alert("Usuário cadastrado com sucesso! Você já pode fazer login.");
        // Remove a classe "active" para voltar à tela de login
        const container = document.querySelector(".container");
        if (container) container.classList.remove("active");
      } else {
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          alert("Erro: " + json.mensagem || text);
        } catch {
          alert("Erro: " + text);
        }
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    });
}
