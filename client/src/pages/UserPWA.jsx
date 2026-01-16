import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Phone, Activity, ShieldCheck, Siren } from 'lucide-react';

const UserPWA = () => {
    const [status, setStatus] = useState('IDLE'); // IDLE, LISTENING, ANALYZING, DISPATCHED
    const [transcript, setTranscript] = useState('');
    const [dots, setDots] = useState('');

    // Simulated Visualizer
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (status === 'LISTENING') {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            let width = canvas.width = 300;
            let height = canvas.height = 100;

            const draw = () => {
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = '#ef4444'; // Red-500

                const bars = 30;
                const barWidth = width / bars;

                for (let i = 0; i < bars; i++) {
                    const h = Math.random() * height * 0.8;
                    const x = i * barWidth;
                    const y = (height - h) / 2;
                    ctx.fillRect(x, y, barWidth - 2, h);
                }

                animationRef.current = requestAnimationFrame(draw);
            };
            draw();
        } else {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }
        return () => cancelAnimationFrame(animationRef.current);
    }, [status]);

    // Dot animation
    useEffect(() => {
        if (status === 'ANALYZING') {
            const interval = setInterval(() => {
                setDots(d => d.length < 3 ? d + '.' : '');
            }, 500);
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleStart = () => {
        setStatus('LISTENING');
        // Simulate listening duration
        setTimeout(() => {
            setStatus('ANALYZING');
            setTimeout(() => {
                triggerIncident();
                setStatus('DISPATCHED');
            }, 3000);
        }, 5000);
    };

    const triggerIncident = async () => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        // Mock data usually derived from AI analysis
        const payload = {
            category: "Medical Emergency",
            severity: "CRITICAL",
            summary: "User reported difficulty breathing and chest pain. Detected high distress levels in voice analysis.",
            lat: 37.7749 + (Math.random() - 0.5) * 0.01, // Randomize slightly around SF
            lng: -122.4194 + (Math.random() - 0.5) * 0.01,
            locationName: "Downtown Sector 4"
        };

        try {
            await fetch(`${API_URL}/api/incident`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            console.log("Incident reported to backend");
        } catch (error) {
            console.error("Failed to report incident:", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Background Pulse Effect */}
            {status === 'LISTENING' && (
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full animate-pulse-slow"></div>
                </div>
            )}

            {/* Main Container */}
            <div className="z-10 text-center space-y-8 max-w-sm w-full relative">

                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-[0.2em] text-gray-100 mb-2">VIGILANT</h1>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400 uppercase tracking-widest border border-gray-800 rounded-full py-1 px-3 w-fit mx-auto bg-gray-900/50 backdrop-blur">
                        <span className={`w-2 h-2 rounded-full ${status === 'DISPATCHED' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></span>
                        {status === 'IDLE' ? 'System Ready' : status}
                    </div>
                </header>

                {/* Central Interaction Area */}
                <div className="flex justify-center h-64 items-center">
                    {status === 'IDLE' && (
                        <button
                            onClick={handleStart}
                            className="w-48 h-48 rounded-full bg-gray-800 hover:bg-gray-700 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,50,50,0.1)] transition-all duration-300 active:scale-95 group border border-gray-700"
                        >
                            <Phone className="w-16 h-16 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-xs uppercase tracking-widest font-bold text-gray-300">Tap for Help</span>
                        </button>
                    )}

                    {status === 'LISTENING' && (
                        <div className="flex flex-col items-center">
                            <div className="w-48 h-48 rounded-full flex items-center justify-center bg-red-600/10 border border-red-500/30 mb-4 backdrop-blur-sm">
                                <Mic className="w-16 h-16 text-red-500 animate-pulse" />
                            </div>
                            <canvas ref={canvasRef} className="w-64 h-16 opacity-80" />
                            <p className="text-red-400 font-mono text-sm mt-2">LISTENING TO ENVIRONMENT</p>
                        </div>
                    )}

                    {status === 'ANALYZING' && (
                        <div className="flex flex-col items-center">
                            <div className="w-48 h-48 rounded-full flex items-center justify-center bg-amber-600/10 border border-amber-500/30 mb-4 animate-spin-slow backdrop-blur-sm">
                                <Activity className="w-16 h-16 text-amber-500" />
                            </div>
                            <p className="text-amber-400 font-mono text-lg">ANALYZING INPUT{dots}</p>
                        </div>
                    )}

                    {status === 'DISPATCHED' && (
                        <div className="flex flex-col items-center">
                            <div className="w-48 h-48 rounded-full flex items-center justify-center bg-green-600/10 border border-green-500/30 mb-4 backdrop-blur-sm shadow-[0_0_50px_rgba(0,255,0,0.2)]">
                                <ShieldCheck className="w-20 h-20 text-green-500" />
                            </div>
                            <p className="text-green-400 font-bold text-xl mb-1">HELP IS ON THE WAY</p>
                            <p className="text-gray-500 text-xs">ETA: 4 MINUTES</p>
                        </div>
                    )}
                </div>

                {/* Status Text Area */}
                <div className="min-h-[4rem] flex items-center justify-center">
                    {status === 'IDLE' && <p className="text-gray-500 text-sm">Press the button to connect with an AI First Responder instantly.</p>}
                    {status === 'LISTENING' && <p className="text-gray-300 text-lg font-medium animate-pulse">"Stay calm. I'm listening. Tell me your location."</p>}
                    {status === 'ANALYZING' && <p className="text-gray-400 text-sm">Categorizing severity and checking vitals...</p>}
                    {status === 'DISPATCHED' && (
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 w-full">
                            <div className="flex items-center gap-3 mb-2">
                                <Siren className="text-red-500 w-5 h-5 animate-bounce" />
                                <span className="text-sm font-bold text-gray-200">UNITS DISPATCHED</span>
                            </div>
                            <div className="text-left space-y-1 text-xs text-gray-400">
                                <p>• Incident #9281 Verified</p>
                                <p>• Location: GPS Pinned</p>
                                <p>• Priority: <span className="text-red-400 font-bold">CRITICAL</span></p>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <div className="absolute bottom-8 text-center text-[10px] text-gray-700 w-full z-10 uppercase tracking-widest">
                Vigilant • AI-Driven Crisis Response
            </div>
        </div>
    );
};

export default UserPWA;
