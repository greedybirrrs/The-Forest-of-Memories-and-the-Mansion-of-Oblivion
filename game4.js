"use strict";
// ===== 仕様書v0.3に沿った再構成(エンジン・見た目は従来のまま) =====
// ※【仮】= 仕様書で未決定の値。制作者の確認後に差し替える(このファイルの DECIDE にまとめてある)
const DECIDE = {
  paintOrder: [4, 17, 3, 16],                          // 【仮】玄関ホール: 絵画(朝→昼→夕→夜)を調べる順。x座標で指定
  seatNames: ["アルベルト", "クララ", "ノア", "当主", "夫人", "セバスチャン"],   // 【仮】席札の名前
  seatSolution: [3, 4, 0, 1, 2, 5],                    // 【仮】左の席から並ぶ正解(seatNames の番号)
  visionCost: 15,                                      // 【仮】記憶視認1回の記憶負担値の増加量
  burdenTiers: [30, 50, 70, 90],                       // 仕様書11-1(仮)の区切り
  exitNeedsSolved: 2,                                  // 【仮】NORMAL END(脱出)に必要な最低限の謎の数
};
for (const k of Object.keys(ENTITIES)) delete ENTITIES[k];
for (const k of Object.keys(DOORS)) delete DOORS[k];
for (const k of Object.keys(MAPS)) delete MAPS[k];
for (const k in bgs) delete bgs[k];
Object.assign(flags, { burden: 0, aw: 0, sol: 0, frag: 0, pp: 0, seat: [0, 1, 2, 3, 4, 5] });
for (const L2 of [I18N.ja.items, I18N.en.items]) Object.assign(L2, { oldkey: L2.box === "Music box" ? "Old key" : "古い鍵", ckey: L2.box === "Music box" ? "Nursery key" : "子供部屋の鍵" });
S("intro", "", ""); delete TX.ja.intro; delete TX.en.intro;
I18N.ja.intro = n => [`祖母から受け継いだオルゴールに導かれ、${n}は森の奥の古い洋館にたどり着いた。`, "重い扉を押し開けると、静かな空気がゆっくりと流れ出した。", "背後で、扉が静かに閉まった。"];
I18N.en.intro = n => [`Guided by the music box from Grandmother, ${n} reached an old mansion deep in the forest.`, "The heavy door gave way, and still air drifted slowly out.", "Behind them, the door closed softly."];

