import type { TrainingLevel } from '../types/training';

export const pushupLevel5: TrainingLevel = {
    id: 'pushup-5',
    title: 'Full Pushups',
    level: 5,
    overview: '「古典的」なプッシュアップ。世界中の刑務所、軍隊、道場で行われている基本中の基本だ。これまで培った関節の強さ、体幹の安定性、そして筋肉の制御力を統合する時が来た。これさえ完璧にできれば、上半身の基礎は完成したも同然だ。',
    standards: {
        beginner: 5,
        intermediate: { sets: 2, reps: 10 },
        progression: { sets: 2, reps: 20 },
    },
    phases: [
        {
            title: '【セットアップ】開始姿勢',
            description: '床にうつ伏せになり、両手を肩幅に開いて胸の横につく。つま先を立て、腕を伸ばして体を持ち上げる。頭からかかとまで一直線をキープする。',
            imageUrl: '/images/pushup_5_1.png',
            tips: [
                '手首の位置: 肩の真下に手首が来るように調整して。広すぎると大胸筋ばかりに効いてしまうわ。',
                '尻の制御: お尻を突き出さない。腹筋と臀筋を強く収縮させて、骨盤をロックするの。'
            ]
        },
        {
            title: '【ネガティブ】下降フェーズ',
            description: '肘を曲げ、制御しながら体を床に近づける。体が一直線のまま動くことが絶対条件だ。',
            imageUrl: '/images/pushup_5_1.png', // Placeholder due to generation quota
            tips: [
                '深さ: 胸の下に野球ボールがあると思って。それに触れるか触れないかの位置まで下ろすのよ。',
                '2秒の掟: 重力に負けるな。2秒かけてゆっくりと、筋肉でコントロールしながら下りるの。'
            ]
        },
        {
            title: '【ポーズ】ボトムポジション',
            description: '胸が床から数センチ（拳一つ分程度）の位置で静止する。',
            imageUrl: '/images/pushup_5_1.png', // Placeholder due to generation quota
            tips: [
                '静止: ここで1秒。筋肉の伸張を感じながら、姿勢を維持しなさい。',
                '呼吸: 息を止めないで。苦しい時こそ、冷静に。'
            ]
        },
        {
            title: '【ポジティブ】上昇フェーズ',
            description: '床を強く押し、開始姿勢に戻る。肘を完全に伸ばしきる（ロックアウト）まで押し切る。',
            imageUrl: '/images/pushup_5_1.png', // Placeholder due to generation quota
            tips: [
                '完全可動域: 中途半端な位置で折り返さないこと。肘がロックするまで押し切って初めて「1回」とカウントされるわ。',
                '爆発力: 上げるときは力強く。ただし、反動は使わない。'
            ]
        }
    ]
};
