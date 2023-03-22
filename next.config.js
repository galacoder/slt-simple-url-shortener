module.exports = {
  env: {
    NEXT_PUBLIC_SHORT_URL_DOMAIN: process.env.NEXT_PUBLIC_SHORT_URL_DOMAIN || `https://${process.env.VERCEL_URL}`,
  },
};
