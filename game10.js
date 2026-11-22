"use strict";
// ===== 会話の顔+名前表示 / 右上の部屋名 / 上部の小さな表示の整理 =====
// ・セリフの左に顔、その上に名前を表示(主人公・祖母・NPC)
// ・今いる部屋の名前を右上に大きく表示
// ・左上の持ち物・右上の操作説明は、メニューを開いている間だけ表示

// ---- 話者の名前 ----
const SPK_NAME = {
  ja: { gran: "おばあちゃん", lise: "リゼ", sebas: "セバスチャン", marth: "マーサ", noahs: "ノア", clara: "クララ", albert: "アルベルト", edgar: "エドガー", elea: "エレノア" },
  en: { gran: "Grandma", lise: "Lise", sebas: "Sebastian", marth: "Martha", noahs: "Noah", clara: "Clara", albert: "Albert", edgar: "Edgar", elea: "Eleanor" },
};
const spkName = faceId => { const who = String(faceId).split(":")[0]; return who === "hero" ? playerName : (SPK_NAME[lang] || SPK_NAME.ja)[who] || ""; };

// 調べた相手(エンティティID) -> 顔の人物
const SPEAKER_OF = { lise: "lise", liseG: "lise", liseT: "lise", seb: "sebas", mar: "marth", noah: "noahs" };

// 回想・終盤など、話しかけ以外で出てくるセリフ(行の文章 -> 話者)。話者が確実な行だけ登録。
const LINE_SPK = {};
const _reg = (who, arr) => arr.forEach(t => { LINE_SPK["『" + t + "』"] = who; });
_reg("lise", ["その曲……知ってる。", "クララが、よく弾いていた曲だよ。", "ありがとう。昔も、誰かがこうして手伝ってくれた気がする。", "……そうなんだ。", "じゃあ、私は誰なんだろうね。",
  "やっと、ここまで来たんだね。", "ねえ。お願いがあるの。", "私のこと、最後まで見ていて。", "またね。", "ねえ。私のこと、覚えていてくれる？", "私は、クララが忘れたくなかったものなんだね。",
  "おばあちゃん、元気？", "そっか。あなたのおばあちゃんは、ちゃんと帰れたんだね。", "ねえ、最後にひとつだけお願いしてもいい？", "ここを出たら、外の世界のことを教えてね。"]);
_reg("albert", ["父さん、保存の期間を延ばさせてください。", "それでも。もう誰も、失いたくないんです。"]);
_reg("edgar", ["…これ以上は、装置が持たん。"]);
_reg("noahs", ["母さん、どうして泣いているの？", "じゃあ、僕も母さんのこと、忘れないよ。", "僕のこと、忘れないでね。"]);
_reg("clara", ["…泣いてないわ。大丈夫。", "あなたのことを、ずっと覚えていたいだけ。", "お願い。私のことを忘れないで。", "お願い。あの子を忘れないで。"]);
_reg("marth", ["最後に、みんなで食卓を囲めてよかったわ。"]);
let curSpeaker = null;
// 回想の中の声など、話しかけた相手本人のセリフではない行(顔をつけない)
const NO_FACE = new Set(["『あなたがいてくれて、よかった。』", "『私、この温室が好き。あなたと一緒だから。』"]);
const _talk10 = talk;
talk = e => { curSpeaker = SPEAKER_OF[e.id] || null; return _talk10(e); };
// 話しかけたあと、プレイヤーが動き出したら話者をリセット
const _update10 = update;
update = () => { if (mode === "play" && keys.size) curSpeaker = null; return _update10(); };

// 話者がいるときは、セリフ(『』「」)の行に顔をつける。地の文には顔をつけない。
const _say10 = say;
say = (lines, cb, face) => {
  if (!face && Array.isArray(lines))
    lines = lines.map(l => typeof l !== "string" ? l : LINE_SPK[l] ? F(LINE_SPK[l] + ":0", l)
      : curSpeaker && /^[『「]/.test(l) && !NO_FACE.has(l) ? F(curSpeaker + ":0", l) : l);
  return _say10(lines, cb, face);
};

