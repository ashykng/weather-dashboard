import { useState, useEffect } from "react";
import { ApiKeys } from "../../assets/ApiKeys";
import WeatherDay from "../WeatherDay/WeatherDay";
import Alert from "../General/Alert/Alert";

export function Dashboard() {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState({});
    const [startDay, setStartDay] = useState(new Date().toISOString().slice(0, 10));
    const [endDay, setEndDay] = useState(null);
    const [location, setLocation] = useState({});
    const [city, setCity] = useState();
    const [weather, setWeather] = useState();

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                () => {
                    setMessage({
                        error: "An error occurred while fetching weather data.",
                        solution: "Try Later"
                    });
                }
            );
        } else {
            setMessage({
                error: "Geolocation is not supported by this browser.",
                solution: "Change your browser"
            });
        }
    };

    const getUserCity = async ({ latitude, longitude }) => {
        const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${ApiKeys.locationKey}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => setCity(data.address.city))
            .catch(() => 
                setMessage({
                    error: "An error occurred while fetching city data.",
                    solution: "Try Later"
            }));
    };

    const getLocationWeatherData = async (city = null, latitude = null, longitude = null, start = startDay, end = endDay) => {
        const location = city || `${latitude},${longitude}`;
        const date = end ? `${start}/${end}` : `${start}`;
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/?key=${ApiKeys.weatherKey}`;
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 400) {
                    setMessage({
                        error: "Bad Request",
                        solution: "Change your city name"
                    });
                    throw new error;
                }
                else if (response.status === 429) {
                    setMessage({
                        error: "Too many requests",
                        solution: "Wait some minutes"
                    });
                    throw error;
                } 
                else {
                    setMessage({
                        error: "An error occurred while fetching weather data.",
                        solution: "Try Later"
                    });
                    throw error;
                }
            }
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            setShowAlert(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowAlert(false);
        getLocationWeatherData(city, location.latitude, location.longitude);
    };

    useEffect(() => {
        getUserLocation();
        getLocationWeatherData(city, location.latitude, location.longitude);
    }, []);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            getUserCity(location);
        }
    }, [location]);


    return (
        <>
            {showAlert && (<Alert error={message.error} solution={message.solution} />)}

            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location: (Default: ip Location)</label>
                    <input 
                        type="search" 
                        name="location"
                        id="location"
                        className="form-control"
                        placeholder="Search location"
                        value={city}
                        required
                        onChange={event => setCity(event.target.value)}
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="startDate" className="form-label">Start Day: (Default: Today)</label>
                        <input 
                            type="date" 
                            name="startDate" 
                            id="startDate"
                            className="form-control"
                            value={startDay}
                            onChange={event => setStartDay(event.target.value)}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="endDate" className="form-label">End Day: (optional)</label>
                        <input 
                            type="date" 
                            name="endDate" 
                            id="endDate"
                            className="form-control"
                            value={endDay}
                            onChange={event => setEndDay(event.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>

            {location.latitude && location.longitude && (
                <p>
                    {weather && weather.days.map((day, index) => (
                        <WeatherDay key={index} day={day} />
                    ))}
                </p>
            )}
        </>
    );
};
