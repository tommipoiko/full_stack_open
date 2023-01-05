import axios from 'axios'
import {useEffect, useState} from 'react'

const Weather = ({capital}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setTemp(response.data.main.temp)
        setWind(response.data.wind.speed)
        setIcon(response.data.weather[0].icon)
      })
  }, [])

  return (
    <>
      <p>temperature {temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='icon'/>
      <p>wind {wind} m/s</p>
    </>
  )
}

export default Weather