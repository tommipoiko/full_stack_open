import Weather from "./Weather"

const CountryInfo = ({country}) => {
  let langArr = []
  for (let lang in country.languages) {
    langArr.push(country.languages[lang])
  }
  langArr = langArr.sort()
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>{langArr.map(l => <li key={l}>{l}</li>)}</ul>
      <img src={country.flags.png} alt='flag'/>
      <Weather capital={country.capital}/>
    </>
  )
}

export default CountryInfo