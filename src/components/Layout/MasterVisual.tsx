interface MasterVisualProps {
    rhythmPhase?: 'DOWN' | 'HOLD' | 'UP' | 'IDLE';
    isActive?: boolean;
}

export const MasterVisual = ({ rhythmPhase = 'IDLE', isActive = false }: MasterVisualProps) => {
    // Background image logic would go here if it changes, currently static or controlled by App.
    // The rhythm guide will be overlaid here later.

    // Logic to determine bar style based on phase
    let barWidth = '0%';
    let barColor = 'var(--accent)';
    let transition = 'none'; // Default no transition for instant resets if needed, or manage via CSS classes

    // We can use CSS classes for smooth animation if we simply trigger them
    // Or manual control. Let's use the className approach from legacy if possible, 
    // or simple inline styles with transition.

    // Legacy: 2s Down, 1s Hold, 2s Up.
    // If we receive discrete phase updates, we rely on CSS transitions between states?
    // "DOWN" -> Bar fills (0->100% in 2s)
    // "HOLD" -> Bar stays (100% in 0s/immediate, hold color)
    // "UP" -> Bar empties (100%->0% in 2s)

    if (rhythmPhase === 'DOWN') {
        barWidth = '100%';
        barColor = 'var(--text-main)'; // Filling up
        transition = 'width 2s linear';
    } else if (rhythmPhase === 'HOLD') {
        barWidth = '100%';
        barColor = 'var(--highlight)'; // Hold pulse
        transition = 'background-color 0.2s ease'; // Quick color switch
    } else if (rhythmPhase === 'UP') {
        barWidth = '0%';
        barColor = 'var(--accent)'; // Emptying
        transition = 'width 2s linear';
    } else {
        // IDLE
        barWidth = '0%';
        transition = 'none';
    }

    return (
        <section id="master-visual" style={{
            flex: 2,
            borderBottom: '2px solid var(--accent)',
            color: 'white',
            background: `radial-gradient(circle at center, rgba(37, 37, 37, 0.8) 0%, #000 100%), url('/assets/instructor_v2.png')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'pixelated',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Rhythm guide */}
            <div id="rhythm-guide" style={{
                display: isActive ? 'block' : 'none',
                position: 'absolute',
                bottom: '20px',
                width: '80%',
                textAlign: 'center'
            }}>
                <div className="cadence-bar" style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: '#333',
                    border: '1px solid var(--accent)',
                    position: 'relative',
                    marginBottom: '8px'
                }}>
                    <div style={{
                        height: '100%',
                        width: barWidth,
                        backgroundColor: barColor,
                        transition: transition
                    }}></div>
                </div>
                <div className="cadence-text" style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: rhythmPhase === 'HOLD' ? 'var(--highlight)' : 'var(--text-dim)',
                    letterSpacing: '0.1em'
                }}>
                    {rhythmPhase === 'IDLE' ? 'READY' :
                        rhythmPhase === 'DOWN' ? 'DOWN (2s)' :
                            rhythmPhase === 'HOLD' ? 'HOLD (1s)' : 'UP (2s)'}
                </div>
            </div>
        </section>
    );
};