// ---- 文章(英語は未翻訳=日本語表示。英語対応の範囲は仕様書で未決定) ----
const P = { 3: "夕", 4: "朝", 16: "夜", 17: "昼" };
for (const x in P) S3("n_p" + x, `${P[x]}の風景を描いた絵だ。|額の隅に、小さく数字が刻まれている。`);
S3("n_pok", "四枚の絵を、朝から夜へ。|止まっていた柱時計が、かちりと動いた。|時計の台座の引き出しが開き、古い鍵が出てきた。|「古い鍵」を手に入れた。"); S3("n_pdone", "絵は静かに、こちらを見ている。");
S3("n_clk", "止まった柱時計。|…一日の流れを、絵が教えてくれそうだ。"); S3("n_clkD", "時計は静かに時を刻んでいる。");
S3("locked", "扉には鍵がかかっている。"); S3("n_stairs", "階段の先は、闇に沈んでいる。|(この先は、まだ進めない)"); S3("n_needKey", "古い鍵が必要なようだ。");
S3("n_seat", "席札には「{s}」とある。"); S3("n_sheet", "破れた座席表。|『左の席から順に、当主、夫人、アルベルト、クララ、ノア、セバスチャン。』"); S3("n_sdone", "六つの席は、あるべき姿に収まっている。");
S3("n_sok", "六枚の席札が揃うと、食卓の下で何かが外れる音がした。|「子供部屋の鍵」を手に入れた。|…ふと、視界が一瞬だけ揺らいだ気がした。");
S3("n_chA", "五脚の椅子が、暖炉を囲んでいる。|なぜか、ひとつ足りないような気がする。"); S3("n_chD", "椅子の並びが、記憶の中の集まりと重なって見える。");
S3("n_visAsk", "椅子に残る記憶に、意識を向けてみますか？"); S3("n_visOpt", "記憶視認を使う|やめる");
S3("n_vis", "色が褪せ、青い影が部屋に満ちる。|六つ目の席に、誰かが座っていた。|その人物は、暖炉の前の床を、静かに指さしていた。");
S3("n_burd1", "…誰かの声が、重なって聞こえる。"); S3("n_burd2", "自分の記憶に、違和感がある。"); S3("n_burd3", "頭が割れそうだ。これ以上は危険かもしれない。");
S3("n_fireA", "冷たい暖炉。灰の奥に何かありそうだが、見当がつかない。"); S3("n_fire", "記憶の人物が指した床を押すと、石板がずれた。|地下へ続く隠し通路の手掛かりを見つけた。"); S3("n_fireD", "暖炉の脇に、隠し通路の入口が見える。");
S3("n_vase", "花瓶には、枯れた花が挿してある。|花びらを触ると、遠い誰かの笑い声が聞こえた。|「記憶の断片」を手に入れた。"); S3("n_vaseD", "枯れた花が静かに揺れている。");
S3("n_pot", "使い込まれた鍋。|取っ手に、誰かの手の温もりが残っている気がした。|「記憶の断片」を手に入れた。"); S3("n_potD", "料理道具が整然と並んでいる。");
S3("n_mar", "『あら、お客様。ちょうどスープが煮えたところよ。』|『お嬢様たちは、もう食堂かしら。』||『ええと…今日は何を作るんだったかしら…。』||『スープ…スープ…。』");
S3("n_seb", "『ようこそ。お客様のお越しを、お待ちしておりました。』|『この館の記憶は、古いものほど薄れております。お気をつけを。』||『…ようこそ。…お待ち、して…』");
S3("n_lise1", "『こんにちは。わたしはリゼ。この館を案内するわ。』|『絵と時計に、時間の流れが隠れているみたい。』||『まずは、玄関の時計を調べてみて。』");
S3("n_lise2", "『食堂に、六人分の席があるの。みんなを正しい席へ。』||『応接間は、古い鍵で開くはずよ。』");
S3("n_front", "玄関の扉が、重々しく開いた。|館を出ますか？"); S3("n_frontL", "重い扉は閉ざされている。|(まだ、調べるべき場所が残っているようだ)"); S3("n_frontOpt", "館を出る|まだ残る");
S3("end_bad", "他人の声が、頭の中で重なり続ける。|自分の記憶と、誰かの記憶の境目が溶けていく。|{n}は、自分が誰なのか分からないまま、館の奥へ戻っていった。");
S3("end_true", "(TRUE ENDの内容は未決定です)"); S3("end_secret", "(SECRET ENDの内容は未決定です)"); S3("end_another", "(ANOTHER ENDの内容は未決定です)");
S3("endName", "NORMAL END|TRUE END|BAD END|SECRET END|ANOTHER END");
S3("g1", "目的: 玄関ホールを調べよう。時計と四枚の絵が気になる。"); S3("g2", "目的: 食堂の六つの席を、正しく整えよう。(古い鍵は応接間の扉へ)"); S3("g3", "目的: 応接間の椅子を調べよう。…何かが見えるかもしれない。"); S3("g4", "目的: 館の探索を続けよう。(これより先は未実装)");
ENDS.length = 0; ENDS.push("normal", "true", "bad", "secret", "another");

