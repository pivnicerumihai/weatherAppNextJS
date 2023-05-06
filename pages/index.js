import ForecastContainer from '@/components/ForecastContainer';
import Form from '../components/Form'
import backgroundImage from '../public/background-1.png'
import Image from 'next/image'
import React, {useState} from 'react';
import { useEffect } from 'react';

export default function Home() {

const [locationInput, setLocationInput] = useState(null);
const [forecast, setForecast] = useState(null);
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
console.log(apiKey)
useEffect(() => {
  const fetchForecast = async () => {
    if (locationInput) {
     
      const location = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit=1&appid=${apiKey}&exclude=minutely,hourly`
      );
      const locationJSON = await location.json();
       
      const lat = locationJSON[0].lat;
      const lon = locationJSON[0].lon;

      const forecastData = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const forecastJSON = await forecastData.json();
      setForecast(forecastJSON);
    }
  };

  fetchForecast();
}, [locationInput]);

const handleLocationInput = input => {
  setLocationInput(input)
}

  return (
    <div className='flex justify-center items-center h-screen bg-white' >
      <Image
        src={backgroundImage}
        alt='Background Image'
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        priority
      />
       <div className="relative z-10 flex flex-col items-center">
        <Form name={'location'} label={'Enter Location'} onLocationInput={handleLocationInput}/>
       <div className='flex'>
        {
        
        forecast !== null ? forecast.daily && forecast.daily.map((day, index) => {
          return <ForecastContainer key={index} day={day} />
        }) : null}
       </div>
      </div>
      
    </div>
  )
}
