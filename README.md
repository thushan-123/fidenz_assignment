
<h4>backend env</h4>

```
PORT=9000
MONGO_URI=mongodb://localhost:27017/fidenz
WEATHER_API_KEY=
WEATHER_API_KEY_NAME=
JWT_SECRET=
JWT_EXPIRE=20d
REFRESH_TOKEN_SECRET=

AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_CALLBACK_URL=http://localhost:9000/api/v1/user/auth0/callback
SESSION_SECRET=

FRONTEND_URL=http://localhost:5173
```

```
cd backend
npm install
npm start
```

```
cd weather-frontend
npm install
npm run dev
```
