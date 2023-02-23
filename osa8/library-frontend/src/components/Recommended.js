import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

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

  const books = result.data.allBooks
  const favGenre = me.data.me.favouriteGenre
  const shownBooks = books.filter(b => b.genres.includes(favGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {favGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {shownBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
