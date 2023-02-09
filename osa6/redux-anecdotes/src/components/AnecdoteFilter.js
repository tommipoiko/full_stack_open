import { useDispatch } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const setFilter = (event) => {
    event.preventDefault()
    const f = event.target.value
    dispatch(filterAction(f))
  }

  return (
    <div>
      filter<input name="filter" onChange={setFilter} type='text' />
    </div>
  )
}

export default AnecdoteFilter