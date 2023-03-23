import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from '../components/spinner';

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
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  );
};

export default RedirectToOriginalUrl;
