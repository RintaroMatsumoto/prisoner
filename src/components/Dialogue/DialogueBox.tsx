import { useState, useEffect, useRef } from 'react';

interface DialogueBoxProps {
    text: string;
    onComplete?: () => void;
    speed?: number;
}

export const DialogueBox = ({ text, onComplete, speed = 40 }: DialogueBoxProps) => {
    const [displayedText, setDisplayedText] = useState('');
    // const [isTyping, setIsTyping] = useState(false); // Unused in render currently
    const textRef = useRef(text);
    const callbackRef = useRef(onComplete);

    // Update refs to be used inside timeouts/intervals
    useEffect(() => {
        callbackRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        // Reset when text changes
        setDisplayedText('');
        // setIsTyping(true);
        textRef.current = text;

        let currentIndex = 0;
        let timeoutId: number;

        const typeChar = () => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;

                // Randomize speed slightly for human feel
                const varySpeed = speed + (Math.random() * 20 - 10);
                timeoutId = setTimeout(typeChar, varySpeed);
            } else {
                // setIsTyping(false);
                if (callbackRef.current) callbackRef.current();
            }
        };

        // Start typing
        timeoutId = setTimeout(typeChar, speed);

        return () => clearTimeout(timeoutId);
    }, [text, speed]);

    return (
        <section id="dialogue-box" style={{
            flex: 1.2,
            padding: '24px',
            borderBottom: '1px solid var(--accent)',
            backgroundColor: '#111',
            fontSize: '1.05rem',
            lineHeight: '1.8',
            overflowY: 'auto',
            position: 'relative',
            color: '#d0d0d0' // fallback
        }}>
            <p id="dialogue-text" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {displayedText}
            </p>
            <span className="blinking-cursor" style={{
                animation: 'blink 1s step-end infinite',
                fontWeight: 'bold',
                color: 'var(--highlight)'
            }}>_</span>
        </section>
    );
};
