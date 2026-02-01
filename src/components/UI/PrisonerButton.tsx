import type { ReactNode, CSSProperties } from 'react';

interface PrisonerButtonProps {
    label: string;
    onClick: () => void;
    progress?: number; // 0 to 100
    level?: number;
    highlight?: boolean; // Recommendation highlight
    children?: ReactNode; // For extra content
    style?: CSSProperties;
    variant?: 'default' | 'danger';
}

export const PrisonerButton = ({ label, onClick, progress, level, highlight, children, style, variant = 'default' }: PrisonerButtonProps) => {
    const borderColor = variant === 'danger' ? '#ff0000' : 'var(--accent)';
    const textColor = variant === 'danger' ? '#ff0000' : 'var(--text-main)';

    return (
        <button className={`action-btn ${highlight ? 'recom-highlight' : ''}`} onClick={onClick} style={{
            background: '000',
            border: `4px solid ${borderColor}`,
            borderLeft: `8px solid ${borderColor}`,
            color: textColor,
            padding: '16px 20px',
            fontFamily: 'var(--font-stack)',
            fontSize: '1rem',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease-out',
            textTransform: 'uppercase',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...style // Merge custom styles
        }}>
            {/* Progress Bar Background */}
            {progress !== undefined && (
                <div className="btn-progress-bar" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '4px',
                    width: `${progress}%`,
                    backgroundColor: 'var(--highlight)',
                    zIndex: 0,
                    opacity: 0.7,
                    transition: 'width 0.3s ease'
                }}></div>
            )}

            <span style={{ zIndex: 2, position: 'relative' }}>{label}</span>

            {level !== undefined && (
                <span style={{
                    fontSize: '0.8rem',
                    color: '#888',
                    zIndex: 2,
                    position: 'relative',
                    marginLeft: '10px'
                }}>
                    Lv.{level}
                </span>
            )}

            {children}
        </button>
    );
};
