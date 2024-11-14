require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

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

app.delete('/api/persons/:id', (request, response) => {
    const personId = request.params.id 
    persons = persons.filter(person => person.id != personId)
    response.status(204).end()
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
    // const nameExists = persons.some(person => person.name === request.body.name)
    
    // if(!body.name || !body.number) {
    //     return response.status(400).json({"error": "missing required name or number data"})
    // }else if(nameExists) {
    //     return response.status(400).json({"error": "Sorry, name already exists in phonebook"})
    // }
    
    // const newPerson = {
    //     id: generatePersonId(),
    //     name: body.name,
    //     number: body.number
    // }

    // persons = persons.concat(newPerson)
    // response.json(newPerson)
})


const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
