import CountryInfo from "./CountryInfo"

const Display = ({search, countries, countryToShow, setCountryToShow}) => {
  const c = countries.filter(country => {
    return (
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
  }).sort((a, b) => {
    return (a.name.common < b.name.common ? -1 : 1)
  })

  if (search === '') {
    return (<p>Search something</p>)
  } else if (c.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if (1 < c.length && c.length < 10) {
    if (countryToShow !== null) {
      return (<CountryInfo country={countryToShow}/>)
    }
    return (
      <>
        {c.map(country => {
          let name = country.name.common
          return (
            <div key={name}>
              {name} <button onClick={event => setCountryToShow(country)}>show</button>
            </div>
          )
        })}
      </>
    )
  } else {
    return (<CountryInfo country={c[0]}/>)
  }
}

export default Display