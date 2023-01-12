import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  return (axios.get(baseUrl))
}

const create = newObject => {
  return (axios.post(baseUrl, newObject))
}

const remove = id => {
  return (axios.delete(`${baseUrl}/${id}`))
}

const update = (id, name, number) => {
  return (axios.put(`${baseUrl}/${id}`, {name: name, number: number}))
}

export default {getAll, create, remove, update}