const mongoose = require('mongoose')

const Todo = require('../models/todosModel') 



// get all todos
const getTodos = async(req,res) =>{

    const user_id = req.user._id
    const todos = await Todo.find({user_id}).sort({createdAt:-1})
    res.status(200).json(todos)
}

// get a single todo
const getSingleTodo = async(req,res) =>{
    const { id } = req.params
    // check if the id is balid in term of mongoose 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such todo'})
    }
    const singleTodo = await Todo.findById(id)  

    if(!singleTodo){
        return res.status(404).json({error: 'no such todo'})
    }
    res.status(200).json(singleTodo)
}

// create a new todo 
const createTodo = async(req,res)=> {

    const {title, type, priority, hours} = req.body

    // empty feilds check______________
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!type){
        emptyFields.push('type')
    }
    if(!priority){
        emptyFields.push('priority')
    }
    if(!hours){
        emptyFields.push('hours')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    //_______________________________End

    
    // add task to db 
    try{
        const user_id = req.user._id
        const todo = await Todo.create({title, type, priority, hours, user_id})
        res.status(200).json(todo)

    }catch(error){
        res.status(400).json({error: error.message})
    }

}

// delete a todo 
const deleteTodo = async(req,res) =>{
    const { id } = req.params
    // check if the id is balid in term of mongoose 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such todo'})
    }
    const todo = await Todo.findOneAndDelete({_id: id})

    if(!todo){
        return res.status(404).json({error: 'no such todo'})
    }
    res.status(200).json(todo)

}


// update a todo 

const updateTodo = async(req,res) =>{
    const { id } = req.params
    // check if the id is balid in term of mongoose 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such todo'})
    }
    const updatedTodo = await Todo.findOneAndUpdate({_id : id}, {
        ...req.body
    })

    if(!updatedTodo){
        return res.status(404).json({error: 'no such todo'})
    }
    res.status(200).json(updatedTodo)
}

module.exports = {
    createTodo,
    getTodos,
    getSingleTodo,
    deleteTodo,
    updateTodo

}