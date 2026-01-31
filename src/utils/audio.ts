export const audioController = {
    enabled: true,
    speak: (text: string) => {
        if (!audioController.enabled) return;
        // Cancel previous utterance to avoid backlog
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 1.0; // Normal speed
        utterance.pitch = 0.8; // Slightly deeper for "Master" feel

        window.speechSynthesis.speak(utterance);
    },
    toggle: () => {
        audioController.enabled = !audioController.enabled;
        return audioController.enabled;
    }
};
