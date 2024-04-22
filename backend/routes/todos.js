const express = require('express')
const {createTodo,
       getTodos,
       getSingleTodo,
       deleteTodo,
       updateTodo
      } = require('../controlles/todosControllers')

const requireAuth = require('../middlewar/requireAuth')

const router = express.Router()

//require authentification

router.use(requireAuth)

// get all todos
router.get('/', getTodos)

// get single todo 
router.get('/:id', getSingleTodo)

//post a todo task
router.post('/', createTodo)

//delete a task 
router.delete('/:id', deleteTodo)

// update a todo

router.patch('/:id', updateTodo)

module.exports = router