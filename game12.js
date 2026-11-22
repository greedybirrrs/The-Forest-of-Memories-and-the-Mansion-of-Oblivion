"use strict";
// ===== 前日譚「忘れられない旋律」解放システム(仕様書 v1.0) =====
// ・通常エンディング4種(BAD/NORMAL/TRUE/SECRET)をすべて閲覧 → 前日譚が解放(初回のみ演出)
// ・前日譚を最後のシーンまで見る → ANOTHER END の追加条件が有効
// ・前日譚は本編のセーブ(yokanSave)に一切触れない独立エピソード。途中で終了したらクリア扱いにしない
//
// 保存(localStorage):
//   yokanEnds   … 既存。エンディング閲覧履歴(["normal","true","bad","secret","another"])。仕様書の seen○○End に相当するため新規には作らない
//   yokanPrequel … 新規。{ unlocked: 解放済み(prequelUnlocked), cleared: クリア済み(prequelCleared) }
//   anotherEndUnlocked は「4種閲覧 かつ cleared」から毎回算出する(重複して保存しない)

// ---------- 保存まわり ----------
const PRE_KEY = "yokanPrequel";
const preGet = () => { try { return JSON.parse(localStorage[PRE_KEY] || "{}") || {}; } catch (e) { return {}; } };
const preSet = o => { try { localStorage[PRE_KEY] = JSON.stringify({ ...preGet(), ...o }); } catch (e) {} };
// 解放に必要な4種(閲覧順は問わない・同じ種類の重複は数えない)。BAD END は本編に2ルートある(bad / bad2)ため、どちらを見ても「BAD END閲覧済み」とする
const ENDS4 = [["bad", "bad2"], ["normal"], ["true"], ["secret"]];
const allFour = () => { const s = seen(); return ENDS4.every(g => g.some(e => s.includes(e))); };
END_CARD.bad2 = END_CARD.bad;   // 別ルートのBAD ENDにもエンディング画面を用意(未定義だと表示時に例外になり、閲覧履歴も保存されなかった)
const anotherOK = () => allFour() && !!preGet().cleared;                  // ANOTHER END: 既存の条件(4種閲覧)+ 前日譚クリア

