const express = require('express')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const users = [
    {id:1,name:'yuria',age:17},
    {id:2,name:'max',age:20},
    {id:3,name:'oleg',age:30},
    {id:4,name:'kostia',age:45},
    {id:5,name:'taras',age:24},
    {id:6,name:'andriy',age:12},
    {id:7,name:'yuria',age:54},
    {id:8,name:'ira',age:55},
    {id:9,name:'roman',age:15},
    {id:10,name:'vlad',age: 67},
]

app.get('/users', (req, res) => {
    try {
        res.send(users)

    }catch(err) {
        res.status(500).send({error: err})
    }
})

app.get('/users/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const user = users.find(user => user.id === id)
        if (!user) {
             return res.status(404).send({error: 'user not found'})
        }
        res.send(user)
    }catch(err) {
        res.status(500).send({error: err.message})
    }
})

app.post('/users', (req, res) => {
    try {
        const {name,age} = req.body
        if (name.length < 3) {
            return res.status(400).send({error: 'name - must be at least 3 characters long'})
        }
        if (age < 0) {
            return res.status(400).send({error: 'age – not less than zero'})
        }
        const id = users[users.length-1].id + 1
        const newUser = {id,name,age}
        users.push(newUser)
        res.status(201).send(newUser)
    }catch (err){
        res.status(500).send({error: err.message})
    }
})
app.put('/users/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const userIndex = users.findIndex(user => user.id === id)
            if (userIndex === -1) {
                return res.status(404).send({error: 'users not found'})
            }
            const {name,age} = req.body
            users[userIndex].name = name
            users[userIndex].age = age
            res.status(200).send(users[userIndex])
    }catch(err){
        res.status(500).send({error: err.message})
    }
})

app.delete('/users/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex === -1) {
            return res.status(404).send({error: 'users not found'})
        }
        users.splice(userIndex, 1)
        res.sendStatus(204)
    }catch(err){
        res.status(500).send({error: err.message})
    }
})

app.listen(5000, () => {
    console.log('server running on http://localhost:5000');
})