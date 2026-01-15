# Demo Video Instructions

To create the winning submission video, follow this split-screen setup:

## Setup
1. **Screen 1 (Left - Mobile View)**: Open the User PWA at `http://localhost:5173/pwa`.
    - Use Chrome DevTools "Device Mode" (iPhone 12/14 Pro dimensions) for the PWA look.
2. **Screen 2 (Right - Desktop View)**: Open the Responder Dashboard at `http://localhost:5173/dashboard`.
3. **Trigger**: Have `node trigger_simulation.js` ready in a terminal (hidden).

## Flow
1. **Intro (0:00 - 0:10)**: "This is Vigilant, the AI First Responder."
2. **The Crisis (0:10 - 0:30)**: 
    - Click "Tap for Help" on the PWA.
    - *Narrate*: "The user speaks naturally: 'My chest hurts, I can't breathe'."
    - Show the PWA visualizer reacting (Red pulse).
3. **The Response (0:30 - 0:50)**:
    - *Action*: Run `node trigger_simulation.js` (or wait for the mock delay).
    - **Visual**: The Dashboard immediately pops up a RED card: "Medical Emergency - Critical".
    - **Visual**: The Map places a pin instantly.
    - **Audio**: The PWA updates to "HELP IS ON THE WAY".
4. **The Why (0:50 - 1:00)**:
    - Show the Roadmap slide/text about Wearable Integration and IoT.
    - "Scalable, Real-time, Lifesaving."

## Technical Callouts (for Judges)
- Mention **ElevenLabs** for the emotive voice.
- Mention **Nexos.ai** for the decision engine.
- Mention **Real-time Latency** (Socket.io).
