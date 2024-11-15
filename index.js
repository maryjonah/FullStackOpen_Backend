require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

const cors = require('cors')
app.use(cors())


const Person = require('./models/person')

app.get('/', (request, response) => {
    response.send('<h1>Hello, welcome to the assignment</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => response.json(people))
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br /> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(result => response.json(result))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(request.body === undefined){
        response.status(400).json({error: 'missing data'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => response.json(savedPerson))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(personId => response.status(204).end())
        .catch(error => console.log(error.message))
})


const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
