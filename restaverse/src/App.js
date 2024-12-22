import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle the restaurant name input change
  const handleInputChange = (event) => {
    setRestaurantName(event.target.value);
  };

  // Fetch reviews based on the restaurant name
  const fetchReviews = async () => {
    if (!restaurantName) {
      setError('Please enter a restaurant name.');
      return;
    }

    setLoading(true);
    setError('');  // Reset the error message

    try {
      // Sending GET request to Flask server
      const response = await axios.get(`http://localhost:5000/get-reviews?restaurant=${restaurantName}`);
      
      // Handle response data and set reviews
      if (response.data && response.data.length > 0) {
        setReviews(response.data);
      } else {
        setError('No reviews found for this restaurant.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to fetch reviews. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Google Reviews</h1>

      <div className="search-bar">
        <input
          type="text"
          value={restaurantName}
          onChange={handleInputChange}
          placeholder="Enter restaurant name"
        />
        <button onClick={fetchReviews}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="reviews">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <h3>{review.name}</h3>
                <p>{review.review}</p>
                <p><strong>Rating:</strong> {review.rating}</p>
                <p><strong>Date:</strong> {review.date}</p>
                <a href={review.link} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            ))
          ) : (
            <p>No reviews found for this restaurant.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
