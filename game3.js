"use strict";
// ===== 追加章: 人物の記憶・レイ(協力者)・止まった夜の謎・新エンディング =====
const S3 = (k, j) => S(k, j, j);   // 英語は未翻訳(日本語を表示)
Object.assign(flags, { rey: 0, w1: false, w2: false, w3: false, clockSet: false });

// ---- 文章 ----
S3("reyA", "『…ここで何をしている。』|『この館に来てはいけなかったんだ。今すぐ出ていけ。』");
S3("reyOpt", "話を聞く|ここに残ると言い張る");
S3("reyL", "『…聞く気があるのか。』|『この館は、帰ってきた者を離さない。鏡の手を握った者を、俺は何人も見た。』|『俺はレイ。…ずっと、ここにいる。』");
S3("reyI", "『…勝手にしろ。後悔しても知らないぞ。』");
S3("reyW", "『まだ話せることはない。』|『二階の廊下の肖像画の裏を見てこい。…そこに、俺の字がある。』");
S3("reyS", "『…見つけたのか。肖像画の裏の手紙を。』|手紙の字と、レイの字は、同じだった。");
S3("reyOpt2", "手紙を見せる|まだ見せない");
S3("reyJ", "『…そうか。お前は、あいつの…。』|『俺は、帰れなかった弟の記憶だ。館はお前を閉じ込めたんじゃない。帰る場所を、守っていたんだ。』|『…疑って、すまなかった。手伝わせてくれ。』");
S3("reyH1", "『止まった夜の時刻を、三人が覚えている。』|『二度ずつ聞け。同じことしか繰り返さない奴の記憶は、もう薄れかけている。』");
S3("reyH2", "『台座へ行こう。…最後まで、付き合う。』");
S3("wCook", "『お嬢様の夜かい？ 夕食の片付けのあと、十時の鐘を聞いたよ。』||『そういや、あの夜は紅茶に蜂蜜を足したっけ。鐘は…十時だったね。』");
S3("wGard", "『庭の見回りのとき、九時の鐘を聞いた。』||『庭の見回りのとき、九時の鐘を聞いた。』");
S3("wLib", "『本を閉じたのは、十一時の鐘のあとでした。』||『本を閉じたのは、十一時の鐘のあとでした。』");
S3("clockAsk", "三人の記憶を思い出しながら、時計の針に手をかける。|止まった夜の時刻に合わせますか？");
S3("clockOpt", "九時|十時|十一時|やめる");
S3("clockNo", "針を合わせても、時計は動かない。…記憶と食い違っているようだ。");
S3("clockOK", "針を十時に合わせると、鐘がひとつ、ふたつ…と鳴り響いた。|時計の奥で、かたりと音がした。止まっていた時が、少しだけ動き出す。");
S3("clockDone", "時計は静かに時を刻んでいる。");
S3("standClk", "オルゴールを置こうとしたが、ネジが固い。|どこかの時計が止まったままだ。エントランスの柱時計だろうか。");
S3("reyBlock", "レイが、台座の前に立ちはだかった。|『待て。まだ巻くな。お前は、まだ何も知らない。』");
S3("reyBOpt", "引き下がる|押しのけて進む");
S3("reyBH", "…まだ知るべきことがある。もう一度、館を見て回ろう。|(大広間のレイと、話してみよう)");
S3("reyTrue", "レイが、静かに隣に並んだ。|『…行こう。ここは、俺の帰る場所でもあるんだ。』");
S3("teaNo", "三つの席は埋まった。けれど、四つめの空席がすっと現れた。|誰かを待っているようだ。…館の誰かを、まだ味方にできていない。");
S3("fMaster", "『この家は、守らねばならん。…何を守るのだったか。』||『この家は、守らねばならん。』");
S3("fLady", "『リリアは、まだ眠らないのね…。』|『あの子守唄が聞こえたら、きっと。』");
S3("fOff", "『弟君を港まで見送ったのは、私だ。ラッパを吹いたよ。』|『帆は、朝日の中に消えていった。…二度と、戻らなかったが。』");
S3("fOld", "『おや、おかえり。…あなた、あの子によく似ているよ。』|『オルゴールはね、ふたつあるんだよ。ひとつは、あの子が…』|(言葉は、そこで途切れた。)");
S3("fBoy", "『くまさん、どこ？ しょくどうの、せきにいるはずなのに…。』");
S3("fNews", "『新聞だよ！ …今日の新聞は、もう何十年も前のだけどね。』|『ネジを巻くには、五つの記録が要るって、館が言ってた。』");
S3("end_bad2", "制止を振り切って、ネジを巻いた。|子守唄は歪み、時計がいっせいに逆回りを始める。|館の人々の姿が、ひとり、またひとり、薄れていく。レイの声も、もう聞こえない。|気づくと、手の中のオルゴールは、何の曲も思い出せなくなっていた。|{n}という名前さえ、もう誰のものか分からない。");
TX.ja.endName[0].push("BAD END"); TX.en.endName[0].push("BAD END"); ENDS.push("bad2");
S3("o7", "目的: 止まった夜の時刻を、三人(料理人・庭師・司書)の記憶から探そう。柱時計はエントランスにある。");
S3("o8", "目的: 大広間のレイの話を聞き、肖像画の裏の手紙を見せよう。");

