"use strict";
// ===== 全体版の追加分(部屋・アイテム・謎・4つのエンディング) =====
// 謎やギミックを直したい時は ACT(各調べる処理)と DOORS を編集する。文章は S(...) にまとめてある。
const TX = { ja: {}, en: {} }, cnt = {};
const S = (k, j, e) => { TX.ja[k] = j.split("||").map(p => p.split("|")); TX.en[k] = e.split("||").map(p => p.split("|")); };
const parse = s => { s = s.replace(/\{n\}/g, playerName).replace(/\{c\}/g, flags.mc); const m = s.match(/^@([hg])(\d) (.*)$/); return m ? F((m[1] === "h" ? "hero" : "gran") + ":" + m[2], m[3]) : s; };
const L = (k, i = 0) => TX[lang][k][i].map(parse);
const say2 = (k, cb) => { const p = TX[lang][k], i = (cnt[k] = (cnt[k] || 0) + 1) - 1; say(p[i % p.length].map(parse), cb); };
Object.assign(flags, { mc: 0 });
Object.assign(I18N.ja.items, { bird: "白い鳥の置物", ted: "くま", bun: "うさぎ", bell: "小さな鈴", fkey: "玄関の鍵" });
Object.assign(I18N.en.items, { bird: "White bird", ted: "Teddy", bun: "Bunny", bell: "Small bell", fkey: "Front door key" });
I18N.ja.intro = n => [`祖母のオルゴールの底に隠された古い地図に導かれ、${n}は洋館の前にたどり着いた。`, "重い扉を押し開けると、静かな空気がゆっくりと流れ出した。", "背後で、扉が静かに閉まった。"];
I18N.en.intro = n => [`Guided by a hidden map in Grandmother's music box, ${n} reached an old mansion.`, "The heavy door gave way, and still air drifted slowly out.", "Behind them, the door closed softly."];

