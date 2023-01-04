const NewNumbers = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    const checkValues = (event) => {
      event.preventDefault()
      let arr = persons.filter(person => person.name === newName)
      arr = arr.concat(persons.filter(person => person.number === newNumber))
      if (arr.length === 0) {
        setPersons(persons.concat({name: newName, number: newNumber}))
      } else {
        alert(`${newName} or ${newNumber} is already added to phonebook`)
      }
    }
  
    return (
      <>
        <form onSubmit={checkValues}>
          <div>name: <input onChange={event => setNewName(event.target.value)}/></div>
          <div>number: <input onChange={event => setNewNumber(event.target.value)}/></div>
          <div><button type="submit">add</button></div>
        </form>
      </>
    )
  }

export default NewNumbers