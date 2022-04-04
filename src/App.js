import React, {useState} from 'react'
import weather  from './weatherresult';
import './App.css';

function App() {
  const APP_KEY="d342e30f23634ddd8fc173656211612"
  let cityinput=""
  const [weatherdata,setweatherdata]=useState([])
  function citytext()
  {
    document.querySelector("input").addEventListener("input",(e)=>{
      e.preventDefault();
      cityinput=e.target.value;
      console.log(cityinput)
    })
  }
  async function getdata(value)
  {
    const data=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=3`)
     const result  = await data.json();
     setweatherdata(result.forecast.forecastday)
     console.log(result.forecast.forecastday)
    
  }
  return (
    <div>
      <div className="search">
        <input type="text" placeholder="şehir ara..."onChange={citytext}/>
        <button onClick={()=>getdata(cityinput)}>Search</button>
      </div>
      {weatherdata.map(item=>(<weather key={item.data} date={item.date} mintemp={item.day.mintemp_c}maxtemp={item.day.maxtemp_c} condition={item.day.condition.text} icon={item.day.condition.icon} />))}
      
    </div>
  );
}

export default App;
