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

// View Enum
type ViewState = 'BOOT' | 'ONBOARDING_NAME' | 'MENU' | 'EXERCISE_LIST' | 'TRAINING' | 'RESULT' | 'HISTORY';

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
                  <div className="daily-orders-title">
                    &gt;&gt; 本日の指令: {names}
                  </div>
                );
              }
            })()}

            <PrisonerButton label="トレーニングを開始する" onClick={() => {
              setView('EXERCISE_LIST');
              setDialogue("どの種目で自分を虐め抜くつもりだ？");
            }} />
            <PrisonerButton label="記録を確認する" onClick={() => {
              setView('HISTORY');
              setDialogue("過去の足跡か...。");
            }} />
          </>
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
          <>
            {/* Simplified Result Input for now */}
            <PrisonerButton label="上級者標準クリア (レベルアップ)" onClick={() => {
              // Mock data for simplified logic (assuming max reps)
              // We would read Step data here ideally
              recordTraining(currentExerciseId, {
                date: new Date().toISOString(),
                reps: 0, // Placeholder
                result: 'success'
              }, true); // force level up for demo

              setDialogue("悪くない...。\n次のステップへ進む資格を得たようだな。");
              setTimeout(() => setView('MENU'), 4000);
            }} />
            <PrisonerButton label="標準未達" onClick={() => {
              recordTraining(currentExerciseId, {
                date: new Date().toISOString(),
                reps: 0, // Placeholder
                result: 'fail'
              }, false);

              setDialogue("まだ足りない。\n筋肉が悲鳴を上げるまで繰り返せ。");
              setTimeout(() => setView('MENU'), 4000);
            }} />
          </>
        )}

        {view === 'HISTORY' && (
          <>
            <PrisonerButton label="戻る" onClick={() => {
              setView('MENU');
              setDialogue("何をする？");
            }} style={{ borderLeftColor: 'transparent' }} />

            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {Object.values(EXERCISES).map(exercise => {
                const uState = userState[exercise.id as keyof typeof userState] as any;
                const history = uState.history || [];

                if (history.length === 0) return null;

                return (
                  <div key={exercise.id} style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #333' }}>
                    <div style={{ color: '#d0d0d0', fontWeight: 'bold', marginBottom: '5px' }}>
                      {exercise.name} <span style={{ fontSize: '0.8rem', color: '#888' }}>(Lv.{uState.level})</span>
                    </div>
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
      </ActionArea>
    </MainContainer>
  );
}

export default App;
