import Image from "next/image";
import React from "react";

const ForecastContainer = ({ currentTemp, currentIcon, currentWeather,feelsLike }) => {

return (
    <>
     <style jsx>{`
        .forecast-container {
          border: 1px solid white;
          display: flex;
          flex-direction: column;
          align-items: center;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }
      `}</style>
    <div className="border-2 border-cyan-400 flex flex-col items-center forecast-container rounded-lg w-40">
        <Image src={currentIcon} width={100} height={100} />
        <p>{currentWeather}</p>
        <p>{currentTemp} &#176;C</p>
        <p>Feels like: {feelsLike} &#176;C</p>
        </div>
        </>
)

}

export default ForecastContainer;