// ---- 人物の配置(assets/obj/ に人物図鑑から切り出した画像) ----
const re = (r, id, o) => { const e = ENTITIES[r].find(x => x.id === id); Object.assign(e, o); delete e.dir; };
re("lib", "bt", { spr: "butler2" }); re("din", "maid", { spr: "maid2" });
ENTITIES.hall.push({ id: "rey", spr: "rey", tx: 5, ty: 8, act: "reyTalk" }, { id: "old", spr: "oldwoman", tx: 15, ty: 11, act: "fOld" });
ENTITIES.lib.push({ id: "libn", spr: "librarian", tx: 9, ty: 9, act: "wLib" });
ENTITIES.din.push({ id: "cook", spr: "cook", tx: 16, ty: 10, act: "wCook" });
ENTITIES.gal.push({ id: "gard", spr: "gardener", tx: 4, ty: 10, act: "wGard" }, { id: "mas", spr: "master", tx: 15, ty: 9, act: "fMaster" }, { id: "off", spr: "officer", tx: 8, ty: 4, act: "fOff" });
ENTITIES.mir.push({ id: "lady", spr: "lady", tx: 15, ty: 4, act: "fLady" });
ENTITIES.mus.push({ id: "boyt", spr: "boyT", tx: 5, ty: 8, act: "fBoy" }, { id: "news", spr: "newsboy", tx: 14, ty: 9, act: "fNews" });

// ---- 謎・分岐 ----
const wit = (k, f) => () => { flags[f] = true; say2(k); };
function syncRey() { if (flags.rey >= 2) { rm("hall", "rey"); if (!ENTITIES.mus.some(e => e.id === "rey")) ENTITIES.mus.push({ id: "rey", spr: "rey", tx: 6, ty: 8, act: "reyTalk" }); } }
Object.assign(ACT, {
  wCook: wit("wCook", "w1"), wGard: wit("wGard", "w2"), wLib: wit("wLib", "w3"),
  fMaster: () => say2("fMaster"), fLady: () => say2("fLady"), fOff: () => say2("fOff"), fOld: () => say2("fOld"), fBoy: () => say2("fBoy"), fNews: () => say2("fNews"),
  reyTalk: () => { const r = flags.rey | 0;
    if (r >= 2) return say2(flags.clockSet ? "reyH2" : "reyH1");
    if (r === 0) return say2("reyA", () => choose(L("reyOpt"), i => { if (i === 0) { flags.rey = 1; say2("reyL"); } else say2("reyI"); }));
    if (!flags.m3) return say2("reyW");
    say2("reyS", () => choose(L("reyOpt2"), i => { if (i === 0) { flags.rey = 2; say2("reyJ", syncRey); } else say2("reyW"); })); },
  clock2: () => flags.clockSet ? say2("clockDone") : say2("clockAsk", () => choose(L("clockOpt"), i => {
    if (i === 3) return; if (i !== 1) return say2("clockNo");
    flags.clockSet = true; say2("clockOK"); })),
});
const _ta = tileAct;
tileAct = (r, x, y) => (r === "room1" && x === 10 && y === 1 && flags.clock && (flags.clockSet || (flags.w1 && flags.w2 && flags.w3))) ? (ACT.clock2(), true) : _ta(r, x, y);
const _st = ACT.stand, _tea = ACT.tea;
ACT.stand = () => {
  if (flags.mc < 5) return _st();
  if (!flags.clockSet) return say2("standClk");
  if (flags.rey < 2) return say2("reyBlock", () => choose(L("reyBOpt"), i => i === 0 ? say2("reyBH") : ending("bad2")));
  say2("reyTrue", _st);
};
ACT.tea = () => (flags.ted && flags.bun && flags.bell && flags.rey < 2) ? say2("teaNo") : _tea();
const _gk = goalKey;
goalKey = () => flags.mc < 5 ? _gk() : !flags.clockSet ? "o7" : flags.rey < 2 ? "o8" : "o6";
contBtn.onclick = () => { doLoad(); syncRey(); };
for (const k in bgs) delete bgs[k];

