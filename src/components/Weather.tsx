import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';

interface IWeather {
  request: {
    query: string;
  };
  location: {
    name: string;
    country: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    pressure: number;
    precip: number;
    humidity: number;
  };
}

const WeatherComponent = ({ weatherResponse }: { weatherResponse: IWeather }) => (
  <Paper style={{ backgroundColor: '#3e4c8c', color: '#fff' }}>
    <div style={{ padding: 20, margin: '30px 0' }}>
      <p>{`${weatherResponse.location.country} / ${weatherResponse.location.name}`}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 360 }}>
        <div>
          <img src={weatherResponse.current.weather_icons[0]} />
          <br />
          {weatherResponse.current.weather_descriptions.join()}
        </div>
        <div style={{ fontSize: 36 }}>{weatherResponse.current.temperature}°c</div>
        <div>
          <div>Wind: {weatherResponse.current.wind_speed} kmph</div>
          <div>Precip: {weatherResponse.current.precip} mm</div>
          <div>Pressure: {weatherResponse.current.pressure} mb</div>
        </div>
      </div>
    </div>
  </Paper>
);

export default ({ cityName }: { cityName: string }) => {
  const [weatherResponse, setWeatherResponse] = useState<IWeather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.weatherstack.com/current?access_key=20fba2b63d7b68bb4f3aa6af95903c84&query=${cityName}`
        );
        const json = await response.json();
        setWeatherResponse(json);
      } catch (err) {
        console.log('Fail to fetch weather');
      }
    };

    fetchWeather();
  }, [cityName]);

  return weatherResponse ? <WeatherComponent weatherResponse={weatherResponse} /> : null;
};
