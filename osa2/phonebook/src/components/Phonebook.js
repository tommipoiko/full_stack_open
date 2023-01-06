import APIHandler from "./APIHandler"

const PersonDisplay = ({name, number, persons, setPersons, setErrorMsg}) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${name}?`)) {
      let person = persons.find(p => p.name === name)
      APIHandler.remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.name !== name))
        })
        .catch(error => {
          setErrorMsg(`Information ${name} has already been removed from server`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 3000)
        })
    }
  }

  return (
    <div>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const Phonebook = ({persons, filter, setPersons, setErrorMsg}) => {
    let arr = persons
    let f = filter.toLowerCase()
    if (f !== '') {
      arr = arr.filter((person) => person.name.toLowerCase().startsWith(f))
    }

    return (
      <>
        {arr.map(person => {
            return (
              <PersonDisplay key={person.name}
              name={person.name} number={person.number}
              persons={arr} setPersons={setPersons}
              setErrorMsg={setErrorMsg}/>
            )
        })}
      </>
    )
  }

export default Phonebook