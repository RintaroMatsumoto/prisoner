import type { Big6Data } from '../types';

export const EXERCISES: Big6Data = {
    pushups: {
        id: 'pushups',
        name: 'プッシュアップ',
        description: '上半身のプッシュ系筋肉（大胸筋、三頭筋、三角筋）を鍛える。',
        isLocked: false,
        steps: [
            {
                level: 1, name: 'ウォール・プッシュアップ',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 25, sets: 2 },
                    progression: { reps: 50, sets: 3 }
                }
            },
            {
                level: 2, name: 'インクライン・プッシュアップ',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 20, sets: 2 },
                    progression: { reps: 40, sets: 3 }
                }
            },
            {
                level: 3, name: 'ニーリング・プッシュアップ',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 15, sets: 2 },
                    progression: { reps: 30, sets: 3 }
                }
            },
            {
                level: 4, name: 'ハーフ・プッシュアップ',
                standards: {
                    beginner: { reps: 8, sets: 1 },
                    intermediate: { reps: 12, sets: 2 },
                    progression: { reps: 25, sets: 2 }
                }
            },
            {
                level: 5, name: 'フル・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 6, name: 'クローズ・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 7, name: 'アンイーブン・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 8, name: 'ハーフ・ワンアーム・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 9, name: 'レバー・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 10, name: 'ワンアーム・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 100, sets: 1 }
                }
            }
        ]
    },
    squats: {
        id: 'squats',
        name: 'スクワット',
        description: '下半身全体（大腿四頭筋、ハムストリングス、臀筋）を鍛える。',
        isLocked: false,
        steps: [
            {
                level: 1, name: 'ショルダー・スタンド・スクワット',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 25, sets: 2 },
                    progression: { reps: 50, sets: 3 }
                }
            },
            {
                level: 2, name: 'ジャックナイフ・スクワット',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 20, sets: 2 },
                    progression: { reps: 40, sets: 3 }
                }
            },
            {
                level: 3, name: 'サポーティド・スクワット',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 15, sets: 2 },
                    progression: { reps: 30, sets: 3 }
                }
            },
            {
                level: 4, name: 'ハーフ・スクワット',
                standards: {
                    beginner: { reps: 8, sets: 1 },
                    intermediate: { reps: 35, sets: 2 },
                    progression: { reps: 50, sets: 2 }
                }
            },
            {
                level: 5, name: 'フル・スクワット',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 30, sets: 2 }
                }
            },
            {
                level: 6, name: 'クローズ・スクワット',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 7, name: 'アンイーブン・スクワット',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 8, name: 'ハーフ・ワンレッグ・スクワット',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 9, name: 'アシステッド・ワンレッグ・スクワット',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 10, name: 'ワンレッグ・スクワット',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 50, sets: 2 }
                }
            }
        ]
    },
    pullups: {
        id: 'pullups',
        name: 'プルアップ',
        description: '背中（広背筋）と上腕二頭筋を鍛える。',
        isLocked: false,
        steps: [
            {
                level: 1, name: 'ヴァーチカル・プル',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 20, sets: 2 },
                    progression: { reps: 40, sets: 3 }
                }
            },
            {
                level: 2, name: 'ホリゾンタル・プル',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 20, sets: 2 },
                    progression: { reps: 30, sets: 3 }
                }
            },
            {
                level: 3, name: 'ジャックナイフ・プル',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 15, sets: 2 },
                    progression: { reps: 20, sets: 3 }
                }
            },
            {
                level: 4, name: 'ハーフ・プルアップ',
                standards: {
                    beginner: { reps: 8, sets: 1 },
                    intermediate: { reps: 11, sets: 2 },
                    progression: { reps: 15, sets: 2 }
                }
            },
            {
                level: 5, name: 'フル・プルアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 8, sets: 2 },
                    progression: { reps: 10, sets: 2 }
                }
            },
            {
                level: 6, name: 'クローズ・プルアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 8, sets: 2 },
                    progression: { reps: 10, sets: 2 }
                }
            },
            {
                level: 7, name: 'アンイーブン・プルアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 7, sets: 2 },
                    progression: { reps: 9, sets: 2 }
                }
            },
            {
                level: 8, name: 'ハーフ・ワンアーム・プルアップ',
                standards: {
                    beginner: { reps: 4, sets: 1 },
                    intermediate: { reps: 6, sets: 2 },
                    progression: { reps: 8, sets: 2 }
                }
            },
            {
                level: 9, name: 'アシステッド・ワンアーム・プルアップ',
                standards: {
                    beginner: { reps: 3, sets: 1 },
                    intermediate: { reps: 5, sets: 2 },
                    progression: { reps: 7, sets: 2 }
                }
            },
            {
                level: 10, name: 'ワンアーム・プルアップ',
                standards: {
                    beginner: { reps: 1, sets: 1 },
                    intermediate: { reps: 3, sets: 2 },
                    progression: { reps: 6, sets: 2 }
                }
            }
        ]
    },
    legraises: {
        id: 'legraises',
        name: 'レッグレイズ',
        description: '腹筋群と股関節屈筋を鍛える。',
        isLocked: false,
        steps: [
            {
                level: 1, name: 'ニータック',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 25, sets: 2 },
                    progression: { reps: 40, sets: 3 }
                }
            },
            {
                level: 2, name: 'フラット・ニーレイズ',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 20, sets: 2 },
                    progression: { reps: 35, sets: 3 }
                }
            },
            {
                level: 3, name: 'フラット・ベント・レッグレイズ',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 15, sets: 2 },
                    progression: { reps: 30, sets: 3 }
                }
            },
            {
                level: 4, name: 'フラット・フロッグ・レイズ',
                standards: {
                    beginner: { reps: 8, sets: 1 },
                    intermediate: { reps: 15, sets: 2 },
                    progression: { reps: 25, sets: 3 }
                }
            },
            {
                level: 5, name: 'フラット・ストレート・レッグレイズ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 6, name: 'ハンギング・ニータック',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 15, sets: 2 }
                }
            },
            {
                level: 7, name: 'ハンギング・ベント・レッグレイズ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 15, sets: 2 }
                }
            },
            {
                level: 8, name: 'ハンギング・フロッグ・レイズ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 15, sets: 2 }
                }
            },
            {
                level: 9, name: 'ハンギング・ストレート・レッグレイズ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 15, sets: 2 }
                }
            },
            {
                level: 10, name: 'ハンギング・ウィンドシールド・ワイパー',
                standards: {
                    beginner: { reps: 1, sets: 1 },
                    intermediate: { reps: 3, sets: 2 },
                    progression: { reps: 5, sets: 2 }
                }
            }
        ]
    },
    bridges: {
        id: 'bridges',
        name: 'ブリッジ',
        description: '脊柱起立筋と背面の筋肉全体を強化する。',
        isLocked: true,
        steps: [
            {
                level: 1, name: 'ショート・ブリッジ',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 25, sets: 2 },
                    progression: { reps: 50, sets: 3 }
                }
            },
            {
                level: 2, name: 'ストレート・ブリッジ',
                standards: {
                    beginner: { reps: 10, sets: 1 },
                    intermediate: { reps: 20, sets: 2 },
                    progression: { reps: 40, sets: 3 }
                }
            },
            {
                level: 3, name: 'アングルド・ブリッジ',
                standards: {
                    beginner: { reps: 8, sets: 1 },
                    intermediate: { reps: 15, sets: 2 },
                    progression: { reps: 30, sets: 3 }
                }
            },
            {
                level: 4, name: 'ヘッド・ブリッジ',
                standards: {
                    beginner: { reps: 8, sets: 1 },
                    intermediate: { reps: 15, sets: 2 },
                    progression: { reps: 25, sets: 2 }
                }
            },
            {
                level: 5, name: 'ハーフ・ブリッジ',
                standards: {
                    beginner: { reps: 8, sets: 1 },
                    intermediate: { reps: 15, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 6, name: 'フル・ブリッジ',
                standards: {
                    beginner: { reps: 6, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 15, sets: 2 }
                }
            },
            {
                level: 7, name: 'ウォール・ウォーキング（ダウン）',
                standards: {
                    beginner: { reps: 3, sets: 1 },
                    intermediate: { reps: 6, sets: 2 },
                    progression: { reps: 10, sets: 2 }
                }
            },
            {
                level: 8, name: 'ウォール・ウォーキング（アップ）',
                standards: {
                    beginner: { reps: 2, sets: 1 },
                    intermediate: { reps: 4, sets: 2 },
                    progression: { reps: 8, sets: 2 }
                }
            },
            {
                level: 9, name: 'クロージング・ブリッジ',
                standards: {
                    beginner: { reps: 1, sets: 1 },
                    intermediate: { reps: 3, sets: 2 },
                    progression: { reps: 6, sets: 2 }
                }
            },
            {
                level: 10, name: 'スタンド・トゥ・スタンド・ブリッジ',
                standards: {
                    beginner: { reps: 1, sets: 1 },
                    intermediate: { reps: 3, sets: 2 },
                    progression: { reps: 10, sets: 2 }
                }
            }
        ]
    },
    handstand_pushups: {
        id: 'handstand_pushups',
        name: 'ハンドスタンド・プッシュアップ',
        description: '肩（三角筋）と上腕三頭筋を極限まで鍛える。',
        isLocked: true,
        steps: [
            {
                level: 1, name: 'ウォール・ヘッドスタンド',
                standards: {
                    beginner: { time: '30s' },
                    intermediate: { time: '1m' },
                    progression: { time: '2m' }
                }
            },
            {
                level: 2, name: 'クロウ・スタンド',
                standards: {
                    beginner: { time: '10s' },
                    intermediate: { time: '30s' },
                    progression: { time: '1m' }
                }
            },
            {
                level: 3, name: 'ウォール・ハンドスタンド',
                standards: {
                    beginner: { time: '30s' },
                    intermediate: { time: '1m' },
                    progression: { time: '2m' }
                }
            },
            {
                level: 4, name: 'ハーフ・ハンドスタンド・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 20, sets: 2 }
                }
            },
            {
                level: 5, name: 'ハンドスタンド・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 10, sets: 2 },
                    progression: { reps: 15, sets: 2 }
                }
            },
            {
                level: 6, name: 'クローズ・ハンドスタンド・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 9, sets: 2 },
                    progression: { reps: 12, sets: 2 }
                }
            },
            {
                level: 7, name: 'アンイーブン・ハンドスタンド・プッシュアップ',
                standards: {
                    beginner: { reps: 5, sets: 1 },
                    intermediate: { reps: 8, sets: 2 },
                    progression: { reps: 10, sets: 2 }
                }
            },
            {
                level: 8, name: 'ハーフ・ワンアーム・ハンドスタンド・プッシュアップ',
                standards: {
                    beginner: { reps: 4, sets: 1 },
                    intermediate: { reps: 6, sets: 2 },
                    progression: { reps: 8, sets: 2 }
                }
            },
            {
                level: 9, name: 'レバー・ハンドスタンド・プッシュアップ',
                standards: {
                    beginner: { reps: 3, sets: 1 },
                    intermediate: { reps: 4, sets: 2 },
                    progression: { reps: 6, sets: 2 }
                }
            },
            {
                level: 10, name: 'ワンアーム・ハンドスタンド・プッシュアップ',
                standards: {
                    beginner: { reps: 1, sets: 1 },
                    intermediate: { reps: 2, sets: 2 },
                    progression: { reps: 5, sets: 1 }
                }
            }
        ]
    }
};
