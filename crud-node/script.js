const { json } = require("express");

const form = document.getElementById("formaAluno");
const listaAlunos = document.getElementById("listaAlunos");

const inputId = document.getElementById("id");
const inputNome = document.getElementById("nome");
const inputCurso = document.getElementById("curso");
const inputIdade = document.getElementById("idade");

//read

async function listarAlunos() {
    const resposta = await fetch("/alunos");
    const alunos = await resposta.json();

    listaAlunos.innerHTML= "";

    alunos.forEach(aluno => {
        listaAlunos.innerHTML +=`
        <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.idade}</td>
        <td>
        <button class="btn-editar" onclick="editarAluno(${aluno.id}, '${aluno.nome}', '${aluno.curso}', ${aluno.idade})">
        editar
        </button>
        
        <button class="btn-excluir" onclick="excluirAluno(${aluno.id})">
        excluir
        </button>
        </td>
        </tr>
        `;
    }); 
}

//create e update

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const aluno = {
       nome:inputNome.value,
        curso:inputCurso.value,
        idade:inputIdade.value 
    };

    if (inputId.value) {
        await fetch(`/alunos/${inputId.value}`,{
            method:"PUT",
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify(aluno)
        });

    }else{
    await fetch("alunos", {
        method:"POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(aluno)
    });  }
    
    
form.reset();
inputId.value = "";
listarAlunos();
});

//delete

async function excluirAluno(id) {
    await fetch(`/alunos/${id}`,{
        method:"DELETE"
    });

    listarAlunos();
}