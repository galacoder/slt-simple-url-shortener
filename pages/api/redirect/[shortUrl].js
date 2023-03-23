
// pages/api/redirect/[shortUrl].js
import { notion } from "../../../lib/notion";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const shortUrl = req.query.shortUrl;

    try {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
          property: "Shortened URL",
          title: {
            equals: shortUrl,
          },
        },
      });

      if (response.results.length > 0) {
        const pageId = response.results[0].id;
        const originalUrl = response.results[0].properties["Original URL"].url;
        const currentClickCount = response.results[0].properties["Click Count"].number;

        await notion.pages.update({
          page_id: pageId,
          properties: {
            "Click Count": {
              number: currentClickCount + 1,
            },
          },
        });

        // res.redirect(originalUrl);
        res.status(200).json({ originalUrl: originalUrl });
      } else {
        res.status(404).json({ error: "URL not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error redirecting to original URL" });
    }
  } else {
    res.status(405).json({ error: "Invalid request method" });
  }
}
