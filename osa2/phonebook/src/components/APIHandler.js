import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = (name) => {
  getAll().then(response => {
    let person = response.data.find(p => p.name === name)
    axios.delete(`${baseUrl}/${person.id}`)
  })
}

const update = person => {
  getAll().then(response => {
    let newPerson = response.data.find(p => p.name === person.name)
    axios.put(`${baseUrl}/${newPerson.id}`, person)
  })
}

export default {getAll, create, remove, update}