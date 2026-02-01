import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'prisoner_access_count';

export const AccessCounter: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        // Simple mock persistence
        const stored = localStorage.getItem(STORAGE_KEY);
        let current = stored ? parseInt(stored, 10) : 1024; // Start from a non-zero "cool" number

        // Anti-flicker: only increment once per session? 
        // For simplicity and "fun", let's increment every mount (refresh)
        current += 1;

        localStorage.setItem(STORAGE_KEY, current.toString());
        setCount(current);
    }, []);

    // Pad with leading zeros (e.g. 001234)
    const displayCount = count.toString().padStart(6, '0');

    return (
        <div className="flex flex-col items-center justify-center p-2 select-none" style={{ zIndex: 10, position: 'relative' }}>
            <div className="text-[10px] text-[#00ff41] mb-1 font-mono">
                PRISONER NUMBER
            </div>
            <div className="flex bg-black border-2 border-gray-600 px-1 py-0.5 shadow-[2px_2px_0px_#444]">
                {displayCount.split('').map((char, index) => (
                    <div
                        key={index}
                        className="w-5 h-7 flex items-center justify-center bg-[#222] text-[#ff0000] font-black font-mono text-lg border-r border-[#444] last:border-r-0"
                        style={{
                            textShadow: '0 0 5px #ff0000',
                            fontFamily: '"Courier New", Courier, monospace' // Fallback to basic mono
                        }}
                    >
                        {char}
                    </div>
                ))}
            </div>
        </div>
    );
};
