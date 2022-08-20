import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './App.css'
import kelvinToCelsius from 'kelvin-to-celsius';
function App() {

  const [fetched,setFetched] = useState(false)
  const [fetching,setFetching] = useState(false)
  const [empty,setEmpty] = useState(false)
  const [city,setCity] = useState('Lucknow')
  const [data,setData] = useState({})
  
  
  function fetchData(cityPar){
    if(city===""){
      setEmpty(true)
    }  
    else{
      setFetching(true)
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityPar}&appid=3cb6e26e4a5a73d3bae2d66e44ba91d3`)
      .then(res=>res.json())
      .then(data=>{
        if(data.message){
          Swal.fire("That sounds alien :(","Looks like you entered wrong city name","error")
          setFetching(false)
        }
        else{
          setData(data)
          console.log(data)
          setFetching(false)
          setFetched(true)
        }
      })
      .catch(err=>console.log(err))
    }
  }

  function goBack(){
    setData({})
    setFetched(false)
  }

  return (
    <>
    <div className="wrapper">
    {
            !fetched?
            <div className="content">
              <div className="title">What's the weather like?</div>
              <input value={city} onChange={e=>setCity(e.target.value)} type="text" placeholder="Your city name here"/>
              {
                empty?
                <div className="error"> <i className="fas fa-exclamation-circle"></i> Please enter city name</div>
                :""
              }
              {
                !fetching?
                <button className="search" onClick={()=>fetchData(city)} >Find weather</button>
                :
                <button className="search" disabled>Hang on <i className="fas fa-spinner fa-spin"></i> </button>
              }
              <div className="line"></div>
              <div className="trending-title">Trending cities</div>
              <div className="pill" onClick={()=>fetchData('Lucknow')} >Lucknow</div>
              <div className="pill" onClick={()=>fetchData('Gorakhpur')} >Gorakhpur</div>
              <div className="pill" onClick={()=>fetchData('Goa')} >Goa</div>
              <div className="pill" onClick={()=>fetchData('Pune')} >Pune</div>
              <div className="pill" onClick={()=>fetchData('Mumbai')} >Mumbai</div>
          </div>
          :
          <div className="content animate__animated animate__fadeIn">
              <div className="title"> {data.name} 's weather report</div>
              <div className="sections">
                <div className="section">
                  <div className="temperature">
                    <span>{kelvinToCelsius(data.main.temp)}°</span> celcius
                    <div className="info" >Min : {kelvinToCelsius(data.main.temp_min)}° </div>
                    <div className="info" >Max : {kelvinToCelsius(data.main.temp_max)}° </div>
                    <div className="info" >Humidity : {data.main.humidity}</div>
                    <button className="search" onClick={()=>goBack()}> <i className="fas fa-arrow-left"></i> Go back</button>
                  </div>
                </div>
                <div className="section image">
                  {/* Might add image later */}
                </div>
              </div>
          </div>
    }
    </div>
    </>
  );
}

export default App;
