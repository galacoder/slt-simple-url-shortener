
// pages/api/urls.js
import { notion } from "../../lib/notion";
import { getUrls } from '../../lib/notion';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // const response = await notion.databases.query({
      //   database_id: process.env.NOTION_DATABASE_ID,
      // });

      // const urls = response.results.map((result) => ({
      //   id: result.id,
      //   originalUrl: result.properties["Original URL"].url,
      //   shortUrl: result.properties["Shortened URL"].title[0].plain_text,
      //   title: result.properties["Title"].rich_text[0]?.plain_text,
      //   description: result.properties["Description"].rich_text[0]?.plain_text,
      //   clickCount: result.properties["Click Count"].number,
      // }));
      const urls = await getUrls();
      // console.log(`from urls server: ${JSON.stringify(response)}`)

      res.status(200).json({ urls });
    } catch (error) {
      res.status(500).json({ error: "Error fetching URLs" });
    }
  } else {
    res.status(405).json({ error: "Invalid request method" });
  }
}

// Export the getUrls function
export { getUrls };
