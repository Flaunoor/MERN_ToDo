const mongoose = require('mongoose')

const Schema = mongoose.Schema


const thoughtSchema = new Schema ({
    title:{
        type: String,
        required : true
    },
    user_id:{
        type: String,
        required: true
    }

})


module.exports = mongoose.model('Thought',thoughtSchema)