import { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customShortUrl: '',
    title: '',
    description: '',
  });

  const [shortenedUrl, setShortenedUrl] = useState('');

  const [urlList, setUrlList] = useState([]);

  const fetchUrlList = async () => {
    try {
      const response = await fetch('/api/urls');

      if (response.ok) {
        const data = await response.json();
        // console.log(data)
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
  }, [shortenedUrl]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/create-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Show the shortened URL to the user, for example, by setting a state
        console.log(data.shortUrl);
        setShortenedUrl(`${process.env.NEXT_PUBLIC_SHORT_URL_DOMAIN}/${data.shortUrl}`)
      } else {
        const error = await response.json();
        // Handle the error, for example, by showing a message
        console.error(error);
      }
    } catch (error) {
      // Handle network errors
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-4xl text-center my-8">URL Shortener</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="originalUrl" className="block text-sm font-medium">
            Original URL
          </label>
          <input
            type="url"
            name="originalUrl"
            id="originalUrl"
            value={formData.originalUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="https://example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="customShortUrl" className="block text-sm font-medium">
            Custom Short URL (Optional)
          </label>
          <input
            type="text"
            name="customShortUrl"
            id="customShortUrl"
            value={formData.customShortUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="custom-url"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Title for the URL"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Short Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Short description for the URL"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Generate Short URL
        </button>
      </form>
      {shortenedUrl && (
        <div className="mt-12 overflow-x-auto">
          <h2 className="text-xl sm:text-2xl mb-4">Your Shortened URL:</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              readOnly
              value={shortenedUrl}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => navigator.clipboard.writeText(shortenedUrl)}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl mb-4">Your Shortened URLs:</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-2 sm:px-4 py-2">Title</th>
                <th className="border-b border-gray-300 px-2 sm:px-4 py-2">Short URL</th>
                <th className="border-b border-gray-300 px-2 sm:px-4 py-2">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {urlList.map((url) => (
                <tr key={url.id} className="hover:bg-gray-100">
                  <td className="border-b border-gray-300 px-4 py-2">{url.title}</td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                      {url.shortUrl}
                    </a>
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">{url.clickCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
