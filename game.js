"use strict";
// ===== 設定 =====
let hero = "boy";              // 主人公の見た目。タイトル画面で選択("boy" / "girl")
const TS = 16;                 // タイルサイズ(論理px)
const W = 320, H = 240;        // 論理解像度(20x15タイル)
let SPEED = 2;               // 1フレームの移動量(設定メニューで 1=ゆっくり / 2=ふつう / 3=はやい)

// ===== 多言語 =====
// 各項目は「メッセージの並び」の配列。調べるたびに順番に切り替わる
const I18N = {
  ja: {
    hero: "主人公", title: "記憶の森と忘却の館", name: "なまえ", start: "はじめる", defName: "あなた",
    help: "移動: 矢印 / WASD    調べる: Z・Space・Enter    目的: X",
    invLabel: "所持品: ", items: { box: "オルゴール", key: "小さな鍵" },
    unlock: ["小さな鍵を差し込むと、扉がゆっくりと開いた。"],
    keyGet: ["人形の手の中に、小さな鍵が握られていた。", "「小さな鍵」を手に入れた。"],
    dollDone: ["人形はもう何も持っていない。"],
    R: [["台の上に、白い小さな鳥の置物。", "片方の翼が、少しだけ開いている。"]],
    hallTop: ["扉には、鳥の形のくぼみがある。今は開かないようだ。"],
    intro: n => [
      `祖母の形見のオルゴールに導かれて、${n}は古い洋館の前にたどり着いた。`,
      "重い扉を押し開けると、静かな空気がゆっくりと流れ出した。",
      "背後で、扉が静かに閉まった。",
    ],
    introGran: "オルゴールを握ると、祖母のやさしい笑顔が浮かんだ。",
    box: [["祖母から受け継いだ、古いオルゴール。", "幼い頃から、ずっと大切にしてきたものだ。"]],
    I: [["壁に、文字が刻まれている。", "Bienvenue à la maison", "読めない言葉のはずなのに、なぜか目が離せない。"]],
    K: [["古い柱時計。針は止まったままだ。", "いつから止まっているのだろう。", "…短針は、部屋の隅の人形を指しているようだ。"]],
    M: [["曇った鏡。映っているのは、自分と部屋だけのはずだ。", "…一瞬、鏡の中の部屋が少し明るく見えた気がした。"]],
    O: [["椅子に座った古い人形。こちらを向いている。", "さっきは、違う向きだった気がする。"]],
    P: [["古い肖像画。赤いドレスの少女が、静かにこちらを見ている。"]],
    B: [["埃をかぶった本棚。背表紙の文字はかすれて読めない。"], ["童話集のようだ。ページのあいだに、色あせた押し花が挟まっている。"]],
    T: [["湯気の消えた紅茶が、ひとり分だけ置かれている。"]],
    C: [["燭台の火は、静かに揺れている。", "風はないのに、ときどきこちらへなびく。"]],
    D: [["扉には鍵がかかっている。"]],
  },
  en: {
    hero: "Character", title: "Mansion Escape RPG", name: "Name", start: "Start", defName: "You",
    help: "Move: Arrows / WASD    Interact: Z / Space / Enter    Hint: X",
    invLabel: "Items: ", items: { box: "Music box", key: "Small key" },
    unlock: ["The small key turned, and the door slowly opened."],
    keyGet: ["A small key was clutched in the doll's hand.", "Got the \"Small key\"."],
    dollDone: ["The doll holds nothing now."],
    R: [["A small white bird ornament on a stand.", "One of its wings is slightly open."]],
    hallTop: ["The door has a bird-shaped hollow. It won't open for now."],
    intro: n => [
      `Guided by the music box left by their grandmother, ${n} reached an old mansion.`,
      "The heavy door gave way, and still air drifted slowly out.",
      "Behind them, the door closed softly.",
    ],
    introGran: "Holding the music box, Grandmother's gentle smile came to mind.",
    box: [["The old music box inherited from Grandmother.", "It has been precious to you since childhood."]],
    I: [["Words are carved into the wall.", "Bienvenue à la maison", "You can't read them, yet you can't look away."]],
    K: [["An old grandfather clock. Its hands have stopped.", "How long has it been like this?", "...The short hand points at the doll in the corner."]],
    M: [["A clouded mirror. It should show only you and the room.", "...For a moment, the room in the mirror seemed a little brighter."]],
    O: [["An old doll on a chair, facing you.", "It was facing another way a moment ago, wasn't it?"]],
    P: [["An old portrait. A girl in a red dress gazes quietly at you."]],
    B: [["A dusty bookshelf. The titles are too faded to read."], ["Fairy tales, it seems. A faded pressed flower is tucked between the pages."]],
    T: [["A single cup of tea, no longer steaming."]],
    C: [["The candle flames waver quietly.", "There is no wind, yet they sometimes lean toward you."]],
    D: [["The door is locked."]],
  },
};
let lang = "ja", playerName = "";
const t = () => I18N[lang];