// ---------- 文章 ----------
// "|"=次のテロップ / "||"=ページ切替(調べるたびに次のページ) / "@h2 "=主人公の顔 / "@g4 "=祖母の顔
Object.assign(I18N.ja.items, { pmap: "洋館の地図" }); Object.assign(I18N.en.items, { pmap: "Map of the mansion" }); ITEM_KEYS.push("pmap");
S3("p_start", "――前日譚「忘れられない旋律」――|夕暮れの部屋。机の上で、祖母から受け継いだオルゴールが、静かに夕日を受けている。|…そういえば、このオルゴールのことを、ちゃんと調べたことがなかった。");
S3("p_box", "祖母から受け継いだ、古いオルゴール。|幼い頃から、ずっと大切にしてきたものだ。|…ふと、底の板が少しずれていることに気づいた。|そっと外すと、折りたたまれた古い紙が出てきた。|森の奥にある、洋館の地図だ。|地図の隅に、小さな印が打たれている。…ここが、その洋館だろうか。|@h3 …おばあちゃんは、このことを知っているのだろうか。|「洋館の地図」を手に入れた。");
S3("p_boxAfter", "オルゴールの底に、洋館の地図が隠されていた。|祖母に、何か知っていないか聞いてみよう。||古いオルゴール。蓋を開けても、今は何も鳴らない。");
S3("p_needMap", "居間へ行く前に、机の上のオルゴールが気になる。|(オルゴールを調べてみよう)");
S3("p_bed", "整えられたままの寝台。|…今夜は、なかなか眠れそうにない。||枕元に、読みかけの本が伏せてある。");
S3("p_shelf", "本棚には、童話集がいくつも並んでいる。|幼い頃、祖母がよく読んでくれたものだ。||背表紙の文字は、少し色褪せている。");
S3("p_fire", "居間の暖炉。|火は小さく揺れて、部屋をほんのりと温めている。||炎を見ていると、不思議と心が落ち着く。");
S3("p_sofa", "使い込まれたソファ。|祖母の編みかけの毛糸が置かれている。||毛糸の玉がひとつ、床に転がっていた。");
S3("p_cab", "古い飾り棚。|小さな写真立てが並んでいる。||どの写真にも、祖母のやさしい笑顔がある。");
S3("p_granNo", "『あら、どうしたの？』|祖母は、編み物の手を止めて微笑んだ。");
S3("p_granSleep", "祖母は、もう眠っているようだ。|(起こさないように、そっとしておこう)");
S3("p_gran1", "オルゴールの底から出てきた地図を、祖母に見せた。|@g2 「あら、どうしたの？」|@h3 「おばあちゃん、このオルゴールのことなんだけど…」|@g5 「……そう。見つけてしまったのね。」|@g5 「それはね、森の奥にある、古い洋館の地図よ。」|@g0 「おばあちゃんね、若い頃に一度だけ、そこへ行ったことがあるの。」|@h2 「おばあちゃんが…？」|@g0 「ええ。とても不思議で、とても…懐かしい場所だった。」|@g5 「でも、そこで何があったのかは、まだ話せないの。ごめんなさいね。」|@h3 「…その洋館に、行ってみたいんだ。」|@g5 「…そう言うと思っていたわ。」|@g0 「止めはしないわ。ただ、ひとつだけ約束してちょうだい。」|@g0 「そのオルゴールを、決して手放さないこと。」|@g4 「あなたが、あなたでいられるように。」|@h1 「…うん。約束する。」|祖母は、やさしく微笑んだ。|その目は、どこか遠くを見ているようだった。");
S3("p_night1", "その夜。|なかなか寝つけずにいると、机のほうから、かすかな音がした。|…オルゴールの音だ。|(机の上のオルゴールを調べてみよう)");
S3("p_nbox", "オルゴールの蓋が、ひとりでにゆっくりと開いた。|♪ ド…|♪ ミ…|♪ ソ…|♪ ド…|旋律は、そこでふっと途切れた。|五つ目の音だけが、どうしても鳴らない。|@h2 …っ。|視界が、青く滲んでいく。");
S3("p_v1", "…気がつくと、見知らぬ場所に立っていた。|薄暗い、古い洋館のホール。|静まり返った空気の中、白い少女がひとり、ぽつんと立っている。");
S3("p_v2a", "少女は、小さく笑った。|その唇が、ゆっくりと動く。");
S3("p_v2b", "…そこで、光が弾けた。|気がつくと、窓の外が白みはじめていた。|机の上のオルゴールは、もう何も語らない。|地図を、そっと握りしめる。");
S3("p_g1", "目的: 机の上のオルゴールを調べてみよう。");
S3("p_g2", "目的: 居間にいる祖母に、地図のことを聞いてみよう。");
S3("p_g3", "目的: 眠れない夜。机の上のオルゴールを調べてみよう。");

// ---------- 画面の切り替え(暗転) ----------
function fadeThen(fn, hold = 500) {
  const v = document.createElement("div");
  v.style.cssText = "position:absolute;inset:0;z-index:5;background:#000;opacity:0;transition:opacity .7s;pointer-events:none";
  $("wrap").insertBefore(v, msgEl2); mode = "wait"; keys.clear();
  requestAnimationFrame(() => requestAnimationFrame(() => { v.style.opacity = 1; }));
  setTimeout(() => { fn(); v.style.opacity = 0; setTimeout(() => v.remove(), 800); }, 700 + hold);
}

