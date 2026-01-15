# Vigilant: AI-Driven Crisis Response

**Vigilant** is a real-time, voice-enabled emergency coordination platform designed for the Nexora "Smart Cities" and "Healthcare" tracks. It acts as an intelligent bridge between citizens in crisis and emergency responders.

![Vigilant Status](https://img.shields.io/badge/Status-Prototype-orange) ![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Socket.io-blue)

## 🚀 What Works (Current Status)

We have successfully implemented the **Core MVP** for the hackathon submission:

### 1. Real-Time Responder Dashboard (`/dashboard`)
- **Live Map Interface**: Uses Leaflet/OpenStreetMap to pin incident locations instantly.
- **Instant Alerts**: WebSockets (Socket.io) push critical incidents to the dashboard with < 100ms latency.
- **Severity Triage**: Visual coding (Red/Yellow) based on incident severity.

### 2. Voice-First User Interface (`/pwa`)
- **Mobile PWA**: A specialized mobile view for users in distress.
- **Visual Feedback**: Dynamic audio visualizers and state transitions (Listening -> Analyzing -> Dispatched) to reassure the user.
- **Simulated AI**: The system currently mocks the "AI Analysis" phase to demonstrate the intended User Experience (UX).

### 3. Backend Orchestration
- **Node.js/Express Server**: Manages the socket connections.
- **Simulation Engine**: A script (`trigger_simulation.js`) that mimics real-world emergency inputs to validate the system's responsiveness.

---

## 🔮 Next Steps (Roadmap)

To move from **Prototype** to **Production**, we are tackling the following:

### Phase 2: True AI Integration (Immediate Priority)
- [ ] **ElevenLabs Speech-to-Speech**: Replace the simulated visualizer with actual low-latency voice AI to "talk" the user through panic.
- [ ] **Nexos.ai Intelligence**: Connect the "Triage Logic" to Nexos.ai's LLM engine to accurately categorize complex, ambiguous medical situations.

### Phase 3: Hardware & IoT
- [ ] **Wearable Integration**: Ingest real-time heart rate data from Apple Watch/Fitbit APIs during the call.
- [ ] **Smart City Hooks**: Post-incident webhooks to municipal dispatch systems (CAD).

---

## 🛠️ Quick Start

### 1. Backend (Server)
```bash
cd server
npm install
node index.js
```

### 2. Frontend (Client)
```bash
cd client
npm install
npm run dev
```

### 3. Trigger Simulation
```bash
# In a new terminal
node trigger_simulation.js
```