// ---- 文章 (日本語 | English)  "|"=改行 "||"=ページ切替 "@h2 "=主人公の顔 "@g4 "=祖母の顔 ----
S("memoGot", "「記録」を手に入れた。({c}/5)", "Got a \"Record\". ({c}/5)");
S("memoDone", "もう読んだ記録だ。", "You've read this already.");
S("memo1", "古い日記の一頁。|『この館は、わたしたち一家のために建てられた。』|『娘のリリアは体が弱く、館の外へ出られない。』", "A page from an old diary.|'This house was built for our family.'|'Our daughter Lilia is frail and cannot leave the house.'");
S("memo2", "使用人のメモが挟まっている。|『お嬢様は毎晩、二人分のお茶を用意させる。弟君の席は、いつも空いたまま。』|『時計が止まった夜から、お茶は冷めたままだ。』", "A servant's note is tucked inside.|'Every night Miss Lilia has tea set for two. Her brother's seat stays empty.'|'Since the night the clocks stopped, the tea has never grown warm.'");
S("memo3", "肖像画の裏に、手紙が貼られている。|『外の世界を見てくる。必ず帰るよ。約束の印に、同じオルゴールをふたつ作らせた。ひとつは僕が持っていく。』|弟からリリアへ。字が、祖母の手紙によく似ていた。", "A letter is pasted behind the portrait.|'I'll go see the world. I'll surely come home. I had two identical music boxes made as a promise; I'll carry one.'|From her brother. The handwriting resembled Grandmother's.");
S("memo4", "執事の記録。|『弟君は、ついに帰らなかった。旦那様は、血筋の者が館に呼ばれぬよう、一族の名を捨てさせた。』|『けれど館は今も、帰る者を待っている。』", "The butler's record.|'The young master never returned. The master had the family abandon its name, so none of the bloodline would be called back here.'|'Yet the house still waits for someone to come home.'");
S("memo5", "ピアノの上に、小さな日記。|『誰かが帰ってきたら、あの子守唄を聞かせてほしい。そうしたら、ちゃんと眠れる。』|『そして、「ただいま」と言ってほしい。』", "A small diary lies on the piano.|'If someone comes home, I want to hear the lullaby. Then I can finally sleep.'|'And I'd like to hear them say, \"I'm home.\"'");
S("birdNeed", "扉には鳥の形のくぼみがある。何かをはめるようだ。", "The door has a bird-shaped hollow. Something fits here.");
S("birdOk", "白い鳥の置物をはめると、扉が静かに開いた。", "The white bird fit the hollow, and the door quietly opened.");
S("libA", "『白い鳥のものがたり』。|鳥は、帰らない人を待って、ずっと翼を開いたままだった。", "'The Tale of the White Bird.'|The bird kept its wings open, waiting for one who never returned.");
S("libB", "本の後ろに、古いくまのぬいぐるみが隠れていた。|「くま」を手に入れた。", "An old teddy bear was hidden behind the books.|Got the \"Teddy\".");
S("libBd", "ほこりの中に、ぬいぐるみの形のあとが残っている。", "A teddy-shaped mark remains in the dust.");
S("birdGet", "引き出しの奥に、白い鳥の置物が眠っていた。|「白い鳥の置物」を手に入れた。", "A white bird ornament slept in the back of the drawer.|Got the \"White bird\".");
S("deskDone", "引き出しはもう空っぽだ。", "The drawer is empty now.");
S("butler", "『…お客様。鏡の間には、お気をつけを。』|『鏡の手は、握ってはなりません。』||『音楽室の台座は、もうひとつのオルゴールのためのもの。』", "'...Guest. Beware the mirror room.'|'Never take the hand in the mirror.'||'The stand in the music room awaits its twin music box.'");
S("maid", "影が、静かにお茶を並べている。|『お嬢様のお友達の席は三つ。くまさん、うさぎさん、それから…猫の鈴。』||『この館の時計は、お嬢様の夜からずっと止まったままですわ。』", "A shadow quietly sets out tea.|'Miss Lilia's friends have three seats: Teddy, Bunny, and... the cat's bell.'||'The clocks here have been stopped since Miss Lilia's night.'");
S("cat", "猫は気持ちよさそうに喉を鳴らした。", "The cat purred happily.");
S("catBell", "猫が首の鈴を外し、足元に置いた。|「小さな鈴」を手に入れた。", "The cat slipped off its bell and set it at your feet.|Got the \"Small bell\".");
S("catD", "猫は満足そうに丸くなっている。", "The cat is curled up contentedly.");
S("tea", "二人分のカップのそばに、小さな席が三つ。|札には、くま・うさぎ・鈴とある。", "Three small seats sit beside the two cups.|The tags read: Teddy, Bunny, Bell.");
S("knight", "甲冑が静かに立っている。兜の奥は、からっぽだ。", "A suit of armor stands silently. The helmet is empty.");
S("bun", "廊下の隅に、うさぎのぬいぐるみが座っていた。|「うさぎ」を手に入れた。", "A stuffed bunny sat in a corner of the hall.|Got the \"Bunny\".");
S("mghost", "『…あの手を、握っちゃだめ。』|『でも、鍵は鏡の向こうにあるの。』", "'...Don't hold that hand.'|'But the key is beyond the mirror.'");
S("mirror", "曇っていた鏡が澄んでいる。|鏡の中から、白い手が小さな鍵を差し出している。", "The clouded mirror has cleared.|A pale hand in the mirror holds out a small key.");
S("mirOpt", "鏡の中の手を握る|鍵だけ受け取る", "Take the hand|Take only the key");
S("mirKey", "指が触れないよう、そっと鍵だけをつまんだ。|「玄関の鍵」を手に入れた。", "Carefully, you took only the key.|Got the \"Front door key\".");
S("mirD", "鏡は、ただ部屋を映している。", "The mirror only reflects the room.");
S("stand0", "同じ形の、空っぽの台座がある。|@h3 オルゴールを重ねてみたが、ネジが動かない。|まだ何かが足りない。館の記録を集めよう。({c}/5)", "An empty stand of the same shape.|@h3 You tried your music box, but it won't wind.|Something is missing. Gather the house's records. ({c}/5)");
S("frontL", "重い玄関の扉は閉ざされている。|鍵穴がある。", "The heavy front door is shut.|There is a keyhole.");
S("front", "玄関の鍵が回った。外の空気が流れ込んでくる。|館を出ますか？", "The key turned. Outside air flows in.|Leave the mansion?");
S("frontOpt", "館を出る|まだ残る", "Leave|Stay a while");
S("frontS", "…もう少し、館を見て回ろう。", "...Let's look around a bit more.");
S("true", "空の台座に祖母のオルゴールを置くと、ぴたりと収まった。|@g4 『あなたなら、きっと帰ってこられる。』|@h2 祖母の声…？ 蓋の裏に、祖母の字が刻まれている。|ネジを巻くと、子守唄が館に流れ出した。止まっていた時計が、ひとつ、またひとつと動き出す。|赤いドレスの少女が、静かにそこに立っていた。|『…あなたは弟の子孫。ここは、あなたの家。』|『おかえりなさい。ずっと、待っていたの。』|@h1 『…ただいま。』|少女は微笑み、ゆっくりと光に溶けていった。", "You set Grandmother's music box on the empty stand. It fit perfectly.|@g4 'I knew you could come home.'|@h2 Grandmother's voice...? Her handwriting is engraved inside the lid.|You wound it, and a lullaby filled the house. One by one, the stopped clocks began to move.|A girl in a red dress stood there quietly.|'...You are my brother's descendant. This is your home.'|'Welcome home. I've waited so long.'|@h1 '...I'm home.'|The girl smiled and slowly melted into the light.");
S("end_true", "夜明けの光が、洋館に差し込む。玄関の扉は、もう開いていた。|『Bienvenue à la maison』。あの言葉は、刻まれていたのではなく、迎える声だったのだ。|オルゴールはもう鳴らない。けれど胸の奥では、やさしい子守唄が続いている。", "Dawn light fills the mansion. The front door stands open.|'Bienvenue à la maison.' It was never just carved words; it was a voice welcoming you.|The music box no longer plays, but a gentle lullaby continues within you.");
S("end_normal", "玄関の鍵が、かちりと回った。|{n}は振り返らず、洋館をあとにした。|あの館が何だったのか、答えは分からないまま。けれど、オルゴールは時々、ひとりでに小さく鳴る。", "The key clicked in the lock.|{n} left the mansion without looking back.|What the house was remains unanswered. But the music box sometimes plays softly by itself.");
S("end_bad", "鏡の中の手は、思ったよりずっと冷たかった。|引き込まれた先は、同じ部屋。けれど出口はどこにもない。|壁の肖像画が、ひとつ増えている。|それは、{n}によく似ていた。", "The hand in the mirror was far colder than expected.|You were pulled into the same room, but with no exit.|One more portrait hangs on the wall.|It looked just like {n}.");
S("end_secret", "くま、うさぎ、猫の鈴。三つの席が、にぎやかに埋まった。|赤いドレスの少女が、そっと席につく。『…ひさしぶりの、お客さま。』|二人分だったお茶は、みんなの分になった。笑い声のなか、いつの間にか朝が来ていた。|気づくと{n}は玄関の外に立っていた。手には、あたたかいカップがひとつ。", "Teddy, Bunny, and the cat's bell filled the three seats.|The girl in red quietly sat down. '...A guest, after so long.'|Tea for two became tea for everyone. Laughter went on until morning came.|Suddenly {n} stood outside the front door, a warm cup in hand.");
S("endName", "NORMAL END|TRUE END|BAD END|SECRET END", "NORMAL END|TRUE END|BAD END|SECRET END");
S("toTitle", "タイトルへ", "Back to title");
S("o1", "目的: まず部屋を調べよう。時計と人形が気になる。", "Goal: Search the room. The clock and doll seem odd.");
S("o2", "目的: 大広間の左右の部屋を調べよう。", "Goal: Explore the rooms left and right of the great hall.");
S("o3", "目的: 大広間の北の扉に、白い鳥の置物を。", "Goal: Use the white bird on the north door of the great hall.");
S("o4", "目的: 二階の鏡の間に、玄関の鍵があるらしい。", "Goal: The front door key seems to be in the upstairs mirror room.");
S("o5", "目的: 館の記録を集めよう。({c}/5) 鍵があれば玄関から出られる。", "Goal: Gather the records. ({c}/5) With the key, you can leave by the front door.");
S("o6", "目的: 二階の音楽室の台座に、オルゴールを。", "Goal: Place the music box on the stand in the upstairs music room.");

