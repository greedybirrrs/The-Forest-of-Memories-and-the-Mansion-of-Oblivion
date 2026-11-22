"use strict";
// ===== 素材シート(assets/obj/ に切り出し済み)を使った見た目の差し替え =====
// 色の四角で代用していた物と、セバスチャン・マーサ・ノア・リゼを素材シートの画像に置き換える。
// 当たり判定(tx,ty,tw,th)はそのまま。画像を変えたいときは下の SWAP の spr 名を差し替える。
const SWAP = [
  ["room1", "lise", { spr: "lise", dir: "down" }], ["gh", "liseG", { spr: "lise", dir: "down" }],
  ["din", "seb", { spr: "sebas", dir: "down" }], ["kit", "mar", { spr: "marth", dir: "down" }], ["kid", "noah", { spr: "noahs", dir: "down" }],
  ["stu", "stDesk", { spr: "f_desk", tx: 9, tw: 2 }], ["stu", "stChair", { spr: "f_chair" }],
  ["par", "chairs", { spr: "f_chairs" }], ["par", "fire", { spr: "x_fire" }], ["din", "tea", { spr: "f_otable" }], ["gst", "bed", { spr: "f_bed" }],
  ["adm", "diaryD", { spr: "f_table" }], ["adm", "bp", { spr: "f_cab2", tw: 1 }], ["rec", "recD", { spr: "f_cab" }],
  ["vault", "dev", { spr: "p_wheel" }], ["vault", "c0", { spr: "cr_0" }], ["vault", "c1", { spr: "cr_1" }], ["vault", "c2", { spr: "cr_2" }],
  ["vault", "cb1", { spr: "c_grey" }], ["vault", "cb2", { spr: "c_grey" }], ["vault", "cb3", { spr: "c_grey" }],
  ["tow", "ped", { spr: "x_mbox" }], ["tow", "panel", { spr: "x_panels" }],
  ["yard", "fnt", { spr: "o_fountain" }], ["yard", "bench", { spr: "f_sofa" }], ["yard", "veg", { spr: "o_bush" }], ["yard", "can", { spr: "f_cab3" }],
  ["gh", "herb", { spr: "o_flowers", tx: 17, tw: 2 }], ["gst", "jar", { spr: "i_bottle" }],
  // --- 追加素材(謎解きオブジェクト) ---
  ...[0, 1, 2, 3, 4, 5].map(i => ["din", "seat" + i, { spr: "seat_" + i }]),
  ["kid", "t0", { spr: "x_doll", dir: undefined }], ["kid", "t1", { spr: "x_horse" }], ["kid", "t2", { spr: "x_blocks" }], ["kid", "t3", { spr: "x_bunnypic" }],
  ["mus", "pn", { spr: "x_piano" }], ["mus", "in0", { spr: "x_violin1" }], ["mus", "in1", { spr: "x_violin2" }], ["mus", "in2", { spr: "x_harp" }], ["mus", "in3", { spr: "x_score" }],
  ["lib3", "tree", { spr: "x_tree", th: 1 }],
  ...[0, 1, 2, 3].map(i => ["gh", "fl" + i, { spr: "fl_" + i, ly: 18, keepLbl: 1 }]),
];
for (const [r, id, o] of SWAP) { const e = (ENTITIES[r] || []).find(x => x.id === id); if (!e) continue; delete e.col; if (!o.keepLbl) delete e.lbl; Object.assign(e, o); }
// 中庭の飾り(調べられない木)
for (const [x, y] of [[2, 3], [17, 11], [6, 12]]) ENTITIES.yard.push({ id: "tree", spr: "o_tree", tx: x, ty: y });
for (const k of ["x_clock", "pa_dawn", "pa_noon", "pa_dusk", "pa_night", "cr_0", "cr_1", "cr_2", "gran_down", "clara_down", "noahs_down", "edgar_down", "albert_down", "fl_0", "fl_1", "fl_2", "fl_3", "sebas", "marth", "noahs", "lise_left", "f_desk", "f_chair", "f_chairs", "f_fire", "f_otable", "f_bed", "f_table", "f_cab", "f_cab2", "f_cab3", "f_sofa", "p_ped", "p_gears", "p_wheel",
  "o_fountain", "o_bush", "o_flowers", "o_tree", "c_blue", "c_green", "c_amber", "c_grey", "i_bottle"]) spr(k);   // 先読み

// ---------- 玄関ホール: 4枚の絵(朝・昼・夕・夜)と柱時計を専用の絵に ----------
const PAINT = { 4: "pa_dawn", 17: "pa_noon", 3: "pa_dusk", 16: "pa_night" };
const _dd8 = drawDecor;
drawDecor = c => { if (cur !== "room1") return _dd8(c);
  for (const x in PAINT) { const im = spr(PAINT[x]); if (ready(im)) c.drawImage(im, x * TS + Math.round((TS - im.naturalWidth) / 2), 17); }
  const k = spr("x_clock"); if (ready(k)) c.drawImage(k, 10 * TS + Math.round((TS - k.naturalWidth) / 2), 2); };
// ---------- 記憶視認中は、その場所の過去の人物を青く重ねて表示 ----------
const CAMEO = { par: [["gran_down", 12, 7]], prt: [["clara_down", 9, 8], ["noahs_down", 10, 8]], stu: [["edgar_down", 8, 6], ["albert_down", 11, 6]] };
const _vis8 = vision; vision = (k, cb) => { _vis8(k, () => { visionUntil = 0; cb && cb(); }); visionUntil = Date.now() + 600000; };
const _pd8 = window.postDraw; window.postDraw = c => { _pd8(c);
  if (Date.now() < visionUntil) for (const [n, x, y] of CAMEO[cur] || []) { const im = spr(n); if (!ready(im)) continue;
    c.save(); c.globalAlpha = 0.6 + 0.15 * Math.sin(Date.now() / 300); c.drawImage(im, x * TS + Math.round((TS - im.naturalWidth) / 2), (y + 1) * TS - im.naturalHeight); c.restore(); } };
