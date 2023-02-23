import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"
import FilteredBooks from "./FilteredBooks"

const Recommended = (props) => {
  const result = useQuery(ALL_BOOKS)
  const me = useQuery(ME)

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (me.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const favGenre = me.data.me.favouriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {favGenre}</p>
      <FilteredBooks genre={favGenre} />
    </div>
  )
}

export default Recommended
