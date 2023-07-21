const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000; // Replace with your desired port number

// Replace with your actual Flutterwave API keys
const publicKey = 'FLWPUBK_TEST-daa6cec70115dc2346779feba961270f-X';
const secretKey = 'FLWSECK_TEST-1bfbdcb04bbf2c89fee06a15a7cac607-X';

// Middleware to parse request body as JSON
app.use(express.json());

// Route to get subscription plans
app.get('/subscription-plans', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.flutterwave.com/v3/subscriptions/plans',
      {
        headers: {
          Authorization: `Bearer ${publicKey},${secretKey}`,
        },
      }
    );

    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch subscription plans' });
  }
});

// Route to initiate subscription payment
app.post('/initiate-subscription', async (req, res) => {
  const { email, planId } = req.body;
  try {
    const response = await axios.post(
      'https://api.flutterwave.com/v3/subscriptions',
      {
        plan_id: planId,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to initiate subscription' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
