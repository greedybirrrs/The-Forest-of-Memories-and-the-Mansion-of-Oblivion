"use strict";
// ===== 素材配置仕様書(人物画像差し替え版)に沿った配置の追加・仮の四角の差し替え =====
// 謎の正解順・イベント条件は変更しない。見た目(素材)と背景小物の配置のみ。
for (const k of ["n_lamp", "n_bouq", "n_memo", "n_slab", "x_mbox", "x_clock", "p_gears", "candelabra", "lise_down", "i_bottle", "o_flowers", "f_cab", "x_horse", "x_doll"]) spr(k);

// 仮の四角(col)のまま残っていた物を素材に差し替え
const FIX9 = { sheet: "n_memo", vase: "n_bouq", pot: "i_bottle", wt0: "o_flowers", wt1: "o_flowers", wt2: "o_flowers", ghRec: "f_cab", horse: "x_horse", tdoll: "x_doll" };
function fix9() { for (const r in ENTITIES) for (const e of ENTITIES[r]) if (FIX9[e.id] && e.col) { delete e.col; delete e.lbl; e.spr = FIX9[e.id]; } }

// 背景小物(調べられない飾り): 玄関以外の各部屋の仕様書記載素材
const D9 = (r, id, spr, tx, ty, o = {}) => ENTITIES[r].push({ id, spr, tx, ty, ...o });
D9("din", "d_c1", "candelabra", 6, 3); D9("din", "d_c2", "candelabra", 13, 3); D9("din", "d_bq", "n_bouq", 17, 4);   // R02 食堂: キャンドル・花束
D9("par", "d_c1", "candelabra", 7, 2); D9("par", "d_c2", "candelabra", 12, 2);                                       // R03 応接間: 暖炉まわりの灯り
D9("mus", "d_mb", "x_mbox", 15, 8);                                                                                  // R05 音楽室: オルゴール
D9("gh", "d_bq", "n_bouq", 17, 10);                                                                                  // R07 温室: 花束
D9("vault", "d_g", "p_gears", 15, 6, { tw: 3, th: 2 }); D9("vault", "d_l1", "n_lamp", 7, 4); D9("vault", "d_l2", "n_lamp", 12, 10);   // R08 地下: 歯車・ランプ
D9("tow", "d_g", "p_gears", 13, 9, { tw: 3, th: 2 });                                                                // R09 時計塔: 歯車

// 床・壁の飾り(R03 暖炉前の床板 / R09 時計塔の大時計)
const _dd9 = drawDecor;
drawDecor = c => { _dd9(c);
  if (cur === "par") { const s = spr("n_slab"); if (ready(s)) c.drawImage(s, 10 * TS - Math.round(s.naturalWidth / 2), 4 * TS - s.naturalHeight + 4); }
  if (cur === "tow") { const k = spr("x_clock"); if (ready(k)) c.drawImage(k, 10 * TS - Math.round(k.naturalWidth / 2), 2); } };

// R09: 時計が動いたあと、リゼが塔に立つ(案内役・終盤の真相開示)
const _sw9 = window.syncWorld2;
window.syncWorld2 = () => { if (_sw9) _sw9(); fix9();
  if (flags.p9 && !ENTITIES.tow.some(e => e.id === "liseT")) ENTITIES.tow.push({ id: "liseT", spr: "lise", dir: "down", tx: 10, ty: 9 }); };
syncWorld(); fix9(); for (const k in bgs) delete bgs[k];
