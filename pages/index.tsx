import { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customShortUrl: '',
    title: '',
    description: '',
  });

  const [shortenedUrl, setShortenedUrl] = useState('');

  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = process.env.PASSWORD;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

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
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">Please enter the password to access the page</h1>
        <form onSubmit={handlePasswordSubmit} className="w-full max-w-sm">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter password"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
  if (isAuthenticated) {
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
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Generate Short URL
          </button>
        </form >
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
          </div>
        )
        }
      </div >
    )
  }
}
