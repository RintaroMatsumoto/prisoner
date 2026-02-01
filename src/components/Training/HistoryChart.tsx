import React, { useMemo } from 'react';
import type { ExerciseHistoryLog } from '../../types';

interface HistoryChartProps {
    history: ExerciseHistoryLog[];
    width?: number | string;
    height?: number;
}

export const HistoryChart: React.FC<HistoryChartProps> = ({ history, width = '100%', height = 200 }) => {
    // Process data
    const data = useMemo(() => {
        // Sort by date ascending
        const sorted = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        // Take last N points if too many? Let's show all for now but maybe limit to last 20 effectively
        return sorted.slice(-20);
    }, [history]);

    if (data.length < 2) {
        return (
            <div className="flex items-center justify-center border border-[#333] bg-black text-[#666] font-mono text-xs" style={{ width, height }}>
                DATA INSUFFICIENT FOR GRAPH
            </div>
        );
    }

    // Canvas/SVG dimensions
    const padding = 20;
    const svgWidth = 600; // Internal coordinate system width
    const svgHeight = 200; // Internal coordinate system height

    // Scales
    const maxReps = Math.max(...data.map(d => Number(d.reps)), 10); // Minimum scale 10
    const minTime = new Date(data[0].date).getTime();
    const maxTime = new Date(data[data.length - 1].date).getTime();
    const timeRange = maxTime - minTime;

    const getX = (dateStr: string) => {
        const t = new Date(dateStr).getTime();
        if (timeRange === 0) return svgWidth / 2;
        return padding + ((t - minTime) / timeRange) * (svgWidth - padding * 2);
    };

    const getY = (reps: number | string) => {
        const val = Number(reps);
        return svgHeight - padding - (val / maxReps) * (svgHeight - padding * 2);
    };

    // Generate Path
    const points = data.map(d => `${getX(d.date)},${getY(d.reps)}`).join(' ');

    return (
        <div className="w-full bg-[#050505] border border-[#333] p-2 mb-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            <div className="text-[10px] text-[#00ff41] mb-1 font-mono text-right opacity-50">
                MAX: {maxReps} REPS
            </div>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width={width} height={height} className="overflow-visible">
                {/* Grid Lines (Horizontal) */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                    const y = svgHeight - padding - pct * (svgHeight - padding * 2);
                    return (
                        <line
                            key={i}
                            x1={padding}
                            y1={y}
                            x2={svgWidth - padding}
                            y2={y}
                            stroke="#1a1a1a"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* The Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke="#00ff41"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_4px_rgba(0,255,65,0.6)]"
                />

                {/* Data Points */}
                {data.map((d, i) => (
                    <g key={i}>
                        <circle
                            cx={getX(d.date)}
                            cy={getY(d.reps)}
                            r="3"
                            fill="#000"
                            stroke="#00ff41"
                            strokeWidth="2"
                        />
                        {/* Only show label for last point or peaks? specific logic could go here */}
                    </g>
                ))}
            </svg>
            <div className="flex justify-between text-[10px] text-[#666] font-mono mt-1 px-2">
                <span>{new Date(data[0].date).toLocaleDateString()}</span>
                <span>{new Date(data[data.length - 1].date).toLocaleDateString()}</span>
            </div>
        </div>
    );
};
