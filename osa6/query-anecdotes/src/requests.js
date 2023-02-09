import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newA =>
  axios.post(baseUrl, newA).then(res => res.data)

export const updateAnecdote = newA =>
  axios.put(`${baseUrl}/${newA.id}`, newA)
