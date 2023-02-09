import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const a = await anecdoteService.getAll()
    let votedAnecdote = a.find(n => n.id === id)
    votedAnecdote.votes += 1
    votedAnecdote = await anecdoteService.update(votedAnecdote)
    dispatch(setAnecdotes(a.map(n => n.id !== id ? n : votedAnecdote)))
  }
}

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer