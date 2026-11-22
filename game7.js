"use strict";
// ===== サブイベント4件・NPC信頼度(3段階)・記憶の混同演出(負担値90以上) =====
// サブイベントの進行: flags.sub1〜4 = 0(未着手) / 1(依頼中) / 2(完了)。4件すべて完了でSECRET ENDの条件(game6 の subsDone)。
// 材料・部品の置き場所: 柱時計(歯車) / 客室(蜂蜜) / 中庭(野菜・じょうろ) / 温室(ハーブ・枯れ花) / 音楽室(木馬) / 書斎(人形)
Object.assign(flags, { tr: { seb: 0, mar: 0, noah: 0, lise: 0 }, sub1: 0, sub2: 0, sub3: 0, sub4: 0, wt0: 0, wt1: 0, wt2: 0 });
const SUBI = { watch: ["壊れた懐中時計", "Broken pocket watch"], gear: ["小さな歯車", "Small gear"], herb: ["ハーブ", "Herbs"], veg: ["野菜", "Vegetables"], honey: ["蜂蜜", "Honey"],
  horse: ["小さな木馬", "Small wooden horse"], tdoll: ["小さな人形", "Small doll"], can: ["じょうろ", "Watering can"] };
for (const k in SUBI) { I18N.ja.items[k] = SUBI[k][0]; I18N.en.items[k] = SUBI[k][1]; }
ITEM_KEYS.push("watch", "gear", "herb", "veg", "honey", "horse", "tdoll", "can");
Object.assign(ITEM_HIDE, { watch: () => flags.sub1 === 2, gear: () => flags.sub1 === 2, herb: () => flags.sub2 === 2, veg: () => flags.sub2 === 2, honey: () => flags.sub2 === 2,
  horse: () => flags.sub3 === 2, tdoll: () => flags.sub3 === 2, can: () => flags.sub4 === 2 });

// ---------- 文章 ----------
S3("n_gear", "柱時計の台座の奥に、小さな歯車が転がっていた。|「小さな歯車」を手に入れた。");
S3("n_sebReq", "『…お客様。実は、お願いがございます。』|『旦那様からいただいた懐中時計が、壊れてしまいまして。』|『歯車がひとつ、足りないのです。』|「壊れた懐中時計」を預かった。");
S3("n_sebHint", "『歯車がひとつ、足りないのです。』|『この館で、時を刻むものといえば…玄関の柱時計でしょうか。』");
S3("n_sebDone", "歯車をはめて蓋を閉じると、かちり、と小さな音が鳴った。|『…ああ、懐かしい音です。』|セバスチャンの目が、遠くを見つめる。|『この時計は、旦那様からいただいたもの。』|『あの夜、旦那様は時計をお止めになりました。家族が揃った最後の夜が、終わってしまわぬように、と。』|『時を止めても、人は去っていくというのに。…愚かなことを、なさったものです。』|『ありがとうございます、お客様。これで、旦那様の想いをお伝えできます。』|「記憶の断片」を手に入れた。");
S3("n_sebAfter", "『お客様のおかげで、胸のつかえが取れました。』|『この館のこと、どうか、よろしくお願いいたします。』");
S3("n_marReq", "『あのね、お願いがあるの。家族みんなが好きだった、あのスープを作りたいのよ。』|『ハーブと、野菜と、蜂蜜が要るわ。…どこにしまったのかしら。』");
S3("n_marHint", "『ハーブと、野菜と、蜂蜜。集まったら、また声をかけてちょうだい。』");
S3("n_marDone", "鍋が、ことこと、と音を立てる。|『さあ、できたわ。』|湯気の向こうに、食卓を囲む家族の姿が見えた。|エドガー、エレノア、アルベルト、クララ、ノア、セバスチャン。笑い声が、満ちている。|『これが、全員が揃って食卓を囲んだ、最後の日。』|『…あの日のことは、忘れたことがないのよ。』|マーサは、湯気の中で目を細めた。|「記憶の断片」を手に入れた。");
S3("n_marAfter", "『スープ、あったかいうちにね。…って、もう誰も食べないのだけど。ふふ。』");
S3("n_noahReq", "『ねえ、お願い。木馬と、小さな人形を探してくれない？』|『母さんにあげようと思って、隠したんだ。…どこに隠したか、忘れちゃった。』");
S3("n_noahHint", "『木馬と、小さな人形。きっと、どこか狭いところに隠したんだ。』");
S3("n_noahDone", "『あった！ 木馬と、人形！』|『母さんね、いつも泣いてたから。元気になるかなって、二つ作ったんだ。』|『母さん、喜んでくれるかな。』|ノアは、二つの玩具を大切そうに抱きしめた。|…それを母親に渡せたのかどうかは、語られなかった。|「記憶の断片」を手に入れた。");
S3("n_noahAfter", "『ありがとう。…ねえ、母さんは、どこにいるのかな。』");
S3("n_liseSub", "『ねえ、手伝ってくれる？ 枯れかけてる子たちがいるの。』|『水をあげたいんだけど、じょうろが見当たらなくて…中庭にあった気がする。』");
S3("n_liseSubH", "『枯れかけた子は、三つ。じょうろは、中庭にあったはずだよ。』");
S3("n_liseDone", "水を吸った花が、ゆっくりと顔を上げた。|その瞬間、温室の景色が、にじむように変わった。|二人の少女が、並んで花に水をやっている。|一人はクララ。もう一人の顔は、やはり…見えない。|『あなたがいてくれて、よかった。』|『私、この温室が好き。あなたと一緒だから。』|リゼは、じっと立ち尽くしていた。|『……いま、思い出したの。』|『私、誰かと、ここで約束した気がする。「ずっと友達でいようね」って。』|『その「誰か」は…私じゃなくて、私を作った人の記憶なのかな。』|リゼは、少し寂しそうに笑った。|『でも、いいの。この気持ちは、本物だから。』|「記憶の断片」を手に入れた。");
S3("n_jar", "壺の中に、琥珀色の蜂蜜が残っていた。|「蜂蜜」を手に入れた。"); S3("n_veg", "荒れた畑に、まだ瑞々しい野菜が育っている。|「野菜」を手に入れた。");
S3("n_herb", "棚のハーブを摘むと、爽やかな香りが広がった。|「ハーブ」を手に入れた。"); S3("n_can", "物置のそばに、古いじょうろが置かれていた。|「じょうろ」を手に入れた。");
S3("n_horse", "ピアノの脇の隙間に、小さな木馬が挟まっていた。|「小さな木馬」を手に入れた。"); S3("n_tdoll", "棚の下の暗がりに、小さな人形が隠れていた。|「小さな人形」を手に入れた。");
S3("n_wt0", "枯れかけた花だ。水が足りないらしい。|(水をくむものが欲しい)"); S3("n_wtW", "じょうろで水をやると、花が少しだけ顔を上げた。"); S3("n_wtD", "この花は、もう元気を取り戻している。");
S3("n_conf", "…いま、誰の記憶を見ていたんだっけ。|…{n}？ それは、誰の名前だっただろう。|…母さんが呼んでいる。…母さん？|…この館は、ずっと昔から、自分の家だった気がする。");

