const https = require('http'); // sending to localhost

const incidents = [
    {
        category: "Medical Emergency",
        severity: "CRITICAL",
        summary: "Male, 65, experiencing severe chest pain. Potential cardiac arrest.",
        lat: 37.7749,
        lng: -122.4194,
        locationName: "123 Market St, San Francisco"
    },
    {
        category: "Fire Hazard",
        severity: "HIGH",
        summary: "Smoke detected in industrial warehouse. No visible flames yet.",
        lat: 37.7849,
        lng: -122.4094,
        locationName: "456 Mission St, San Francisco"
    },
    {
        category: "Traffic Accident",
        severity: "MEDIUM",
        summary: "Two-vehicle collision, minor injuries reported. Traffic blocked.",
        lat: 37.7649,
        lng: -122.4294,
        locationName: "16th & Valencia, San Francisco"
    }
];

function sendIncident(incident) {
    const data = JSON.stringify(incident);

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/incident',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`Sent ${incident.category}: Status ${res.statusCode}`);
        res.on('data', d => process.stdout.write(d));
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

// Send a random incident every 5 seconds
console.log("Starting simulation...");
sendIncident(incidents[0]); // Send one immediately

let i = 1;
setInterval(() => {
    sendIncident(incidents[i % incidents.length]);
    i++;
}, 10000);
