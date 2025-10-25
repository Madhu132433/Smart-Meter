const express = require('express');
const cors = require('cors');
const { getScrapedData } = require('./scraper');

const app = express();
app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    const data = await getScrapedData();
    res.json(data);
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
