import { useState } from 'react';
import { getallurl } from '../Api/UserApi';
import { useQuery } from '@tanstack/react-query';
import { ClipboardCopy } from 'lucide-react';

const UrlHistory = () => {
  const [copiedId, setCopiedId] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['urlHistory'],
    queryFn: getallurl,
    staleTime: 0,
  });

  const urls = data?.urls || [];
  const reversedUrls = [...urls].reverse();

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch(err => {
        console.error("Failed to copy:", err);
      });
  };

  if (isLoading) return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
      <div className="animate-pulse flex justify-center">
        <p className="text-gray-500 dark:text-gray-300">Loading your URLs...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
      <p className="text-red-500 text-center">Failed to load: {error.message}</p>
    </div>
  );

  if (urls.length === 0) return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
      <p className="text-gray-500 text-center">You haven't created any URLs yet.</p>
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">📋 Your Shortened URLs</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Original URL</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Short URL</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Clicks</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Copy</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {reversedUrls.map((url) => (
              <tr key={url._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-6 py-4 max-w-sm text-sm text-gray-800 dark:text-gray-200 truncate" title={url.full_url}>
                  {url.full_url}
                </td>

                <td className="px-6 py-4 max-w-sm text-sm text-blue-600 dark:text-blue-400 truncate"
                  title={`https://url-shortener-z9f3.onrender.com/${url.short_url}`}>
                  <a href={`https://url-shortener-z9f3.onrender.com/${url.short_url}`} target="_blank" rel="noopener noreferrer">
                    {`https://url-shortener-z9f3.onrender.com/${url.short_url}`}
                  </a>
                </td>


                <td className="px-6 py-4 text-center">
                  <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                    {url.clicks}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => copyToClipboard(`https://url-shortener-z9f3.onrender.com/${url.short_url}`, url._id)}


                    className={`inline-flex items-center px-4 py-2 text-xs font-medium rounded-full shadow-sm transition ${copiedId === url._id
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                  >
                    <ClipboardCopy className="w-4 h-4 mr-2" />
                    {copiedId === url._id ? 'Copied!' : 'Copy'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlHistory;
