import ForecastContainer from '@/components/ForecastContainer';
import Form from '../components/Form'
import backgroundImage from '../public/background-1.png'
import Image from 'next/image'
export async function getServerSideProps() {
  const apiKey = process.env.WEATHER_API_KEY;
  const location = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=${apiKey}`)
  const locationJSON = await location.json()

  const lat = locationJSON[0].lat;
  const lon = locationJSON[0].lon;

  const forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  const forecastJSON = await forecast.json();
  return { props: { forecast:forecastJSON} }
}

export default function Home({forecast}) {
  console.log(forecast)

  let currentTemp = Math.round(forecast.current.temp - 273.15);
  let currentWeather = forecast.current.weather[0].description;
  let currentHumidity = forecast.current.humidity;
  let currentWind = forecast.current.wind_speed;
  let currentPressure = forecast.current.pressure;
  let currentIcon = `https://openweathermap.org/img/wn/${forecast.current.weather[0].icon}@2x.png` 
  let feelsLike = Math.round(forecast.current.feels_like - 273.15);

function capitalizeFirstLetter(str) {
  return str
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ');
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
        <Form name={'location'} label={'Enter Location'} />
        <ForecastContainer 
        currentTemp={currentTemp}
         currentIcon={currentIcon}
         feelsLike={feelsLike}
         currentWeather={capitalizeFirstLetter(currentWeather)}/>
      </div>
      
    </div>
  )
}
