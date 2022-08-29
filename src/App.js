import logo from './logo.svg';
import './App.css';
import Search from './components/search/search.js';
import CurrentCity from './components/currentCity/currentCity';
import { WEATHER_API_KEY, WEATHER_API_URL, WEATHER_FORECAST_API_URL, GEO_API_URL, geoApiOptions } from './api.js';
import { useState } from 'react';
import Forecast from './components/Forecast/forecast';



function App() {



  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const [AlgTime, setTime] = useState(new Date().toLocaleTimeString().slice(0, 5));
  const [AlgDate, setDate] = useState(new Date().toLocaleDateString('en-us', options));
 

  setInterval(function () {
    setTime(new Date().toLocaleTimeString().slice(0, 5))
  }, 2000);
  setInterval(function () {
    setDate(new Date().toLocaleDateString('en-us', options))
  }, 3600000);


  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  

  const handleOnSearchChange = (searchData) => {
    var latitude = searchData.value.split(" ")[0];
    var longitude = searchData.value.split(" ")[1];
    var cityId = searchData.cityId;
    console.log("city id is: "+cityId);

    /*récuperer les informations de l'API avec fetch.*/
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_FORECAST_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
    const timeFetch = fetch(`${GEO_API_URL}/cities/${cityId}/dateTime`, geoApiOptions)

    /*mettre à jour les informations après que currentWeather change*/
    /*attendre des informations*/
    /*utilisation des Hooks pour sauvegarder les informations*/
    Promise.all([currentWeatherFetch, timeFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const timeResponse = await response[1].json();
        const forecastResponse = await response[2].json();

        //console.log(weatherResponse)
        //console.log(timeResponse)
        //console.log(forecastResponse)
        
        
        setCurrentWeather({ city: searchData.label, time: timeResponse, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        

      }).catch((err) => console.log(err));

      
  }
  //console.log(timeCity);



  return (
    <>
      <nav className="navbar">
        <a className="navbar-brand" href="#">
          <img src="https://img.icons8.com/color/48/000000/partly-cloudy-day--v1.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
          <span>{AlgDate}</span>
        </a>
        <span className="welcome-message" style={ !currentWeather ? {display:"inline"} : {display:"none"}}> Please enter your citie name to start : </span>
        <span className="local-time"> Algiers, Algeria {AlgTime} </span>
      </nav>
      <div className="App">
        <div className='app-container'>
          <div className='app-left col'>
            <Search onSearchChange={handleOnSearchChange} />
            {currentWeather && <CurrentCity data={currentWeather} />}
          </div>
          <div className='app-right col-12 col-md-8'>
            {forecast && <Forecast data={forecast} />}
            
          </div>
        </div>

      </div>
      <footer>
        <p className="copyright">&copy; Nada Farah Amrouche, Aug. 2022 </p>
      </footer>
    </>
  );
}

export default App;