// ===== マップ (# 壁, . 床, C カーペット, B 本棚, T テーブル, P 肖像画, D 扉, I 碑文, K 時計, M 鏡, O 人形) =====
const MAPS = {
  room1: [
    "####################",
    "####P##M#IK####P####",
    "#..................#",
    "#.............TT...#",
    "#..................#",
    "#...CCCCCCCCCC.....#",
    "#...CCCCCCCCCC.....#",
    "#...CCCCCCCCCC.....#",
    "#..................#",
    "#..T...............#",
    "#..................#",
    "#..................#",
    "#..................#",
    "#..................#",
    "########D###########",
  ],
  hall: [
    "####################",
    "###P######D#####P###",
    "#........CC........#",
    "#........CC........#",
    "#........CC........#",
    "#..R.....CC........#",
    "#........CC........#",
    "#........CC........#",
    "#........CC........#",
    "#........CC........#",
    "#..TT....CC........#",
    "#........CC........#",
    "#........CC........#",
    "#........CC........#",
    "#########D##########",
  ],
};
let cur = "room1";
// 扉: "x,y" -> 移動先(needKey: 鍵が必要 / msg: 移動せずメッセージだけ)
const DOORS = {
  room1: { "8,14": { to: "hall", sx: 9 * TS + 2, sy: 13 * TS, dir: "up", needKey: true } },
  hall: {
    "9,14": { to: "room1", sx: 8 * TS + 2, sy: 13 * TS, dir: "up" },
    "10,1": { msg: "hallTop" },
  },
};
// ===== スプライト素材(assets/obj/) =====
const IMG = {};
function spr(name) { if (!IMG[name]) { const i = new Image(); i.src = `assets/obj/${name}.png`; IMG[name] = i; } return IMG[name]; }
const ready = i => i.complete && i.naturalWidth > 0;

// 置物・人物の配置(部屋ごと)。足元のタイル(tx,ty)と占有タイル数(tw,th)で置く。
//   spr : assets/obj/ の素材名。人物は dir(down/left/up/right)を付けると spr_down などを自動で選ぶ
//   msg : 調べたとき I18N から読むメッセージの名前
// 使える素材: maid butler doll witch hatgirl(人物) / cat(猫) / bunny teddy knight ghost
//             candelabra candle bookshelf piano portrait mirror flame_a flame_b
// 人物の例: { id: "maid", spr: "maid", dir: "left", tx: 5, ty: 6, msg: "maid" }
const ENTITIES = {
  room1: [
    { id: "shelf1", spr: "bookshelf", tx: 2, ty: 3, tw: 2, msg: "B" },
    { id: "shelf2", spr: "bookshelf", tx: 10, ty: 11, tw: 2, msg: "B" },
    { id: "doll", spr: "doll", dir: "down", tx: 15, ty: 9, msg: "O" },
  ],
  hall: [
    { id: "shelf3", spr: "bookshelf", tx: 16, ty: 7, tw: 2, msg: "B" },
    { id: "candle1", spr: "candelabra", tx: 8, ty: 2, msg: "C" },
    { id: "candle2", spr: "candelabra", tx: 11, ty: 2, msg: "C" },
  ],
};
const DECOR = { P: "portrait", M: "mirror" };   // 壁のタイルの上に重ねて描く素材
const rectOf = e => ({ x: e.tx * TS, y: e.ty * TS, w: (e.tw || 1) * TS, h: (e.th || 1) * TS });

