import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState('')

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const handleGenreClick = (g) => {
    if (g === genreFilter || g === 'all genres') {
      setGenreFilter('')
    } else {
      setGenreFilter(g)
    }
  }

  const books = result.data.allBooks
  const temp = [...new Set(books.map(b => b.genres))]
  const genres = [...new Set(temp.map(b => b[0]))]
  const shownBooks = genreFilter ? books.filter(b => b.genres.includes(genreFilter)) : books

  return (
    <div>
      <h2>books</h2>
      {genres.map(g => (
        <button
          key={g}
          value={g}
          onClick={e => handleGenreClick(e.target.value)}
          >
            {g}
        </button>
      ))}
      <button
        key={'all genres'}
        value={'all genres'}
        onClick={e => handleGenreClick('all genres')}
        >
          all genres
      </button>
      {genreFilter !== '' ? (
        <p>in genre {genreFilter}</p>
      ) : (
        null
      )}
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

export default Books
