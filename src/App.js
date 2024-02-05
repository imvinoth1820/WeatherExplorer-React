import { useEffect, useState } from 'react'
import './App.css';
// images
import searchIcon from './Assets/search.png'
import clearIcon from './Assets/sun.png'
import cloudIcon from './Assets/cloud.png'
import drizzleIcon from './Assets/drizzle.png'
import rainIcon from './Assets/rain.png'
import windIcon from './Assets/wind.png'
import snowIcon from './Assets/snowflake.png'
import humidityIcon from './Assets/humidity.png'

const WeatherDetails =({icon,temp,city,country,lat,log,humidity,wind})=>{
 return(
  <>
  <div className="image">
     <img src={icon} alt="Image" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>Longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="humidity" className='icon'/>
      <div className="data">
        <div className="humidity-percent">
          {humidity}%
        </div>
        <div className="text">Humidity</div>
      </div>
    </div>
    <div className="element">
      <img src={windIcon} alt="wind" className='icon'/>
      <div className="data">
        <div className="wind-percent">
          {wind}Km/hr
        </div>
        <div className="text">Wind Speed</div>
      </div>
    </div>
  </div>
  </>
 )
}


function App() {
  let api_key = "ef7c2c8b88d4ad7791a425d815cdde7a";
  const[text,setText] = useState("London")
  const[icon,setIcon] = useState(drizzleIcon)
  const[temp,setTemp] = useState(1)
  const[city,setCity] = useState("")
  const[country,setCountry] = useState("")
  const[lat,setLat] = useState(0)
  const[log,setLog] = useState(0)
  const[humidity,setHumidity] = useState(0)
  const[wind,setWind] = useState(0)
  const[cityNotFound,setCityNotFound] = useState(false)
  const[loading,setLoading] = useState(false)
  const[error,setError] = useState(null)


  const weatherIconMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon
  }

  const search = async ()=>{
    setLoading(true)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
     let res = await fetch(url)
     let data = await res.json()  
     if(data.cod === "404"){
      console.log("City not found")
      setCityNotFound(true)
      setLoading(false)
      return;
     }
     setHumidity(data.main.humidity)
     setWind(data.wind.speed)
     setTemp(Math.floor(data.main.temp))
     setCity(data.name)
     setCountry(data.sys.country)
     setLat(data.coord.lat)
     setLog(data.coord.lon)
     const weatherIconCode = data.weather[0].icon
     setIcon(weatherIconMap[weatherIconCode] || clearIcon)
     setCityNotFound(false);

    }catch(error){
      console.log("An Error Occured ",error.message)
      setError("An Error occured while fetching weather data.")
    }finally{
     setLoading(false)
    }
  };
  
  const handleCity =(event)=>{
      setText(event.target.value)
  }
  const handleKeyDown=(event)=>{
    if(event.key === "Enter"){
      search()
    }
  }


  useEffect(()=>{
    search()
  },[])


  return (
    <div className = "container">
        <div className = "input-container">
          <input type="text"  
          className = "cityInput"
          placeholder = "Search City" onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={()=> search()}>
           <img src={searchIcon} alt="Search" className="search"/>
          </div>
          </div> 
         

           
           {loading && <div className='loading-message'>
           Loading...
           </div> }
           {error && <div className='error-message'>
           {error}
           </div>}
          {cityNotFound && <div className='city-not-found'>
                City not found
              </div> }

             {!loading && !cityNotFound && <WeatherDetails icon = {icon} temp = {temp} city={city} country = {country} lat={lat} log={log} humidity={humidity} wind={wind}/> }

          <p className='copyright'>
            Designed by<span>	&#169; Vinoth Kumar R</span>
          </p>
    </div>
  );
}

export default App;
