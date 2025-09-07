import axios from "axios";

const login_request = async (email, password) => {

    let data = JSON.stringify({
        "email": email,
        "password": password,
    });

    let configuration = {
        method: "POST",
        url: 'http://localhost:9000/api/v1/user/jwt/login',
        headers: {
            "Content-Type": "application/json",
        },
        "data": data,
    }

    try{
        const response = await axios.request(configuration);
        console.log(response)
        return response.data;
    }catch(e){
        console.log(e.message);
        return null;
    }
}

const register_request = async (first_name, last_name, email, password) => {

    let data = JSON.stringify({
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
    })

    let configuration = {
        method: "POST",
        url: 'http://localhost:9000/api/v1/user/jwt/register',
        headers: {
            "Content-Type": "application/json",
        },
        "data": data,
    }

    try{
        const response = await axios.request(configuration);
        console.log(response);
        return response.data;
    }catch(e){
        console.log(e.message);
        return null;
    }
}

const weatherDataFetch = async (token) => {

    const configuration = {
        method: "GET",
        url: 'http://localhost:9000/api/v1/getAllWeather',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }

    try{
        const response = await axios.request(configuration);
        console.log(response)
        return response.data;
    }catch(e){
        console.log(e.message);
        return null;
    }
}

export {login_request, register_request,weatherDataFetch}

