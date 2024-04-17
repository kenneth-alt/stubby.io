import React, { useState } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_API_URL;

const ShortenerForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/shorten`, { longUrl });
      setShortUrl(response.data.shortUrl);
      setError('');
    } catch (error) {
      console.error('Error shortening URL:', error);
      setShortUrl('');
      setError('Error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">URL Shortener</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          className="w-full border rounded px-4 py-2 mb-4"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2"
        >
          Shorten URL
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {shortUrl && (
        <div className="mt-4">
          <p className="text-sm">Short URL:</p>
          <a
            href={shortUrl}
            className="text-blue-500 break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;
