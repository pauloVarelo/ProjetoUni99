

const http = require('http')
const path = require('path')

const express =  require('express')
const fs = require("fs");
var session = require('express-session')


const app = express()
const server = http.createServer(app)



app.use(express.json());
app.use(express.urlencoded());
app.use(session({secret:"abc"}));

// configuraçoes
app.set('port', process.env.PORT || 3000)

// secção de login
app.use('/acesso-restrito/*', (req, res, next) => {
    if( req.session.nome ){
        next();
    }else{
        res.redirect('/index.html')
    }
});


      // artigos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//start do server
server.listen(app.get('port'), () => {
    console.log('server na porta', app.get('port'))
   
   
})


// secção de login 2


app.post('/login',(req, res) => {
    const usuarioscad =   fs.readFileSync('./usuarios.json')
    const usuariosparse = JSON.parse(usuarioscad)
    

    var nome = req.body.nomes
    var senha = req.body.senha


        for( var umUsuario of usuariosparse) {
            if(nome == umUsuario.nome && senha == umUsuario.senha ){
                    req.session.nome = umUsuario
                    res.send('conectado')
                    return
            }
                
            
        }
        res.send('falhou')
    
})

//sair 
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err)
      } else {
        res.redirect('/index.html') // redireciona o usuário para a página de login
      }
    })
  })


  
// area de cadastro
let idCounter = 0;
app.post('/cadastro', (req, res) => {
    const usuarioscad = fs.readFileSync('./usuarios.json')
    const usuariosparse = JSON.parse(usuarioscad)

    var emailcad = req.body.emailcad
    var nomescad = req.body.nomescad
    var senhacad = req.body.senhacad

    const datauser = {
        id: idCounter++,
        email: emailcad,
        nome: nomescad,
        senha: senhacad
    }

    usuariosparse.push(datauser)

    fs.writeFile('./usuarios.json', JSON.stringify(usuariosparse), (error) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log('Usuário cadastrado com sucesso!');
        res.send('Usuário cadastrado com sucesso!');
    });
})

app.post('/tasks', (req, res) => {
    const { name } = req.body;
    const task = { id: listNum, name, done: false };
    tasks.push(task);
    listNum++;
  
    fs.writeFile('lista.json', JSON.stringify(tasks), (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
  

  app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, done } = req.body;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  
    if (taskIndex === -1) {
      res.sendStatus(404);
    } else {
      tasks[taskIndex].name = name || tasks[taskIndex].name;
      tasks[taskIndex].done = done !== undefined ? done : tasks[taskIndex].done;
  
      fs.writeFile('lista.json', JSON.stringify(tasks), (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
  
  app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  
    if (taskIndex === -1) {
      res.sendStatus(404);
    } else {
      tasks.splice(taskIndex, 1);
  
      fs.writeFile('lista.json', JSON.stringify(tasks), (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
  
  

