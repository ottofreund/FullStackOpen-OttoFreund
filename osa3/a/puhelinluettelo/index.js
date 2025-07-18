const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())

//define token for morgan request logger
//body token, which displays POSTed js-object stringified
morgan.token("body", (req, res) => {
  //only for post method
  if (req.method === 'POST') {
    return JSON.stringify(req.body)  
  } else {
    return ""
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:", request.path)
  console.log("Body:", request.body)
  next()
}

//app.use(requestLogger)

let notes = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(notes)
} )

app.get('/api/info', (request, response) => {
  const entryCount = notes.length
  const dateText = new Date().toUTCString()
  const countText = `Phonebook has info for ${entryCount} people`
  response.send(
    `<div><h2>${countText}</h2><h2>${dateText}</h2></div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const personObj = notes.find(note => note.id === id)
  if (personObj) {
    return response.json(personObj)
  } else {
    return response.status(404).send({error: 'unknown endpoint'})
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(n => n.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  //validate input: check that name and number defined, and name not already in phonebook
  const nameAddedAlready = notes.some(person => 
    person.name === body.name
  )
  if (nameAddedAlready) {
    return response.status(400).send({error: "Name already in phonebook"})
  } else if (!body.name || !body.number) {
    return response.status(400).send({error: "Person's name and/or number missing"})
  }
  
  const newPersonObj = {
    name: body.name,
    number: body.number,
    id: String(Math.round(Math.random() * 100000))
  } 

  notes = notes.concat(newPersonObj)
  response.json(newPersonObj)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: "unknown endpoint"})
} 

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)