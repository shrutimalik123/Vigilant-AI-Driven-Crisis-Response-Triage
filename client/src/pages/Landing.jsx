import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Smartphone, Map } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full text-center space-y-8">

                {/* Header */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
                        <Shield className="w-20 h-20 text-green-500 relative z-10" />
                    </div>
                    <h1 className="text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        VIGILANT
                    </h1>
                    <p className="text-gray-400 text-sm tracking-widest uppercase">
                        AI-Driven Crisis Response
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="grid gap-4 w-full pt-8">

                    {/* Citizen App Button */}
                    <button
                        onClick={() => navigate('/pwa')}
                        className="group relative flex items-center justify-between p-6 bg-neutral-800 border border-neutral-700 hover:border-green-500/50 rounded-2xl transition-all duration-300 hover:bg-neutral-800/80 active:scale-[0.98]"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-neutral-900 rounded-xl group-hover:bg-green-500/10 transition-colors">
                                <Smartphone className="w-6 h-6 text-green-500" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-white">Citizen App</h3>
                                <p className="text-xs text-gray-500">I need help immediately</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-500/0 group-hover:bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all"></div>
                    </button>

                    {/* Responder Dashboard Button */}
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group relative flex items-center justify-between p-6 bg-neutral-800 border border-neutral-700 hover:border-blue-500/50 rounded-2xl transition-all duration-300 hover:bg-neutral-800/80 active:scale-[0.98]"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-neutral-900 rounded-xl group-hover:bg-blue-500/10 transition-colors">
                                <Map className="w-6 h-6 text-blue-500" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-white">Responder Dashboard</h3>
                                <p className="text-xs text-gray-500">View live incidents map</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-blue-500/0 group-hover:bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all"></div>
                    </button>

                </div>

                {/* Footer */}
                <div className="pt-12 text-center text-gray-600 text-xs text-balance">
                    Prototype for Nexora Hackathon • Smart Cities Track
                </div>

            </div>
        </div>
    );
};

export default Landing;
