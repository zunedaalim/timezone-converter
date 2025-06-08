import { useState, useEffect } from "react";
import { Clock, MapPin, ArrowRight, Calendar } from "lucide-react";
import { DateTime } from "luxon";

const canadianCities = [
  { name: "Calgary", zone: "America/Edmonton" },
  { name: "Toronto", zone: "America/Toronto" },
  { name: "Vancouver", zone: "America/Vancouver" },
  { name: "Winnipeg", zone: "America/Winnipeg" },
  { name: "Halifax", zone: "America/Halifax" },
  { name: "St. John's", zone: "America/St_Johns" },
];

export default function TimeZoneConverter() {
  const [selectedCity, setSelectedCity] = useState(canadianCities[0]);
  const [clientTime, setClientTime] = useState("10:00");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [hour, minute] = clientTime.split(":").map(Number);

  const clientDateTime = DateTime.fromObject(
    { hour, minute },
    { zone: selectedCity.zone }
  );
  const istDateTime = clientDateTime.setZone("Asia/Kolkata");

  const handleCityChange = (cityName) => {
    const city = canadianCities.find((c) => c.name === cityName);
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center px-4 py-8">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Time Zone Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Convert Canadian time to Indian Standard Time
          </p>
        </div>

        {/* Current Time Display */}
        <div className="mb-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">
              Current Time: {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <MapPin className="w-4 h-4 text-indigo-500" />
                Select Canadian City
              </label>
              <div className="relative">
                <select
                  className="w-full p-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl text-gray-800 font-medium focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 appearance-none cursor-pointer hover:border-indigo-300"
                  value={selectedCity.name}
                  onChange={(e) => handleCityChange(e.target.value)}
                >
                  {canadianCities.map((city) => (
                    <option key={city.name} value={city.name} className="py-2">
                      {city.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-indigo-400 transform rotate-45"></div>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Clock className="w-4 h-4 text-indigo-500" />
                Client's Time
              </label>
              <input
                type="time"
                value={clientTime}
                onChange={(e) => setClientTime(e.target.value)}
                className="w-full p-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl text-gray-800 font-medium text-lg focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 hover:border-indigo-300"
              />
            </div>
          </div>

          {/* Conversion Display */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Converted Times
            </h3>

            {/* Canadian Time Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    {selectedCity.name}
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {clientDateTime.toFormat("hh:mm a")}
                  </p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="p-2 bg-gray-100 rounded-full">
                <ArrowRight className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            {/* IST Time Card */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-100 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 mb-1">
                    India (IST)
                  </p>
                  <p className="text-2xl font-bold text-orange-800">
                    {istDateTime.toFormat("hh:mm a")}
                  </p>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-purple-700">"Hey!</span>{" "}
              Here's a quick way to convert your time in{" "}
              <span className="font-semibold text-indigo-600">
                {selectedCity.name}
              </span>{" "}
              to my working hours in{" "}
              <span className="font-semibold text-orange-600">India (IST)</span>
              . Let me know what time suits you best!"
            </p>
          </div>
        </div>

        {/* Quick Time Buttons */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {["09:00", "12:00", "15:00", "18:00"].map((time) => (
            <button
              key={time}
              onClick={() => setClientTime(time)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
