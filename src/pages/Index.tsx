
import { useState, useEffect } from 'react';
import { Cloud, Thermometer, MapPin, Leaf, Sun, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Thermometer,
      title: "Display Sensor Dashboard",
      description: "Real-time IoT sensor data from Raspberry Pi Pico W",
      gradient: "from-green-400 to-blue-500",
      delay: "0s"
    },
    {
      icon: CloudRain,
      title: "Predict 15-Day Forecast",
      description: "ML-powered weather predictions with custom ensemble model",
      gradient: "from-blue-400 to-purple-500",
      delay: "0.2s"
    },
    {
      icon: MapPin,
      title: "Weather API Map",
      description: "Interactive map of India with real-time weather data",
      gradient: "from-purple-400 to-pink-500",
      delay: "0.4s"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Leaves */}
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <Leaf className="h-8 w-8 text-green-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Leaf className="h-6 w-6 text-emerald-400 opacity-50" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>
          <Leaf className="h-10 w-10 text-green-200 opacity-40" />
        </div>
        
        {/* Floating Clouds */}
        <div className="absolute top-16 right-1/3 animate-pulse" style={{ animationDuration: '4s' }}>
          <Cloud className="h-12 w-12 text-blue-200 opacity-30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}>
          <Cloud className="h-8 w-8 text-sky-200 opacity-40" />
        </div>
        
        {/* Sun */}
        <div className="absolute top-10 right-10 animate-spin" style={{ animationDuration: '20s' }}>
          <Sun className="h-16 w-16 text-yellow-300 opacity-20" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full shadow-lg">
              <Leaf className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            EcoCast
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed">
            Nature-inspired weather monitoring platform combining IoT sensors and ML predictions
          </p>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Supporting UN SDG 11: Sustainable Cities and Communities through intelligent weather forecasting
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl border-0 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: feature.delay }}
            >
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 flex-grow">
                  {feature.description}
                </p>
                
                <Button 
                  className={`bg-gradient-to-r ${feature.gradient} hover:shadow-lg transition-all duration-300 text-white border-0 group-hover:scale-105`}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">15 Days</div>
              <div className="text-gray-600">Weather Forecast</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">Real-time</div>
              <div className="text-gray-600">IoT Sensor Data</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">ML Powered</div>
              <div className="text-gray-600">Ensemble Model</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to explore sustainable weather monitoring?
          </h2>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
