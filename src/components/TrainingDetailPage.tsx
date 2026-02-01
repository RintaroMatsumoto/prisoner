import React from 'react';
import { TrainingLevel } from '../types/training';

const TrainingDetailPage: React.FC<{ data: TrainingLevel }> = ({ data }) => {
  return (
    <div className="bg-[#000000] text-[#ffffff] font-dot min-h-screen p-4 border-4 border-[#ffffff] m-2 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
      {/* Header Section */}
      <header className="border-b-4 border-[#ffffff] pb-4 mb-6">
        <h2 className="text-[#00e8d8] text-sm mb-2 uppercase tracking-widest animate-pulse">LEVEL {data.level}</h2>
        <h1 className="text-2xl uppercase tracking-wider text-shadow-neon">{data.title}</h1>
      </header>

      {/* Overview */}
      <section className="mb-6 p-4 border-2 border-[#2038ec] bg-[#000000]">
        <p className="text-sm leading-relaxed whitespace-pre-line text-[#cccccc]">
          {data.overview}
        </p>
      </section>

      {/* KPI Table */}
      <section className="mb-10 overflow-x-auto">
        <h3 className="text-[#00e8d8] text-xs mb-2 uppercase">Training Goals</h3>
        <table className="w-full border-collapse border-2 border-[#ffffff] text-xs font-mono">
          <thead>
            <tr className="bg-[#2038ec] text-[#ffffff]">
              <th className="border-2 border-[#ffffff] p-2 uppercase">Rank</th>
              <th className="border-2 border-[#ffffff] p-2 uppercase">Sets</th>
              <th className="border-2 border-[#ffffff] p-2 uppercase">Reps</th>
            </tr>
          </thead>
          <tbody className="text-center bg-[#000000]">
            <tr>
              <td className="border-2 border-[#ffffff] p-2 text-[#ffffff]">Beginner</td>
              <td className="border-2 border-[#ffffff] p-2 text-[#ffffff]">1</td>
              <td className="border-2 border-[#ffffff] p-2 text-[#ffffff]">{data.standards.beginner}</td>
            </tr>
            <tr>
              <td className="border-2 border-[#ffffff] p-2 text-[#a8e72e]">Intermediate</td>
              <td className="border-2 border-[#ffffff] p-2 text-[#a8e72e]">{data.standards.intermediate.sets}</td>
              <td className="border-2 border-[#ffffff] p-2 text-[#a8e72e]">{data.standards.intermediate.reps}</td>
            </tr>
            <tr>
              <td className="border-2 border-[#ffffff] p-2 text-[#e40058]">Advanced</td>
              <td className="border-2 border-[#ffffff] p-2 text-[#e40058]">{data.standards.progression.sets}</td>
              <td className="border-2 border-[#ffffff] p-2 text-[#e40058]">{data.standards.progression.reps}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4 Phases Section */}
      <section className="space-y-12">
        {data.phases.map((phase, index) => (
          <div key={index} className="flex flex-col gap-4 border-l-4 border-[#2038ec] pl-4 relative">
            <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#2038ec] flex items-center justify-center text-[10px] text-white font-bold">
              {index + 1}
            </div>
            <h3 className="text-[#00e8d8] text-lg uppercase mt-1">STEP {index + 1}: <span className="text-white text-base text-shadow-sm">{phase.title}</span></h3>

            <div className="border-4 border-[#ffffff] p-1 bg-[#2038ec]">
              <img
                src={phase.imageUrl}
                alt={phase.title}
                className="w-full h-auto image-pixelated bg-black mix-blend-hard-light grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="bg-[#111111] p-3 border border-gray-800">
              <p className="text-sm leading-relaxed mb-4 text-[#eeeeee]">{phase.description}</p>

              {phase.tips.length > 0 && (
                <div className="mt-2 bg-[#001100] border border-[#004400] p-2">
                  <h4 className="text-[#a8e72e] text-[10px] mb-1 uppercase">TIPS & CUES</h4>
                  <ul className="text-[10px] text-[#a8e72e] list-none space-y-2">
                    {phase.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#00e8d8]">{'>'}</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Footer / Quote */}
      <footer className="mt-12 p-6 bg-[#2038ec] border-4 border-[#ffffff] text-center">
        <p className="text-xs leading-tight text-[#ffffff] animate-pulse">
          "The chain is only as strong as its weakest link."
        </p>
        <p className="text-[10px] mt-2 text-[#00e8d8]">
          PRESS START TO CONTINUE
        </p>
      </footer>
    </div>
  );
};

export default TrainingDetailPage;
