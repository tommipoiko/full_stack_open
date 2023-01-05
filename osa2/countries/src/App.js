import axios from 'axios'
import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import Display from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [countryToShow, setCountryToShow] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <SearchBar setSearch={setSearch} setCountryToShow={setCountryToShow}/>
      <Display search={search} countries={countries} countryToShow={countryToShow} setCountryToShow={setCountryToShow}/>
    </div>
  )
}

export default App