// ---- マップ ----
const mk = f => { const r = Array.from({ length: 15 }, (_, y) => [...(y < 2 || y === 14 ? "#".repeat(20) : "#" + ".".repeat(18) + "#")]);
  for (const [c, x, y, x2 = x, y2 = y] of f) for (let j = y; j <= y2; j++) for (let i = x; i <= x2; i++) r[j][i] = c; return r.map(a => a.join("")); };
MAPS.room1[1] = "####P##M#IK#D##P####"; MAPS.hall[8] = "D........CC........D";
MAPS.lib = mk([["C", 4, 6, 15, 11], ["T", 11, 5, 12, 5], ["D", 19, 8]]);
MAPS.din = mk([["C", 5, 4, 14, 10], ["T", 8, 6, 11, 7], ["D", 0, 8]]);
MAPS.gal = mk([["C", 1, 7, 18, 7], ["C", 9, 2, 10, 13], ["P", 6, 1], ["P", 13, 1], ["D", 10, 14], ["D", 0, 7], ["D", 19, 7]]);
MAPS.mir = mk([["C", 3, 4, 15, 11], ["M", 9, 1], ["T", 4, 6, 5, 6], ["D", 19, 7]]);
MAPS.mus = mk([["C", 3, 3, 16, 10], ["Q", 8, 5], ["D", 0, 7]]);
SOLID.add("Q");
DRAW.Q = (c, x, y) => { DRAW["."](c, x, y); rect(c, "#3b2814", x + 2, y + 8, 12, 7); rect(c, "#8a6238", x + 3, y + 5, 10, 4); rect(c, "#b8a77a", x + 5, y + 3, 6, 3); };
const door = (to, tx, ty, dir, o = {}) => ({ to, sx: tx * TS + 2, sy: ty * TS, dir, ...o });
Object.assign(DOORS.room1, { "12,1": { act: "front" } });
DOORS.hall["10,1"] = door("gal", 9, 13, "up", { need: "bird", fail: "birdNeed", ok: "birdOk" });
DOORS.hall["0,8"] = door("lib", 17, 8, "left"); DOORS.hall["19,8"] = door("din", 1, 8, "right");
DOORS.lib = { "19,8": door("hall", 1, 8, "right") }; DOORS.din = { "0,8": door("hall", 17, 8, "left") };
DOORS.gal = { "10,14": door("hall", 9, 3, "down"), "0,7": door("mir", 17, 7, "left"), "19,7": door("mus", 1, 7, "right") };
DOORS.mir = { "19,7": door("gal", 1, 7, "right") }; DOORS.mus = { "0,7": door("gal", 17, 7, "left") };
ENTITIES.lib = [
  { id: "sa", spr: "bookshelf", tx: 2, ty: 2, tw: 2, act: "libA" }, { id: "sb", spr: "bookshelf", tx: 5, ty: 2, tw: 2, act: "libB" },
  { id: "sc", spr: "bookshelf", tx: 14, ty: 2, tw: 2, msg: "B" }, { id: "desk", tx: 11, ty: 5, tw: 2, act: "desk" },
  { id: "bt", spr: "butler", dir: "left", tx: 15, ty: 8, act: "butler" }];
