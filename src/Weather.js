import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherdata, setWeatherdata] = useState({ ready: false });

  function handleResponse(response) {
    console.log(response.data);
    setWeatherdata({
      ready: true,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      city: response.data.name,
      icon: "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
      date: "Sunday 07:00",
    });
  }
  if (weatherdata.ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-9 ">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control search-input"
                autoFocus="on"
              />
            </div>
            <div className="col-3 p-0">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <h2>{weatherdata.city}</h2>
        <ul>
          <li>{weatherdata.date}</li>
          <li className="text-capitalize">{weatherdata.description}</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6 ">
            <img src={weatherdata.icon} alt={weatherdata.description} />
            <span className="temperature">
              {Math.round(weatherdata.temperature)}
            </span>
            <span className="unit">ºC</span>
          </div>
          <div className="col-6 ">
            <ul>
              <li>Humidity: {weatherdata.humidity}%</li>
              <li>Wind: {weatherdata.wind}km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    let apiKey = "c7fee59fc04d1829564c21372a29c020";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
