import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { weatherDataFetch } from "../ApiEndpoint/ApiCall.js";
import { Card, Col, Row, message, Spin, Flex } from "antd";
import Search from "antd/es/input/Search.js";
import CloudImage from "./../assets/sun-cloud-weather-for-icon-symbol-web-illustration-free-vector.jpg";
import LogoutButton from "../component/LogoutButton.jsx";

const { Meta } = Card;

const Home = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Check if token is in URL (from Auth0 redirect)
        const token = searchParams.get("token");
        if (token) {
            // Save token to sessionStorage and remove from URL
            sessionStorage.setItem("token", token);
            window.history.replaceState({}, document.title, "/home");
        }
    }, [searchParams]);

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                message.error("No authentication token found");
                return;
            }

            const fetchWeatherData = await weatherDataFetch(token);
            if (fetchWeatherData && fetchWeatherData.data) {
                setWeatherData(fetchWeatherData.data);
            } else {
                message.error("Failed to fetch weather data");
            }
        } catch (err) {
            console.error(err);
            message.error("Error fetching weather data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();

        const interval = setInterval(() => {
            fetchWeather();
        }, 300000);

        return () => clearInterval(interval);
    }, [])

    const onSearch = (value) => {
        if (!value) {
            message.warning("Please enter a city");
            return;
        }

        const found = weatherData.find(
            (data) => data.city.toLowerCase() === value.toLowerCase()
        );

        if (found) {
            setSearchValue(found);
            setNotFound(false);
        } else {
            setSearchValue(null);
            setNotFound(true);
        }
    };

    return (
        <div>
            <Flex
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                    padding: "0 20px",
                }}
            >
                <h1 style={{ margin: 0, textAlign: "center", flex: 1 }}>Weather App</h1>
                <div>
                    <LogoutButton />
                </div>
            </Flex>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <Search
                    placeholder="Enter a City"
                    allowClear
                    enterButton="Search"
                    size="medium"
                    style={{ width: 300 }}
                    onSearch={onSearch}
                />
            </div>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Spin size="large" />
                </div>
            ) : notFound && searchValue === null ? (
                <p style={{ textAlign: "center" }}>City not found</p>
            ) : searchValue ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt={searchValue.city}
                                src={CloudImage}
                            />
                        }
                    >
                        <Meta
                            title={`${searchValue.city} (${searchValue.temp}°C)`}
                            description={searchValue.description}
                        />
                    </Card>
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {weatherData.map((data) => (
                        <Col key={data.city_code} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Card
                                hoverable
                                style={{ width: "100%" }}
                                cover={
                                    <img
                                        alt={data.city}
                                        src={CloudImage}
                                    />
                                }
                            >
                                <Meta
                                    title={`${data.city} (${data.temp}°C)`}
                                    description={data.description}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default Home;




