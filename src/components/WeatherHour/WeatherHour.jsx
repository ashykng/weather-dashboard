import { Tools } from "../../assets/Utils";

export default function WeatherHour ({ hour }) {
    return (
        <div className="card mb-3 p-3">
            <h5 className="card-title">{hour.datetime}</h5>
            <div className="list-group">
                <div className="list-group-item">
                    <strong>Temperature:</strong> {hour.temp} °F / {Tools.Fahrenheit2Celsius(hour.temp)} °C
                </div>
                <div className="list-group-item">
                    <strong>Feels Like:</strong> {hour.feelslike} °F / {Tools.Fahrenheit2Celsius(hour.feelslike)} °C
                </div>
                <div className="list-group-item">
                    <strong>Humidity:</strong> {hour.humidity}%
                </div>
                <div className="list-group-item">
                    <strong>Wind Speed:</strong> {hour.windspeed} mph / {Tools.Mile2Km(hour.windspeed)} km/h
                </div>
                <div className="list-group-item">
                    <strong>Visibility:</strong> {hour.visibility} miles / {Tools.Mile2Km(hour.visibility)} kms
                </div>
                <div className="list-group-item">
                    <strong>Conditions:</strong> {hour.conditions}
                </div>
            </div>
        </div>
    );
};
