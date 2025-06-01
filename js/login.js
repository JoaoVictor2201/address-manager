const userLogin = async () => {
  // let login = document.getElementById("login").value
  // let password = document.getElementById("password-login").value

  let login = "franca.jv@hotmail.com";
  let password = "Kiko@123";

  let url = "https://go-wash-api.onrender.com/api/login";

  let parametros = {
    email: login,
    user_type_id: 1,
    password: password,
  };

  try {
    let api = await fetch(url, {
      method: "POST",
      body: JSON.stringify(parametros),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!api.ok) {
      throw new Error(
        `${api.status}: The request was well-formed but could not be processed.`
      );
    }

    let { access_token } = await api.json();
    localStorage.setItem("user_token", access_token);

    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error);
  }
};
