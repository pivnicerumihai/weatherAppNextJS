import Image from "next/image";
import React from "react";

const ForecastContainer = ({ day }) => {

function convertTimestampToHourAndMinutes(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function capitalizeFirstLetter(str) {
    return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  }

return (
    <>
     <style jsx>{`
        .forecast-container {
          border: 1px solid white;
          display: flex;
          flex-direction: column;
          align-items: center;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
    <div className="border-2 border-cyan-400 flex flex-col items-center forecast-container rounded-lg w-40 m-5">
        <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} width={100} height={100} />
        <p>{capitalizeFirstLetter(day.weather[0].description)}</p>
        <p>Sunrise: {convertTimestampToHourAndMinutes(day.sunrise)}</p>
        
        <p>{Math.round(day.temp.day - 273.15)} &#176;C</p>
        <p>Sunset: {convertTimestampToHourAndMinutes(day.sunset)}</p>
        </div>
        </>
)

}

export default ForecastContainer;