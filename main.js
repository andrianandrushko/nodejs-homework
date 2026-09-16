const express = require('express')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const users = [
    {id:1,name:'yuria',surname:'stepanenko'},
    {id:2,name:'max',surname:'yurchenko'},
    {id:3,name:'oleg',surname:'glushko'},
    {id:4,name:'kostia',surname:'roman'},
    {id:5,name:'taras',surname:'melnyk'},
    {id:6,name:'andriy',surname:'ivanchenko'},
    {id:7,name:'yuria',surname:'stepanenko'},
    {id:8,name:'ira',surname:'prokopchuk'},
    {id:9,name:'roman',surname:'manuk'},
    {id:10,name:'vlad',surname:'vovk'},
]

app.get('/users', (req, res) => {
    try {
        res.send(users)
    }catch(err) {
        res.status(500).send({error: err.message})
    }
})

app.get('/users/:id', (req, res) => {
    try {

    }
})

app.listen(5000, () => {
    console.log('server running on http://localhost:5000');
})