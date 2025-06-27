import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// TODO: Replace with the actual path to your India states GeoJSON file
const INDIA_GEO_URL = '/india-states.geojson';

// Example: Map state names to coordinates (add all states as needed)
const stateCoordinates: Record<string, { lat: number; lon: number }> = {
    'Karnataka': { lat: 12.9716, lon: 77.5946 },
    'Maharashtra': { lat: 19.076, lon: 72.8777 },
    'Tamil Nadu': { lat: 13.0827, lon: 80.2707 },
    'West Bengal': { lat: 22.5726, lon: 88.3639 },
    'Delhi': { lat: 28.6139, lon: 77.209 },
    // ...add more states
};

const API_KEY = 'aa9c300feb9a10c3886b861eb76161af';

const IndiaMap: React.FC = () => {
    const [weather, setWeather] = useState<any>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleStateClick = async (geo: any) => {
        const stateName = geo.properties.ST_NM || geo.properties.NAME_1 || geo.properties.name;
        setSelectedState(stateName);
        setWeather(null);
        setError(null);
        const coords = stateCoordinates[stateName];
        if (!coords) {
            setError('Coordinates for this state are not available.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
            );
            if (!res.ok) throw new Error('Failed to fetch weather data');
            const data = await res.json();
            setWeather(data);
        } catch (err) {
            setError('Failed to fetch weather data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ComposableMap projection="geoMercator" width={600} height={700}>
                <Geographies geography={INDIA_GEO_URL}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onClick={() => handleStateClick(geo)}
                                style={{
                                    default: { fill: '#D6D6DA', outline: 'none', cursor: 'pointer' },
                                    hover: { fill: '#F53', outline: 'none' },
                                    pressed: { fill: '#E42', outline: 'none' },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
            {selectedState && (
                <div style={{ marginTop: 24 }}>
                    <h2>{selectedState} Weather</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {weather && (
                        <div>
                            <p>Temperature: {weather.main.temp}°C</p>
                            <p>Condition: {weather.weather[0].description}</p>
                            <p>Humidity: {weather.main.humidity}%</p>
                            <p>Pressure: {weather.main.pressure} hPa</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default IndiaMap; 