const express = require('express')
const {
        getThoughts,
        getSingleThought,
        createThought,
        deleteThought
      } = require('../controlles/thoughtsController')

const requireAuth = require('../middlewar/requireAuth')

const router = express.Router()

//require authentification

router.use(requireAuth)

// get all todos
router.get('/', getThoughts)

// get single todo 
router.get('/:id', getSingleThought)

//post a todo task
router.post('/', createThought)

//delete thought
router.delete('/:id', deleteThought)

module.exports = router