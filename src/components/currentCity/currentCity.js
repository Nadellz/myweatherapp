
import './currentCity.css';
import { useState } from 'react';

function CurrentCity({data}) {

    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    
    //var test = new Date(data.time.data.slice(0,23));
    var timer = data.time.data.slice(11,16);
    var dater = new Date(data.time.data.slice(0,10)).toDateString('en-us', options)
    var [day,month,num]=[dater.split(" ")[0],dater.split(" ")[1],dater.split(" ")[2]];
 
    

   
   
     
    
    
    
 
 return(
    <div className='border current-city'>
        <div className="top">
            <div>
                <p className='city-name'>{data.city}</p>
                <p className='weather-description'><strong>{data.weather[0].description}</strong>
                
                <span className="weather-date small " >  {day} {num}, {month}  </span>
                </p>
                
                

            </div>
            <img alt="weather-icon" src={`icons/${data.weather[0].icon}.png`}/>
        </div>
        <div className='bot'>
            <div>
                <div className="degree">{Math.round(data.main.temp)}°C</div>
               
            </div>
            <div className='current-city-informations'>
                <div className="informations-name">
                    <ul>
                            <li>Details</li>
                            <li>Feels like</li>
                            <li>Wind</li>
                            <li>Humidity</li>
                            <li>Pressure</li>
                            
                    </ul>
                </div>
                <div className="informations-content">
                    <ul>
                        <br></br>
                        <li>{Math.round(data.main.feels_like)}°C</li>
                        <li>{data.wind.speed} m/s</li>
                        <li>{data.main.humidity}%</li>
                        <li>{data.main.pressure} hPa</li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
 )
}

export default CurrentCity;
