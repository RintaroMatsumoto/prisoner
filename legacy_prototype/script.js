document.addEventListener('DOMContentLoaded', () => {
    const dialogueText = document.getElementById('dialogue-text');
    const actionArea = document.getElementById('action-area');
    const masterVisual = document.getElementById('master-visual');

    // Initialize User State (Load from LocalStorage or Default)
    let userState = loadState() || {
        name: null, // Add name field
        pushups: { level: 1, history: [] },
        squats: { level: 1, history: [] },
        pullups: { level: 1, history: [] },
        legraises: { level: 1, history: [] },
        bridges: { level: 1, history: [], locked: true }, // Explicitly tracking locked state in user object too
        handstand_pushups: { level: 1, history: [], locked: true }
    };

    // Initial Check for Unlocks based on loaded state
    checkUnlocks(userState);

    // Initial Greeting Flow
    setTimeout(() => {
        if (!userState.name) {
            // First time setup - ask name
            askName();
        } else {
            // Regular Greeting
            const greeting = getGreeting(userState);
            typeWriter(greeting, dialogueText, 40, () => {
                showMainMenu();
            });
        }
    }, 500);

    function askName() {
        typeWriter("新入りか...。\n貴様、名はなんだ？", dialogueText, 40, () => {
            actionArea.innerHTML = '';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = '名前を入力...';
            input.style.width = '80%';
            input.style.padding = '10px';
            input.style.marginBottom = '10px';
            input.style.background = '#333';
            input.style.color = '#fff';
            input.style.border = '1px solid #777';

            const submitBtn = createButton('決定', () => {
                const name = input.value.trim();
                if (name) {
                    userState.name = name;
                    saveState(userState);
                    typeWriter(`ほう...${name}か。\nいいだろう。今日からここが貴様の家だ。\n\nトレーニングを始めるか？`, dialogueText, 40, () => {
                        showMainMenu();
                    });
                } else {
                    typeWriter("...名乗るつもりもないか。\nならば「フレッシュ・フィッシュ」と呼ぶまでだ。\n\nトレーニングを始めるか？", dialogueText, 40, () => {
                        // Default name set implicitly by null check logic later or just proceed
                        showMainMenu();
                    });
                }
            });

            actionArea.appendChild(input);
            actionArea.appendChild(submitBtn);
            input.focus();
        });
    }

    // --- Helpers for Greetings ---
    function getGreeting(state) {
        // Find the most recent date
        let lastDate = null;
        Object.values(state).forEach(item => {
            if (item.history && item.history.length > 0) {
                const itemLast = new Date(item.history[item.history.length - 1].date);
                if (!lastDate || itemLast > lastDate) {
                    lastDate = itemLast;
                }
            }
        });

        // Determine Name to use based on Rank (optional flavor)
        const displayName = state.name ? state.name : "フレッシュ・フィッシュ";

        if (!lastDate) {
            return `ようこそ、独房へ...\n\n${displayName}よ。\nトレーニングを始めるか？`;
        }

        const now = new Date();
        const diffTime = Math.abs(now - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            return `規律を守れているようだな、${displayName}。\nその調子だ。今日も筋肉に誠実であれ。`;
        } else if (diffDays >= 4) {
            return `随分とのんびり過ごしていたようだな、${displayName}...。\n筋肉が鈍っているぞ。サボったツケは高くつく。`;
        } else {
            return `戻ったか、${displayName}。\nさあ、鉄の戒律に従い、己を鍛え上げろ。`;
        }
    }

    // --- Audio Controller ---

    const audioController = {
        enabled: true,
        speak: (text) => {
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

    // --- Core Functions ---

    function showMainMenu() {
        actionArea.innerHTML = ''; // Clear existing buttons

        // Calculate Rank
        const rankInfo = calculateRank(userState);
        const dailyOrders = getDailyOrders(userState);

        // Header (Rank & Voice)
        const headerDiv = document.createElement('div');
        headerDiv.className = 'rank-display';
        headerDiv.innerHTML = `
            <span>TITLE: <span style="color: #d0d0d0">${rankInfo}</span></span>
            <span style="font-size: 0.8rem; color: #707070; cursor: pointer" id="voice-toggle">Voice: ${audioController.enabled ? 'ON' : 'OFF'}</span>
        `;
        actionArea.appendChild(headerDiv);

        // Voice Toggle Event
        headerDiv.querySelector('#voice-toggle').onclick = (e) => {
            const isOn = audioController.toggle();
            e.target.innerText = `Voice: ${isOn ? 'ON' : 'OFF'}`;
        };

        // Daily Orders Text
        if (dailyOrders.length > 0) {
            const orderDiv = document.createElement('div');
            orderDiv.className = 'daily-orders-title';
            orderDiv.innerText = `>> 本日の指令: ${dailyOrders.map(id => big6Data[id].name).join(' & ')}`;
            actionArea.appendChild(orderDiv);
        }

        // Buttons
        const startBtn = createButton('トレーニングを開始する', () => {
            showExerciseSelection(dailyOrders);
        });
        const historyBtn = createButton('記録を確認する', () => {
            showHistoryView();
        });

        actionArea.appendChild(startBtn);
        actionArea.appendChild(historyBtn);
    }

    function showExerciseSelection(recommendations = []) {
        actionArea.innerHTML = '';
        typeWriter("どの種目で自分を虐め抜くつもりだ？", dialogueText);

        Object.values(big6Data).forEach(exercise => {
            // Check dynamic locked state
            const uState = userState[exercise.id];
            const isLocked = uState.locked !== undefined ? uState.locked : exercise.isLocked;

            if (!isLocked) {
                // Determine progress percentage (1 to 10)
                const progressPct = Math.min((uState.level / 10) * 100, 100);

                const btn = createButton(exercise.name, () => {
                    startExercise(exercise.id);
                });

                // Add Progress Bar to Button (Background)
                const bar = document.createElement('div');
                bar.className = 'btn-progress-bar';
                bar.style.width = `${progressPct}%`;
                btn.appendChild(bar);

                // Recommendation Highlight
                if (recommendations.includes(exercise.id)) {
                    btn.classList.add('recom-highlight');
                }

                // Add Level Text (Foreground)
                const lvlSpan = document.createElement('span');
                lvlSpan.innerText = ` Lv.${uState.level}`;
                lvlSpan.style.fontSize = '0.8rem';
                lvlSpan.style.color = '#888';
                lvlSpan.style.marginLeft = '10px';
                lvlSpan.style.position = 'relative'; // Ensure z-index works
                lvlSpan.style.zIndex = '2';
                btn.appendChild(lvlSpan);

                actionArea.appendChild(btn);
            }
        });

        const backBtn = createButton('戻る', () => showMainMenu());
        backBtn.style.borderLeftColor = 'transparent'; // Visual distinction
        actionArea.appendChild(backBtn);
    }

    // --- Helpers for Rank & Orders ---

    function calculateRank(state) {
        let totalLevels = 0;
        Object.values(state).forEach(s => totalLevels += s.level);

        if (totalLevels >= 60) return "LEGEND (伝説)";
        if (totalLevels >= 55) return "BEAST (野獣)";
        if (totalLevels >= 40) return "CONVICT (受刑者)";
        if (totalLevels >= 25) return "CRIMINAL (犯罪者)";
        if (totalLevels >= 10) return "GOON (雑魚)";
        return "FRESH FISH (新入り)";
    }

    function getDailyOrders(state) {
        // Simple Logic: Pick the 2 exercises with the oldest 'last done' date (or never done).
        // Only unlocked ones.

        const candidates = [];

        Object.keys(big6Data).forEach(id => {
            const uItem = state[id];
            // Check locked
            if (uItem.locked) return; // Note: data.js 'isLocked' is static, state has dynamic

            let lastTime = 0;
            if (uItem.history && uItem.history.length > 0) {
                lastTime = new Date(uItem.history[uItem.history.length - 1].date).getTime();
            }
            candidates.push({ id: id, time: lastTime });
        });

        // Sort ascending (0 / oldest first)
        candidates.sort((a, b) => a.time - b.time);

        // Return top 2 IDs
        return candidates.slice(0, 2).map(c => c.id);
    }

    function showHistoryView() {
        actionArea.innerHTML = '';
        typeWriter("過去の足跡か...。\n進歩しているか、それとも停滞しているか。己自身で確かめろ。", dialogueText);

        const historyContainer = document.createElement('div');
        historyContainer.style.overflowY = 'auto';
        historyContainer.style.maxHeight = '300px';
        historyContainer.style.width = '100%';
        historyContainer.style.marginBottom = '10px';

        // Loop through big6Data to show status
        Object.values(big6Data).forEach(exercise => {
            const uState = userState[exercise.id];
            const isLocked = uState.locked !== undefined ? uState.locked : exercise.isLocked;

            const itemDiv = document.createElement('div');
            itemDiv.style.borderBottom = '1px solid #333';
            itemDiv.style.padding = '8px 0';
            itemDiv.style.marginBottom = '8px';

            const title = document.createElement('div');
            title.style.color = isLocked ? '#555' : '#d0d0d0';
            title.style.fontWeight = 'bold';
            title.innerText = `${exercise.name} ${isLocked ? '[LOCKED]' : `(Lv.${uState.level})`}`;
            itemDiv.appendChild(title);

            if (!isLocked && uState.history && uState.history.length > 0) {
                // Show last 3 entries
                const lastEntries = uState.history.slice(-3).reverse();
                lastEntries.forEach(log => {
                    const row = document.createElement('div');
                    row.style.fontSize = '0.85rem';
                    row.style.color = '#888';
                    const dateStr = new Date(log.date).toLocaleDateString();
                    row.innerText = `- ${dateStr}: ${log.reps}回 (${log.result === 'success' ? 'クリア' : '未達'})`;
                    itemDiv.appendChild(row);
                });
            } else if (!isLocked) {
                const noData = document.createElement('div');
                noData.style.fontSize = '0.8rem';
                noData.style.color = '#555';
                noData.innerText = '- 記録なし';
                itemDiv.appendChild(noData);
            }

            historyContainer.appendChild(itemDiv);
        });

        actionArea.appendChild(historyContainer);

        const backBtn = createButton('戻る', () => showMainMenu());
        actionArea.appendChild(backBtn);
    }

    function startExercise(exerciseId) {
        const currentLevel = userState[exerciseId].level;
        const exerciseData = big6Data[exerciseId];
        const stepData = exerciseData.steps.find(s => s.level === currentLevel);

        actionArea.innerHTML = '';

        const introText = `種目: ${exerciseData.name}\nステップ${currentLevel}: ${stepData.name}\n\n【上級者標準】\nRef: ${stepData.standards.progression.reps} reps, ${stepData.standards.progression.sets} sets\n\n準備はいいか？`;

        typeWriter(introText, dialogueText, 30, () => {
            const startBtn = createButton('トレーニング開始 (2-1-2)', () => {
                runTrainingSession(exerciseId, stepData);
            });
            actionArea.appendChild(startBtn);
            actionArea.appendChild(createButton('戻る', () => showExerciseSelection()));
        });
    }

    let cadenceInterval = null;
    let isSessionActive = true;

    // Map exercise IDs to background images
    const exerciseBackgrounds = {
        pushups: 'assets/bg_pushups.png',
        squats: 'assets/bg_squats.png',
        pullups: 'assets/bg_pullups.png',
        legraises: 'assets/bg_legraises.png',
        bridges: 'assets/bg_bridges.png',
        handstand_pushups: 'assets/bg_handstand.png'
    };

    function runTrainingSession(exerciseId, stepData) {
        actionArea.innerHTML = '';
        const guideDiv = document.getElementById('rhythm-guide');
        guideDiv.style.display = 'block';
        const bar = guideDiv.querySelector('.cadence-bar');
        const textLabel = guideDiv.querySelector('.cadence-text');

        // Switch Background
        document.body.style.backgroundImage = `url('${exerciseBackgrounds[exerciseId]}')`;

        const stopBtn = createButton('終了して記録する', () => {
            endSession(exerciseId, stepData, bar, guideDiv);
        });
        actionArea.appendChild(stopBtn);

        typeWriter("俺の号令に合わせろ。\n2秒で下ろし、1秒耐え、2秒で上げる...", dialogueText);
        audioController.speak("用意...。");

        setTimeout(() => {
            if (!isSessionActive) return;
            bar.classList.add('cadence-anim');
            startCadenceLoopSafe(textLabel);
        }, 2000);
    }

    function endSession(exerciseId, stepData, barElement, guideDiv) {
        isSessionActive = false; // Stop loop
        barElement.classList.remove('cadence-anim');
        guideDiv.style.display = 'none';

        // Revert Background
        document.body.style.backgroundImage = "url('assets/bg_main.png')";

        // Cancel audio
        window.speechSynthesis.cancel();
        showResultInput(exerciseId, stepData);
    }

    function startCadenceLoopSafe(labelElement) {
        isSessionActive = true;
        let count = 0;

        function runStep(delay, nextFn) {
            if (!isSessionActive) return;
            setTimeout(() => {
                if (!isSessionActive) return;
                nextFn();
            }, delay);
        }

        function cycle() {
            if (!isSessionActive) return;
            count++;

            // DOWN Phase (2s)
            updatePhase(0, labelElement);
            audioController.speak("下ろして"); // Or "One, Two"

            runStep(2000, () => {
                // HOLD Phase (1s)
                updatePhase(1, labelElement);
                audioController.speak("ホール"); // Hold

                runStep(1000, () => {
                    // UP Phase (2s)
                    updatePhase(2, labelElement);
                    audioController.speak("上げて");

                    runStep(2000, () => {
                        // End of rep. Maybe count?
                        // audioController.speak(count.toString());
                        cycle(); // Loop
                    });
                });
            });
        }
        cycle();
    }

    function updatePhase(phaseIdx, label) {
        // 0: Down, 1: Hold, 2: Up
        if (phaseIdx === 0) {
            label.textContent = "DOWN (2s)";
            label.style.color = "#d0d0d0";
        } else if (phaseIdx === 1) {
            label.textContent = "HOLD (1s)";
            label.style.color = "#8a3324"; // Highlight color
        } else {
            label.textContent = "UP (2s)";
            label.style.color = "#d0d0d0";
        }
    }

    function showResultInput(exerciseId, stepData) {
        // Prototype: Simple Prompt for now, replaced with UI later
        // In a real app this would be a number input form
        actionArea.innerHTML = '';
        typeWriter(`回数を報告しろ。\n（開発中：仮に ${stepData.standards.progression.reps} 回やったとする）`, dialogueText);

        const successBtn = createButton(`${stepData.standards.progression.reps}回 (上級者標準クリア)`, () => {
            processResult(exerciseId, stepData.standards.progression.reps, true);
        });

        const failBtn = createButton(`${stepData.standards.beginner.reps}回 (初級者標準)`, () => {
            processResult(exerciseId, stepData.standards.beginner.reps, false);
        });

        actionArea.appendChild(successBtn);
        actionArea.appendChild(failBtn);
    }

    function processResult(exerciseId, reps, isProgression) {
        actionArea.innerHTML = '';

        let msg = "";
        let isLevelUp = false;

        if (isProgression) {
            msg = "悪くない...。\n次のステップへ進む資格を得たようだな。";
            // Level Up
            if (userState[exerciseId].level < 10) {
                userState[exerciseId].level++;
                isLevelUp = true;
                msg += `\n\n>> ${big6Data[exerciseId].name} Lv.${userState[exerciseId].level} 解放 <<`;

                // Add Flash Effect
                document.body.classList.add('screen-flash');
                setTimeout(() => {
                    document.body.classList.remove('screen-flash');
                }, 1000);
            }
        } else {
            msg = "まだ足りない。\n筋肉が悲鳴を上げるまで繰り返せ。";
        }

        // Save Logs
        if (!userState[exerciseId].history) userState[exerciseId].history = [];
        userState[exerciseId].history.push({
            date: new Date().toISOString(),
            reps: reps,
            result: isProgression ? 'success' : 'fail'
        });

        // Save logic
        saveState(userState);
        checkUnlocks(userState);

        typeWriter(msg, dialogueText, isLevelUp ? 60 : 40, () => {
            if (isLevelUp) {
                // Optional sound
            }
            setTimeout(() => {
                showMainMenu();
            }, 3000);
        });
    }

    // --- Helper Logic ---

    function checkUnlocks(state) {
        // Logic:
        // Bridge unlocks if Squats >= 6 AND LegRaises >= 6
        if (state.bridges.locked) {
            if (state.squats.level >= 6 && state.legraises.level >= 6) {
                state.bridges.locked = false;
                console.log("Bridge Unlocked!");
                // Notification could go here
                typeWriter("新たな種目『ブリッジ』が解放された...", dialogueText);
            }
        }

        // Handstand unlocks if Pushups >= 6
        if (state.handstand_pushups.locked) {
            if (state.pushups.level >= 6) {
                state.handstand_pushups.locked = false;
                console.log("Handstand Unlocked!");
                typeWriter("新たな種目『ハンドスタンド・プッシュアップ』が解放された...", dialogueText);
            }
        }
        saveState(state);
    }

    function loadState() {
        const stored = localStorage.getItem('ironLogState');
        return stored ? JSON.parse(stored) : null;
    }

    function saveState(state) {
        localStorage.setItem('ironLogState', JSON.stringify(state));
    }

    // --- UI Helpers ---

    function createButton(text, onClick) {
        const btn = document.createElement('button');
        btn.className = 'action-btn';
        btn.innerText = text;
        btn.addEventListener('click', onClick);
        return btn;
    }
});

// Reuse typeWriter but add callback support
function typeWriter(text, element, speed = 40, callback = null) {
    element.textContent = '';
    let i = 0;

    // Clear any existing intervals if we were to make this robust, 
    // but for prototype simple recursion is fine.

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            const varySpeed = speed + (Math.random() * 20 - 10);
            setTimeout(type, varySpeed);
        } else {
            if (callback) callback();
        }
    }
    type();
}