// ===== 仕様書v0.3対応: 使用上の注意・操作方法 / PC+スマホ操作 / キーワード表示 =====
S("howBtn", "使用上の注意・操作方法", "Notes & Controls"); S("close", "閉じる", "Close");
S("how",
  "【使用上の注意】|・本作は探索・謎解きを中心としたゲームです。館内の文章や物の配置が謎解きの手掛かりになる場合があります。|・気になる場所や家具、書物などは、近づいて調べてください。|・一度訪れた部屋にも、新しいアイテムや情報を入手した後に変化が起きる場合があります。|・会話やメモに登場する情報は、後の謎解きに関係することがあります。|・記憶視認にはゲーム内のリスクがあります。使用するタイミングに注意してください。|・光る燭台で進行状況をセーブできます。区切りのよいタイミングで保存してください。|・セーブせずにブラウザを再読み込みしたりタブを閉じたりすると、直前の進行状況が失われる可能性があります。|・快適にプレイするため、対応ブラウザの最新版を使用してください。||【操作方法】|移動 … [PC] 矢印キー / WASD　[スマホ] 左の方向ボタン|調べる・話す・決定 … [PC] Enter / Space / Z / クリック　[スマホ] 「調べる」ボタン、文字や選択肢をタップ|キャンセル・戻る … [PC] Esc　[スマホ] 「戻る」ボタン|メニュー … [PC] Esc　[スマホ] 「メニュー」ボタン|持ち物・記録・目的 … [PC] X　[スマホ] メニューから|アイテム使用 … 対応する扉や仕掛けの前で「調べる」|選択肢 … [PC] ↑↓で選んで決定　[スマホ] 直接タップ",
  "[Notes]|- This is a game of exploration and puzzles. Text and the placement of objects inside the mansion may be clues.|- Walk up to anything that catches your eye (furniture, books, etc.) and examine it.|- Rooms you have already visited may change after you obtain new items or information.|- Information in conversations and notes may relate to later puzzles.|- Memory Sight carries risks within the game. Be careful when you use it.|- You can save your progress at the glowing candlesticks. Save at good stopping points.|- If you reload the browser or close the tab without saving, your latest progress may be lost.|- For the best experience, use the latest version of a supported browser.||[Controls]|Move ... [PC] Arrow keys / WASD  [Mobile] D-pad on the left|Examine / Talk / Confirm ... [PC] Enter / Space / Z / Click  [Mobile] Interact button, or tap text and choices|Cancel / Back ... [PC] Esc  [Mobile] Back button|Menu ... [PC] Esc  [Mobile] Menu button|Items / Records / Goal ... [PC] X  [Mobile] From the menu|Use an item ... Examine the matching door or device|Choices ... [PC] Up/Down then confirm  [Mobile] Tap directly");
S("tAct", "調べる", "Interact"); S("tBack", "戻る", "Back"); S("tMenu", "メニュー", "Menu");

