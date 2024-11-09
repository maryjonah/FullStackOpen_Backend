const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br /> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const personId = request.params.id
    const person = persons.find(person => person.id === personId)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const personId = request.params.id 
    persons = persons.filter(person => person.id != personId)
    response.status(204).end()
})

const generatePersonId = () => {
    const curMaxId = persons.length > 0 ? Math.max(...persons.map(person => Number(person.id))) : 0
    return curMaxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const newPerson = {
        id: generatePersonId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})


const PORT=3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
