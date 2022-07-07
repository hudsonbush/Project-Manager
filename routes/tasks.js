const express = require('express')
const router = express.Router()
const Task = require('../models/task')

//all tasks route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    try{
        const tasks = await Task.find(searchOptions)
        res.render('tasks/index', { 
            tasks: tasks, 
            searchOptions : req.query
        })
    } catch {
        res.redirect('/')
    }
})

//new task
router.get('/new', (req, res) => {
    res.render('tasks/new', { task: new Task() })
})

//create task route 
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title
    })
    try{
        const newTask = await task.save()
        //res.redirect(`tasks/${newTask.id}`)
        res.redirect(`tasks`)
    } catch {
        res.render('tasks/new', {
        task: task,
        errorMessage: 'Error creating Task, uh oh spaghettios'
        })
    }
})

module.exports = router