const flags = { clock: false, key: false, unlocked: false };
const SOLID = new Set(["#", "B", "T", "P", "D", "I", "K", "M", "R"]);
const tileAt = (tx, ty) => (MAPS[cur][ty] && MAPS[cur][ty][tx]) || "#";

// ===== ドット絵タイル(コードで描画。後で画像素材に差し替え可能) =====
function rect(c, col, x, y, w, h) { c.fillStyle = col; c.fillRect(x, y, w, h); }
const DRAW = {
  ".": (c, x, y) => { rect(c, "#2b2430", x, y, TS, TS); rect(c, "#332b39", x, y, TS, 1); rect(c, "#332b39", x, y, 1, TS); },
  C: (c, x, y) => { rect(c, "#5a1f2b", x, y, TS, TS); rect(c, "#7a2f3b", x + 2, y + 2, TS - 4, 1); rect(c, "#7a2f3b", x + 2, y + TS - 3, TS - 4, 1); },
  "#": (c, x, y) => { rect(c, "#3a3046", x, y, TS, TS); rect(c, "#4a3f58", x, y, TS, 2); rect(c, "#2a2234", x, y + TS - 2, TS, 2); },
  B: (c, x, y) => { DRAW["."](c, x, y); rect(c, "#4a2e1c", x, y, TS, TS); const cols = ["#8a3b3b", "#3b5a8a", "#b8a77a", "#4f7a4f"];
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) rect(c, cols[(i + r) % 4], x + 1 + i * 4, y + 2 + r * 7, 3, 5); },
  T: (c, x, y) => { DRAW["."](c, x, y); rect(c, "#6b4a2a", x, y + 3, TS, 9); rect(c, "#8a6238", x, y + 3, TS, 2); rect(c, "#3b2814", x + 1, y + 12, 2, 4); rect(c, "#3b2814", x + TS - 3, y + 12, 2, 4); },
  P: (c, x, y) => DRAW["#"](c, x, y),
  D: (c, x, y) => { DRAW["#"](c, x, y); rect(c, "#5a3a1e", x + 2, y, 12, TS); rect(c, "#3b2814", x + 2, y, 12, 2); rect(c, "#b8a77a", x + 11, y + 8, 2, 2); },
  R: (c, x, y) => { DRAW["."](c, x, y); rect(c, "#4a2e1c", x + 4, y + 9, 8, 6); rect(c, "#e8e0d0", x + 5, y + 3, 6, 6);
    rect(c, "#f4efe4", x + 3, y + 5, 3, 3); rect(c, "#000", x + 9, y + 4, 1, 1); rect(c, "#c8a050", x + 11, y + 5, 2, 1); },
  I: (c, x, y) => { DRAW["#"](c, x, y); rect(c, "#b8a77a", x + 1, y + 3, 14, 10); rect(c, "#2a2234", x + 2, y + 4, 12, 8);
    for (let i = 0; i < 4; i++) rect(c, "#b8a77a", x + 3 + i * 3, y + 6, 2, 1), rect(c, "#b8a77a", x + 3 + i * 3, y + 9, 2, 1); },
  K: (c, x, y) => { DRAW["#"](c, x, y); rect(c, "#4a2e1c", x + 3, y, 10, TS); rect(c, "#d8d0c0", x + 5, y + 2, 6, 6);
    rect(c, "#000", x + 8, y + 3, 1, 3); rect(c, "#000", x + 8, y + 5, 2, 1); rect(c, "#8a6238", x + 6, y + 10, 4, 5); },
  M: (c, x, y) => DRAW["#"](c, x, y),
  O: (c, x, y) => { DRAW["."](c, x, y); rect(c, "#4a2e1c", x + 2, y + 6, 12, 8); rect(c, "#d8c8e0", x + 5, y + 6, 6, 6);
    rect(c, "#e8d8c0", x + 5, y + 1, 6, 5); rect(c, "#000", x + 6, y + 3, 1, 1); rect(c, "#000", x + 9, y + 3, 1, 1); rect(c, "#7a2f3b", x + 5, y, 6, 1); },
};
// 背景を1枚に焼き込んでおく(毎フレームの描画を軽くする)
const bgs = {};
function getBg(name) {
  if (bgs[name]) return bgs[name];
  const cv2 = document.createElement("canvas"); cv2.width = W; cv2.height = H;
  const c = cv2.getContext("2d");
  MAPS[name].forEach((row, ty) => [...row].forEach((ch, tx) => DRAW[ch](c, tx * TS, ty * TS)));
  return (bgs[name] = cv2);
}

