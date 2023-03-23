import { useState, useEffect } from 'react';
import { getUrls } from '../lib/notion';

export default function Stats({ urls }) {

  return (
    <div className="container mt-12 overflow-x-auto">
      <h2 className="text-xl sm:text-2xl mb-4 px-2">Your Shortened URLs</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b border-gray-300 px-2 sm:px-4 py-2 text-left">Title</th>
            <th className="border-b border-gray-300 px-2 sm:px-4 py-2">Clicks</th>
            <th className="border-b border-gray-300 px-2 sm:px-4 py-2 text-left">Short URL</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id} className="hover:bg-gray-100">
              <td className="border-b border-gray-300 px-4 py-2">{url.title}</td>
              <td className="border-b border-gray-300 px-4 py-2">{url.clickCount}</td>
              <td className="border-b border-gray-300 px-4 py-2">
                <a
                  href={`/${url.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${process.env.NEXT_PUBLIC_SHORT_URL_DOMAIN}/${url.shortUrl}`}
                </a>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Add the getStaticProps function
export async function getStaticProps() {
  const urls = await getUrls();
  return {
    props: {
      urls,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
