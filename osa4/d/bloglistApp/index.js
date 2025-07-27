const config = require('./utils/config')
const express = require('express')
const app = require('./app')

const PORT = config.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})