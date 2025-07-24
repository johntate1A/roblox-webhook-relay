const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Replace this with YOUR Discord webhook
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1397929454352994384/RbHsm7xHHkphX0E-OVz4FpZUp55OgUjRjYXxXUPG135CtGkvcocUEq04S4_ECHInA5xW';

app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    const data = req.body;

    // Forward the incoming data to your Discord webhook
    await axios.post(DISCORD_WEBHOOK, {
      embeds: [data.embed || {
        title: "🔔 New Log",
        description: "Data received from Roblox script.",
        color: 0xff0000,
        fields: Object.entries(data).map(([key, val]) => ({
          name: key,
          value: typeof val === 'string' ? val : JSON.stringify(val),
          inline: false
        })),
        timestamp: new Date().toISOString()
      }]
    });

    res.status(200).send('Logged to Discord!');
  } catch (err) {
    console.error('Error forwarding to Discord:', err);
    res.status(500).send('Failed to forward to Discord');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
