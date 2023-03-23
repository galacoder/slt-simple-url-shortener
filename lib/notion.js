const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getUrls() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const urls = response.results.map((result) => {

    return {
      id: result.id,
      originalUrl: result.properties["Original URL"].url,
      shortUrl: result.properties["Shortened URL"].title[0].plain_text,
      title: result.properties["Title"].rich_text[0]?.plain_text,
      description: result.properties["Description"].rich_text[0]?.plain_text,
      clickCount: result.properties["Click Count"].number,
    };
  });

  return urls;
}

module.exports = {
  notion,
  getUrls, // Export the getUrls function
}; 
