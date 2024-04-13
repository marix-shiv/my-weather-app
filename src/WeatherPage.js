import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const WeatherPage = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=851112274ab7e99746e305bf7f8044c0`);
      setWeatherData(response.data);
    };
    fetchWeatherData();
  }, [cityName]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Weather for {cityName}</h2>
      <p>Temperature: {weatherData.main.temp}</p>
      <p>Weather: {weatherData.weather[0].main}</p>
      <p>Humidity: {weatherData.main.humidity}</p>
      <p>Wind Speed: {weatherData.wind.speed}</p>
    </div>
  );
};

export default WeatherPage;
