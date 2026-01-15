const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all for dev
        methods: ["GET", "POST"]
    }
});

// In-memory store
let incidents = [];

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Send existing incidents to new connection
    socket.emit('initial_data', incidents);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Endpoint to receive analysis from "AI" (or simulation)
app.post('/api/incident', (req, res) => {
    const { category, severity, summary, lat, lng, locationName } = req.body;

    const newIncident = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        category: category || "Unspecified",
        severity: severity || "MEDIUM", // LOW, MEDIUM, HIGH, CRITICAL
        summary: summary || "No details provided.",
        lat: lat || 37.7749,
        lng: lng || -122.4194,
        locationName: locationName || "Unknown"
    };

    incidents.unshift(newIncident); // Add to top
    if (incidents.length > 50) incidents.pop(); // Keep size manageable

    // push to all clients
    io.emit('alert', newIncident);

    console.log("New Incident Reported:", newIncident.category);
    res.status(201).json({ success: true, incident: newIncident });
});

// Health check
app.get('/', (req, res) => {
    res.send('Vigilant API Server Online');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
