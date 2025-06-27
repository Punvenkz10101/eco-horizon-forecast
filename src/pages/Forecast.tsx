import React, { useEffect, useState } from "react";
import { ArrowLeft, Cloud, CloudRain, Thermometer, Droplets, Gauge, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

type ForecastDay = {
  Date: string;
  "Temperature (C)": number;
  Humidity: number;
  "Pressure (millibars)": number;
  "Cloud Cover": number;
  "Rain Chance (%)": number;
  "Daily Summary": string;
};

const Forecast: React.FC = () => {
  const navigate = useNavigate();
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/bangalore_forecast.json")
      .then((res) => res.json())
      .then(setForecast);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <CloudRain className="h-8 w-8 text-blue-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Cloud className="h-6 w-6 text-sky-400 opacity-50" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}>
          <Thermometer className="h-10 w-10 text-red-200 opacity-40" />
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
              15-Day Weather Forecast
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ML-powered weather predictions with custom ensemble model
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className={`grid md:grid-cols-4 gap-6 mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Thermometer className="h-4 w-4 mr-2 text-red-500" />
                Avg Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {(forecast.reduce((sum, day) => sum + day["Temperature (C)"], 0) / forecast.length).toFixed(1)}°C
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <CloudRain className="h-4 w-4 mr-2 text-blue-500" />
                Avg Rain Chance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {(forecast.reduce((sum, day) => sum + day["Rain Chance (%)"], 0) / forecast.length).toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Droplets className="h-4 w-4 mr-2 text-cyan-500" />
                Avg Humidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-600">
                {(forecast.reduce((sum, day) => sum + day.Humidity, 0) / forecast.length * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Gauge className="h-4 w-4 mr-2 text-purple-500" />
                Avg Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {(forecast.reduce((sum, day) => sum + day["Pressure (millibars)"], 0) / forecast.length).toFixed(0)} mb
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className={`border-0 shadow-lg bg-white/70 backdrop-blur-sm ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Detailed Forecast Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Temperature (°C)</TableHead>
                    <TableHead>Humidity (%)</TableHead>
                    <TableHead>Pressure (mb)</TableHead>
                    <TableHead>Cloud Cover (%)</TableHead>
                    <TableHead>Rain Chance (%)</TableHead>
                    <TableHead>Summary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forecast.map((day) => (
                    <TableRow key={day.Date} className="hover:bg-green-50/50 transition-colors">
                      <TableCell className="font-medium">
                        {new Date(day.Date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-red-600 font-semibold">{day["Temperature (C)"].toFixed(1)}</TableCell>
                      <TableCell className="text-cyan-600">{(day.Humidity * 100).toFixed(1)}</TableCell>
                      <TableCell className="text-purple-600">{day["Pressure (millibars)"].toFixed(1)}</TableCell>
                      <TableCell className="text-gray-600">{(day["Cloud Cover"] * 100).toFixed(1)}</TableCell>
                      <TableCell className="text-blue-600 font-semibold">{day["Rain Chance (%)"]}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <CloudRain className="h-3 w-3 mr-1" />
                          {day["Daily Summary"]}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Forecast;
