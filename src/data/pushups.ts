import type { TrainingLevel } from '../types/training';

export const pushupLevel1: TrainingLevel = {
    id: 'pushup-1',
    title: 'Wall Pushups',
    level: 1,
    overview: 'このレベルの目的は、単なる筋力向上ではなく、肩と手首の関節を「再構築」することにあるわ。重力負荷を体重の10%以下に抑え、完璧な動作を体に刻み込みなさい。',
    standards: {
        beginner: 10,
        intermediate: { sets: 2, reps: 25 },
        progression: { sets: 3, reps: 50 },
    },
    phases: [
        {
            title: '【セットアップ】開始姿勢',
            description: '壁に向かって立ち、足を肩幅に開く。腕をまっすぐ伸ばし、手のひらを肩の高さ、肩幅より少し広い位置で壁につける。',
            imageUrl: '/images/pushup-1-1.png', // Placeholder path
            tips: [
                '足の位置: 壁から腕の長さ分ほど離れるのが基本よ。',
                'アライメント: 頭からかかとまでが一直線になるよう、腹筋に力を入れなさい。'
            ]
        },
        {
            title: '【ネガティブ】下降フェーズ',
            description: 'ゆっくりと肘を曲げ、上体を壁に向かって倒していく。',
            imageUrl: '/images/pushup-1-2.png', // Placeholder path
            tips: [
                '速度の制御: 2秒かけて、重力に抗いながらゆっくりと倒れ込むこと。',
                '呼吸: 体を下ろしながら、鼻から深く息を吸いなさい。'
            ]
        },
        {
            title: '【ポーズ】ボトムポジション',
            description: '額、または胸が壁に軽く触れる位置で停止する。',
            imageUrl: '/images/pushup-1-3.png', // Placeholder path
            tips: [
                '静止の美学: ここで1秒間、完全に静止すること。壁に寄りかかって休むのではないわ、緊張を維持しなさい。',
                '肘の角度: 肘が外側に開きすぎないよう、脇を軽く締めるのが「通（つう）」のやり方よ。'
            ]
        },
        {
            title: '【ポジティブ】上昇フェーズ',
            description: '壁を押し戻し、開始姿勢に戻る。',
            imageUrl: '/images/pushup-1-4.png', // Placeholder path
            tips: [
                '押し出し: 2秒かけてゆっくりと元の位置へ。肘をロック（伸ばし切る）させず、わずかに余裕を残すことで、筋肉の緊張を逃さないように。',
                '呼吸: 壁を押すときに、口から力強く息を吐き出すのよ。'
            ]
        }
    ]
};
