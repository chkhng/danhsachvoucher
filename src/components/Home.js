import React, { useState, useEffect } from 'react';
import { getLocation } from './API';
import './Homepage.css';

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const getMyLocation = async () => {
    setIsLoading(true);
    try {
      const data = await getLocation();
      setLocations(data);
    } catch (error) {
      console.error('Failed to fetch locations', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>Địa điểm</h1>
        <div className="tabs">
          <button className="active">Địa điểm</button>
          <button>Ưu đãi</button>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="clinic-container">
          {locations.map((location) => (
            <div key={location.id} className="clinic-card">
              <img src={location?.locationImages.path} alt={location.name} />
              <div className="clinic-info">
                <h2>{location.name}</h2>
                <p>{location.fullAddress}</p>
                <div className="rating">
                  {'★'.repeat(location.rating)}
                  {'☆'.repeat(5 - location.rating)}
                  <span> ({location.totalRating})</span>
                </div>
              </div>
              <div className="booking-info">
                <p>Đã đặt {location.totalBooking}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
