// ShortenerForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ShortenerForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/shorten', { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
      setShortUrl('Error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortUrl && (
        <div>
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;
