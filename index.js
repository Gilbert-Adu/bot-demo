const express = require('express');
const bodyParser = require('body-parser');
const manager = require('./train');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
// Endpoint to handle chatbot queries
app.post('/api/chat', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const response = await manager.process('en', query);
  res.json({ response: response.answer });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
