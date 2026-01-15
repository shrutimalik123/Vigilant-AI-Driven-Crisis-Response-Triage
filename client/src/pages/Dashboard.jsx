import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

// Fix Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom danger icon
const dangerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Connect to backend (adjust URL if needed)
const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
    transports: ['websocket'],
    autoConnect: true
});

const Dashboard = () => {
    const [incidents, setIncidents] = useState([]);
    const [activeIncidentId, setActiveIncidentId] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to WebSocket Server");
        });

        socket.on('alert', (newIncident) => {
            console.log("New Alert Received:", newIncident);
            setIncidents(prev => [newIncident, ...prev]);
            // Play alert sound if needed
        });

        return () => {
            socket.off('connect');
            socket.off('alert');
        };
    }, []);

    const handleIncidentClick = (id) => {
        setActiveIncidentId(id);
        // Ensure map logic handles flyer-to if needed
    };

    const center = [37.7749, -122.4194]; // San Francisco

    return (
        <div className="h-screen w-screen bg-gray-900 text-white flex overflow-hidden font-sans">
            {/* Sidebar / Alert Feed */}
            <div className="w-96 bg-gray-800 border-r border-gray-700 flex flex-col z-20 shadow-2xl">
                <div className="p-4 border-b border-gray-700 bg-gray-900 shadow-md">
                    <h1 className="text-xl font-bold text-red-500 tracking-wider flex items-center gap-2">
                        VIGILANT <span className="text-[10px] text-gray-400 font-normal border border-gray-600 px-1 rounded uppercase tracking-widest">Live Response</span>
                    </h1>
                    <div className="flex justify-between mt-3 text-xs uppercase tracking-wider text-gray-400 font-semibold">
                        <span>Active Incidents: <span className="text-white">{incidents.length}</span></span>
                        <span className="text-green-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {incidents.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-3">
                                <Clock className="w-6 h-6 text-gray-500" />
                            </div>
                            <p className="italic text-sm">Monitoring emergency channels...</p>
                        </div>
                    ) : (
                        incidents.map((incident) => (
                            <div
                                key={incident.id}
                                onClick={() => handleIncidentClick(incident.id)}
                                className={`p-4 rounded-lg cursor-pointer transition-all border-l-4 ${activeIncidentId === incident.id ? 'bg-gray-700 border-red-500 shadow-lg' : 'bg-gray-800 border-gray-600 hover:bg-gray-750'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${incident.severity === 'CRITICAL' ? 'bg-red-900/50 text-red-200 border border-red-800' : 'bg-yellow-900/50 text-yellow-200'
                                        }`}>
                                        {incident.severity}
                                    </span>
                                    <span className="text-xs text-gray-400">{new Date(incident.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <h3 className="font-semibold text-sm mb-1">{incident.category || "Unknown Incident"}</h3>
                                <p className="text-xs text-gray-400 line-clamp-2">{incident.summary}</p>

                                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                    <MapPin className="w-3 h-3" />
                                    <span>{incident.locationName || "Unknown Location"}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative bg-gray-900">
                <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    {incidents.map((incident) => (
                        <Marker
                            key={incident.id}
                            position={[incident.lat, incident.lng]}
                            icon={dangerIcon}
                        >
                            <Popup className="custom-popup">
                                <div className="p-1">
                                    <strong className="text-red-600">{incident.category}</strong>
                                    <p className="text-xs m-0">{incident.summary}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Overlay Stats */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-gray-700 px-4 py-2 rounded text-xs text-gray-300 z-[1000] flex gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Critical
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Warning
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
