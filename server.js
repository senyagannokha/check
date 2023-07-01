
const fetch = require('isomorphic-fetch');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8080; // You can change this port if needed

app.use(cors()); // Enable CORS for all routes

// Serve the static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/address/:address', (req, res) => {
  const apiKey = 'bacd6cc07e2acb47e509a3ec71e142a5b2ff3cf820b9762641804a9c023264d4'; // Replace with your Chainalysis API key
  const address = req.params.address;

  const apiUrl = `https://public.chainalysis.com/api/v1/address/${address}`;

  fetch(apiUrl, {
    headers: {
      'X-API-Key': apiKey,
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({ error: 'Request failed' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
