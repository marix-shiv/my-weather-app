import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CitiesTable from './CitiesTable';
import WeatherPage from './WeatherPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CitiesTable />} />
        <Route path="/weather/:cityName" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};

export default App;
