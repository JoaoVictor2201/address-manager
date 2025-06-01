async function validarDados() {
    let name = document.getElementById("name").value
    let data_nascimento = document.getElementById("date").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let cpfCnpj = document.getElementById("cpf-cnpj").value
    let terms = document.getElementById("terms").checked

    let warning = document.querySelector('.terms-warning')

    let url = "https://go-wash-api.onrender.com/api/user";

    if (!terms) {
        warning.style.display = 'block'
        return
    } else {
        warning.style.display = 'none'
        let parametros = {
            "name": name,
            "email": email,
            "user_type_id": 1,
            "password": password,
            "cpf_cnpj": cpfCnpj,
            "terms": 1,
            "birthday": data_nascimento
        }

        try {
            let api = await fetch(url, {
                method: "POST",
                body:JSON.stringify(parametros),
                headers: {
                    "Content-Type":"application/json"
                }
            })
    
            if(!api.ok){
                throw new Error(`${api.status}: The request was well-formed but could not be processed.`)
            }

        } catch(error) {
            alert(error)
        }  
    }
        limparForm()
        alert('Cadastro efetuado com sucesso!')
}

const limparForm = () => {
    let name = document.getElementById("name")
    let data_nascimento = document.getElementById("date")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let cpfCnpj = document.getElementById("cpf-cnpj")
    let warning = document.querySelector('.terms-warning')

    name.value = ''
    data_nascimento.value = ''
    email.value = ''
    password.value = ''
    cpfCnpj.value = ''
    warning.style.display = 'none'

}