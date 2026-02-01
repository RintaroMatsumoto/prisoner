import React from 'react';
import { PrisonerButton } from '../UI/PrisonerButton';
import { EXERCISES } from '../../data/exercises';
import { getDailyOrders, getRecommendationDetails } from '../../utils/gameLogic';
import type { UserState } from '../../types';

interface RecommendationCardProps {
    userState: UserState;
    onSelectExercise: (id: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ userState, onSelectExercise }) => {
    const orders = getDailyOrders(userState);
    if (orders.length === 0) return null;

    const mainOrder = orders[0];
    const details = getRecommendationDetails(userState, mainOrder);
    const exerciseDef = EXERCISES[mainOrder];

    return (
        <div className={`
            w-full border-[4px] p-4 mb-4 relative overflow-hidden
            ${details.urgency === 'high' ? 'border-[#ff0000] bg-[#1a0000]' : 'border-[#00ff41] bg-[#001a00]'}
        `}>
            {/* Background Glitch Effect for High Urgency */}
            {details.urgency === 'high' && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('/assets/noise.png')] mix-blend-overlay" />
            )}

            <div className="relative z-10">
                <div className={`
                    text-xs mb-1 font-bold tracking-widest uppercase
                    ${details.urgency === 'high' ? 'text-[#ff0000] animate-pulse' : 'text-[#00ff41]'}
                `}>
                    /// DAILY ORDERS /// PRIORITY: {details.urgency.toUpperCase()} ///
                </div>

                <div className="flex flex-col items-center text-center my-4">
                    <h3 className="text-2xl text-white font-black mb-2 tracking-tighter drop-shadow-md">
                        {exerciseDef.name}
                    </h3>
                    <div className="text-[#a0a0a0] text-sm mb-4 italic font-serif">
                        "{details.reason}"
                    </div>

                    <PrisonerButton
                        label="YES, SIR!"
                        onClick={() => onSelectExercise(mainOrder)}
                        variant={details.urgency === 'high' ? 'danger' : 'default'}
                    />
                </div>

                {orders.length > 1 && (
                    <div className="mt-2 text-xs text-center text-[#666] border-t border-[#333] pt-2">
                        SECONDARY TARGET: {EXERCISES[orders[1]].name}
                    </div>
                )}
            </div>
        </div>
    );
};