// ---- マップ(仕様書7-1: 1階=玄関ホール・食堂・応接間・厨房) ----
MAPS.room1 = mk([["C", 9, 2, 10, 13], ["D", 0, 8], ["D", 19, 8], ["D", 9, 14]]); MAPS.room1[1] = "###PP#D###K###D#PP##";
MAPS.din = mk([["C", 5, 4, 14, 10], ["T", 7, 6, 12, 7], ["D", 19, 8]]);
MAPS.par = mk([["C", 6, 4, 13, 10], ["D", 9, 14]]); MAPS.par[1] = "####P#########P###";  MAPS.par[1] += "##";
MAPS.kit = mk([["T", 4, 5, 8, 5], ["D", 9, 14]]);
DOORS.room1 = { "0,8": door("din", 18, 8, "left"), "19,8": { lock: "never", fail: "n_stairs" }, "6,1": door("par", 9, 13, "up", { lock: "oldkey", fail: "n_needKey" }), "14,1": door("kit", 9, 13, "up"), "9,14": { act: "front" } };
DOORS.din = { "19,8": door("room1", 1, 8, "right") }; DOORS.par = { "9,14": door("room1", 6, 2, "down") }; DOORS.kit = { "9,14": door("room1", 14, 2, "down") };
const sv = (id, tx, ty) => ({ id, spr: "candle", tx, ty, act: "save" });
ENTITIES.room1 = [{ id: "lise", spr: "hatgirl", dir: "down", tx: 13, ty: 9, act: "lise" }, sv("sv1", 16, 12)];
ENTITIES.din = [{ id: "seb", spr: "butler2", tx: 16, ty: 9, act: "seb" }, { id: "sheet", tx: 3, ty: 3, col: "#b8a77a", act: "sheet" }, sv("sv2", 3, 12),
  ...[0, 1, 2, 3, 4, 5].map(i => ({ id: "seat" + i, tx: 7 + i, ty: 5, col: "#7a2f3b", act: "seat", i }))];
ENTITIES.par = [{ id: "chairs", tx: 7, ty: 6, tw: 5, col: "#4a2e1c", act: "chairs" }, { id: "fire", tx: 9, ty: 2, tw: 2, col: "#3b2814", act: "fire" }, { id: "vase", tx: 15, ty: 3, col: "#4f7a4f", act: "vase" }, sv("sv3", 15, 11)];
ENTITIES.kit = [{ id: "mar", spr: "cook", tx: 12, ty: 7, act: "mar" }, { id: "pot", tx: 4, ty: 3, col: "#8a8090", act: "pot" }];
for (const k of Object.keys(TILEACT)) delete TILEACT[k]; for (const x of [3, 4, 16, 17]) TILEACT[`room1:${x},1`] = "pa" + x; TILEACT["room1:10,1"] = "clk";
const _de2 = drawEntity; drawEntity = (c, e) => { if (e.col) rect(c, e.col, e.tx * TS + 3, e.ty * TS + 4, (e.tw || 1) * TS - 6, 9); _de2(c, e); };

// ---- 仕組み: 記憶負担値・覚醒・記憶視認 ----
let visionUntil = 0;
const gain = k => { if (!flags[k]) { flags[k] = 1; flags.frag++; } };
const burdenLine = () => { const b = flags.burden, T = DECIDE.burdenTiers; return b >= T[3] ? "n_burd3" : b >= T[2] ? "n_burd2" : b >= T[1] ? "n_burd1" : null; };
const solve = () => { flags.sol++; };
function vision(k, cb) {
  flags.burden = Math.min(100, flags.burden + DECIDE.visionCost); visionUntil = Date.now() + 3000;
  const bl = burdenLine(); say([...L(k), ...(bl ? L(bl) : [])], () => flags.burden >= 100 ? ending("bad") : cb && cb());
}
const seatSolved = () => flags.seat.every((v, i) => v === DECIDE.seatSolution[i]);
Object.assign(ACT, {
  lise: () => say2(flags.sol >= 1 ? "n_lise2" : "n_lise1"), seb: () => say2("n_seb"), mar: () => say2("n_mar"), sheet: () => say2("n_sheet"),
  clk: () => say2(flags.p1 ? "n_clkD" : "n_clk"),
  seat: e => { if (flags.p2) return say2("n_sdone"); const s = flags.seat; s[e.i] = (s[e.i] + 1) % 6;
    const nm = DECIDE.seatNames[s[e.i]];
    if (seatSolved()) { flags.p2 = flags.ckey = true; flags.aw = 1; solve(); updateInv(); return say([`席札には「${nm}」とある。`, ...L("n_sok")]); }
    say([`席札には「${nm}」とある。`]); },
  chairs: () => (!flags.p2 || !flags.aw) ? say2("n_chA") : flags.seen6 ? say2("n_chD") :
    say2("n_visAsk", () => choose(L("n_visOpt"), i => { if (i === 0) vision("n_vis", () => { flags.seen6 = true; }); })),
  fire: () => !flags.seen6 ? say2("n_fireA") : flags.p3 ? say2("n_fireD") : (flags.p3 = true, solve(), say2("n_fire")),
  vase: () => flags.f1 ? say2("n_vaseD") : (gain("f1"), say2("n_vase")), pot: () => flags.f2 ? say2("n_potD") : (gain("f2"), say2("n_pot")),
  front: () => flags.sol < DECIDE.exitNeedsSolved ? say2("n_frontL") : say2("n_front", () => choose(L("n_frontOpt"), i => { if (i === 0) ending("normal"); })),
});
for (const x of [3, 4, 16, 17]) ACT["pa" + x] = () => {
  if (flags.p1) return say2("n_pdone");
  const o = DECIDE.paintOrder; flags.pp = o[flags.pp] === x ? flags.pp + 1 : (o[0] === x ? 1 : 0);
  if (flags.pp === 4) { flags.p1 = flags.oldkey = true; solve(); updateInv(); return say2("n_pok"); } say2("n_p" + x); };
