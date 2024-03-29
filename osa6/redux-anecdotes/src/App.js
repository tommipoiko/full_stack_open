import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteList from './components/AnecdoteList'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
    </div>
  )
}

export default App