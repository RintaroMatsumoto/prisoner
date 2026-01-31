import type { ReactNode } from 'react';
import '../../index.css'; // Ensure global styles are available

interface MainContainerProps {
    children: ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
    return (
        <div id="main-container" style={{
            width: '100%',
            maxWidth: '600px',
            height: '95vh',
            border: 'var(--border-style)',
            backgroundColor: 'rgba(26, 26, 26, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.9)',
            position: 'relative',
            backdropFilter: 'blur(5px)',
        }}>
            {/* Scanline Effect */}
            <div className="visual-scanline" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.2))',
                backgroundSize: '100% 4px',
                pointerEvents: 'none',
                opacity: 0.3,
                zIndex: 10, // Ensure scanline is on top
            }}></div>

            {children}
        </div>
    );
};