ENTITIES.din = [
  { id: "cup", spr: "bookshelf", tx: 3, ty: 2, tw: 2, act: "cup" }, { id: "cd", spr: "candelabra", tx: 14, ty: 2, msg: "C" },
  { id: "maid", spr: "maid", dir: "down", tx: 13, ty: 5, act: "maid" }, { id: "cat", spr: "cat", dir: "left", tx: 4, ty: 10, act: "cat" },
  { id: "tea", tx: 8, ty: 6, tw: 4, th: 2, act: "tea" }];
ENTITIES.gal = [
  { id: "k1", spr: "knight", tx: 3, ty: 5, act: "knight" }, { id: "k2", spr: "knight", tx: 16, ty: 5, act: "knight" },
  { id: "bun", spr: "bunny", tx: 17, ty: 12, act: "bun" }];
ENTITIES.mir = [{ id: "mt", tx: 4, ty: 6, tw: 2, act: "mtab" }, { id: "gh", spr: "ghost", tx: 13, ty: 9, act: "mghost" }];
ENTITIES.mus = [{ id: "pi", spr: "piano", tx: 13, ty: 3, tw: 2, th: 2, act: "piano" }];
const rm = (r, id) => { ENTITIES[r] = ENTITIES[r].filter(e => e.id !== id); };
const TILEACT = { "gal:13,1": "portrait", "mir:9,1": "mirror", "mus:8,5": "stand" };
function tileAct(r, x, y) { const a = TILEACT[`${r}:${x},${y}`]; if (a) { ACT[a](); return true; } return false; }

