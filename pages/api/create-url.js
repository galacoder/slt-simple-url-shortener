import { notion } from "../../lib/notion";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { originalUrl, customShortUrl, title, description } = req.body;
    const shortUrl = customShortUrl || nanoid(7);

    try {
      await notion.pages.create({
        parent: {
          database_id: process.env.NOTION_DATABASE_ID,
        },
        properties: {
          'Shortened URL': {
            title: [
              {
                text: {
                  content: shortUrl,
                },
              },
            ],
          },
          'Original URL': {
            url: originalUrl,
          },
          'Title': {
            rich_text: [
              {
                text: {
                  content: title,
                },
              },
            ],
          },
          'Description': {
            rich_text: [
              {
                text: {
                  content: description,
                },
              },
            ],
          },
          'Click Count': {
            number: 0,
          },
        },
      });
      res.status(200).json({ shortUrl });
    } catch (error) {
      res.status(500).json({ error: "Error creating shortened URL" });
    }
  } else {
    res.status(405).json({ error: "Invalid request method" });
  }
}