// ---------- 前日譚の舞台 ----------
MAPS.pre_room = mk([["C", 6, 5, 13, 10], ["D", 9, 14]]);
MAPS.pre_liv = mk([["C", 6, 5, 13, 10], ["D", 9, 14]]);
MAPS.pre_hall = mk([["C", 9, 2, 10, 13], ["D", 9, 14]]); MAPS.pre_hall[1] = rowWith(20, "P", [4, 15]);
DOORS.pre_room = { "9,14": door("pre_liv", 9, 13, "up", { lock: "pmap", fail: "p_needMap" }) };
DOORS.pre_liv = { "9,14": door("pre_room", 9, 13, "up") };
ENTITIES.pre_room = [
  { id: "p_bed", spr: "f_bed", tx: 2, ty: 4, tw: 2, act: "pBed" },
  { id: "p_shelf", spr: "bookshelf", tx: 15, ty: 2, tw: 2, act: "pShelf" },
  { id: "p_desk", spr: "f_table", tx: 9, ty: 3, tw: 2, act: "pBox", extra: "x_mbox" },   // 机の上のオルゴール(extra を机の上に小さく重ねて描く)
];
ENTITIES.pre_liv = [
  { id: "p_fire", spr: "f_fire", tx: 9, ty: 2, tw: 2, act: "pFire" },
  { id: "p_cab", spr: "f_cab3", tx: 16, ty: 3, act: "pCab" },
  { id: "p_sofa", spr: "f_sofa", tx: 3, ty: 8, tw: 2, act: "pSofa" },
  { id: "p_gran", spr: "gran", dir: "down", tx: 10, ty: 7, act: "pGran" },
];
ENTITIES.pre_hall = [{ id: "p_lise", spr: "lise", dir: "down", tx: 10, ty: 6 }];   // 洋館の少女(見せ場の演出用・調べられない)
ROOM_NAME.ja.pre_room = "自分の部屋"; ROOM_NAME.ja.pre_liv = "居間"; ROOM_NAME.ja.pre_hall = "洋館のホール(幻)";
ROOM_NAME.en.pre_room = "Your Room"; ROOM_NAME.en.pre_liv = "Living Room"; ROOM_NAME.en.pre_hall = "Mansion Hall (Vision)";
for (const k of ["f_bed", "f_table", "f_sofa", "f_fire", "f_cab3", "bookshelf", "gran_down", "lise_down", "x_mbox"]) spr(k);
for (const k in bgs) delete bgs[k];

// 机の上のオルゴール(夜は淡く光る)
const _de12 = drawEntity;
drawEntity = (c, e) => { _de12(c, e);
  if (!e.extra) return;
  const im = spr(e.extra); if (!ready(im)) return;
  const w = Math.round(im.naturalWidth * .62), h = Math.round(im.naturalHeight * .62), cx = Math.round((e.tx + (e.tw || 1) / 2) * TS), foot = (e.ty + (e.th || 1)) * TS;
  if (flags.preNight && !flags.pDone) { const g = c.createRadialGradient(cx, foot - 20, 1, cx, foot - 20, 22 + 3 * Math.sin(Date.now() / 250));
    g.addColorStop(0, "rgba(255,220,140,.55)"); g.addColorStop(1, "rgba(255,220,140,0)"); c.fillStyle = g; c.fillRect(cx - 30, foot - 50, 60, 60); }
  c.drawImage(im, cx - Math.round(w / 2), foot - 13 - h, w, h); };

// 夕方は少し暖かく、夜は青く
const _pd12 = window.postDraw;
window.postDraw = c => { if (_pd12) _pd12(c);
  if (!window.inPrequel || cur === "pre_hall") return;
  c.fillStyle = flags.preNight ? "rgba(10,20,70,.32)" : "rgba(255,170,90,.08)"; c.fillRect(0, 0, W, H); };

// 目的・持ち物メニュー(前日譚の中だけ専用)
const preGoal = () => !flags.pmap ? "p_g1" : !flags.pTalk ? "p_g2" : "p_g3";
const _gk12 = goalKey; goalKey = () => window.inPrequel ? preGoal() : _gk12();
const _oi12 = openItems;
openItems = (i = 0) => { if (!window.inPrequel) return _oi12(i);
  openMenu(tt("m_items"), [{ l: tt("m_goal"), fn: () => { const k = mn.i; detail(L(preGoal()), () => openItems(k)); } },
    { h: 1, l: `${tt("m_hi")}: ${ITEM_KEYS.filter(hasItem).map(k => t().items[k]).join(" / ")}` }, { l: tt("m_back"), fn: pauseMenu }], i); };

