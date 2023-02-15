import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const options = authors.map(a => {
    return ({value: a.name, label: a.name})
  })

  const submit = async (event) => {
    event.preventDefault()

    const intBorn = parseInt(born)
    const p = {name: name.value, setBornTo: intBorn}
    editAuthor({variables: p})

    setName(null)
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