// ===== 画像 =====
const heroImg = new Image(); heroImg.src = `assets/hero_${hero}.png`;   // 4列(下・左・上・右) x 2行(立ち・歩き)
const faceSrc = id => { const [who, n] = id.split(":"); return `assets/${who === "hero" ? hero : who}_face_${n}.png`; };

// ===== 主人公 =====
const player = { x: 9 * TS + 2, y: 12 * TS, w: 12, h: 12, dir: "down", step: 0, moving: false };
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

function blocked(x, y, w, h) {
  for (const [px, py] of [[x, y], [x + w - 1, y], [x, y + h - 1], [x + w - 1, y + h - 1]])
    if (SOLID.has(tileAt(Math.floor(px / TS), Math.floor(py / TS)))) return true;
  for (const e of ENTITIES[cur] || []) {
    const r = rectOf(e);
    if (x < r.x + r.w && x + w > r.x && y < r.y + r.h && y + h > r.y) return true;
  }
  return false;
}
function drawEntity(c, e) {
  const rt = e.dir === "right" && ready(spr(`${e.spr}_right`));   // 右向きの専用画像があればそれを使う(なければ左向きを反転)
  const im = spr(e.dir ? `${e.spr}_${e.dir === "right" ? (rt ? "right" : "left") : e.dir}` : e.spr);
  if (!ready(im)) return;
  const w = im.naturalWidth, h = im.naturalHeight, cx = Math.round((e.tx + (e.tw || 1) / 2) * TS), y = (e.ty + (e.th || 1)) * TS - h;
  if (e.dir === "right" && !rt) { c.save(); c.translate(cx, y); c.scale(-1, 1); c.drawImage(im, -Math.round(w / 2), 0); c.restore(); }   // 右向きは左向きを反転
  else c.drawImage(im, cx - Math.round(w / 2), y);
}
function drawDecor(c) {
  MAPS[cur].forEach((row, ty) => [...row].forEach((ch, tx) => {
    const im = DECOR[ch] && spr(DECOR[ch]); if (!im || !ready(im)) return;
    c.drawImage(im, tx * TS + Math.round((TS - im.naturalWidth) / 2), (ty + 1) * TS - im.naturalHeight - 2);
  }));
}
const DIR_COL = { down: 0, left: 1, up: 2, right: 3 };
function drawPlayer(c) {
  if (!(heroImg.complete && heroImg.naturalWidth > 0)) return drawPlayerFallback(c);
  const cw = heroImg.naturalWidth / 4, ch = heroImg.naturalHeight / 2;
  const row = player.moving && Math.floor(player.step / 8) % 2 ? 1 : 0;   // 歩きは立ち絵と交互に
  rect(c, "rgba(0,0,0,.4)", Math.round(player.x + 1), Math.round(player.y + player.h - 1), 10, 2);   // 影
  c.drawImage(heroImg, DIR_COL[player.dir] * cw, row * ch, cw, ch,
    Math.round(player.x + player.w / 2 - cw / 2), Math.round(player.y + player.h + 1 - ch), cw, ch);
}
function drawPlayerFallback(c) {
  const { x, y, dir } = player, f = Math.floor(player.step / 8) % 2;
  rect(c, "#000", x, y + 12, 12, 2);                       // 影
  rect(c, "#2f4f7a", x + 2, y + 5, 8, 7);                   // 服
  rect(c, "#e8c9a0", x + 2, y, 8, 6);                       // 顔
  rect(c, "#3b2a1c", x + 2, y - 1, 8, dir === "up" ? 6 : 2); // 髪
  if (dir !== "up") { rect(c, "#000", x + 4, y + 3, 1, 2); rect(c, "#000", x + 7, y + 3, 1, 2); }
  rect(c, "#1c1c28", x + 2 + f, y + 11, 3, 2); rect(c, "#1c1c28", x + 7 - f, y + 11, 3, 2); // 足
}

