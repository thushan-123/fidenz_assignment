import {fetchWeatherData} from "../WeatherAPI/weather";

let cacheTime5Minutes = 5* 60* 1000
let lastUpdatedTime = 0;


const data_list = [
        {"CityCode":"1248991","CityName":"Colombo","Temp":"33.0","Status":"Clouds"},
        {"CityCode":"1850147","CityName":"Tokyo","Temp":"8.6","Status":"Clear"},
        {"CityCode":"2644210","CityName":"Liverpool","Temp":"16.5","Status":"Rain"},
        {"CityCode":"2988507","CityName":"Paris","Temp":"22.4","Status":"Clear"},
        {"CityCode":"2147714","CityName":"Sydney","Temp":"27.3","Status":"Rain"},
        {"CityCode":"4930956","CityName":"Boston","Temp":"4.2","Status":"Mist"},
        {"CityCode":"1796236","CityName":"Shanghai","Temp":"10.1","Status":"Clouds"},
        {"CityCode":"3143244","CityName":"Oslo","Temp":"-3.9","Status":"Clear"}
    ]



const getWeatherData = async () => {
    const promises = data_list.map(async (data_set) => {
        const data = await fetchWeatherData(data_set.CityCode);
        // data_set.Temp = (data.main.temp - 273.15).toFixed(1);
        // data_set.Status = data.weather[0].main;

        return{
            ...data_set,
            Temp: (data.main.temp - 273.15).toFixed(1),
            Status: data.weather[0].description,
        };
    });
    const updated_data = await Promise.all(promises);
    lastUpdatedTime = Date.now();
    return updated_data;

}

const getALLCityCode = async (req,res) => {
    const currentTime = Date.now();
    if(currentTime - lastUpdatedTime > cacheTime5Minutes) {
        const new_data_list = await getWeatherData();
        res.status(200).json({
            message: 'Weather Data',
            data: new_data_list,
        });
    }
    res.status(200).json({
        message: 'Weather Data',
        "data": data_list
    });
}

export {getALLCityCode}


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