// ---------- 配置 ----------
const pk = (r, o) => ENTITIES[r].push(o);
pk("gst", { id: "jar", tx: 3, ty: 4, col: "#c8a050", lbl: "壺", act: "pick", k: "honey", t: "n_jar" });
pk("yard", { id: "veg", tx: 14, ty: 4, tw: 2, col: "#2f6a3a", lbl: "畑", act: "pick", k: "veg", t: "n_veg" }); pk("yard", { id: "can", tx: 6, ty: 4, col: "#6a6a7a", lbl: "物置", act: "pick", k: "can", t: "n_can" });
pk("gh", { id: "herb", tx: 17, ty: 6, col: "#3a7a4a", lbl: "ハーブ", act: "pick", k: "herb", t: "n_herb" });
[[3, 8], [6, 8], [15, 8]].forEach(([x, y], i) => pk("gh", { id: "wt" + i, tx: x, ty: y, col: "#6a5a3a", lbl: "枯れ花", act: "wilt", i }));
pk("mus", { id: "horse", tx: 2, ty: 12, col: "#3a2a1a", lbl: "隙間", act: "pick", k: "horse", t: "n_horse" });
pk("stu", { id: "tdoll", tx: 16, ty: 11, col: "#3a2a1a", lbl: "棚下", act: "pick", k: "tdoll", t: "n_tdoll" });
window.syncWorld2 = () => { for (const [r, id, k] of [["gst", "jar", "honey"], ["yard", "veg", "veg"], ["yard", "can", "can"], ["gh", "herb", "herb"], ["mus", "horse", "horse"], ["stu", "tdoll", "tdoll"]]) if (flags[k]) rm(r, id); };

