import { useEffect, useRef, useCallback } from 'react';
import { PrisonerButton } from '../UI/PrisonerButton';
import { audioController } from '../../utils/audio';

// Phase: DOWN (2s) -> HOLD (1s) -> UP (2s)

interface TrainingSessionProps {
    onPhaseChange: (phase: 'DOWN' | 'HOLD' | 'UP' | 'IDLE') => void;
    onComplete: () => void;
}

export const TrainingSession = ({ onPhaseChange, onComplete }: TrainingSessionProps) => {
    // const [isActive, setIsActive] = useState(false); // Unused, using ref for loop control

    // Refs for timer management to avoid stale closures in setTimeout
    const activeRef = useRef(false);

    const stopSession = useCallback(() => {
        activeRef.current = false;
        // setIsActive(false);
        onPhaseChange('IDLE');
        audioController.speak("終了。");
        onComplete();
    }, [onPhaseChange, onComplete]);

    const runStep = (delay: number, nextFn: () => void) => {
        if (!activeRef.current) return;
        setTimeout(() => {
            if (!activeRef.current) return;
            nextFn();
        }, delay);
    };

    const cycle = useCallback(() => {
        if (!activeRef.current) return;

        // DOWN (2s)
        onPhaseChange('DOWN');
        audioController.speak("下ろして");

        runStep(2000, () => {
            // HOLD (1s)
            onPhaseChange('HOLD');
            audioController.speak("ホール");

            runStep(1000, () => {
                // UP (2s)
                onPhaseChange('UP');
                audioController.speak("上げて");

                runStep(2000, () => {
                    // Loop
                    cycle();
                });
            });
        });
    }, [onPhaseChange]);

    const startSession = () => {
        activeRef.current = true;
        // setIsActive(true);
        audioController.speak("用意...");

        // Initial delay before start
        setTimeout(() => {
            if (activeRef.current) {
                cycle();
            }
        }, 2000);
    };

    // Start on mount
    useEffect(() => {
        startSession();
        return () => {
            activeRef.current = false; // Cleanup
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ width: '100%' }}>
            <PrisonerButton label="終了して記録する" onClick={stopSession} />
            {/* Could add pause/resume later */}
        </div>
    );
};