// ---- 調べる処理(謎・ギミックはここを書き換える) ----
const memo = n => { if (flags["m" + n]) return say2("memoDone"); flags["m" + n] = true; flags.mc++; say([...L("memo" + n), ...L("memoGot")]); };
const give = (k, t) => { flags[k] = true; updateInv(); say2(t); };
const ACT = {
  libA: () => say2("libA"), butler: () => say2("butler"), maid: () => say2("maid"), knight: () => say2("knight"), mghost: () => say2("mghost"), tea: () => (flags.ted && flags.bun && flags.bell) ? ending("secret") : say2("tea"),
  libB: () => flags.ted ? say2("libBd") : give("ted", "libB"),
  desk: () => !flags.m1 ? memo(1) : (!flags.bird && !flags.birdSet) ? give("bird", "birdGet") : say2("deskDone"),
  cup: () => memo(2), portrait: () => memo(3), mtab: () => memo(4), piano: () => memo(5),
  cat: () => { flags.cat = (flags.cat || 0) + 1; flags.bell ? say2("catD") : flags.cat >= 3 ? give("bell", "catBell") : say2("cat"); },
  bun: () => { rm("gal", "bun"); give("bun", "bun"); },
  mirror: () => flags.fkey ? say2("mirD") : say2("mirror", () => choose(L("mirOpt"), i => i === 0 ? ending("bad") : give("fkey", "mirKey"))),
  stand: () => { if (flags.mc < 5) return say2("stand0");
    ENTITIES.mus.push({ id: "lilia", spr: "hatgirl", dir: "down", tx: 10, ty: 6 }); say2("true", () => ending("true")); },
  front: () => !flags.fkey ? say2("frontL") : say2("front", () => choose(L("frontOpt"), i => i === 0 ? ending("normal") : say2("frontS"))),
};
const _de = drawEntity;
drawEntity = (c, e) => { if (e.spr) _de(c, e);
  if (e.act === "save") { const x = e.tx * TS + 8, y = e.ty * TS + 4, g = c.createRadialGradient(x, y, 1, x, y, 18);
    g.addColorStop(0, "rgba(255,210,120,.5)"); g.addColorStop(1, "rgba(255,210,120,0)"); c.fillStyle = g; c.fillRect(x - 18, y - 18, 36, 36); } };
const _talk = talk; talk = e => e.act ? ACT[e.act](e) : _talk(e);
useDoor = (tx, ty) => { const d = (DOORS[cur] || {})[tx + "," + ty];
  if (!d) return say(t().D[0]); if (d.act) return ACT[d.act](); if (d.msg) return say(t()[d.msg]);
  if (d.need && !flags[d.need] && !flags[d.need + "Set"]) return say2(d.fail);
  if (d.needKey && !flags.key) return say(t().D[0]);
  if (d.needKey && !flags.unlocked) { flags.unlocked = true; return say(t().unlock, () => go(d)); }
  if (d.need && !flags[d.need + "Set"]) { flags[d.need + "Set"] = true; flags[d.need] = false; updateInv(); return say2(d.ok, () => go(d)); }
  go(d); };
updateInv = () => { const names = ["box", "key", "bird", "ted", "bun", "bell", "fkey"].filter(k => k === "box" || flags[k]).map(k => t().items[k]);
  $("inv").textContent = t().invLabel + names.join(" / ") + `  [${flags.mc}/5]`; };
let goalKey = () => { const f = flags; return !f.key ? "o1" : !(f.bird || f.birdSet) ? "o2" : !f.birdSet ? "o3" : f.mc >= 5 ? "o6" : !f.fkey ? "o4" : "o5"; };
const showStatus = () => openItems();

// ---- 選択肢 ----
let ch = { o: [], i: 0, cb: null };
const msgEl2 = $("msg"), msgText2 = $("msgtext");
function choose(o, cb) { ch = { o, i: 0, cb }; mode = "choice"; keys.clear(); drawCh(); }
function drawCh() { msgEl2.hidden = false; $("face").hidden = true; msgText2.innerHTML = ch.o.map((s, i) => (i === ch.i ? "▶ " : "　 ") + s).join("<br>"); }
function chMove(d) { ch.i = (ch.i + ch.o.length + d) % ch.o.length; drawCh(); }
function pickChoice() { const { cb, i } = ch; msgEl2.hidden = true; mode = "play"; keys.clear(); cb(i); }

