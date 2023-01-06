import APIHandler from './APIHandler'

const NewNumbers = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, successMsg, setSuccessMsg}) => {
    const checkValues = (event) => {
      event.preventDefault()
      let arr = persons.filter(person => person.name === newName)
      let person = {name: newName, number: newNumber, id: persons.length+1}
      if (arr.length === 0) {
        setPersons(persons.concat(person))
        APIHandler.create(person)
        setSuccessMsg(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMsg(null)
        }, 3000)
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
          setPersons(persons.filter(p => p.name !== newName).concat(person))
          APIHandler.update(person)
          setSuccessMsg(`Updated ${newName}`)
          setTimeout(() => {
            setSuccessMsg(null)
          }, 3000)
        }
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