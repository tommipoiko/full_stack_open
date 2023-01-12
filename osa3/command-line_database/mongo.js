const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

if (process.argv.length < 3) {
  console.log('Enter at the very least a password!')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://tommipoiko:${password}@cluster0.9uye7nr.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  mongoose
    .connect(url)
    .then((result) => {
      const person = new Person({
        name: name,
        number: number
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
} else if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
    })
} else {
  console.log('Wrong amount of parameters!')
  process.exit(1)
}
