import React, { useState, useEffect } from 'react';
import { PrisonerButton } from '../UI/PrisonerButton';
import type { StepStandards, Standard } from '../../types';

interface ResultEntryProps {
    standards: StepStandards;
    onComplete: (reps: number, result: 'success' | 'fail') => void;
}

const getRepTarget = (s: Standard): number => {
    if ('reps' in s) return s.reps;
    // Fallback for time based or other standards if necessary, simplistic for now
    return 0;
};

export const ResultEntry: React.FC<ResultEntryProps> = ({ standards, onComplete }) => {
    const [reps, setReps] = useState(0);
    const [flavorText, setFlavorText] = useState("報告せよ。");

    // Calculate thresholds
    const beginner = getRepTarget(standards.beginner);
    const intermediate = getRepTarget(standards.intermediate);
    const progression = getRepTarget(standards.progression);
    const maxScale = Math.max(progression * 1.2, reps * 1.1); // Dynamic scale

    useEffect(() => {
        if (reps >= progression) {
            setFlavorText("上出来だ...！次のレベルが見えているぞ。");
        } else if (reps >= intermediate) {
            setFlavorText("悪くない。だが、まだ満足するな。");
        } else if (reps >= beginner) {
            setFlavorText("最低限のノルマはクリアだ。");
        } else {
            setFlavorText("話にならんな。やり直せ。");
        }
    }, [reps, beginner, intermediate, progression]);

    const handleIncrement = (amount: number) => {
        setReps(prev => Math.max(0, prev + amount));
    };

    const handleSubmit = () => {
        // Simple logic: if >= beginner, it's a "success" (logged), 
        // but meaningful level up check happens in App or logic based on progression.
        // For now, let's pass the result type based on Beginner standard.
        // If < Beginner, it's a fail.
        const result = reps >= beginner ? 'success' : 'fail';
        onComplete(reps, result);
    };

    const getBarColor = (val: number) => {
        if (val >= progression) return '#e40058'; // Elite/Progression Red
        if (val >= intermediate) return '#a8e72e'; // Intermediate Green? Or maybe just keep it simple
        if (val >= beginner) return '#00e8d8'; // Beginner Blue/Cyan
        return '#555'; // Fail
    };

    // Calculate width percentages for markers
    const getPos = (val: number) => Math.min((val / maxScale) * 100, 100);

    return (
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-4 border-[4px] border-white bg-black/80">
            {/* Flavor Text */}
            <div className="min-h-[60px] flex items-center justify-center text-center border-b border-gray-700 pb-2">
                <p className="text-[#00ff41] font-mono whitespace-pre-wrap animate-pulse">{flavorText}</p>
            </div>

            {/* Rep Counter */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={() => handleIncrement(-1)}
                    className="w-12 h-12 border-2 border-white text-white text-2xl active:bg-gray-700 hover:bg-gray-800"
                >-</button>
                <div className="text-6xl font-black text-white w-32 text-center font-mono tracking-tighter">
                    {reps}
                </div>
                <button
                    onClick={() => handleIncrement(1)}
                    className="w-12 h-12 border-2 border-white text-white text-2xl active:bg-gray-700 hover:bg-gray-800"
                >+</button>
            </div>
            <div className="flex justify-center gap-2 mb-2">
                <button onClick={() => handleIncrement(-10)} className="text-xs text-gray-400 p-2 border border-gray-700 hover:bg-gray-900 min-w-[30px]">-10</button>
                <button onClick={() => handleIncrement(-5)} className="text-xs text-gray-500 p-2 border border-gray-700 hover:bg-gray-900 min-w-[30px]">-5</button>
                <div className="w-4"></div>
                <button onClick={() => handleIncrement(5)} className="text-xs text-gray-500 p-2 border border-gray-700 hover:bg-gray-900 min-w-[30px]">+5</button>
                <button onClick={() => handleIncrement(10)} className="text-xs text-gray-400 p-2 border border-gray-700 hover:bg-gray-900 min-w-[30px]">+10</button>
            </div>

            {/* Gauge Visualization */}
            <div className="relative h-16 w-full bg-gray-900 border border-gray-600 mt-2">
                {/* Background Markers */}
                <div className="absolute top-0 bottom-0 border-l border-white/30 z-10 text-[10px] text-white/50 pl-1 pt-1" style={{ left: `${getPos(beginner)}%` }}>
                    Beg ({beginner})
                </div>
                <div className="absolute top-0 bottom-0 border-l border-white/30 z-10 text-[10px] text-white/50 pl-1 pt-1" style={{ left: `${getPos(intermediate)}%` }}>
                    Int ({intermediate})
                </div>
                <div className="absolute top-0 bottom-0 border-l border-white/50 z-10 text-[10px] text-[#e40058] pl-1 pt-1 font-bold" style={{ left: `${getPos(progression)}%` }}>
                    Pro ({progression})
                </div>

                {/* The Bar */}
                <div
                    className="h-full transition-all duration-300 ease-out"
                    style={{
                        width: `${getPos(reps)}%`,
                        backgroundColor: getBarColor(reps),
                        boxShadow: `0 0 10px ${getBarColor(reps)}`
                    }}
                />
            </div>

            {/* Submit */}
            <PrisonerButton
                label="報告完了"
                onClick={handleSubmit}
                highlight={reps > 0}
            />
        </div>
    );
};
