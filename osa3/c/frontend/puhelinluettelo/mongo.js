const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('provide connection password')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ottofreund:${password}@cluster0.dnspmoq.mongodb.net/numbers?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const numberSchema = new mongoose.Schema({
    number: String,
    name: String
})

const Number = mongoose.model('Number', numberSchema)

if (process.argv.length >= 5) { //parameters for new entry provided
    const newNumber = new Number({
        number: process.argv[4],
        name: process.argv[3]
    })
    newNumber.save().then(result => {
        console.log("New number added")
        mongoose.connection.close()
    })
} else { //log the contents of db
    Number.find({}).then(result => {
    result.forEach(num => {
        console.log(num)
    })
    mongoose.connection.close()
})
}



