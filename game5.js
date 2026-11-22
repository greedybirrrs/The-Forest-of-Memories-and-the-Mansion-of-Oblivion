"use strict";
// ===== 2階(子供部屋・音楽室・客室)と、シナリオ完成案 v1.0 で決定した内容の反映 =====
// 決定: 時計塔の5音=ド→ミ→ソ→ド→ラ / 6人目=若い頃の祖母 / 階段は食堂後に開放 / アイテムは「調べる」で自動使用 / ノアの結末は明言しない
const MEL = [0, 1, 2, 0], NOTES = ["ド", "ミ", "ソ", "ラ"];   // 音楽室の4音(ド→ミ→ソ→ド)
S3("n_sok", "六枚の席札が揃うと、食卓の下で何かが外れる音がした。|「子供部屋の鍵」を手に入れた。|その瞬間、耳元で声がした。|『……どうして、また来たの？』|振り返っても、誰もいない。");
S3("n_vis", "色が褪せ、青い影が部屋に満ちる。|六つ目の席に、若い女性が座っていた。|どこか見覚えのある面影だ。|その人物は、暖炉の前の床を、静かに指さしていた。");
S3("n_lise1", "『おかえりなさい。』|『……あれ？ ごめんなさい。初めまして、だったね。』|『わたしはリゼ。時計は、朝から夜へ。絵が教えてくれるよ。』");
S3("n_stairs", "階段の先は、闇に沈んでいる。|(食堂が、何か気になる)"); S3("n_stairs3", "三階へ続く階段。|(この先は、まだ進めない)");
S3("g5", "目的: 二階を探そう。子供部屋の鍵を使い、音楽室も調べてみよう。");
const TOY = ["人形", "木馬", "おもちゃ箱", "壁の絵"], TOYT = ["誰かを大切に思う気持ちが、静かに残っている。", "一緒に過ごした時間が、揺れている。", "忘れられた記憶が、底に眠っている。", "思い出を残したいという願いが、描かれている。"];
TOY.forEach((n, i) => S3("n_t" + i, `${n}。|${TOYT[i]}`));
S3("n_t_ok", "四つを正しい順に調べると、壁の裏から何かが落ちた。|「破れた楽譜」を手に入れた。|クララがノアに教えていた曲の一部のようだ。"); S3("n_t_done", "子供部屋は、静かに時を止めている。");
S3("n_noah", "『ねえ、君は忘れたくないものってある？』|『僕にはあるよ。絶対に忘れたくない人。』||『…どうして母さんは、泣いていたんだろう。』");
for (let i = 0; i < 4; i++) S3("n_i" + i, `楽器の絵の裏に、小さく『${i + 1}番目：${NOTES[MEL[i]]}』と書かれている。`);
S3("n_pianoA", "古いピアノ。楽譜立てが空だ。"); S3("n_pianoQ", "破れた楽譜を置き、鍵盤に指を乗せた。|四つの音を、順に弾く。"); S3("n_bad", "音が、ちぐはぐに響いた。|もう一度、最初から。");
S3("n_pok5", "四つの音が、静かに重なった。|持っているオルゴールが、同じ旋律を奏でる。|(この旋律は、時計塔で必要になりそうだ)"); S3("n_pianoD", "ピアノは、静かに余韻を残している。");
S3("n_bed", "整えられたままの寝台。|枕元に残る誰かの温もりが、遠い記憶を運んでくる。|「記憶の断片」を手に入れた。"); S3("n_bedD", "寝台は静かに主を待っている。");

MAPS.f2 = mk([["D", 0, 8], ["D", 19, 8]]); MAPS.f2[1] = "####D###D###D#######";
MAPS.kid = mk([["C", 3, 3, 16, 11], ["D", 9, 14]]); MAPS.mus = mk([["C", 4, 3, 15, 10], ["D", 9, 14]]); MAPS.gst = mk([["D", 9, 14]]);
DOORS.room1["19,8"] = door("f2", 1, 8, "right", { lock: "p2", fail: "n_stairs" });
DOORS.f2 = { "0,8": door("room1", 18, 8, "left"), "19,8": { lock: "never", fail: "n_stairs3" },
  "4,1": door("kid", 9, 13, "up", { lock: "ckey", fail: "locked" }), "8,1": door("mus", 9, 13, "up"), "12,1": door("gst", 9, 13, "up") };
for (const [r, x] of [["kid", 4], ["mus", 8], ["gst", 12]]) DOORS[r] = { "9,14": door("f2", x, 2, "down") };
ENTITIES.f2 = [];
ENTITIES.kid = [{ id: "noah", spr: "rey", tx: 13, ty: 8, act: "noah" }, { id: "t0", spr: "doll", dir: "down", tx: 5, ty: 5, act: "toy", i: 0 }, { id: "t1", tx: 15, ty: 4, col: "#8a5a2b", act: "toy", i: 1 },
  { id: "t2", tx: 10, ty: 10, col: "#5a4a2a", act: "toy", i: 2 }, { id: "t3", tx: 9, ty: 2, col: "#6a6aa0", act: "toy", i: 3 }];
ENTITIES.mus = [{ id: "pn", spr: "piano", tx: 9, ty: 5, act: "piano" }, ...[4, 8, 12, 16].map((x, i) => ({ id: "in" + i, tx: x - 1 + (i > 1 ? 0 : 0), ty: 2, col: "#a07a3a", act: "inst", i }))];
ENTITIES.gst = [{ id: "bed", tx: 14, ty: 5, tw: 2, col: "#5a3a4a", act: "bed" }, sv("sv4", 4, 11)];
Object.assign(ACT, {
  noah: () => say2("n_noah"), bed: () => flags.f3 ? say2("n_bedD") : (gain("f3"), say2("n_bed")), inst: e => say2("n_i" + e.i),
  toy: e => { if (flags.p4) return say2("n_t_done"); const o = [0, 1, 2, 3];
    flags.tp = o[flags.tp | 0] === e.i ? (flags.tp | 0) + 1 : (e.i === 0 ? 1 : 0);
    if (flags.tp === 4) { flags.p4 = flags.score = true; solve(); return say2("n_t_ok"); } say2("n_t" + e.i); },
  piano: () => { if (flags.p5) return say2("n_pianoD"); if (!flags.score) return say2("n_pianoA"); let k = 0;
    const ask = () => choose(NOTES, i => { if (i !== MEL[k]) return say2("n_bad"); if (++k < MEL.length) ask(); else { flags.p5 = true; solve(); say2("n_pok5"); } });
    say2("n_pianoQ", ask); },
});
goalKey = () => !flags.p1 ? "g1" : !flags.p2 ? "g2" : !flags.p3 ? "g3" : !(flags.p4 && flags.p5) ? "g5" : "g4";
applyLang();
