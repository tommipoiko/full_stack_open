const Phonebook = ({persons, filter}) => {
    let arr = persons.filter(person => person.name.toLowerCase().startsWith(filter))

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