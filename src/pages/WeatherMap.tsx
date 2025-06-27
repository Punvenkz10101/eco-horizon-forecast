
import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Thermometer, Droplets, Gauge, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const WeatherMap = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMapClick = async (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert pixel coordinates to approximate lat/lng
    const lng = ((x / rect.width) * 360) - 180;
    const lat = 90 - ((y / rect.height) * 180);

    setSelectedLocation({ lat, lng, x, y });

    // Simulate API call with mock data
    setLoading(true);
    setTimeout(() => {
      setWeatherData({
        location: `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
        temperature: Math.round(Math.random() * 30 + 5),
        humidity: Math.round(Math.random() * 80 + 20),
        pressure: Math.round(Math.random() * 50 + 1000),
        cloudCover: Math.round(Math.random() * 100),
        description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <MapPin className="h-8 w-8 text-green-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Cloud className="h-6 w-6 text-sky-400 opacity-50" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className={`mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="mb-4 hover:bg-green-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Interactive Weather Map
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click anywhere on the world map to get real-time weather data
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className={`lg:col-span-2 ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  World Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-4 h-96 overflow-hidden">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1000 500"
                    className="cursor-pointer"
                    onClick={handleMapClick}
                  >
                    {/* Simple world map outlines */}
                    <rect width="1000" height="500" fill="#e0f2fe" />

                    {/* Continents - simplified shapes */}
                    <path d="M100 200 L300 180 L350 220 L280 280 L150 300 Z" fill="#22c55e" opacity="0.7" />
                    <path d="M350 150 L600 140 L650 200 L580 250 L400 260 Z" fill="#16a34a" opacity="0.7" />
                    <path d="M650 180 L800 170 L850 220 L780 270 L700 250 Z" fill="#15803d" opacity="0.7" />
                    <path d="M200 320 L400 310 L450 380 L350 420 L250 400 Z" fill="#166534" opacity="0.7" />
                    <path d="M750 300 L900 290 L950 350 L850 390 L800 360 Z" fill="#14532d" opacity="0.7" />

                    {/* Click indicator */}
                    {selectedLocation && (
                      <circle
                        cx={selectedLocation.x}
                        cy={selectedLocation.y}
                        r="8"
                        fill="#ef4444"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )}
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Click anywhere on the map to get weather information for that location
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Weather Data Section */}
          <div className={`${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Thermometer className="h-5 w-5 mr-2 text-red-600" />
                  Weather Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedLocation ? (
                  <div className="text-center py-8">
                    <Cloud className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Click on the map to view weather data</p>
                  </div>
                ) : loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading weather data...</p>
                  </div>
                ) : weatherData ? (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">Location</p>
                      <p className="font-semibold text-gray-800">{weatherData.location}</p>
                    </div>

                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                          <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-sm text-gray-700">Temperature</span>
                        </div>
                        <span className="font-semibold text-red-600">{weatherData.temperature}°C</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm text-gray-700">Humidity</span>
                        </div>
                        <span className="font-semibold text-blue-600">{weatherData.humidity}%</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center">
                          <Gauge className="h-4 w-4 text-purple-500 mr-2" />
                          <span className="text-sm text-gray-700">Pressure</span>
                        </div>
                        <span className="font-semibold text-purple-600">{weatherData.pressure} mb</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Cloud className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">Cloud Cover</span>
                        </div>
                        <span className="font-semibold text-gray-600">{weatherData.cloudCover}%</span>
                      </div>
                    </div>

                    <div className="text-center mt-6 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Conditions</p>
                      <p className="font-semibold text-green-600">{weatherData.description}</p>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
