import React, { useState, useMemo } from 'react';
import type { UserState } from '../../types';

interface TrainingCalendarProps {
    userState: UserState;
}

export const TrainingCalendar: React.FC<TrainingCalendarProps> = ({ userState }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Aggregate all logs from all exercises
    const dailyActivity = useMemo(() => {
        const activity: Record<string, boolean> = {};
        const exercises = ['pushups', 'squats', 'pullups', 'legraises', 'bridges', 'handstand_pushups'];

        exercises.forEach(exKey => {
            // @ts-expect-error dynamic access
            const exState = userState[exKey];
            if (exState && exState.history) {
                exState.history.forEach((log: any) => {
                    const dateStr = new Date(log.date).toDateString(); // Normalize to local date string for simple matching
                    activity[dateStr] = true;
                });
            }
        });
        return activity;
    }, [userState]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun

    const days = [];
    // Empty slots for start of month
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    // Days
    for (let d = 1; d <= daysInMonth; d++) {
        days.push(new Date(year, month, d));
    }

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="w-full max-w-md mx-auto border-[4px] border-[#333] bg-[#050505] p-2 mt-4 font-mono select-none">
            {/* Header */}
            <div className="flex justify-between items-center mb-2 px-2 text-[#00ff41]">
                <button onClick={prevMonth} className="hover:bg-[#333] px-2">{'<'}</button>
                <span className="font-bold text-lg">
                    {year} / {String(month + 1).padStart(2, '0')}
                </span>
                <button onClick={nextMonth} className="hover:bg-[#333] px-2">{'>'}</button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-[#666] py-1">{day}</div>
                ))}

                {days.map((date, idx) => {
                    if (!date) return <div key={`empty-${idx}`} />;

                    const dateStr = date.toDateString();
                    const hasActivity = dailyActivity[dateStr];
                    const isToday = date.toDateString() === new Date().toDateString();

                    return (
                        <div
                            key={idx}
                            className={`
                                aspect-square flex items-center justify-center border border-[#222]
                                ${hasActivity ? 'bg-[#003300] text-[#00ff41] border-[#00ff41]' : 'text-[#888]'}
                                ${isToday ? 'outline outline-2 outline-white -outline-offset-2' : ''}
                            `}
                        >
                            {date.getDate()}
                            {hasActivity && (
                                <div className="absolute w-full h-full bg-[#00ff41] opacity-10 animate-pulse pointer-events-none" />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="text-[10px] text-[#444] mt-2 text-right">
                TRAINING LOG
            </div>
        </div>
    );
};