// 初回の「はじめる」で注意・操作説明を表示してから本編へ(2回目以降はタイトルの「使用上の注意・操作方法」から再確認)
const _beginGame = $("start").onclick;
$("start").onclick = () => {
  let seenNotes = false; try { seenNotes = !!localStorage.yokanNotes; } catch (e) {}
  if (seenNotes) return _beginGame();
  try { localStorage.yokanNotes = "1"; } catch (e) {}
  showHow(_beginGame);
};

// ---- スマホ操作: 仮想ボタンは既存のキー入力と同じ処理に流す(PCとスマホで挙動を揃える) ----
if (matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0) document.documentElement.classList.add("touch");
const touchEl = $("touch"), fireKey = (type, key) => dispatchEvent(new KeyboardEvent(type, { key, bubbles: true, cancelable: true }));
const hold = (el, key, guard) => {
  el.addEventListener("pointerdown", e => { e.preventDefault(); if (guard && !guard()) return; el.setPointerCapture && el.setPointerCapture(e.pointerId); fireKey("keydown", key); });
  ["pointerup", "pointercancel"].forEach(ev => el.addEventListener(ev, () => fireKey("keyup", key)));
};
touchEl.querySelectorAll("#dpad button").forEach(b => hold(b, b.dataset.k));
hold($("b-act"), "z");
hold($("b-menu"), "Escape");
hold($("b-back"), "Escape", () => mode === "menu" || !how.hidden);   // 「戻る」はメニュー・説明画面でのみ有効(ポーズは開かない)
const _al4 = applyLang;
applyLang = () => { _al4(); $("b-act").textContent = tt("tAct"); $("b-back").textContent = tt("tBack"); $("b-menu").textContent = tt("tMenu"); };

// ---- クリック/タップ: 画面・メッセージ欄・選択肢・メニュー項目 ----
cv.addEventListener("click", () => { if (mode === "play" || mode === "msg") onAction(); });
$("msg").addEventListener("click", () => { if (mode === "msg") onAction(); });
drawCh = () => { msgEl2.hidden = false; $("face").hidden = true; msgText2.innerHTML = "";
  ch.o.forEach((s, i) => { const d = document.createElement("div"); d.textContent = (i === ch.i ? "▶ " : "　 ") + s; d.style.cssText = "cursor:pointer;padding:2px 0";
    d.onclick = e => { e.stopPropagation(); ch.i = i; pickChoice(); }; msgText2.appendChild(d); }); };
drawMenu = () => { mel.hidden = false; mel.innerHTML = "";
  const h = document.createElement("div"); h.style.cssText = "color:#b8a77a;letter-spacing:.2em;margin-bottom:6px"; h.textContent = mn.title; mel.appendChild(h);
  mn.e.forEach((x, i) => { const d = document.createElement("div");
    if (x.h) { d.style.cssText = "color:#8a8090;margin-top:8px;font-size:.8em"; d.textContent = x.l; }
    else { d.style.cssText = `color:${i === mn.i ? "#fff" : "#a89fb0"};cursor:pointer;padding:3px 0`; d.textContent = (i === mn.i ? "▶ " : "　 ") + x.l; d.onclick = () => { mn.i = i; x.fn(); }; }
    mel.appendChild(d); }); };
mel.style.fontSize = how.style.fontSize = "clamp(13px, 2.1cqw, 18px)"; mel.style.inset = how.style.inset = "4% 5%";

// ---- 重要キーワード: 館に入った直後、玄関ホール(room1)の壁の目立つ場所に表示(意味は序盤では明かさない) ----
window.postDraw = c => {
  touchEl.hidden = mode === "title";
  if (cur !== "room1") return;
  c.save(); c.font = "italic 9px serif"; c.textAlign = "center"; c.textBaseline = "middle";
  c.shadowColor = "#000"; c.shadowBlur = 2; c.fillStyle = `rgba(214,190,120,${0.8 + 0.2 * Math.sin(Date.now() / 600)})`;
  c.fillText("Bienvenue à la maison", W / 2, 8); c.restore();
};
applyLang();