// ---------- 前日譚の進行 ----------
const LL = s => F("lise:0", s);
const liseScene = () => [...L("p_v1"),
  LL("…あれ。いま、音が聞こえた気がする。"), LL("懐かしい旋律。…でも、最後の音が足りないの。"), F("hero:3", "…誰…？"),
  LL("誰かが、帰ってくるのかな。"), LL("…おかえりなさい。…なんて、まだ気が早いね。"), ...L("p_v2a"),
  LL("Bienvenue à la maison."), ...L("p_v2b"), F("hero:1", "…行こう。あの洋館へ。")];
function nightBox() {
  flags.pDone = true;
  say(L("p_nbox"), () => { visionUntil = Date.now() + 4000;
    fadeThen(() => { go(door("pre_hall", 9, 12, "up")); say(liseScene(), finishPrequel); }, 900); });
}
function getMap() { flags.pmap = true; updateInv(); say(L("p_box")); }
function nightfall() {
  fadeThen(() => { flags.preNight = true; go(door("pre_room", 9, 12, "up")); say(L("p_night1")); }, 700); }
Object.assign(ACT, {
  pBed: () => say2("p_bed"), pShelf: () => say2("p_shelf"), pFire: () => say2("p_fire"), pSofa: () => say2("p_sofa"), pCab: () => say2("p_cab"),
  pBox: () => flags.preNight && !flags.pDone ? nightBox() : flags.pmap ? say2("p_boxAfter") : getMap(),
  pGran: () => flags.preNight ? say2("p_granSleep") : !flags.pmap ? say2("p_granNo") : flags.pTalk ? say2("p_granSleep") : (flags.pTalk = true, say(L("p_gran1"), nightfall)),
});

// 最後のシーンまで見たときだけクリア扱いにして保存する
function finishPrequel() {
  preSet({ unlocked: true, cleared: true });
  mode = "end"; msgEl2.hidden = true;
  const v = document.createElement("div");
  v.style.cssText = "position:absolute;inset:0;z-index:7;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#b8a77a;text-align:center;padding:0 6%;opacity:0;transition:opacity 1.6s";
  v.innerHTML = `<h1 style="letter-spacing:.25em;font-weight:normal;margin:0;font-size:clamp(16px,3.4cqw,30px)">PREQUEL</h1>` +
    `<h2 style="font-weight:normal;margin:0;letter-spacing:.2em;font-size:clamp(14px,2.6cqw,24px)">忘れられない旋律</h2>` +
    `<p style="margin:0;color:#d8d0c0;font-size:clamp(11px,2cqw,18px);line-height:1.7">旋律は、まだ終わらない。<br>物語は、館の扉へと続いていく。</p>` +
    (allFour() ? `<p style="margin:0;color:#8a8090;font-size:clamp(10px,1.7cqw,15px)">ANOTHER END への道が、開かれた。</p>` : "") +
    `<button style="background:#1a1620;color:#d8d0c0;border:1px solid #5a4e6a;padding:8px 18px;font-size:16px;cursor:pointer">${L("toTitle")[0]}</button>`;
  $("wrap").appendChild(v); v.querySelector("button").onclick = () => location.reload();
  requestAnimationFrame(() => requestAnimationFrame(() => { v.style.opacity = 1; }));
}

function startPrequel() {
  if (!preGet().unlocked) return;
  playerName = $("name").value.trim() || t().defName;
  window.inPrequel = true;
  $("title").hidden = true; $("help").hidden = false;
  cur = "pre_room"; player.x = 9 * TS + 2; player.y = 11 * TS; player.dir = "up"; player.moving = false; keys.clear();
  mode = "play"; updateInv(); say(L("p_start"));
}

