import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { WEATHER_API_KEY } from "@env";
//OpenWeather API 5 day / 3 hour forecast
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

export const useGetWeather = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState([]);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      setError("Could not fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const setCurrentLocationWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Locat tion: permission denied");
      setError("Location: permission denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLat(location.coords.latitude);
    setLon(location.coords.longitude);
    await fetchWeatherData();
  };

  useEffect(() => {
    console.log("use effect");
    setCurrentLocationWeather().catch((error) => {
      console.log("Error: ", error);
      setError(error);
    });
  }, [lat, lon]);

  return [loading, error, weather]
};
