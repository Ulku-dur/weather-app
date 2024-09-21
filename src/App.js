import React, { useEffect, useState } from "react";
import axios from "axios";

// Importing icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
  IoMdCloudy,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsThermometer,
  BsWind,
  BsDroplet,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

// API key
const APIkey = "3d11af3ec3859af85baf2a2083f090b5";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Istanbul");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch the weather data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
        const res = await axios.get(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("City not found, please try again.");
      }
    };
    fetchData();
  }, [location]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setLocation(inputValue);
      setInputValue("");
    }
  };

  // Set weather icon based on the weather condition
  let icon;
  if (data) {
    switch (data.weather[0].main) {
      case "Clouds":
        icon = <IoMdCloudy />;
        break;
      case "Haze":
        icon = <BsCloudHaze2Fill />;
        break;
      case "Rain":
        icon = <IoMdRainy />;
        break;
      case "Clear":
        icon = <IoMdSunny />;
        break;
      case "Drizzle":
        icon = <BsCloudDrizzleFill />;
        break;
      case "Snow":
        icon = <IoMdSnow />;
        break;
      case "Thunderstorm":
        icon = <IoMdThunderstorm />;
        break;
      default:
        icon = <IoMdCloudy />;
    }
  }

  // date object for the current date
  const date = new Date();

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ImSpinner8 className="text-5xl animate-spin text-white" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={() => setError("")}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between mb-8 max-w-[450px] w-full bg-black/20 p-2 rounded-full"
      >
        <input
          type="text"
          placeholder="Enter location"
          className="bg-transparent outline-none text-white placeholder:text-white text-[15px] px-2 flex-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="text-white text-2xl hover:text-gray-400 transition"
        >
          <IoMdSearch />
        </button>
      </form>

      {/* Weather Card */}
      {data && (
        <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
          <div className="flex items-center gap-x-5">
            {/* Icon */}
            <div className="text-[87px]">{icon}</div>
            <div>
              {/* Location name */}
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              {/* Date */}
              <div>
                {date.getUTCDate()} / {date.getUTCMonth() + 1} /{" "}
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>

          {/* Temperature */}
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[144px] leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              <div className="text-4xl">
                <TbTemperatureCelsius />
              </div>
            </div>
            <div className="capitalize text-center">
              {data.weather[0].description}
            </div>
          </div>

          {/* Weather Details */}
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div>
                  Visibility
                  <span className="ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div className="flex">
                  Feels like
                  <span className="flex ml-2">
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div>
                  Wind Speed
                  <span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsDroplet />
                </div>
                <div>
                  Humidity
                  <span className="ml-2">{data.main.humidity}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
