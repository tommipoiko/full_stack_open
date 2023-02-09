import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
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