// ---- エンディング ----
const ENDS = ["normal", "true", "bad", "secret"];
const seen = () => { try { return JSON.parse(localStorage.yokanEnds || "[]"); } catch (e) { return []; } };
function ending(id) {
  const v = document.createElement("div"); v.style.cssText = "position:absolute;inset:0;background:#000;z-index:5"; $("wrap").insertBefore(v, msgEl2);
  msgEl2.style.zIndex = 6;
  say(L("end_" + id), () => { mode = "end"; msgEl2.hidden = true;
    try { localStorage.yokanEnds = JSON.stringify([...new Set([...seen(), id])]); } catch (e) {}
    v.style.cssText += ";display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;color:#b8a77a";
    v.innerHTML = `<h1 style="letter-spacing:.3em;font-weight:normal;margin:0">${L("endName")[ENDS.indexOf(id)]}</h1><p style="font-style:italic;color:#8a8090;margin:0">Bienvenue à la maison</p><button style="background:#1a1620;color:#d8d0c0;border:1px solid #5a4e6a;padding:8px 18px;font-size:16px;cursor:pointer">${L("toTitle")[0]}</button>`;
    v.querySelector("button").onclick = () => location.reload(); });
}
const endsEl = document.createElement("div"); endsEl.style.cssText = "font-size:13px;color:#8a8090;margin-top:6px";
endsEl.textContent = ENDS.map((e, i) => `${["NORMAL", "TRUE", "BAD", "SECRET"][i]} ${seen().includes(e) ? "✓" : "?"}`).join("   "); $("title").appendChild(endsEl);

// ===== 追加: セーブ / メニュー(Esc・X) / 設定 =====
S("saveAsk", "ともしびの燭台だ。ここまでの出来事を記録しますか？", "A flickering candlestick. Save your progress here?");
S("saveOpt", "記録する|やめる", "Save|Cancel");
S("saved", "ともしびが、やさしく揺れた。(セーブしました)", "The flame wavered gently. (Saved)");
S("cont", "つづきから", "Continue");
S("m_pause", "ポーズ", "Pause"); S("m_resume", "ゲームに戻る", "Resume"); S("m_items", "持ち物・記録", "Items & Records");
S("m_set", "設定", "Settings"); S("m_title", "タイトルへ戻る(未セーブの進行は消えます)", "Back to title (unsaved progress is lost)");
S("m_back", "戻る", "Back"); S("m_goal", "いまの目的", "Current goal"); S("m_hi", "持ち物", "Items"); S("m_hr", "記録", "Records");
S("m_lang", "言語", "Language"); S("m_dark", "暗がり演出", "Darkness effect"); S("unk", "まだ見つけていない記録だ。", "A record you haven't found yet.");
S("it_box", "祖母から受け継いだ古いオルゴール。|底の仕掛けから、洋館の地図が出てきた。", "The old music box from Grandmother.|A hidden mechanism in its base revealed a map to the mansion.");
S("it_key", "人形が握っていた小さな鍵。|エントランス南の扉を開けた。", "The small key the doll held.|It opened the entrance's south door.");
S("it_bird", "片方の翼が開いた、白い鳥の置物。|大広間北の扉のくぼみに合いそうだ。", "A white bird ornament with one wing open.|It seems to fit the hollow in the great hall's north door.");
S("it_ted", "図書室の本の後ろにいた、くまのぬいぐるみ。|誰かの席に座らせてあげたい。", "The teddy bear hiding behind the library books.|Someone's seat awaits it.");
S("it_bun", "廊下の隅にいた、うさぎのぬいぐるみ。|誰かの席に座らせてあげたい。", "The stuffed bunny from the hallway corner.|Someone's seat awaits it.");
S("it_bell", "猫がくれた小さな鈴。澄んだ音がする。|食堂の三つめの席の分だろうか。", "A small bell given by the cat. It rings clearly.|Perhaps it belongs to the third seat in the dining room.");
S("it_fkey", "鏡の中の手が差し出した、玄関の鍵。|これがあれば館を出られる。", "The front door key offered by the hand in the mirror.|With this, you can leave the mansion.");

const SK = "yokanSave", hasSave = () => { try { return !!localStorage[SK]; } catch (e) { return false; } };
function doSave() { try { localStorage[SK] = JSON.stringify({ flags, cnt, counters, cur, x: player.x, y: player.y, dir: player.dir, name: playerName, lang, hero }); } catch (e) {} }
function doLoad() { const d = JSON.parse(localStorage[SK]);
  Object.assign(flags, d.flags); Object.assign(cnt, d.cnt); counters = d.counters || {}; lang = d.lang; playerName = d.name; setHero(d.hero);
  cur = d.cur; player.x = d.x; player.y = d.y; player.dir = d.dir;
  if (flags.clock) turnDoll(); if (flags.bun) rm("gal", "bun");
  $("title").hidden = true; $("help").hidden = false; $("inv").hidden = false; mode = "play"; applyLang(); }
