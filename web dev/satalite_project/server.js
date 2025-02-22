// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware to enable CORS
// app.use(cors());

// // Endpoint to fetch satellite data
// app.get('/api/satellite/:id', async (req, res) => {
//     const satelliteId = req.params.id;

//     try {
//         const response = await axios.get(`http://api.wheretheiss.at/v1/satellites/${satelliteId}`);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error fetching satellite data:', error.message);
//         res.status(500).json({ error: 'Failed to fetch satellite data' });
//     }
// });

// // Default route
// app.get('/', (req, res) => {
//     res.send('Satellite Tracker Backend');
// });
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const qs = require('querystring');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

// Replace with your Space-Track.org credentials
const USERNAME = 'your_username';
const PASSWORD = 'your_password';

// Function to authenticate and get the API token
async function getAuthToken() {
    try {
        const response = await axios.post('https://www.space-track.org/ajaxauth/login', qs.stringify({
            identity: USERNAME,
            password: PASSWORD
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const cookies = response.headers['set-cookie'];
        return cookies.find(cookie => cookie.startsWith('STK_COOK'))?.split(';')[0];
    } catch (error) {
        console.error('Error getting auth token:', error.message);
        throw new Error('Failed to authenticate');
    }
}

// Endpoint to fetch satellite data
app.get('/api/satellite/:id', async (req, res) => {
    const satelliteId = req.params.id;

    try {
        const token = await getAuthToken();
        const response = await axios.get(`https://www.space-track.org/#!/satcat?search=${satelliteId}`, {
            headers: {
                'Cookie': token
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching satellite data:', error.message);
        res.status(500).json({ error: 'Failed to fetch satellite data' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Satellite Tracker Backend');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
