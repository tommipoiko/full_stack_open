import APIHandler from "./APIHandler"

const PersonDisplay = ({name, number, persons, setPersons}) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${name}?`)) {
      APIHandler.remove(name)
      setPersons(persons.filter(p => p.name !== name))
    }
  }

  return (
    <div>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const Phonebook = ({persons, filter, setPersons}) => {
    let arr = persons
    let f = filter.toLowerCase()
    if (f !== '') {
      arr = arr.filter((person) => person.name.toLowerCase().startsWith(f))
    }

    return (
      <>
        {arr.map(person => {
            return (
              <PersonDisplay key={person.name} name={person.name} number={person.number} persons={persons} setPersons={setPersons}/>
            )
        })}
      </>
    )
  }

export default Phonebook