ACT.save = () => say2("saveAsk", () => choose(L("saveOpt"), i => { if (i === 0) { doSave(); say2("saved"); } }));
for (const [r, tx, ty] of [["room1", 16, 12], ["hall", 12, 5], ["gal", 12, 11], ["mus", 4, 9]]) ENTITIES[r].push({ id: "sv", spr: "candle", tx, ty, act: "save" });
I18N.ja.help = "移動: 矢印 / WASD    調べる: Z・Space・Enter    持ち物・記録: X    ポーズ・設定: Esc";
I18N.en.help = "Move: Arrows / WASD    Interact: Z / Space / Enter    Items & Records: X    Pause & Settings: Esc";
const contBtn = document.createElement("button"); contBtn.hidden = !hasSave();
contBtn.style.cssText = "background:#1a1620;color:#d8d0c0;border:1px solid #5a4e6a;padding:8px 18px;cursor:pointer;font-size:16px";
contBtn.onclick = doLoad; $("start").after(contBtn);
const _al = applyLang; applyLang = () => { _al(); contBtn.textContent = TX[lang].cont[0][0]; };
applyLang();

// ---- メニュー ----
const mel = document.createElement("div");
mel.style.cssText = "position:absolute;inset:6% 12%;background:rgba(10,8,16,.96);border:2px solid #b8a77a;padding:14px 26px;font-size:18px;line-height:1.5;z-index:4;overflow:auto";
mel.hidden = true; $("wrap").appendChild(mel); msgEl2.style.zIndex = 6;
let mn = null;
const tt = k => TX[lang][k][0][0];
function openMenu(title, e, i = 0, back = closeMenu) { mn = { title, e, i, back, ev: window.event && window.event.timeStamp }; mode = "menu"; keys.clear(); if (!e[i] || e[i].h) mv(1); else drawMenu(); }
function closeMenu() { mel.hidden = true; mode = "play"; keys.clear(); }
function drawMenu() { mel.hidden = false;
  mel.innerHTML = `<div style="color:#b8a77a;letter-spacing:.2em;margin-bottom:6px">${mn.title}</div>` + mn.e.map((x, i) => x.h ? `<div style="color:#8a8090;margin-top:8px;font-size:14px">${x.l}</div>` :
    `<div style="color:${i === mn.i ? "#fff" : "#a89fb0"}">${i === mn.i ? "▶ " : "　 "}${x.l}</div>`).join(""); }
function mv(d) { let i = mn.i; do { i = (i + mn.e.length + d) % mn.e.length; } while (mn.e[i].h); mn.i = i; drawMenu(); }
const detail = (lines, back) => { mel.hidden = true; say(lines, back); };
function openItems(i = 1) {
  const f = flags, back = () => openItems(mn ? mn.i : 1), goal = L(goalKey());
  const items = ["box", "key", "bird", "ted", "bun", "bell", "fkey"].filter(k => k === "box" || f[k]);
  const e = [{ l: tt("m_goal"), fn: () => { const k = mn.i; detail(goal, () => openItems(k)); } }, { h: 1, l: tt("m_hi") },
    ...items.map(k => ({ l: t().items[k], fn: () => { const j = mn.i; detail(L("it_" + k), () => openItems(j)); } })), { h: 1, l: `${tt("m_hr")} (${f.mc}/5)` },
    ...[1, 2, 3, 4, 5].map(n => ({ l: f["m" + n] ? `${n}. ${L("memo" + n)[0]}` : `${n}. ？？？`, fn: () => { const j = mn.i; detail(f["m" + n] ? L("memo" + n) : L("unk"), () => openItems(j)); } }))];
  openMenu(tt("m_items"), e, i);
}
function openSettings(i = 0) {
  const re = () => openSettings(mn.i);
  openMenu(tt("m_set"), [
    { l: `${tt("m_lang")}: ${lang === "ja" ? "日本語" : "English"}`, fn: () => { lang = lang === "ja" ? "en" : "ja"; applyLang(); re(); } },
    { l: `${tt("m_dark")}: ${window.darkOff ? "OFF" : "ON"}`, fn: () => { window.darkOff = !window.darkOff; re(); } },
    { l: tt("m_back"), fn: pauseMenu }], i, pauseMenu);
}
function pauseMenu() {
  openMenu(tt("m_pause"), [{ l: tt("m_resume"), fn: closeMenu }, { l: tt("m_items"), fn: () => openItems() }, { l: tt("m_set"), fn: () => openSettings() },
    { l: tt("m_title"), fn: () => location.reload() }], 0);
}
addEventListener("keydown", e => {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (k === "Escape") { e.preventDefault(); if (mode === "menu") mn.back(); else if (mode === "play") pauseMenu(); return; }
  if (mode !== "menu" || mn.ev === e.timeStamp) return;
  if (k === "ArrowUp" || k === "w") mv(-1); else if (k === "ArrowDown" || k === "s") mv(1);
  else if (["z", " ", "Enter"].includes(k) && !e.repeat) { e.preventDefault(); mn.e[mn.i].fn(); }
  else if (k === "x" && !e.repeat && mn.title === tt("m_items")) closeMenu();
});

