const fetchAddress = async (id) => {
  let url = `https://go-wash-api.onrender.com/api/auth/address/${id || ""}`;
  let api = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    },
  });

  const data = await api.json();
  return data
};

const renderAddresses = async () => {
  const data = await fetchAddress();
  const tbody = document.querySelector("#enderecos-table tbody");
  tbody.innerHTML = "";

  data.data.forEach((endereco) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${endereco.title || ""}</td>
      <td>${endereco.cep || ""}</td>
      <td>${endereco.address || ""}</td>
      <td>${endereco.number || ""}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editarEndereco('${endereco.id}')">Editar</button>
        <button class="action-btn delete-btn" onclick="excluirEndereco('${endereco.id}')">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
};

/** PREENCHER FORM PARA ATUALIZAÇÃO DE ENDEREÇO */

async function editarEndereco(id) {
  const address = await fetchAddress(id);
  abrirPopup()
  const form = document.getElementById("formEndereco");
  form.elements["title"].value = address.data.title || "";
  form.elements["cep"].value = address.data.cep || "";
  form.elements["address"].value = address.data.address || "";
  form.elements["number"].value = address.data.number || "";
  form.elements["complement"].value = address.data.complement || "";
}

async function atualizarEndereco(id, form) {
  let url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;
  let data = {
    title: form.elements["title"].value,
    cep: form.elements["cep"].value,
    address: form.elements["address"].value,
    number: form.elements["number"].value,
    complement: form.elements["complement"].value,
  };
  let api = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    },
    body: JSON.stringify(data),
  });
  if (api.ok) {
    alert("Endereço atualizado com sucesso!");
    fecharPopup()
    clearForm();
    renderAddresses();
  } else {
    alert("Erro ao atualizar o endereço. Tente novamente.");
  }
}

const adicionarEndereco = async () => {
  abrirPopup()
  let url = "https://go-wash-api.onrender.com/api/auth/address";
  let params = {
    title: document.getElementById("title").value,
    cep: document.getElementById("cep").value,
    address: document.getElementById("address").value,
    number: document.getElementById("number").value,
    complement: document.getElementById("complement").value,
  };
  
  let api = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    },
  });

  const data = await api.json();
  console.log(data);
};

// ...existing code...

async function salvarOuAtualizarEndereco() {
  const form = document.getElementById("formEndereco");
  const cep = form.elements["cep"].value;
  const number = form.elements["number"].value;

  // Busca todos os endereços
  const data = await fetchAddress();
  const existente = data.data.find(
    (endereco) => endereco.cep === cep && endereco.number === number
  );

  if (existente) {
    await atualizarEndereco(existente.id, form);
    clearForm();
  } else {
    // Cria novo endereço
    await adicionarEndereco();
    alert("Endereço adicionado com sucesso!");
    clearForm();
    fecharPopup();
    renderAddresses();
  }
}

// ...existing code...

function clearForm() {
  document.getElementById("formEndereco").reset();
}

async function excluirEndereco(id) {
  let url = `https://go-wash-api.onrender.com/api/auth/address/${id || ""}`;
  let api = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    },
  });
  if (api.ok) {
    alert("Endereço excluído com sucesso!");
    renderAddresses();
  }
}

function abrirPopup() {
  document.getElementById("popup").style.display = "block"
  document.getElementById("overlay").style.display = "block"
}

function fecharPopup() {
  document.getElementById("popup").style.display = "none"
  document.getElementById("overlay").style.display = "none"
}

renderAddresses();