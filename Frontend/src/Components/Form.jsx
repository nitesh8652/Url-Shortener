import React, { useState, useEffect } from 'react';
import { Fetchapi } from '../Api/ShortUrl.Api';
import { checkAuthStatus } from '../Api/UserApi';
import { useQueryClient } from '@tanstack/react-query';

const Form = () => {
  const [url, setUrl] = useState('');               // long URL
  const [customSlug, setCustomSlug] = useState(''); // user’s slug
  const [shortUrl, setShortUrl] = useState();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      try {
        const res = await checkAuthStatus();
        if (res?.user) setIsAuthenticated(true);
      } catch {}
      finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = isAuthenticated
        ? { url, Slug: customSlug }
        : { url };

      const code = await Fetchapi(payload);
      setShortUrl(`https://url-shortener-z9f3.onrender.com/${encodeURIComponent(code)}`);
      queryClient.invalidateQueries(['urlHistory']);
    } catch (err) {
      setError(err.message);
    }
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      });
  };

  if (loading) {
    return (
      <div className="text-center bg-green-500 text-white px-4 py-2 rounded">
        Checking authentication...
      </div>
    );
  }

  return (
    <>
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          URL copied to clipboard!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* 1) Long URL field */}
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your long URL
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={e => setUrl(e.target.value)}   // <-- simple setter
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 2) Custom slug field (only if authenticated) */}
        {isAuthenticated && (
          <div className="mb-4">
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
              Custom Slug
            </label>
            <input
              id="customSlug"
              type="text"
              placeholder="my‑custom‑slug"
              value={customSlug}
              onChange={e => {
                // sanitize here
                const raw = e.target.value;
                const sanitized = raw
                  .trim()
                  .replace(/\s+/g, '-')          // spaces → hyphens
                  .replace(/[^a-zA-Z0-9-]/g, '') // drop non-alnum/hyphen
                  .toLowerCase();
                setCustomSlug(sanitized);
              }}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Shorten Now!
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
      </form>

      {/* Display the shortened URL and copy button */}
      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Your shortened URL:</h2>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border rounded-l-md bg-gray-50"
            />
            <button
              onClick={copyToClipboard}
              className="p-2 bg-gray-200 rounded-r-md hover:bg-gray-300"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
