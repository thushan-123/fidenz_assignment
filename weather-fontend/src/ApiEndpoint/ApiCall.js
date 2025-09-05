import axios from "axios";
import Login from "./pages/Login.jsx";

const login_request = async (email, password) => {

    let data = JSON.stringify({
        "email": email,
        "password": password,
    });

    let configuration = {
        method: "POST",
        url: 'http://localhost:9000/api/v1/user/login',
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

export {login_request}

