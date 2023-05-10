    let input = document.getElementById("inputText");
    let list = document.getElementById("list");
    let minimalValue = 3;
    let listNum = 0;
    let token = localStorage.getItem("token");
    

    let tasks = [];

    function carregarLista(){
        const url = 'https://todolist-api.edsonmelo.com.br/api/task/search/';

        const headers = { 'Content-type': 'application/json', 'Authorization': token };

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: null
            }).then(response => {
            // Aqui devem ser realizados os tratamentos no caso de ocorrerem erros
            response.json().then(data => {
            if ('message' in data) {
            // Gera uma mensagem de erro com o valor retornado pela API ou conexão
            throw new Error(data.message);
            } else {
            // Mostra os dados retornados já convertidos
            for (let i = 0; i < data.length; i++) {
            console.log(data[i].name);
            list.innerHTML += ` <li class=" my-3 py-3 list-group-item " id="list${data[i].id}">
                    <div class="row">
                    <div class="col-1">
                    <input class="" type="checkbox" id="check${listNum}" onclick="done(${data[i].name})">
                    </div>
                    <div class="col-6">
                        <span class=" h5" id="text${data[i].id}"> ${data[i].name} </span>
                    </div>
                    <div class="col-4">
                        <i class=" fa fa-trash" style="cursor:pointer;" onclick="deleteList(${data[i].id})"></i>
                        <i class=" fa fa-thin fa-pencil" style="cursor:pointer;" onclick="editList(${data[i].id, data[i].name, data[i].realized})"></i>
                    </div>                  
                    </div>    
                    </li> `;
                input.value = " ";
            // console.log(data[i].id, data[i].name, data[i]);

        }}}).catch(error => {
            console.log(error);
            });
            }).catch(error => {
            console.log(error);
            });
        }
            
        /*Adicionar Tarefa a Lista de Tarefas*/
        addList = () => {
            let listNum = 0;
            const url = 'https://todolist-api.edsonmelo.com.br/api/task/new/';
            const headers = { 'Content-type': 'application/json', 'Authorization': token };
        
            // obter o valor do input e filtrar o texto
            let inputText = filterList(input.value);
            // verificar se o texto filtrado é válido
            if (inputText) {
                let newTask = {
                    name: inputText,
                };
        
                // Converter o objeto em JSON
                const payload = JSON.stringify(newTask);
        
                fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: payload
                })
                .then(response => response.json())
                .then(data => {
                    // Adicionar a nova tarefa na lista de tarefas
                    newTask.id = data.id;
                    tasks.push(newTask);
                    // atualizar a lista de tarefas na interface
                    list.innerHTML += ` <li class=" my-3 py-3 list-group-item " id="list${newTask.id}">
                        <div class="row">
                        <div class="col-1">
                        <input class="" type="checkbox" id="check${newTask.id}" onclick="done(${newTask.id})">
                        </div>
                        <div class="col-6">
                            <span class=" h5" id="text${newTask.id}"> ${newTask.name} </span>
                        </div>
                        <div class="col-4">
                            <i class=" fa fa-trash" style="cursor:pointer;" onclick="deleteList(${newTask.id})"></i>
                            <i class=" fa fa-thin fa-pencil" style="cursor:pointer;" onclick="editList(${newTask.id},'${newTask.name}',${newTask.realized})"></i>
                        </div>                  
                        </div>    
                        </li> `;
                    
                    // limpar o input e atualizar o número de tarefas
                    console.log(newTask);
                    input.value = "";
                    listNum++;
                })
                .catch(error => console.error(error));
            }
        };
        
        /* Verificar se o item foi concluído */
        done = (listId) => {
            let checkbox = document.getElementById(`check${listId}`);
            let current = document.getElementById(`text${listId}`);
            let classExit = current.classList.contains("text-decoration-line-through");
            if (classExit == true) {
                current.classList.remove("text-decoration-line-through");
            } else {
                current.classList.add("text-decoration-line-through");
            }

        }
        /*Verificar se tem mais de 3 caractéres */
        filterList = (x) => {
            if (x) {
                if (x.length >= minimalValue) {
                    return x;
                }
                else {
                    alert("Digite mais de 3 caractéres no nome da Tarefa")
                }
            }
            else {
                return false;
            }
        }
        /*Alerta de Edição de Tarefa*/
            editList = (listId,listName,listDone) => {
                        let currentText = document.getElementById(`text${listId}`);
                        let newText = prompt("Deseja alterar o nome da Tarefa?", currentText.innerHTML);
                        const pay_load = {
                            'id': listId,
                            'name': listName,
                            'realized': listDone,
                          };

                        if (filterList(newText)) {
                          fetch('https://todolist-api.edsonmelo.com.br/api/task/update/', {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': token
                            },
                            body: JSON.stringify(pay_load),
                          })
                          .then(response => {
                            // Aqui devem ser realizados os tratamentos no caso de ocorrerem erros
                            response.json().then(data => {
                              if ('message' in data) {
                                // Gera uma mensagem de erro com o valor retornado pela API ou conexão
                                throw new Error(data.message);
                              } else {
                                // Mostra os dados retornados já convertidos
                                console.log(data);
                          
                                // Mostra os dados de forma isolada para cada variável recebida na requisição
                                console.log('Id: ', data.id);
                                console.log('UserID: ', data.userId);
                                console.log('Name: ', data.name);
                                console.log('Date: ', data.date);
                                console.log('Realized: ', data.realized);
                              }
                            }).catch(error => {
                              console.log(error);
                            });
                          }).catch(error => {
                            console.log(error);
                          });
                        }
                    }
                          
                          
                          
                          
                          
        /*Alerta de Exclusão de Tarefa*/
        deleteList = (listId) => {
            let current = document.getElementById(`text${listId}`).innerHTML;
            let deleteComfirm = confirm(`Tem certeza que deseja excluir a Tarefa? ${current}`);
            if (deleteComfirm) {
                let p = document.getElementById("list")
                let c = document.getElementById(`list${listId}`);
                p.removeChild(c);
            }
            else {
                console.log("Tarefa Excluida");
            }
        };


        function logout(){

            localStorage.clear();
            window.location.href = '../index.html'
            
            }
            


    //    let input = document.getElementById("inputText");
    //     let list = document.getElementById("list");
    //     let minimalValue = 3;
    //     let listNum = 0;

    //     let tasks = [];

    //     /*Adicionar Tarefa a Lista de Tarefas*/
    //     addList = () => {
    //         let inputText = filterList(input.value);
    //         if (inputText) {
    //             let task = {
    //                 name: inputText,
    //                 done: false
    //             };
    //             fetch('https://todolist-api.edsonmelo.com.br/api/task/new/', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(task)
    //             })
    //             .then(response => response.json())
    //             .then(data => {
    //                 // Adicionar a tarefa à lista local
    //                 task.id = data.id;
    //                 tasks.push(task);
                    
    //                 console.log("Tarefa salva na API: ", task);
    //                 // Adicionar a tarefa à lista HTML
    //                 list.innerHTML += ` <li class="my-3 py-3 list-group-item" id="list${task.id}">
    //                     <div class="row">
    //                         <div class="col-1">
    //                             <input class="" type="checkbox" id="check${task.id}" onclick="done(${task.id})">
    //                         </div>
    //                         <div class="col-6">
    //                             <span class="h5" id="text${task.id}"> ${task.name} </span>
    //                         </div>
    //                         <div class="col-4">
    //                             <i class="fa fa-trash" style="cursor:pointer;" onclick="deleteList(${task.id})"></i>
    //                             <i class="fa fa-thin fa-pencil" style="cursor:pointer;" onclick="editList(${task.id})"></i>
    //                         </div>
    //                     </div>
    //                 </li>`;
    //                 input.value = "";
    //             })
    //             .catch(error => console.error(error));
               
    //         }
    //     };
        
    //     /* Verificar se o item foi concluído */
    //     done = (listId) => {
    //         let checkbox = document.getElementById(`check${listId}`);
    //         let current = document.getElementById(`text${listId}`);
    //         let classExit = current.classList.contains("text-decoration-line-through");
    //         if (classExit == true) {
    //             current.classList.remove("text-decoration-line-through");
    //             // enviar uma solicitação para desmarcar a tarefa na API
    //             fetch('https://todolist-api.edsonmelo.com.br/api/task/${listId}/', {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     done: false
    //                 })
    //             })
    //             .then(response => response.json())
    //             .then(data => {
    //                 // atualizar o estado local da tarefa
    //                 let taskIndex = tasks.findIndex(task => task.id == listId);
    //                 tasks[taskIndex].done = data.done;
    //             })
    //             .catch(error => console.error(error));
    //         } else {
    //             current.classList.add("text-decoration-line-through");
    //             // enviar uma solicitação para marcar a tarefa na API
    //             fetch('https://todolist-api.edsonmelo.com.br/api/task/${listId}/', {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     done: true
    //                 })
    //             })
    //             .then(response => response.json())
    //             .then(data => {
    //                 // atualizar o estado local da tarefa
    //                 let taskIndex = tasks.findIndex(task => task.id == listId);
    //                 tasks[taskIndex].done = data.done;
    //             })
    //             .catch(error => console.error(error));
    //         }
    //     };
        
    //     /*Verificar se tem mais de 3 caractéres */
    //     filterList = (x) => {
    //         if (x) {
    //             if (x.length >= minimalValue) {
    //                 return x;
    //             }
    //             else {
    //                 alert("Digite mais de 3 caractéres no nome da Tarefa")
    //             }
    //         }
    //         else {
    //             return false;
    //         }
    //     }
    //     /*Alerta de Edição de Tarefa*/
    //     editList = (listId) => {
    //         let currentText = document.getElementById(`text${listId}`);
    //         let newText = prompt("Deseja alterar o nome da Tarefa?", currentText.innerHTML);
          
    //         if (filterList(newText)) {
    //           fetch('https://todolist-api.edsonmelo.com.br/api/task/edit/', {
    //             method: 'PUT',
    //             headers: {
    //               'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //               name: newText
    //             })
    //           })
    //           .then(response => response.json())
    //           .then(data => {
    //             currentText.innerHTML = data.name;
    //           })
    //           .catch(error => console.error(error));
    //         }
    //       };
          
    //     /*Alerta de Exclusão de Tarefa*/
    //     deleteList = (listId) => {
    //         let current = document.getElementById(`text${listId}`).innerHTML;
    //         let deleteComfirm = confirm(`Tem certeza que deseja excluir a Tarefa? ${current}`);
            
    //         if (deleteComfirm) {
    //           fetch('https://todolist-api.edsonmelo.com.br/api/task/delete/', {
    //             method: 'DELETE'
    //           })
    //           .then(response => response.json())
    //           .then(data => {
    //             // Remover a tarefa da lista local
    //             let index = tasks.findIndex(task => task.id == listId);
    //             tasks.splice(index, 1);
          
    //             // Remover a tarefa da lista HTML
    //             let c = document.getElementById(`list${listId}`);
    //             c.remove();

    //             console.log(`Tarefa ${listId} excluída com sucesso.`);
    //           })
    //           .catch(error => console.error(error));
    //         } else {
    //           console.log("Tarefa Excluida");
    //         }
    //       };
          


       
       