import React from "react";
import {useState, useEffect} from "react";
import {weatherDataFetch} from "../ApiEndpoint/ApiCall.js";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [weatherData, setWeatherData] = useState([]);
    const [searchCity, setSearchCity] = useState("");

    useEffect(async () => {
        const fetchWeatherData = await weatherDataFetch();
        if (fetchWeatherData) {
            console.log(fetchWeatherData);
            sessionStorage.setItem("data", JSON.stringify(fetchWeatherData.data));
            setWeatherData(fetchWeatherData.data);
        }else{
            setError(true);
        }
    },[])

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome! You are now logged in.</p>
            {
                weatherData.map((data,index) => ({
                    
                }
                ))
            }
        </div>
    );
};

export default Home;
