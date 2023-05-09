const token = localStorage.getItem('token');
const nomeg = localStorage.getItem('nameg');
const emailg = localStorage.getItem('emailg');
const usernameg = localStorage.getItem('usernameg');
const passwordg = localStorage.getItem('passwordg');
localStorage.getElementById()



function editar() {
    const url = "https://todolist-api.edsonmelo.com.br/api/user/update/";

    const nome = document.getElementById('nomecad').value
    const email = document.getElementById('emailcad').value
    const username = document.getElementById('nomescad').value
    const password = document.getElementById('senhacad').value
    const token = data['token'].value

    const pay_load = {
        'name': nome,
        'email': email,
        'username': username,
        'password': password,
        'picture': 'n'
    };

    const headers = { 'Content-type': 'application/json', 'Authorization': token };

    console.log(token)
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(pay_load),
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            if ('message' in data) {
                throw new Error(data['message']);
            } else {
                console.log(data);
                alert("Editado com sucesso!")
            }
        })
        .catch(error => console.log(error));
    {
        "content-type" = "application/json",
            "Authorization" = "YOUR_TOKEN"
    }
}