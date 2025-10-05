const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ origin: '*' }));

// Serve dice images
app.use('/dice_faces', express.static(__dirname + '/dice_faces'));

// Generate random numbers
app.get('/api/roll', (req, res) => {
  const values = [];
  const images = [];

  for (let i = 0; i < 5; i++) {
    const value = Math.floor(Math.random() * 6) + 1;
    values.push(value);
    images.push(`dice_faces/${value}.png`);
  }

  // Respond with JSON data
  res.json({
    dice: values,
    imagePaths: images,
  });
});

// Root route for testing
app.get('/', (req, res) => {
  res.send(`
    <h1>Dice Roller API</h1>
    <p>Use <code>/api/roll</code> to roll 5 dice.</p>
    <p>Example: <a href="/api/roll" target="_blank">/api/roll</a></p>
  `);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Dice Roller API running on port ${PORT}`));
