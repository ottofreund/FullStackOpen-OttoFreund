const config = require('./utils/config')
const express = require('express')
const blogsRouter = require('./controllers/blogs')
const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)


const PORT = config.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})