"use strict";
// ===== 背景小物(置物)を調べたときのテロップ =====
// これまで調べても何も出なかった置物(燭台・オルゴール・木・花束・歯車・ランプ)に、短いテロップを付ける。
// 謎や進行フラグには一切触らない。新しい置物を足したら、下の DECOR_ACT に「部屋 / 素材名 / act名」を1行足すだけでよい。
// 文章: "|"=改行 / "||"=ページ切替(調べるたびに次のページ)。

// 応接間: 暖炉まわりの燭台
S3("n_dCandleP", "暖炉のそばの燭台。|炎は静かに灯っているのに、熱は少しも感じない。||揺れる影だけが、壁の上で誰かの形をつくっては、消えていく。");
// 音楽室: 小さなオルゴール
S3("n_dMbox", "譜面台のそばに置かれた、小さなオルゴール。|ねじは錆びついて、もう回らないようだ。||蓋の内側には、擦り切れた文字の跡だけが残っている。");
// 中庭: 白い花の木
S3("n_dTree", "白い花をつけた木。|季節はずれの花びらが、枝についたまま散らない。||風もないのに、葉がさわさわと鳴った。");
// 温室: 花束
S3("n_dBouqG", "温室の隅に置かれた花束。|ほどけかけたリボンの先が、かすかに揺れている。||誰かに贈られるはずだった花なのかもしれない。");
// 地下: 歯車・ランプ
S3("n_dGearV", "壁際で、大きな歯車がゆっくりと回っている。|噛み合う低い音が、地下の静けさに染み込んでいく。||この音が、館の記憶を支えているのだろうか。");
S3("n_dLamp", "淡く光るランプ。|炎ではなく、結晶の光を映してほのかに揺れている。||光の中に、誰かの横顔が見えた気がした。");
// 時計塔: 歯車(大時計が動いたあとは文章が変わる)
S3("n_dGearT", "大時計を支える歯車。|錆びついたまま、噛み合って動かない。||止まった時間の重みが、そのまま残っている。");
S3("n_dGearTon", "歯車が、長い眠りから覚めたように回っている。|刻む音が、塔いっぱいに響いていた。||噛み合うたびに、止まっていた時間が少しずつ流れ出す。");

Object.assign(ACT, {
  dCandleP: () => say2("n_dCandleP"), dMbox: () => say2("n_dMbox"), dTree: () => say2("n_dTree"), dBouqG: () => say2("n_dBouqG"),
  dGearV: () => say2("n_dGearV"), dLamp: () => say2("n_dLamp"), dGearT: () => say2(flags.p9 ? "n_dGearTon" : "n_dGearT"),
});

// [部屋, 素材名(spr), act名]。同じ部屋の同じ素材はすべて対象。すでに act / msg がある物(調べられる物)には触れない。
const DECOR_ACT = [
  ["par", "candelabra", "dCandleP"], ["mus", "x_mbox", "dMbox"], ["yard", "o_tree", "dTree"], ["gh", "n_bouq", "dBouqG"],
  ["vault", "p_gears", "dGearV"], ["vault", "n_lamp", "dLamp"], ["tow", "p_gears", "dGearT"],
];
const setDecorAct = () => { for (const [r, sp, a] of DECOR_ACT) for (const e of ENTITIES[r] || []) if (e.spr === sp && !e.act && !e.msg) e.act = a; };
setDecorAct();
const _sw11 = window.syncWorld2; window.syncWorld2 = () => { if (_sw11) _sw11(); setDecorAct(); };
