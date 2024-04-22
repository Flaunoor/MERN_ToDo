const mongoose = require('mongoose')

const Thought = require('../models/thoughtModel')



// get all thoughts
const getThoughts = async(req,res) =>{

    const user_id = req.user._id   // get the user
    const thoughts = await Thought.find({user_id}).sort({createdAt:-1})
    res.status(200).json(thoughts)

}

//get Single Thought 

const getSingleThought = async(req,res) =>{

    const { id } = req.params
    // check if the id is valid in term of mongoose 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such thought'})
    }
    const singleThought = await Thought.findById(id)  

    if(!singleTodo){
        return res.status(404).json({error: 'no such thought'})
    }
    res.status(200).json(singleThought)
}


// create new thought 

const createThought= async(req,res)=> {

    const {title} = req.body

    // empty feilds check______________
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    //_______________________________End

    
    // add task to db 
    try{
        const user_id = req.user._id
        const thought = await Thought.create({title, user_id})
        res.status(200).json(thought)

    }catch(error){
        res.status(400).json({error: error.message})
    }

}

const deleteThought = async(req,res) =>{
    const { id } = req.params
    // check if the id is balid in term of mongoose 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such thought'})
    }
    const thought = await Thought.findOneAndDelete({_id: id})

    if(!thought){
        return res.status(404).json({error: 'no such thought'})
    }
    res.status(200).json(thought)

}




module.exports = {
   getThoughts,
   getSingleThought,
   createThought,
   deleteThought

}