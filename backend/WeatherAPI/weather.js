import axios from "axios";
import 'dotenv/config'

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const fetchWeatherData = async (countryCode) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.openweathermap.org/data/2.5/weather?id=${countryCode}&appid=${WEATHER_API_KEY}`,
        headers: { }
    };

    return await axios.request(config)
         .then((response) => {
             console.log(JSON.stringify(response.data));
         })
         .catch((error) => {
             console.log(error);
         });
}

export { fetchWeatherData };