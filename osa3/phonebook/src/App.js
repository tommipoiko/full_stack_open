import { useState, useEffect } from 'react'
import APIHandler from './components/APIHandler'
import NewNumbers from './components/NewNumbers'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import SuccessMsg from './components/SuccessMsg'
import ErrorMsg from './components/ErrorMsg'
import './style.css'

const App = () => {
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    APIHandler.getAll().then(response => setPersons(response.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>add a new</h3>
      <NewNumbers persons={persons} setPersons={setPersons}
                  newName={newName} setNewName={setNewName}
                  newNumber={newNumber} setNewNumber={setNewNumber}
                  successMsg={successMsg} setSuccessMsg={setSuccessMsg}/>
      <SuccessMsg message={successMsg}/>
      <ErrorMsg message={errorMsg}/>
      <h3>Numbers</h3>
      <Phonebook persons={persons} filter={filter} setPersons={setPersons} setErrorMsg={setErrorMsg}/>
    </div>
  )
}

export default App