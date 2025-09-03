import {fetchWeatherData} from "../WeatherAPI/weather";
let cachedWeatherData = null;
let cacheTime5 = null;

let cacheTimeLive = 5* 60* 1000;

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

    return Promise.all(promises);

}

const getALLCityCode = async (req,res) => {
    const currentTime = Date.now();
    if(cachedWeatherData && cacheTime5 && (now - cacheTime5 < cacheTimeLive)){

    }
    res.status(200).json({
        message: 'Weather Data',
        "data": data_list
    });
}
