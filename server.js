const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json())

let tasks = [];
let currentId = 1;

app.post("/tasks", (request, response)=>{
    let bodyRequest = request.body
    let newTask = {
        id: currentId++,
        titulo: bodyRequest.titulo,
        descricao: bodyRequest.descricao,
        status: bodyRequest.status
    }

    tasks.push(newTask)
    response.status(200).json({message: "tarefa criada com sucesso", newTask})
})

app.get("/tasks", (request, response)=>{
    return response.status(200).json(tasks);
})

app.get("/tasks/:id", (request, response)=>{
    let idRequest = request.params.id

    const tasksEncontrada = tasks.find((tarefa) => tarefa.id == idRequest)

    if(!tasksEncontrada) {
        return response.status(404).json({message: "Tarefa não encontrada"});
    }



    return response.status(200).json(tasksEncontrada);
})

app.delete("/tasks/:id", (request, response)=>{
    let idRequest = request.params.id

    const tasksEncontrada = tasks.find((tarefa) => tarefa.id == idRequest)

    if(!tasksEncontrada) {
        return response.status(404).json({message: "Tarefa não encontrada"});
    }

    const tasksEncontradaIndex = tasks.findIndex((tarefa) => tarefa.id == idRequest)
    tasks.splice(tasksEncontradaIndex, 1)

    return response.status(200).json({message: "Tarefa deletada",tasksEncontrada});
})

app.put("/tasks/:id", (request, response)=>{

    let idRequest = request.params.id
    let bodyRequest = request.body

    const tasksEncontrada = tasks.find((tarefa) => tarefa.id == idRequest)

    if(tasksEncontrada === -1) {
        return response.status(404).json({message: "Tarefa não encontrada"});
    }

    let tarefaAtualizada = tasks[tasksEncontrada]
    tarefaAtualizada = {
        id: idRequest++,
        titulo: bodyRequest.titulo,
        descricao: bodyRequest.descricao,
        status: bodyRequest.status
    }

    return response.status(200).json({message: "Tarefa atualizada", tarefaAtualizada});
})

app.listen(PORT, ()=>{
    console.log("Sevidor subiu na porta 3000");
})

