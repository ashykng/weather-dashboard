import { Tools } from "../../assets/Utils";
import WeatherHour from "../WeatherHour/WeatherHour";

export default function WeatherDay ({ day }) {
    return (
        <div className="container mt-4">
            <h2 className="display-4">{day.datetime}</h2>

            <div className="row">
                <div className="col-md-6">
                    <p><strong>Temp:</strong> {day.temp} °F / {Tools.Fahrenheit2Celsius(day.temp)} °C</p>
                    <p><strong>Feelslike:</strong> {day.feelslike}°F / {Tools.Fahrenheit2Celsius(day.feelslike)} °C</p>
                    
                    <p><strong>Max Temp:</strong> {day.tempmax} °F / {Tools.Fahrenheit2Celsius(day.tempmax)} °C</p>
                    <p><strong>Feels Like Max:</strong> {day.feelslikemax} °F / {Tools.Fahrenheit2Celsius(day.feelslikemax)} °C</p>

                    <p><strong>Min Temp:</strong> {day.tempmin} °F / {Tools.Fahrenheit2Celsius(day.tempmin)} °C</p>
                    <p><strong>Feels Like Min:</strong> {day.feelslikemin} °F / {Tools.Fahrenheit2Celsius(day.feelslikemin)} °C</p>

                </div>

                <div className="col-md-6">
                    <p><strong>Sunrise:</strong> {day.sunrise}</p>
                    <p><strong>Sunset:</strong> {day.sunset}</p>
                    <p><strong>Humidity:</strong> {day.humidity}%</p>
                    <p><strong>Visibility:</strong> {day.visibility} miles / {Tools.Mile2Km(day.visibility)} kms</p>

                    <p><strong>Wind Speed:</strong> {day.windspeed} mph / {Tools.Mile2Km(day.windspeed)} km/h</p>

                    <p><strong>Conditions:</strong> {day.conditions}</p>
                    <p><strong>Description:</strong> {day.description}</p>
                </div>
            </div>

            <hr />
            <h3>Hourly Forecast:</h3>
            {day.hours && (
                <div className="row">
                    {day.hours.map((hour, index) => (
                        <div className="col-12 col-md-4" key={index}>
                            <WeatherHour hour={hour} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
