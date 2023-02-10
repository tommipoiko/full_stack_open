import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from 'react-query'
import {useContext} from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newA) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({type: "CREATE", payload:`Created ${newA.content}`})
      setTimeout(() => {
        notificationDispatch({type: "REMOVE"})
      }, 3000)
    },
    onError: () => {
      notificationDispatch({type: "CREATE", payload:"The content has to be atleast 5 characters long"})
      setTimeout(() => {
        notificationDispatch({type: "REMOVE"})
      }, 3000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content: content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
