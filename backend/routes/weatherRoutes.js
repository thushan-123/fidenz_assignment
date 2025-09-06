import {getALLCityCode} from '../controllers/weather.js';
import Router from "express";


const router = Router();

router.get('/getAllWeather', getALLCityCode);

export default router;