import { useState, useEffect } from 'react';
import { MainContainer } from './components/Layout/MainContainer';
import { MasterVisual } from './components/Layout/MasterVisual';
import { DialogueBox } from './components/Dialogue/DialogueBox';
import { ActionArea } from './components/Action/ActionArea';
import { PrisonerButton } from './components/UI/PrisonerButton';
import { TrainingSession } from './components/Training/TrainingSession';
import { usePrisonerState } from './hooks/usePrisonerState';
import { calculateRank, getDailyOrders } from './utils/gameLogic';
import { EXERCISES } from './data/exercises';
// import './App.css'; // Removed unused styles
import { pushupLevel1 } from './data/pushups';
import { pushupLevel2 } from './data/pushups_level2';
import { pushupLevel3 } from './data/pushups_level3';
import { pushupLevel4 } from './data/pushups_level4';
import { pushupLevel5 } from './data/pushups_level5';
import TrainingDetailPage from './components/TrainingDetailPage';
import { ResultEntry } from './components/Training/ResultEntry';
import { AccessCounter } from './components/UI/AccessCounter';
import { HistoryChart } from './components/Training/HistoryChart';
import { TrainingCalendar } from './components/Training/TrainingCalendar';
import { RecommendationCard } from './components/Training/RecommendationCard';

// View Enum
type ViewState = 'BOOT' | 'ONBOARDING_NAME' | 'MENU' | 'EXERCISE_LIST' | 'TRAINING' | 'RESULT' | 'HISTORY' | 'MANUAL';