// ===== 入力 =====
const keys = new Set();
const KEYMAP = { ArrowUp: "up", w: "up", ArrowDown: "down", s: "down", ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right" };
let mode = "title", msgQueue = [], counters = {};

addEventListener("keydown", e => {
  if (mode === "title") return;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (mode === "choice" && ["ArrowUp","w","ArrowDown","s"].includes(k)) chMove(k === "ArrowUp" || k === "w" ? -1 : 1);
  if (KEYMAP[k]) { keys.add(KEYMAP[k]); e.preventDefault(); }
  if (["z", " ", "Enter"].includes(k) && !e.repeat) { e.preventDefault(); onAction(); }
  if (k === "x" && !e.repeat && mode === "play") showStatus();
});
addEventListener("keyup", e => {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (KEYMAP[k]) keys.delete(KEYMAP[k]);
});

// ===== メッセージ =====
const msgEl = document.getElementById("msg"), msgText = document.getElementById("msgtext"), faceEl = document.getElementById("face");
const F = (id, text) => ({ f: id, t: text });          // 顔つきの1行
let afterMsg = null;
function say(lines, cb, face) { msgQueue = lines.map(l => typeof l === "string" && face ? F(face, l) : l); afterMsg = cb || null; mode = "msg"; keys.clear(); nextMsg(); }
function nextMsg() {
  if (msgQueue.length === 0) {
    msgEl.hidden = true; mode = "play";
    const cb = afterMsg; afterMsg = null; if (cb) cb();
    return;
  }
  const line = msgQueue.shift(), isObj = typeof line === "object";
  msgText.textContent = isObj ? line.t : line;
  faceEl.hidden = !isObj; if (isObj) faceEl.src = faceSrc(line.f);
  msgEl.hidden = false;
}
const FACE = { I: "hero:3", K: "hero:3", M: "hero:2", O: "hero:5" };   // 碑文・時計: ? / 鏡: ! / 人形: 汗
function onAction() {
  if (mode === "choice") return pickChoice();
  if (mode === "msg") return nextMsg();
  if (mode !== "play") return;
  // 向いている方向の先のタイルを調べる
  const [dx, dy] = DIRS[player.dir];
  const cx = player.x + player.w / 2 + dx * 10, cy = player.y + player.h / 2 + dy * 10;
  const tx = Math.floor(cx / TS), ty = Math.floor(cy / TS), ch = tileAt(tx, ty);
  const ent = (ENTITIES[cur] || []).find(e => { const r = rectOf(e); return cx >= r.x && cx < r.x + r.w && cy >= r.y && cy < r.y + r.h; });
  if (ent) return talk(ent);
  if (ch === "D") return useDoor(tx, ty);
  if (window.tileAct && tileAct(cur, tx, ty)) return;
  if (ch === "K") { flags.clock = true; turnDoll(); }      // 時計を見ると、人形がこちらへ向きを変える
  if (t()[ch] && SOLID.has(ch)) {
    const list = t()[ch]; counters[ch] = (counters[ch] || 0);
    say(list[counters[ch] % list.length], null, FACE[ch]); counters[ch]++;
  }
}
function turnDoll() { const d = ENTITIES.room1.find(e => e.id === "doll"); if (d) d.dir = "left"; }
function talk(e) {
  if (e.id === "doll" && flags.clock) {                     // 時計を見たあと人形を調べると鍵
    if (!flags.key) { flags.key = true; updateInv(); return say(t().keyGet, null, "hero:1"); }
    return say(t().dollDone);
  }
  const list = t()[e.msg]; if (!list) return;
  counters[e.msg] = counters[e.msg] || 0;
  say(list[counters[e.msg] % list.length], null, FACE[e.msg]); counters[e.msg]++;
}
function useDoor(tx, ty) {
  const d = (DOORS[cur] || {})[tx + "," + ty];
  if (!d) return say(t().D[0]);
  if (d.msg) return say(t()[d.msg]);
  if (d.needKey && !flags.key) return say(t().D[0]);
  if (d.needKey && !flags.unlocked) { flags.unlocked = true; return say(t().unlock, () => go(d)); }
  go(d);
}
function go(d) { cur = d.to; player.x = d.sx; player.y = d.sy; player.dir = d.dir; keys.clear(); }
function updateInv() {
  const names = ["box", ...(flags.key ? ["key"] : [])].map(k => t().items[k]);
  document.getElementById("inv").textContent = t().invLabel + names.join(" / ");
}

// ===== 更新・描画 =====
const cv = document.getElementById("screen"), ctx = cv.getContext("2d");
ctx.imageSmoothingEnabled = false;

function update() {
  if (mode !== "play") return;
  let dx = 0, dy = 0;
  for (const d of keys) { dx += DIRS[d][0]; dy += DIRS[d][1]; player.dir = d; }
  player.moving = !!(dx || dy);
  if (!dx && !dy) return;
  const len = Math.hypot(dx, dy) || 1;
  const mx = (dx / len) * SPEED, my = (dy / len) * SPEED;
  // 軸ごとに判定(壁沿いにスライドできる)
  if (!blocked(player.x + mx, player.y, player.w, player.h)) player.x += mx;
  if (!blocked(player.x, player.y + my, player.w, player.h)) player.y += my;
  player.step++;
}
function draw() {
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(getBg(cur), 0, 0);
  drawDecor(ctx);
  const items = (ENTITIES[cur] || []).map(e => ({ y: (e.ty + (e.th || 1)) * TS, draw: c => drawEntity(c, e) }));
  items.push({ y: player.y + player.h, draw: drawPlayer });       // 足元が下にあるものほど手前に描く
  items.sort((a, b) => a.y - b.y).forEach(it => it.draw(ctx));
  // 不気味な暗がり(主人公の周りだけ明るい)
  const g = ctx.createRadialGradient(player.x + 6, player.y + 6, 30, player.x + 6, player.y + 6, 150);
  g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.88)");
  if (!window.darkOff) { ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  if (window.postDraw) postDraw(ctx);
}
function loop() { update(); draw(); requestAnimationFrame(loop); }

// ===== タイトル画面 =====
const $ = id => document.getElementById(id);
function applyLang() {
  document.documentElement.lang = lang;
  $("t-title").textContent = t().title; $("t-hero").textContent = t().hero; $("t-label").textContent = t().name;
  $("start").textContent = t().start; $("help").textContent = t().help; updateInv();
  $("name").placeholder = t().defName; document.title = t().title;
  $("lang-ja").classList.toggle("on", lang === "ja"); $("lang-en").classList.toggle("on", lang === "en");
}
$("lang-ja").onclick = () => { lang = "ja"; applyLang(); };
$("lang-en").onclick = () => { lang = "en"; applyLang(); };
$("start").onclick = () => {
  playerName = $("name").value.trim() || t().defName;
  $("title").hidden = true; $("help").hidden = false;
  mode = "play"; $("inv").hidden = false;
  const [a, b, c] = t().intro(playerName);
  say([a, F("gran:0", t().introGran), b, F("hero:2", c)]);
};
function setHero(h) {
  hero = h; heroImg.src = `assets/hero_${h}.png`;
  $("hero-boy").classList.toggle("on", h === "boy"); $("hero-girl").classList.toggle("on", h === "girl");
}
$("hero-boy").onclick = () => setHero("boy"); $("hero-girl").onclick = () => setHero("girl");
applyLang(); loop();
