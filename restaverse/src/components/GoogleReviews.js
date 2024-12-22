import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <div>
          <h2>Google Reviews</h2>
          {reviews.length > 0 ? (
  reviews.map((review, index) => (
    <div key={index}>
      <p><strong>Author:</strong> {review.author_name}</p>
      <p><strong>Review:</strong> {review.text}</p>
      <p><strong>Rating:</strong> {review.rating}</p>
      <p><strong>Time:</strong> {review.time}</p>
      <hr />
    </div>
  ))
) : (
  <p>No reviews available.</p>
)}

        </div>
      )}
    </div>
  );
};

export default GoogleReviews;
