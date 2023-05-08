       let input = document.getElementById("inputText");
        let list = document.getElementById("list");
        let minimalValue = 3;
        let listNum = 0;

        let tasks = [];

        /*Adicionar Tarefa a Lista de Tarefas*/
        addList = () => {
            // get
            let inputText = filterList(input.value);
            // set 
            if (inputText) {
                let task = {
                    id: listNum,
                    name: inputText,
                    done: false
                };
                tasks.push(task);
                list.innerHTML += ` <li class=" my-3 py-3 list-group-item " id="list${listNum}">
                    <div class="row">
                    <div class="col-1">
                    <input class="" type="checkbox" id="check${listNum}" onclick="done(${listNum})">
                    </div>
                    <div class="col-6">
                        <span class=" h5" id="text${listNum}"> ${inputText} </span>
                    </div>
                    <div class="col-4">
                        <i class=" fa fa-trash" style="cursor:pointer;" onclick="deleteList(${listNum})"></i>
                        <i class=" fa fa-thin fa-pencil" style="cursor:pointer;" onclick="editList(${listNum})"></i>
                    </div>                  
                    </div>    
                    </li> `;
                input.value = " ";
                listNum++;
                

            }
        }
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
        editList = (listId) => {
            let currentText = document.getElementById(`text${listId}`);
            let newText = prompt("Deseja alterar o nome da Tarefa?", currentText.innerHTML);
            if (filterList(newText)) {
                currentText.innerHTML = newText;
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

       
       