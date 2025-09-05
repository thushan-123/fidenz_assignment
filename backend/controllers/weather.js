import { fetchWeatherData } from "../WeatherAPI/weather.js";

let cacheTime5Minutes = 5 * 60 * 1000;
let lastUpdatedTime = 0;

const data_list = [
    { "CityCode": "1248991", "CityName": "Colombo", "Temp": "33.0", "Status": "Clouds" },
    { "CityCode": "1850147", "CityName": "Tokyo", "Temp": "8.6", "Status": "Clear" },
    { "CityCode": "2644210", "CityName": "Liverpool", "Temp": "16.5", "Status": "Rain" },
    { "CityCode": "2988507", "CityName": "Paris", "Temp": "22.4", "Status": "Clear" },
    { "CityCode": "2147714", "CityName": "Sydney", "Temp": "27.3", "Status": "Rain" },
    { "CityCode": "4930956", "CityName": "Boston", "Temp": "4.2", "Status": "Mist" },
    { "CityCode": "1796236", "CityName": "Shanghai", "Temp": "10.1", "Status": "Clouds" },
    { "CityCode": "3143244", "CityName": "Oslo", "Temp": "-3.9", "Status": "Clear" }
];
let cache_data = [];


const getWeatherData = async () => {
    cache_data = [];

    for (const data_set of data_list) {
        try {
            const data = await fetchWeatherData(data_set.CityCode);
            let data_;
            if (data && data.main && data.weather) {
                data_ = {
                    city: data.name,
                    city_code: data.id,
                    temp: (data.main.temp - 273.15).toFixed(1),
                    description: data.weather[0].description,
                };

            }
            cache_data.push(data_);
        } catch (err) {
            console.log(`fetch err ${data_set.CityName}:`);
        }
    }
    //console.log(cache_data);

    lastUpdatedTime = Date.now();
};


const getALLCityCode = async (req, res) => {
    const currentTime = Date.now();

    if (currentTime - lastUpdatedTime > cacheTime5Minutes || cache_data.length === 0) {
        await getWeatherData();
        return res.status(200).json({
            message: "Weather Data",
            data: cache_data,
        });
    }

    return res.status(200).json({
        message: "Weather Data ",
        data: cache_data,
    });
}

export { getALLCityCode };



// {
//     "coord": {
//     "lon": 79.8478,
//         "lat": 6.9319
// },
//     "weather": [
//     {
//         "id": 803,
//         "main": "Clouds",
//         "description": "broken clouds",
//         "icon": "04d"
//     }
// ],
//     "base": "stations",
//     "main": {
//     "temp": 299.58,
//         "feels_like": 299.58,
//         "temp_min": 299.58,
//         "temp_max": 299.58,
//         "pressure": 1009,
//         "humidity": 85,
//         "sea_level": 1009,
//         "grnd_level": 1008
// },
//     "visibility": 10000,
//     "wind": {
//     "speed": 6.05,
//         "deg": 236,
//         "gust": 9.66
// },
//     "clouds": {
//     "all": 53
// },
//     "dt": 1756903052,
//     "sys": {
//     "country": "LK",
//         "sunrise": 1756859590,
//         "sunset": 1756903639
// },
//     "timezone": 19800,
//     "id": 1248991,
//     "name": "Colombo",
//     "cod": 200
// }