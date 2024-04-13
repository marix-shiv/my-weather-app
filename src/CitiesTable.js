import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100'
        );
        setCities(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchCities();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredCities = cities && cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredCities);
  return (
    <div>
      <input
        type="text"
        placeholder="Search City"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities && filteredCities.map(city => (
            <tr key={city.recordid}>
              <td>
                <Link to={`/weather/${city.name}`}>{city.name}</Link>
              </td>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitiesTable;
