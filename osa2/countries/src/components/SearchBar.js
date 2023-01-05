const SearchBar = ({setSearch, setCountryToShow}) => {
  return (
    <>
      find countries <input onChange={event => {
        setCountryToShow(null)
        setSearch(event.target.value)
      }}/>
    </>
  )
}

export default SearchBar