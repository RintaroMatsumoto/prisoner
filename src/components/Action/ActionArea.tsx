import type { ReactNode } from 'react';

interface ActionAreaProps {
    children?: ReactNode;
    className?: string; // allow overrides
}

export const ActionArea = ({ children, className = '' }: ActionAreaProps) => {
    return (
        <section id="action-area" className={className} style={{
            flex: 1,
            padding: '24px',
            backgroundColor: '#141414',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '12px',
            overflowY: 'auto'
        }}>
            {children}
        </section>
    );
};
