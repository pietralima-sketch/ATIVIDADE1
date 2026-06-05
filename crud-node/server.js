const express = require("express");
const alunos = require("./dados");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

//read - listar alunos

app.get("/alunos",(req,rest)=> {
    rest.json(alunos); 
});

//create- cadastrar aluno

app.post("/alunos",(req,res)=> {
    const novoAluno = {
        id: Date.now(),
        nome: req.body.nome,
        curso:req.body.curso,
        idade: req.body.idade
    };

    alunos.push(novoAluno);
    res.json(novoAluno);
});

//update - atualizar aluno

app.put("/alunos/:id", (req,res)=>{
    const id = Number(req.params.id);

    const aluno = alunos.find(a => a.id === id);

    if(!aluno) {
        return res.status(404).json({mensagem:"aluno nao encontrado"});
    }

    aluno.nome = req.body.nome;
    aluno.curso = req.body.curso;
    aluno.idade = req.body.idade

    res.json(aluno);
});

//delete - excluir aluno

app.delete("/aluno/:id",(req,res)=>{
    const id = number(req.params.id);

    const indice = alunos.findIndex(a => a.id === id);

    if(indice === -1) {
        return res.status(404).json({mensagem:"aluno nao encontrado"});
    }

    alunos.splice(indice ,1);

    res.json({mensagem:"aluno excluido com sucesso"});
});

app.listen(PORT,()=>{
    console.log(`servidor rodando em http://localhost:${PORT}`);
})