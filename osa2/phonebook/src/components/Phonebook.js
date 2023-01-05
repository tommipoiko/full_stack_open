const Phonebook = ({persons, filter}) => {
    let arr = persons
    let f = filter.toLowerCase()
    if (f !== '') {
      arr = arr.filter((person) => person.name.toLowerCase().startsWith(f))
    }
    return (
      <>
        {arr.map(person => {
            return (
              <p key={person.name}>{person.name} {person.number}</p>
            )
        })}
      </>
    )
  }

export default Phonebook