// ===== 遊び方 =====
S("howBtn", "遊び方", "How to Play"); S("close", "閉じる(Esc)", "Close (Esc)");
S("how", "【操作方法】|移動 … 矢印キー / WASD|調べる・決定・次へ … Z / Space / Enter|持ち物・記録・目的 … X|ポーズ・設定 … Esc||【遊び方】|・気になる場所に近づき、そちらを向いて「調べる」を押そう。家具、人物、扉、壁の飾りなどが調べられる。|・手に入れたアイテムと「記録」は X で確認できる。迷ったら「いまの目的」を見よう。|・光る燭台でセーブできる。タイトルの「つづきから」で再開。|・選択肢は上下キーで選んで Z で決定。|・設定(Esc)で言語や暗がり演出を切り替えられる。|・エンディングは全部で4種類。タイトル画面で見たものが記録される。", "[Controls]|Move ... Arrow keys / WASD|Interact / Confirm / Next ... Z / Space / Enter|Items, Records, Goal ... X|Pause & Settings ... Esc||[How to Play]|- Walk up to something suspicious, face it, and press Interact. Furniture, people, doors and wall decorations can be examined.|- Check collected items and \"Records\" with X. If you're lost, look at \"Current goal\".|- Glowing candlesticks are save points. Resume with \"Continue\" on the title screen.|- Choose options with Up/Down and confirm with Z.|- Switch language or the darkness effect in Settings (Esc).|- There are 4 endings in total. Those you've seen are shown on the title screen.");
const how = document.createElement("div"); let howBack = null;
how.style.cssText = "position:absolute;inset:5% 8%;background:rgba(10,8,16,.97);border:2px solid #b8a77a;padding:18px 28px;font-size:17px;line-height:1.6;z-index:9;overflow:auto;white-space:pre-line;color:#d8d0c0";
how.hidden = true; $("wrap").appendChild(how);
function showHow(back) { howBack = back || null; const p = TX[lang].how;
  how.innerHTML = ""; const b = document.createElement("div"); b.textContent = p.map(x => x.join("\n")).join("\n\n"); how.appendChild(b);
  const c = document.createElement("button"); c.textContent = tt("close"); c.style.cssText = "margin-top:14px;background:#1a1620;color:#d8d0c0;border:1px solid #5a4e6a;padding:6px 16px;font-size:15px;cursor:pointer"; c.onclick = hideHow; how.appendChild(c); how.hidden = false; }
function hideHow() { how.hidden = true; const b = howBack; howBack = null; if (b) b(); }
addEventListener("keydown", e => { if (how.hidden || e.timeStamp === how.ts) return;
  if (["Escape", "Enter", "z", " ", "x"].includes(e.key)) { e.preventDefault(); e.stopImmediatePropagation(); hideHow(); } }, true);
const howBtn = document.createElement("button"); howBtn.style.cssText = contBtn.style.cssText; howBtn.onclick = () => showHow(); contBtn.after(howBtn);
const _al3 = applyLang; applyLang = () => { _al3(); howBtn.textContent = tt("howBtn"); };
applyLang();
const _pm = pauseMenu;
pauseMenu = () => { openMenu(tt("m_pause"), [{ l: tt("m_resume"), fn: closeMenu }, { l: tt("m_items"), fn: () => openItems() }, { l: tt("howBtn"), fn: () => { const t0 = event && event.timeStamp; mel.hidden = true; showHow(() => pauseMenu()); how.ts = t0; } },
  { l: tt("m_set"), fn: () => openSettings() }, { l: tt("m_title"), fn: () => location.reload() }], 0); };


// ===== 玄関の扉: 他のドアと同じ見た目(MAPS.room1 の "D" = 12,1。調べる処理は DOORS.room1 の front) =====
for (const k in bgs) delete bgs[k];   // 起動時に焼き込まれた背景を作り直す
