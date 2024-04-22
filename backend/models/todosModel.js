const mongoose = require('mongoose')

const Schema = mongoose.Schema


const todosSchema = new Schema({
    title:{
        type: String,
        required : true
    },
    type:{
        type: String,
        required : true
    },
    priority:{
        type: String,
        required : true
    },
    hours:{
        type: Number,
        required : true
    },
    user_id:{
        type: String,
        required: true
    }

}, {timestamps:true})


module.exports = mongoose.model('Todo',todosSchema)