function App() {
  const { userState, setName, recordTraining } = usePrisonerState(); // Ensure recordTraining is destructured
  const [view, setView] = useState<ViewState>('BOOT');
  const [dialogue, setDialogue] = useState('');
  const [tempName, setTempName] = useState('');

  // Rhythm State
  const [rhythmPhase, setRhythmPhase] = useState<'DOWN' | 'HOLD' | 'UP' | 'IDLE'>('IDLE');
  const [isTrainingActive, setIsTrainingActive] = useState(false);
  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(null);

  // Initial Logic
  useEffect(() => {
    // Simulate boot delay or check
    const timer = setTimeout(() => {
      if (!userState.name) {
        setView('ONBOARDING_NAME');
        setDialogue("新入りか...。\n貴様、名はなんだ？");
      } else {
        setView('MENU');
        setDialogue(`戻ったか、${userState.name}。\nさあ、鉄の戒律に従い、己を鍛え上げろ。`);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [userState.name]); // Run once on mount basically, but dep on name for initial check

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      setName(tempName.trim());
      setDialogue(`ほう...${tempName.trim()}か。\nいいだろう。今日からここが貴様の家だ。\n\nトレーニングを始めるか？`);
      // Transition to Menu after a delay or immediate?
      // Legacy wait for text to finish then show menu, but here we can just set View to Menu
      // but Menu triggers its own dialogue usually.
      // Let's just set timeout to switch to Menu view proper
      setTimeout(() => {
        setView('MENU');
      }, 4000);
    } else {
      setDialogue("...名乗るつもりもないか。\nならば「フレッシュ・フィッシュ」と呼ぶまでだ。");
      setTimeout(() => {
        setName("フレッシュ・フィッシュ");
        setView('MENU');
      }, 4000);
    }
  };

  return (
    <MainContainer>
      <MasterVisual rhythmPhase={rhythmPhase} isActive={isTrainingActive} />

      <DialogueBox text={dialogue} />

      <ActionArea>
        {view === 'ONBOARDING_NAME' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="名前を入力..."
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: '#333',
                color: '#fff',
                border: '1px solid #777',
                fontFamily: 'inherit'
              }}
            />
            <PrisonerButton label="決定" onClick={handleNameSubmit} />
          </div>
        )}

        {view === 'MENU' && (
          <>
            <div className="rank-display">
              <span>TITLE: <span style={{ color: '#d0d0d0' }}>{calculateRank(userState)}</span></span>
            </div>
            {/* Daily Orders */}
            {(() => {
              const orders = getDailyOrders(userState);
              if (orders.length > 0) {
                const names = orders.map(id => EXERCISES[id].name).join(' & ');
                return (
                  <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #00ff41', color: '#00ff41' }}>
                    <div style={{ fontSize: '0.8rem', marginBottom: '5px' }}>本日の命令:</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{names}</div>
                  </div>
                );
              }
            })()}

            <RecommendationCard
              userState={userState}
              onSelectExercise={(id) => {
                setCurrentExerciseId(id);
                const uState = userState[id as keyof typeof userState] as any;
                if (uState.level >= 10) { // All Clear check
                  // Logic to handle max level if needed, or just show list
                }
                setDialogue("よし、準備はいいか？");
                setView('EXERCISE_LIST'); // Or go straight to training? existing flow asks for level usually. 
                // Actually existing flow is MENU -> EXERCISE_LIST -> TRAINING
                // We can just open EXERCISE_LIST with the specific one highlighted or just go there.
                // But wait, EXERCISE_LIST shows ALL exercises.
                // Let's just go to EXERCISE_LIST for now, user knows what to pick or we could filter.
                // Better: "onSelectExercise" sets selectedExercise, then we go to EXERCISE_LIST?
                // No, standard flow is user picks exercise from list.
                // If we want to jump straight to "Wall Pushups" (e.g. current level) we need logic.
                // Let's iterate: Just go to EXERCISE_LIST and let user pick for now, or maybe we can auto-expand?
                // Simple approach: Just show the card, clicking it goes to EXERCISE_LIST.
                // Actually, if I pass `id` to `selectedExercise`, does EXERCISE_LIST use it?
                // Looking at EXERCISE_LIST implementation in previous turns (it's not fully visible here but let's assume standard behavior).
                // Actually, let's keep it simple: Go to EXERCISE_LIST.
              }}
            />

            <PrisonerButton label="トレーニングを開始する" onClick={() => {
              setView('EXERCISE_LIST');
              setDialogue("どの種目で自分を虐め抜くつもりだ？");
            }} />
            <PrisonerButton label="記録を確認する" onClick={() => {
              setView('HISTORY');
              setDialogue("過去の足跡か...。");
            }} />
            <PrisonerButton label="トレーニング・マニュアル" onClick={() => {
              setView('MANUAL');
              setCurrentExerciseId('pushup-1'); // Default to level 1 for manual
              setDialogue("知識も武器だ。\n正しいフォームを脳に刻め。");
            }} />
          </>
        )}

        {view === 'MANUAL' && (
          <div className="flex-1 overflow-auto bg-[#1b1b1b] p-4 font-mono text-[#00ff41] flex flex-col h-full">
            {/* Back Button for Manual */}
            <button
              onClick={() => setView('MENU')}
              className="mb-4 p-2 border border-white text-[#fff] bg-[#2038ec] hover:opacity-80"
            >
              メインメニューへ戻る
            </button>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setCurrentExerciseId('pushup-1')}
                className={`p-2 border text-xs whitespace-nowrap ${currentExerciseId === 'pushup-1' ? 'bg-[#00ff41] text-black' : 'border-white text-[#00ff41] hover:bg-[#2038ec]'}`}
              >
                LEVEL 1
              </button>
              <button
                onClick={() => setCurrentExerciseId('pushup-2')}
                className={`p-2 border text-xs whitespace-nowrap ${currentExerciseId === 'pushup-2' ? 'bg-[#00ff41] text-black' : 'border-white text-[#00ff41] hover:bg-[#2038ec]'}`}
              >
                LEVEL 2
              </button>
              <button
                onClick={() => setCurrentExerciseId('pushup-3')}
                className={`p-2 border text-xs whitespace-nowrap ${currentExerciseId === 'pushup-3' ? 'bg-[#00ff41] text-black' : 'border-white text-[#00ff41] hover:bg-[#2038ec]'}`}
              >
                LEVEL 3
              </button>
              <button
                onClick={() => setCurrentExerciseId('pushup-4')}
                className={`p-2 border text-xs whitespace-nowrap ${currentExerciseId === 'pushup-4' ? 'bg-[#00ff41] text-black' : 'border-white text-[#00ff41] hover:bg-[#2038ec]'}`}
              >
                LEVEL 4
              </button>
              <button
                onClick={() => setCurrentExerciseId('pushup-5')}
                className={`p-2 border text-xs whitespace-nowrap ${currentExerciseId === 'pushup-5' ? 'bg-[#00ff41] text-black' : 'border-white text-[#00ff41] hover:bg-[#2038ec]'}`}
              >
                LEVEL 5
              </button>
            </div>
            <TrainingDetailPage data={
              currentExerciseId === 'pushup-5' ? pushupLevel5 :
                currentExerciseId === 'pushup-4' ? pushupLevel4 :
                  currentExerciseId === 'pushup-3' ? pushupLevel3 :
                    currentExerciseId === 'pushup-2' ? pushupLevel2 :
                      pushupLevel1
            } />
          </div>
        )}

        {view === 'EXERCISE_LIST' && (
          <>
            {Object.values(EXERCISES).map((exercise) => {
              // Type assertion for dynamic access
              const uState = userState[exercise.id as keyof typeof userState] as any;
              const isLocked = uState.locked !== undefined ? uState.locked : exercise.isLocked;

              if (isLocked) return null;

              const progressPct = Math.min((uState.level / 10) * 100, 100);
              const orders = getDailyOrders(userState);
              const isRecommended = orders.includes(exercise.id);

              return (
                <PrisonerButton
                  key={exercise.id}
                  label={exercise.name}
                  level={uState.level}
                  progress={progressPct}
                  highlight={isRecommended}
                  onClick={() => {
                    setCurrentExerciseId(exercise.id);
                    setView('TRAINING');
                    setIsTrainingActive(true);
                    setDialogue(`種目: ${exercise.name}\n俺の号令に合わせろ。\n2秒で下ろし、1秒耐え、2秒で上げる...`);
                  }}
                />
              );
            })}
            <PrisonerButton label="戻る" onClick={() => {
              setView('MENU');
              setDialogue("何をする？");
            }} style={{ borderLeftColor: 'transparent' }} />
          </>
        )}

        {view === 'TRAINING' && (
          <TrainingSession
            onPhaseChange={(phase) => setRhythmPhase(phase)}
            onComplete={() => {
              setIsTrainingActive(false);
              setRhythmPhase('IDLE');
              setView('RESULT');
              setDialogue("回数を報告しろ。");
            }}
          />
        )}

        {view === 'RESULT' && currentExerciseId && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            {(() => {
              const exercise = EXERCISES[currentExerciseId];
              // Cast to any to access level safely since we know it exists if we are here
              const userExState = userState[currentExerciseId as keyof typeof userState] as any;
              const currentLevel = userExState.level;

              // Find standards for current level
              const step = exercise.steps.find(s => s.level === currentLevel);

              if (!step) return <div>Data Error: Level not found</div>;

              return (
                <ResultEntry
                  standards={step.standards}
                  onComplete={(reps, result) => {
                    // Logic for level up: check if reps >= progression standards
                    // We need to parse standards roughly since they might be "10" or "{reps: 10}" 
                    // (Though my types say RepsSets... )
                    // Let's assume RepsSets for now as typical for Big6
                    const progStd = step.standards.progression;
                    let isLevelUp = false;

                    // Type guard for RepsSets
                    if ('reps' in progStd) {
                      if (reps >= progStd.reps) {
                        isLevelUp = true;
                      }
                    }

                    recordTraining(currentExerciseId, {
                      date: new Date().toISOString(),
                      reps: reps,
                      result: result
                    }, isLevelUp);

                    if (isLevelUp) {
                      setDialogue("見事だ...。壁をまた一つ越えたな。\n次のレベルが待っているぞ。");
                    } else if (result === 'success') {
                      setDialogue("ノルマは達成したようだな。\nだが、ここが終着点ではない。");
                    } else {
                      setDialogue("情けない報告だ。\n出直してこい。");
                    }

                    setTimeout(() => setView('MENU'), 4000);
                  }}
                />
              );
            })()}
          </div>
        )}

        {view === 'HISTORY' && (
          <>
            <PrisonerButton label="戻る" onClick={() => {
              setView('MENU');
              setDialogue("何をする？");
            }} style={{ borderLeftColor: 'transparent' }} />

            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {/* Calendar View */}
              <TrainingCalendar userState={userState} />
              <div className="mb-8" />

              {Object.values(EXERCISES).map(exercise => {
                const uState = userState[exercise.id as keyof typeof userState] as any;
                const history = uState.history || [];

                if (history.length === 0) return null;

                return (
                  <div key={exercise.id} style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #333' }}>
                    <div style={{ color: '#d0d0d0', fontWeight: 'bold', marginBottom: '5px' }}>
                      {exercise.name} <span style={{ fontSize: '0.8rem', color: '#888' }}>(Lv.{uState.level})</span>
                    </div>

                    <HistoryChart history={history} />

                    {history.slice().reverse().slice(0, 3).map((log: any, idx: number) => (
                      <div key={idx} style={{ fontSize: '0.85rem', color: '#888', marginLeft: '10px' }}>
                        - {new Date(log.date).toLocaleDateString()}: {log.reps} reps ({log.result === 'success' ? 'クリア' : '未達'})
                      </div>
                    ))}
                  </div>
                );
              })}
              {Object.values(userState).every((u: any) => !u.history || u.history.length === 0) && (
                <div style={{ padding: '20px', color: '#555', textAlign: 'center' }}>
                  まだ記録はない...。
                </div>
              )}
            </div>
          </>
        )}


        {/* Footer Area with Access Counter */}
        <div className="mt-8 border-t border-[#333] pt-4 w-full flex justify-center">
          <AccessCounter />
        </div>

      </ActionArea >
    </MainContainer >
  );
}

export default App;