// ---------- 仕組み ----------
const TR = n => flags.tr[n] = Math.max(flags.tr[n], 1);
const got = (...ks) => ks.every(k => flags[k]);
const done = (n, npc, key, fr) => { flags["sub" + n] = 2; flags.tr[npc] = 2; gain(fr); updateInv(); say(L(key)); };
Object.assign(ACT, {
  pick: e => { flags[e.k] = true; syncWorld(); updateInv(); say2(e.t); },
  wilt: e => { if (flags["wt" + e.i]) return say2("n_wtD"); if (!flags.can) return say2("n_wt0"); flags["wt" + e.i] = 1; say2("n_wtW"); },
  seb: () => { const s = flags.sub1; if (s === 2) return say2("n_sebAfter");
    if (s === 1) return flags.gear ? done(1, "seb", "n_sebDone", "fs1") : say2("n_sebHint");
    if (!flags.tr.seb) { TR("seb"); return say2("n_seb"); } flags.sub1 = 1; flags.watch = true; updateInv(); say2("n_sebReq"); },
  mar: () => { const s = flags.sub2; if (s === 2) return say2("n_marAfter");
    if (s === 1) return got("herb", "veg", "honey") ? done(2, "mar", "n_marDone", "fs2") : say2("n_marHint");
    if (!flags.tr.mar) { TR("mar"); return say2("n_mar"); } flags.sub2 = 1; say2("n_marReq"); },
  noah: () => { const s = flags.sub3; if (s === 2) return say2("n_noahAfter");
    if (s === 1) return got("horse", "tdoll") ? done(3, "noah", "n_noahDone", "fs3") : say2("n_noahHint");
    if (!flags.tr.noah) { TR("noah"); return say2("n_noah"); } flags.sub3 = 1; say2("n_noahReq"); },
});
const _clk = ACT.clk; ACT.clk = () => (flags.sub1 === 1 && !flags.gear) ? (flags.gear = true, updateInv(), say2("n_gear")) : _clk();
const _lise = ACT.lise; ACT.lise = () => { TR("lise"); _lise(); };
const _liseG = ACT.liseG;
ACT.liseG = () => { TR("lise");
  if (flags.rec7 && !flags.liseTold) return _liseG();
  if (flags.p7 && flags.sub4 === 0) { flags.sub4 = 1; return say2("n_liseSub"); }
  if (flags.sub4 === 1) return (flags.wt0 && flags.wt1 && flags.wt2) ? done(4, "lise", "n_liseDone", "fs4") : say2("n_liseSubH");
  _liseG(); };
window.trustLine = () => { const st = n => "Lv" + flags.tr[n] + "/2"; return `信頼度  セバスチャン ${st("seb")}  マーサ ${st("mar")}  ノア ${st("noah")}  リゼ ${st("lise")}  / サブイベント ${[1, 2, 3, 4].filter(n => flags["sub" + n] === 2).length}/4`; };

// ---------- 記憶の混同(負担値90以上・オルゴールで抑えられるまで) ----------
const _say7 = say;
say = (lines, cb, face) => { if (!window.inEnd && flags.burden >= 90 && !flags.boxCalm && Array.isArray(lines) && lines.length && Math.random() < 0.4) {
  const pool = TX[lang].n_conf[0]; lines = [parse(pool[Math.floor(Math.random() * pool.length)]), ...lines]; } _say7(lines, cb, face); };
const _pd7 = window.postDraw; window.postDraw = c => { _pd7(c);
  if (flags.burden >= 90 && !flags.boxCalm) { const a = 0.1 + 0.06 * Math.sin(Date.now() / 250); c.fillStyle = `rgba(150,40,150,${a})`; c.fillRect(0, 0, W, H);
    c.fillStyle = `rgba(255,255,255,.05)`; c.fillRect(0, (Date.now() / 20) % H, W, 3); } };
syncWorld(); for (const k in bgs) delete bgs[k]; updateInv(); applyLang();

// ---------- 設定: 移動速度 ----------
S3("m_spd", "移動速度", "Move speed"); S3("spdN", "ゆっくり|ふつう|はやい", "Slow|Normal|Fast");
openSettings = (i = 0) => { const re = () => openSettings(mn.i);
  openMenu(tt("m_set"), [
    { l: `${tt("m_lang")}: ${lang === "ja" ? "日本語" : "English"}`, fn: () => { lang = lang === "ja" ? "en" : "ja"; applyLang(); re(); } },
    { l: `${tt("m_dark")}: ${window.darkOff ? "OFF" : "ON"}`, fn: () => { window.darkOff = !window.darkOff; re(); } },
    { l: `${tt("m_spd")}: ${TX[lang].spdN[0][SPEED - 1]}`, fn: () => { SPEED = SPEED % 3 + 1; try { localStorage.yokanSpeed = SPEED; } catch (e) {} re(); } },
    { l: tt("m_back"), fn: pauseMenu }], i, pauseMenu); };
try { const s = +localStorage.yokanSpeed; if (s >= 1 && s <= 3) SPEED = s; } catch (e) {}
