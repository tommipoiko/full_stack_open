import APIHandler from './APIHandler'

const NewNumbers = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, successMsg, setSuccessMsg}) => {
    const checkValues = (event) => {
      event.preventDefault()
      let arr = persons.filter(person => person.name === newName)
      let person = {name: newName, number: newNumber}
      if (arr.length === 0) {
        APIHandler.create(person).then(() => {
          APIHandler.getAll().then(response => setPersons(response.data))
          setSuccessMsg(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMsg(null)
          }, 3000)
        }).catch(() => {
          console.log("Some error occurred")
        })
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
          let p = persons.find(p => p.name === newName)
          APIHandler.update(p.id, newName, newNumber).then(() => {
            setPersons(persons.filter(p => p.name !== newName).concat({id: p.id, name: newName, number: newNumber}))
            setSuccessMsg(`Updated ${newName}`)
            setTimeout(() => {
              setSuccessMsg(null)
            }, 3000)
          })
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