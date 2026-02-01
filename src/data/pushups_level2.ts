import type { TrainingLevel } from '../types/training';

export const pushupLevel2: TrainingLevel = {
    id: 'pushup-2',
    title: 'Incline Pushups',
    level: 2,
    overview: 'レベル1で関節の基礎を作ったら、次は「インクライン（斜角）」だ。角度をつけることで床でのプッシュアップよりも負荷を軽減するが、油断は禁物だ。この段階で、脊柱と股関節を完全に固定する技術（ロック）をマスターしろ。',
    standards: {
        beginner: 10,
        intermediate: { sets: 2, reps: 20 },
        progression: { sets: 3, reps: 40 },
    },
    phases: [
        {
            title: '【セットアップ】開始姿勢',
            description: '頑丈な机や鉄格子（または壁の手すり）の前に立つ。高さは腰の位置が目安だ。手を肩幅に開き、しっかりとその物体を掴むか、手のひらをつける。',
            imageUrl: '/images/pushup_2_1_1769919967753.png', // Note: Filenames will need to be exact. I used wildcards in copy so I should check the destination or rename them. Using simpler names is better.
            tips: [
                '足の位置: 体が斜め45度くらいになる位置まで足を引くのよ。',
                'ボディライン: お尻が突き出たり、腰が反ったりしないように。一枚の鉄板になりなさい。'
            ]
        },
        {
            title: '【ネガティブ】下降フェーズ',
            description: '肘を曲げ、胸をゆっくりと机（または手すり）の端に近づけていく。',
            imageUrl: '/images/pushup_2_2_1769919982355.png',
            tips: [
                'コントロール: 重力に負けて落ちてはいけないわ。2秒かけて、筋肉でブレーキをかけながら下ろすの。',
                '肘の脇: 脇を開きすぎると肩を痛めるわよ。45度くらいに締めて。'
            ]
        },
        {
            title: '【ポーズ】ボトムポジション',
            description: '胸が対象物に軽く触れるか、触れる直前の位置で静止する。',
            imageUrl: '/images/pushup_2_3_1769919995649.png',
            tips: [
                '静止: ここで1秒の静寂。反動を完全に殺すための儀式だと思って。',
                '腹圧: お腹の力が抜けると腰にくるわ。コルセットを巻いているように固めておきなさい。'
            ]
        },
        {
            title: '【ポジティブ】上昇フェーズ',
            description: '対象物を強く押し、体を元の位置まで押し戻す。',
            imageUrl: '/images/pushup_2_4_1769920014645.png',
            tips: [
                'プッシュ: 腕だけで押すんじゃないわ。床（足裏）と対象物の両方を強く踏ん張る感覚よ。',
                'ロックアウト: 最後に肘を伸ばしきる手前で止める。関節に頼らず、筋肉で支え続けるの。'
            ]
        }
    ]
};