// ---- 名札つきのメッセージ表示 ----
const spkEl = document.createElement("div"); spkEl.id = "spkname"; spkEl.hidden = true; msgEl.appendChild(spkEl);
nextMsg = () => {
  if (msgQueue.length === 0) {
    msgEl.hidden = true; spkEl.hidden = true; mode = "play";
    const cb = afterMsg; afterMsg = null; if (cb) cb();
    return;
  }
  const line = msgQueue.shift(), isObj = typeof line === "object";
  msgText.textContent = isObj ? line.t : line;
  faceEl.hidden = !isObj; if (isObj) faceEl.src = faceSrc(line.f);
  const nm = isObj ? spkName(line.f) : "";
  spkEl.textContent = nm; spkEl.hidden = !nm;
  msgEl.hidden = false;
};
const _drawCh10 = drawCh;
drawCh = () => { _drawCh10(); spkEl.hidden = true; };

// ---- 部屋の名前 ----
const ROOM_NAME = {
  ja: { room1: "玄関ホール", din: "食堂", par: "応接間", kit: "厨房", f2: "二階の廊下", kid: "子供部屋", mus: "音楽室", gst: "客室", f3: "三階の廊下",
        stu: "書斎", lib3: "図書室", prt: "肖像画の間", yard: "中庭", gh: "温室", tow: "時計塔", vault: "地下・記憶保管庫", adm: "地下・管理室", rec: "地下・記録室" },
  en: { room1: "Entrance Hall", din: "Dining Room", par: "Drawing Room", kit: "Kitchen", f2: "2F Hallway", kid: "Nursery", mus: "Music Room", gst: "Guest Room", f3: "3F Hallway",
        stu: "Study", lib3: "Library", prt: "Portrait Room", yard: "Courtyard", gh: "Greenhouse", tow: "Clock Tower", vault: "Memory Vault", adm: "Control Room", rec: "Records Room" },
};
const roomEl = document.createElement("div"); roomEl.id = "roomname"; roomEl.hidden = true; $("wrap").appendChild(roomEl);

// ---- 毎フレームの表示切り替え ----
const _pd10 = window.postDraw;
window.postDraw = c => {
  if (_pd10) _pd10(c);
  const playing = mode === "play" || mode === "msg" || mode === "choice";
  const nm = (ROOM_NAME[lang] || ROOM_NAME.ja)[cur] || "";
  if (roomEl.textContent !== nm) roomEl.textContent = nm;
  roomEl.hidden = !(playing && nm);
  const inMenu = mode === "menu";                  // 小さな表示はメニュー中だけ
  $("inv").hidden = !inMenu; $("help").hidden = !inMenu;
};

// ---- 食堂の飾り(燭台・花束)を調べるとテロップが出る ----
S3("n_dCandle", "燭台の炎は、ゆらりとも揺れない。|蝋は少しも減っていない。ずっと昔から、同じ長さのまま燃え続けているようだ。||食卓を照らす灯りだけが、家族を待っている。");
S3("n_dBouq", "食卓の端に飾られた花束。|青いリボンが、色褪せないまま結ばれている。||花びらは枯れることなく、時を止めている。");
ACT.dCandle = () => say2("n_dCandle");
ACT.dBouq = () => say2("n_dBouq");
const DIN_ACT = { d_c1: "dCandle", d_c2: "dCandle", d_bq: "dBouq" };
const setDinAct = () => { for (const e of ENTITIES.din || []) if (DIN_ACT[e.id]) e.act = DIN_ACT[e.id]; };
setDinAct();
const _sw10 = window.syncWorld2; window.syncWorld2 = () => { if (_sw10) _sw10(); setDinAct(); };
