const recurso = 'user';
const servico = 'new';
const url = 'https://todolist-api.edsonmelo.com.br/api/${recurso}/${servico}/';

const nome = document.getElementById('nomecad').value
const email = document.getElementById('emailcad').value
const username = document.getElementById('nomescad').value
const password = document.getElementById('senhacad').value

const pay_load = {
    'name': nome,
    'email': email,
    'username': username,
    'password': password
};

const headers = { 'Content-type': 'application/json' };

fetch(url, {
    method: 'POST',
    body: JSON.stringify(pay_load),
    headers: headers
})
    .then(response => response.json())
    .then(data => {
        if ('message' in data) {
            throw new Error(data['message']);
        } else {
            console.log(data);
            alert("Cadastro realizado com sucesso!")
      
        }
    })
    .catch(error => console.log(error));
