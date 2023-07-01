// ----- WikiGuess final project -----
// This Node.JS server will use to perform Majority Vote in order overcome
// user's mistake or data's mistake in WikiGuess game.
// Calling Majority Vote do not guarantee to succussesfully returns the dsired outcome.
// The server is hosted by Render.com | URL:https://wikiguess-node-server.onrender.com/

const express = require('express');
const { getAllGameObjects } = require('./firebaseHandler');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/wakeup', (req, res) => {
    // Wake up Render server
    res.send('WikiGuess Server is awake!').status(200);
});

app.post('/majorityvote', async (req, res) => {
    // Get the gameObjects data from Firebase
    const data = await getAllGameObjects();
    const gameObject = req.body;

    // Filter out objects from data based on matching properties with gameObject
    const filteredData = data.filter((item) => {
        return Object.keys(gameObject).every((key) => {
            const values = gameObject[key].split(', ');
            const dataValues = item[key] ? item[key].split(', ') : [];
            return values.some((value) => dataValues.includes(value)) || dataValues.length === 0;
        });
    });

    // Majority vote
    const frequency = {};
    let maxFrequency = 0;
    let mostFrequentItem = null;

    for (let i = 0; i < filteredData.length; i++) {
        const item = filteredData[i].item;
        if (frequency[item]) {
            frequency[item]++;
        } else {
            frequency[item] = 1;
        }
    }

    for (const item in frequency) {
        if (frequency[item] > maxFrequency) {
            maxFrequency = frequency[item];
            mostFrequentItem = item;
        }
    }

    // Returns the outcome to the client
    res.send({ name: mostFrequentItem }).status(200);
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
