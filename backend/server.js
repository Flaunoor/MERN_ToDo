require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const todosRoutes = require('./routes/todos')
const userRoutes = require('./routes/user')
const thoughtRoutes= require('./routes/thoughts')

// express app
const app = express()

//middleware
app.use(express.json()) // catch any data sent too the server and attach it to express

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
}) 


//Routes
app.use('/api/todos',todosRoutes)
app.use('/api/user',userRoutes)
app.use('/api/thought',thoughtRoutes)


//connect to db
mongoose.connect(process.env.MONG_URI)
  .then(()=>{
    //Listen for requests
    app.listen(process.env.PORT, () => {
        console.log("connecting to the db & listening on port",process.env.PORT)
    })
  })
  .catch((error)=>{
    console.log(error)
})
