import React, { useState } from "react";
import axios from "axios";

const WeatherPage = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = async () => {
    const trimmedLocation = location.trim();

    if (!trimmedLocation) {
      setError("Please enter a valid location");
      return;
    }

    setLoading(true); // Start loading spinner
    const requestURL = `${process.env.REACT_APP_BACKEND_URL}/${trimmedLocation}`;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
      const response = await axios.get(requestURL);
      console.log("API Response:", response.data);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Could not fetch weather data");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <main className="min-h-screen flex justify-center  p-8">
      <div className="border border-white  bg-white opacity-75 shadow-lg rounded-lg p-5 w-full">
        <h1 className="text-4xl font-bold text-center opacity-100 mb-4  text-gray-800">
          Weather App
        </h1>
        <div className="flex flex-col justify-center items-center">
          {/* Input Section */}
          <section className="bg-cyan-400  h-auto items-center shadow-lg rounded-lg p-8 w-full max-w-7xl">
            <div className="flex flex-col items-center md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="w-full md:w-4/5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSearch}
                className="w-full md:w-1/5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Get Weather
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </section>

          {/* Loading Section */}
          {loading && (
            <div className="bg-cyan-400 h-auto items-center shadow-lg rounded-lg p-8 w-full max-w-7xl mt-6 text-center">
              <div className="animate-pulse flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-28 bg-gray-400 rounded mb-16 mt-5"></div>

                  <div className="w-16 h-16 rounded-full bg-gray-400 mb-14" />

                  <div className="h-2 w-20 bg-gray-400 rounded mx-5 "></div>

                  <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-32 mt-7 text-lg">
                    <div className="h-2 w-20 bg-gray-400 rounded sm:mb-2"></div>
                    <div className="h-2 w-20 bg-gray-400 rounded sm:mb-2"></div>
                    <div className="h-2 w-20 bg-gray-400 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weather Details Section */}
          {!loading && weather && (
            <section className="bg-cyan-400 h-auto items-center shadow-lg rounded-lg p-8 w-full max-w-7xl mt-6 text-center">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                  {weather.name}
                </h2>

                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-32 h-32 mb-4"
                />

                <p className="text-gray-700 capitalize mx-5 text-lg">
                  {weather.weather[0].description}
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-32 mt-7 text-lg">
                  <p className="text-gray-700">
                    Temperature: {weather.main.temp}°C
                  </p>
                  <p className="text-gray-700">
                    Humidity: {weather.main.humidity}%
                  </p>
                  <p className="text-gray-700">
                    Wind Speed: {weather.wind.speed} m/s
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default WeatherPage;
