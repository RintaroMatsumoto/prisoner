import type { TrainingLevel } from '../types/training';

export const pushupLevel4: TrainingLevel = {
    id: 'pushup-4',
    title: 'Half Pushups',
    level: 4,
    overview: '「フル・プッシュアップ」への事前準備だ。姿勢は完璧なプッシュアップと同じだが、可動域を半分に制限する。こうすることで、最も負荷のかかるボトムポジションを回避しつつ、体重を支えるための体幹と三頭筋の強さを養うことができる。',
    standards: {
        beginner: 8,
        intermediate: { sets: 2, reps: 12 },
        progression: { sets: 2, reps: 25 },
    },
    phases: [
        {
            title: '【セットアップ】開始姿勢',
            description: '床に両手をつき、足を伸ばしてつま先で立つ。手は肩幅、腕はまっすぐ伸ばす。頭からかかとまでが、定規で引いたように一直線でなければならない。',
            imageUrl: '/images/pushup_4_1.png',
            tips: [
                '腰の死守: 腰が落ちれば腰痛の元、上がれば負荷が逃げる。鉄の棒になったつもりで固めなさい。',
                'バスケットボール: 自分の腹の下にバスケットボールがある（半分までしか下がれない）と想像するといいわ。'
            ]
        },
        {
            title: '【ネガティブ】下降フェーズ',
            description: '肘を曲げ、体を下ろしていく。ただし、肘が直角（90度）になる位置で止める。床まで降りてはいけない。',
            imageUrl: '/images/pushup_4_2.png',
            tips: [
                '90度の掟: 肘の角度を目視するか、感覚で覚えなさい。深すぎても浅すぎてもダメよ。',
                'コントロール: 重力に身を任せず、ブレーキをかけながら下りるの。'
            ]
        },
        {
            title: '【ポーズ】中間ポジション',
            description: '肘が直角になった位置で、ピタリと静止する。',
            imageUrl: '/images/pushup_4_3.png',
            tips: [
                '静止: ここで1秒。筋肉が「まだ行ける」と叫んでも、意思の力で止めるのよ。',
                '体幹の確認: この姿勢で腰が震えるなら、まだ体幹が弱い証拠ね。'
            ]
        },
        {
            title: '【ポジティブ】上昇フェーズ',
            description: '床を押し、体を押し上げる。肘が伸びきるまで、一直線の姿勢を崩さないこと。',
            imageUrl: '/images/pushup_4_4.png',
            tips: [
                '肘のロック: 最後まで押し切り、肘をロックする。これで1レップ完了よ。',
                '呼吸: 押すときに強く吐く。'
            ]
        }
    ]
};
