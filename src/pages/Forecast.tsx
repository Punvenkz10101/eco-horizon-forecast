
import { useState, useEffect } from 'react';
import { ArrowLeft, Cloud, CloudRain, Thermometer, Droplets, Gauge, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Forecast = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const weatherData = [
    { date: '2025-06-23', temperature: 27.41, humidity: 0.52, pressure: 985.68, cloudCover: 0.42, rainChance: 72.67, summary: 'Rain Likely' },
    { date: '2025-06-24', temperature: 27.26, humidity: 0.53, pressure: 975.20, cloudCover: 0.42, rainChance: 72.47, summary: 'Rain Likely' },
    { date: '2025-06-25', temperature: 27.27, humidity: 0.53, pressure: 986.75, cloudCover: 0.41, rainChance: 72.25, summary: 'Rain Likely' },
    { date: '2025-06-26', temperature: 27.15, humidity: 0.52, pressure: 984.80, cloudCover: 0.41, rainChance: 72.43, summary: 'Rain Likely' },
    { date: '2025-06-27', temperature: 27.00, humidity: 0.53, pressure: 988.52, cloudCover: 0.42, rainChance: 72.91, summary: 'Rain Likely' },
    { date: '2025-06-28', temperature: 27.34, humidity: 0.53, pressure: 993.58, cloudCover: 0.41, rainChance: 72.71, summary: 'Rain Likely' },
    { date: '2025-06-29', temperature: 27.09, humidity: 0.53, pressure: 986.60, cloudCover: 0.41, rainChance: 72.59, summary: 'Rain Likely' },
    { date: '2025-06-30', temperature: 26.98, humidity: 0.54, pressure: 983.52, cloudCover: 0.40, rainChance: 71.26, summary: 'Rain Likely' },
    { date: '2025-07-01', temperature: 27.03, humidity: 0.53, pressure: 980.33, cloudCover: 0.40, rainChance: 72.84, summary: 'Rain Likely' },
    { date: '2025-07-02', temperature: 26.77, humidity: 0.52, pressure: 984.24, cloudCover: 0.40, rainChance: 73.57, summary: 'Rain Likely' },
    { date: '2025-07-03', temperature: 26.61, humidity: 0.53, pressure: 989.06, cloudCover: 0.40, rainChance: 72.65, summary: 'Rain Likely' },
    { date: '2025-07-04', temperature: 26.93, humidity: 0.53, pressure: 992.27, cloudCover: 0.40, rainChance: 72.81, summary: 'Rain Likely' },
    { date: '2025-07-05', temperature: 27.01, humidity: 0.54, pressure: 983.03, cloudCover: 0.39, rainChance: 73.27, summary: 'Rain Likely' },
    { date: '2025-07-06', temperature: 26.79, humidity: 0.53, pressure: 987.04, cloudCover: 0.40, rainChance: 72.83, summary: 'Rain Likely' },
    { date: '2025-07-07', temperature: 26.89, humidity: 0.54, pressure: 986.39, cloudCover: 0.39, rainChance: 72.70, summary: 'Rain Likely' }
  ];

  const chartConfig = {
    temperature: {
      label: "Temperature (°C)",
      color: "#ef4444",
    },
    rainChance: {
      label: "Rain Chance (%)",
      color: "#3b82f6",
    },
  };

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
                {(weatherData.reduce((sum, day) => sum + day.temperature, 0) / weatherData.length).toFixed(1)}°C
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
                {(weatherData.reduce((sum, day) => sum + day.rainChance, 0) / weatherData.length).toFixed(1)}%
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
                {(weatherData.reduce((sum, day) => sum + day.humidity, 0) / weatherData.length * 100).toFixed(1)}%
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
                {(weatherData.reduce((sum, day) => sum + day.pressure, 0) / weatherData.length).toFixed(0)} mb
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className={`grid md:grid-cols-2 gap-6 mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Temperature Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <LineChart data={weatherData}>
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="var(--color-temperature)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-temperature)" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Rain Probability</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <LineChart data={weatherData}>
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rainChance" 
                    stroke="var(--color-rainChance)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-rainChance)" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className={`border-0 shadow-lg bg-white/70 backdrop-blur-sm ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
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
                  {weatherData.map((day, index) => (
                    <TableRow key={index} className="hover:bg-green-50/50 transition-colors">
                      <TableCell className="font-medium">
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </TableCell>
                      <TableCell className="text-red-600 font-semibold">{day.temperature.toFixed(1)}</TableCell>
                      <TableCell className="text-cyan-600">{(day.humidity * 100).toFixed(1)}</TableCell>
                      <TableCell className="text-purple-600">{day.pressure.toFixed(1)}</TableCell>
                      <TableCell className="text-gray-600">{(day.cloudCover * 100).toFixed(1)}</TableCell>
                      <TableCell className="text-blue-600 font-semibold">{day.rainChance.toFixed(1)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <CloudRain className="h-3 w-3 mr-1" />
                          {day.summary}
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
