import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RedirectToOriginalUrl = () => {
  const router = useRouter();
  const { shortUrl } = router.query;

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      if (shortUrl) {
        try {
          const response = await fetch(`/api/redirect/${shortUrl}`);

          if (response.ok) {
            const data = await response.json();
            window.location.href = data.originalUrl;
          } else {
            // Handle error, e.g., show a message or redirect to a 404 page
            console.error('Short URL not found');
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchOriginalUrl();
  }, [shortUrl]);

  return (
    <div>
      {/* Display a loading message or a spinner while waiting for the redirection */}
      <p>Redirecting...</p>
    </div>
  );
};

export default RedirectToOriginalUrl;
