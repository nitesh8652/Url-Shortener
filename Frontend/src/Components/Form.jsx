import React, { useState, useEffect } from 'react';
import { Fetchapi } from '../Api/ShortUrl.Api';
import { checkAuthStatus } from '../Api/UserApi'; // Make sure this is your API call
import { useQueryClient } from '@tanstack/react-query';


const Form = () => {
  const [url, setvalue] = useState("");
  const queryClient = useQueryClient();

  const [shortUrl, setshortUrl] = useState();
  const [showTost, setshowTost] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setcustomSlug] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // for loading spinner

  // Auth check on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkAuthStatus(); // Should return { user: {} } or similar
        if (res?.user) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isAuthenticated ? { url, Slug: customSlug } : { url };
      const Shortingurl = await Fetchapi(data);
      // setshortUrl(Shortingurl);
      setshortUrl(`https://url-shortener-z9f3.onrender.com/${Shortingurl.short_url}`);

      queryClient.invalidateQueries({ queryKey: ['urlHistory'] });


    } catch (err) {
      setError(err.message);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
        .then(() => {
          setshowTost(true);
          setTimeout(() => setshowTost(false), 2000);
        })
        .catch(err => {
          alert('Failed to copy: ', err);
        });
    }
  };

  // Show loading until auth check completes
  if (loading) {
    return <div>Checking authentication...</div>;
  }

  return (
    <>
      {showTost && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition">
          URL copied to clipboard!
        </div>
      )}

      <form onSubmit={handlesubmit}>
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your long URL
          </label>
          <input
            type="url"
            id="url"
            // value={url}
            value={shortUrl}
          
            onChange={(e) => setvalue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
            required
          />
        </div>

        {/* Conditionally show custom URL input */}
        {isAuthenticated && (
          <div className="mt-4">
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
              Custom URL
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={
                (e) => {
                  setcustomSlug(e.target.value)
                  setError(null)
                }}
              placeholder="Your Custom URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Shorten Now!
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-2">Your shortened URL:</h2>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-200 p-2 rounded-r-md hover:bg-gray-300"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default Form;
