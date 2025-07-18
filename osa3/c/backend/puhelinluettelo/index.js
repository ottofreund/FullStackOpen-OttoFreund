require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
const Number = require('./models/number')

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

app.get('/api/persons', (request, response) => {
  Number.find({}).then(numbers => {
    return response.json(numbers)
  })
} )

app.get('/api/info', (request, response, next) => {
  Number
    .find({})
    .then(docArr => {
      const entryCount = docArr.length
      const dateText = new Date().toUTCString()
      const countText = `Phonebook has info for ${entryCount} people`
      response.send(
        `<div><h2>${countText}</h2><h2>${dateText}</h2></div>`
      )
    })
    .catch(err => next(err))
  
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Number
    .findById(id)
    .then(document => {
      if (document) {
        return response.json(document)
      } else {
        return response.status(400).send({error: "No number found with ID"})
      }
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Number
    .findByIdAndDelete(id)
    .then(document => {
      if (document) {
        response.status(204).end()
      } else {
        response.status(400).send({error: "No number with such ID in db"})
      }
    })
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).send({error: "Provide a number and a name"})
  }

  
  //check if name already exists in phonebook
  Number.findOne({name: body.name}).then( sameNamed => {
    if (sameNamed) {
      //reroute to PUT with id to modify existing one
      const id = sameNamed.id
      response.redirect(307, `/api/persons/${id}`)
    } else {
      //wasn't in phonebook so new number
      const newNumber = new Number({
        name: body.name,
        number: body.number
      })
      newNumber.save()
        .then(savedNum => response.json(savedNum))
        .catch(err => next(err))
    }
  })  
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).send({error: "Provide a number and a name"})
  }

  Number.findByIdAndUpdate(id, {number: body.number})
    .then(oldDocument => {
      if (oldDocument) { //was already in phonebook and is now updated
        return response.json(oldDocument)
      } else { //id wasn't in phonebook
        return response.status(400).send({error: "No number with such ID"})
      }
    })
    .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: "unknown endpoint"})
} 

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({error: "Given ID is of wrong format"})
  }
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)