// ---------- タイトル画面: 「前日譚」ボタン ----------
const preBtn = document.createElement("button");
preBtn.style.cssText = contBtn.style.cssText + ";height:auto;line-height:1.4;white-space:normal";
howBtn.after(preBtn);
function refreshPre() {
  const un = !!preGet().unlocked;
  preBtn.disabled = !un; preBtn.style.opacity = un ? "1" : ".45"; preBtn.style.cursor = un ? "pointer" : "not-allowed";
  preBtn.innerHTML = un ? "前日譚を見る<br>「忘れられない旋律」" : "前日譚　？？？（未解放）";
  anoBtn.hidden = !anotherOK();   // ANOTHER END は 4種閲覧+前日譚クリアのときだけ
  const sn = seen();   // タイトルの閲覧済み表示(BADは2ルートのどちらでも✓。ANOTHERは自身の閲覧履歴で判定)
  endsEl.textContent = [["NORMAL", ["normal"]], ["TRUE", ["true"]], ["BAD", ["bad", "bad2"]], ["SECRET", ["secret"]], ["ANOTHER", ["another"]]]
    .map(([n, g]) => `${n} ${g.some(e => sn.includes(e)) ? "✓" : "?"}`).join("   ");
}
preBtn.onclick = startPrequel;
const _ano12 = anoBtn.onclick; anoBtn.onclick = () => { if (anotherOK()) _ano12(); };

// ---------- 解放演出(初回のみ) ----------
function showUnlock() {
  const v = document.createElement("div");
  v.style.cssText = "position:absolute;inset:0;z-index:20;background:#000;opacity:0;transition:opacity 1.2s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(8px,2cqw,18px);color:#d8d0c0;text-align:center;cursor:pointer;padding:0 6%";
  const mk2 = (html, css) => { const d = document.createElement("div"); d.style.cssText = "opacity:0;transition:opacity 1.4s;" + css; d.innerHTML = html; v.appendChild(d); return d; };
  const img = mk2(`<img src="assets/obj/x_mbox.png" alt="" style="width:clamp(70px,16cqw,130px);image-rendering:pixelated;filter:drop-shadow(0 0 16px rgba(255,210,120,.6))">`, "");
  const a = mk2("NEW STORY", "letter-spacing:.4em;color:#b8a77a;font-size:clamp(14px,2.6cqw,24px)");
  const b = mk2("新しい物語が解放されました", "font-size:clamp(12px,2cqw,18px);color:#a89fb0");
  const c = mk2("忘れられない旋律", "letter-spacing:.3em;font-size:clamp(20px,4.4cqw,40px);color:#e8d9a8");
  const d = mk2("すべての記憶を辿ったあなたへ。", "font-style:italic;font-size:clamp(11px,1.9cqw,17px);color:#8a8090;margin-top:6px");
  $("wrap").appendChild(v);
  let closed = false, ready2 = false;
  const close = () => { if (closed) return; closed = true; v.style.opacity = 0; refreshPre(); setTimeout(() => { v.remove(); removeEventListener("keydown", onKey, true); }, 1300); };
  const onKey = e => { if (["Enter", " ", "z", "Escape"].includes(e.key)) { e.preventDefault(); e.stopImmediatePropagation(); if (ready2) close(); } };
  addEventListener("keydown", onKey, true); v.onclick = () => { if (ready2) close(); };
  requestAnimationFrame(() => requestAnimationFrame(() => { v.style.opacity = 1; }));      // 一度暗転
  [[img, 1300], [a, 2300], [b, 3000], [c, 4000], [d, 5600]].forEach(([el, ms]) => setTimeout(() => { el.style.opacity = 1; }, ms));
  setTimeout(() => { ready2 = true; }, 3500); setTimeout(close, 9500);
}

// 4種そろっていて、まだ解放していなければ、タイトルに戻った(起動した)ときに1回だけ演出して解放状態を保存する
refreshPre();
if (allFour() && !preGet().unlocked) { preSet({ unlocked: true }); setTimeout(showUnlock, 400); }
