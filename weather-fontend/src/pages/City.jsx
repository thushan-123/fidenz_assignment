import react from "@vitejs/plugin-react";
import {useEffect, useState} from "react";


const City = () => {

    const [error, setError] = useState(false);
    const  [cityData, setCityData] = useState([]);

    useEffect(async () => {

    })
    return (
        <>

            <h1> {cityData}</h1>


        </>
    )
}

export default City;