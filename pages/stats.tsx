import { useState, useEffect } from 'react';

export default function Stats() {
  const [urlList, setUrlList] = useState([]);

  const fetchUrlList = async () => {
    try {
      const response = await fetch('/api/urls');

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUrlList(data.urls);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUrlList();
  }, []);

  return (
    <div className="container mt-12 overflow-x-auto">
      <h2 className="text-xl sm:text-2xl mb-4 px-2">Your Shortened URLs</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b border-gray-300 px-2 sm:px-4 py-2 text-left">Title</th>
            <th className="border-b border-gray-300 px-2 sm:px-4 py-2 text-left">Short URL</th>
            <th className="border-b border-gray-300 px-2 sm:px-4 py-2">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urlList.map((url) => (
            <tr key={url.id} className="hover:bg-gray-100">
              <td className="border-b border-gray-300 px-4 py-2">{url.title}</td>
              <td className="border-b border-gray-300 px-4 py-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_SHORT_URL_DOMAIN}/${url.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${process.env.NEXT_PUBLIC_SHORT_URL_DOMAIN}/${url.shortUrl}`}
                </a>
              </td>
              <td className="border-b border-gray-300 px-4 py-2">{url.clickCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

