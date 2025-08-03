# 🌤️ Eco Horizon Forecast

A comprehensive weather forecasting application that combines machine learning with interactive data visualization to provide accurate weather predictions for Bangalore, India.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/Numpy-013243?style=for-the-badge&logo=numpy&logoColor=white)

## 📺 Demo Video

Watch our project demo: [Eco Horizon Forecast Demo](https://drive.google.com/file/d/1KbNriFuMCglnB8D0MeVVkk932JnNVJBy/view?usp=drive_link)

## 🚀 Features

- **Interactive Weather Map**: Visualize weather patterns across India with an interactive map
- **Machine Learning Forecasts**: Advanced ML models for accurate weather predictions
- **Real-time Data Visualization**: Beautiful charts and graphs using Recharts
- **Responsive Design**: Modern UI built with shadcn/ui and Tailwind CSS
- **Bangalore Weather Dataset**: Comprehensive historical weather data for training
- **Multi-page Application**: Forecast, Weather Map, and Dashboard views

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **React Router** - Client-side routing
- **Recharts** - Composable charting library
- **React Simple Maps** - Interactive map visualization

### Backend & Data Processing
- **Python** - Machine learning and data processing
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **Custom ML Models** - Ensemble regressors and classifiers

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📊 Machine Learning & Data

### Bangalore Weather Dataset
The project utilizes a comprehensive weather dataset for Bangalore, India, containing:
- **Formatted Date** - Timestamp data
- **Summary** - Weather condition descriptions
- **Precip Type** - Precipitation type (rain, snow, etc.)
- **Temperature (C)** - Temperature in Celsius
- **Apparent Temperature (C)** - Feels-like temperature
- **Humidity** - Relative humidity percentage
- **Wind Speed (km/h)** - Wind velocity
- **Wind Bearing (degrees)** - Wind direction
- **Visibility (km)** - Visibility distance
- **Pressure (millibars)** - Atmospheric pressure
- **Cloud Cover** - Cloud coverage percentage

### ML Models
- **Custom Ensemble Regressor** - For continuous weather parameters
- **Custom Ensemble Classifier** - For categorical weather conditions
- **Decision Stump Models** - Base learners for ensemble methods
- **Seasonal Adjustments** - Time-series forecasting capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Python 3.8+ (for ML model generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd eco-horizon-forecast
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies (for ML)**
   ```bash
   pip install pandas numpy
   ```

4. **Generate forecast data**
   ```bash
   python scripts/generate_forecast.py
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
eco-horizon-forecast/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Application pages
│   │   ├── Index.tsx       # Home page
│   │   ├── Forecast.tsx    # Weather forecast page
│   │   ├── WeatherMap.tsx  # Interactive map page
│   │   └── NotFound.tsx    # 404 page
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── App.tsx             # Main application component
├── public/
│   ├── Bangalore_Weather_Dataset.csv  # Historical weather data
│   ├── bangalore_forecast.json        # Generated forecasts
│   └── india-states.geojson           # Map data
├── scripts/
│   └── generate_forecast.py           # ML model script
└── package.json
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features

### Interactive Weather Map
- Visualize weather patterns across India
- Interactive state-level data
- Real-time weather information display

### Advanced Forecasting
- Machine learning-powered predictions
- Multiple weather parameters
- Seasonal trend analysis

### Modern UI/UX
- Responsive design for all devices
- Dark/light theme support
- Accessible components
- Smooth animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



**Built with ❤️ using React, TypeScript, and Python**
