const express = require('express')
const path = require('path')
const cors = require('cors');
const port = process.env.PORT || 5000
const app = new express()

app.set('view engine','ejs')

app.use(cors());
app.use(express.json())

let todos = [
    {id:1,title:'Todo1',description:'Get grocieries'},
    {id:2,title:'Todo2',description:'Make food'},
    {id:3,title:'Todo3',description:'Go to work'}
]
app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.get('/api/todos',(req,res)=>{
    return res.send(todos)
})

app.get('/api/todos/:id',(req,res)=>{
    if(req.params.id > todos.length){
        return res.status(404).send("Task not found")
    }
    const task = todos.find(e=>{return e.id == req.params.id})
    console.log(todos)
    return res.send(task)

})

app.post('/api/todos',(req,res)=>{
    let task = {
        id:todos.length+1,
        title:req.body.title,
        description:req.body.description
    }

    todos.push(task)
    console.log(todos)
    return res.send("Task added Successfully")
})


app.put('/api/todos/:id',(req,res)=>{
    const task = todos.find(e=>{return e.id == req.params.id})
    task.title = req.body.title
    task.description = req.body.description
    console.log(todos)
    return res.send(`Modified task ${req.params.id} Successfully`)
})

app.delete('/api/todos/:id',(req,res)=>{
    todos = todos.filter(e=>{return e.id != req.params.id})
    console.log(todos)
    return res.send(`Deleted task ${req.params.id} Successfully`)
})

app.listen(port)
