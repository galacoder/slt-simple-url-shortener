
// pages/api/click-count.js
import { notion } from "../../lib/notion";

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
        const clickCount = response.results[0].properties["Click Count"].number;
        res.status(200).json({ clickCount });
      } else {
        res.status(404).json({ error: "URL not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching click count" });
    }
  } else {
    res.status(405).json({ error: "Invalid request method" });
  }
}