useDoor = (tx, ty) => { const d = (DOORS[cur] || {})[tx + "," + ty]; if (!d) return say2("locked");
  if (d.act) return ACT[d.act](); if (d.lock && !flags[d.lock]) return say2(d.fail || "locked"); go(d); };
updateInv = () => { $("inv").textContent = t().invLabel + ["box", "oldkey", "ckey"].filter(k => k === "box" || flags[k]).map(k => t().items[k]).join(" / "); };
goalKey = () => !flags.p1 ? "g1" : !flags.p2 ? "g2" : !flags.p3 ? "g3" : "g4";
openItems = (i = 0) => { const f = flags, T = DECIDE.burdenTiers, lv = f.burden >= T[3] ? "危険な状態" : f.burden >= T[2] ? "自分の記憶に違和感" : f.burden >= T[1] ? "他人の声が混ざる" : f.burden >= T[0] ? "過去の記憶が見える" : "通常";
  openMenu(tt("m_items"), [{ l: tt("m_goal"), fn: () => { const k = mn.i; detail(L(goalKey()), () => openItems(k)); } },
    { h: 1, l: `${tt("m_hi")}: ${["box", "oldkey", "ckey"].filter(k => k === "box" || f[k]).map(k => t().items[k]).join(" / ")}` },
    { h: 1, l: `記憶の断片: ${f.frag}` }, ...(f.aw ? [{ h: 1, l: `記憶の負担: ${lv}` }] : []), { l: tt("m_back"), fn: pauseMenu }], i); };

// ---- 描画: 記憶視認中は色調を変える / タイトルにANOTHER END ----
const _pd = window.postDraw; window.postDraw = c => { _pd(c); if (Date.now() < visionUntil) { c.fillStyle = "rgba(40,80,170,.38)"; c.fillRect(0, 0, W, H); } };
const END_NAMES = ["NORMAL", "TRUE", "BAD", "SECRET", "ANOTHER"];
const refreshEnds = () => { endsEl.textContent = ENDS.map((e, i) => `${END_NAMES[i]} ${seen().includes(e) ? "✓" : "?"}`).join("   "); anoBtn.hidden = !["normal", "true", "bad", "secret"].every(e => seen().includes(e)); };
const anoBtn = document.createElement("button"); anoBtn.style.cssText = contBtn.style.cssText; anoBtn.textContent = "ANOTHER END";
anoBtn.onclick = () => { $("title").hidden = true; mode = "play"; ending("another"); }; howBtn.after(anoBtn); refreshEnds();
// ※旧構成のセーブの破棄は、全マップが揃ってから game6.js の末尾で行う
updateInv(); applyLang();
