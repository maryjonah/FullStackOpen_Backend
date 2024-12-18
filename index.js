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

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => { response.json(`Phonebook has info for ${count} people ${new Date()}`)})
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(result => response.json(result))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(request.body === undefined){
        response.status(400).json({ error: 'missing data' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save()
        .then( savedPerson => response.json(savedPerson) )
        .catch( error => next(error) )
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
        .then( updatedPerson => response.json(updatedPerson) )
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})


// middleware handler for error requests
const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.data.error.includes('Number must consist of two parts that are separated by -')) {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
