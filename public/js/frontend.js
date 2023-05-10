function logar() {
    const url = 'https://todolist-api.edsonmelo.com.br/api/user/login/';

    const nomes = document.getElementById('nomes').value;
    const senha = document.getElementById('senha').value;

    const pay_load = {
        'username': nomes,
        'password': senha
    };

    const headers = { 'Content-type': 'application/json', 'Accept': 'text/plain' };

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
            console.log("Login concluído");
           
            localStorage.setItem('token', data['token']);
            localStorage.setItem('nameg', data['name']);
            localStorage.setItem('emailg', data['email']);
            localStorage.setItem('usernameg', nomes);
            localStorage.setItem('passwordg', senha);
            window.location.href = 'acesso-restrito/task.html'
            
        }
    })
    .catch(error => console.log(error));
}