"use strict";
// ===== 3階・屋外(中庭・温室)・地下・時計塔・最終選択・エンディング本文 =====
// 進捗書「次の作業」1〜4 に対応。謎6(図書室)・謎7(温室)・謎8(地下)・謎9(時計塔)、覚醒第2/第3段階、全エンディング本文。
// 文章は S3(...) にまとめてある("|"=改行 / "||"=ページ切替 / "@h3 "=主人公の顔 / "@g4 "=祖母の顔)。
Object.assign(flags, { sp: 0, bd: [-1, -1, -1, -1], boxCalm: false, liseTold: false });
for (const [k, j, e] of [["ykey", "庭の鍵", "Garden key"], ["ukey", "地下への鍵", "Cellar key"]]) { I18N.ja.items[k] = j; I18N.en.items[k] = e; }
const ITEM_KEYS = ["box", "oldkey", "ckey", "ykey", "ukey"];          // 持ち物の表示順(game7で追加)
const RECS = [["abil", "n_abil", "能力の記録"], ["rec7", "n_rec7", "温室の古い記録"], ["diary", "n_diary", "アルベルトの日記"], ["rec", "n_recR", "復旧の記録"]];   // 記録(メニューで読み返せる)
const subsDone = () => [1, 2, 3, 4].every(n => flags["sub" + n] === 2);

// ---------- 文章 ----------
S3("n_stairs3", "三階へ続く階段。|…まだ、進むべき時ではない気がする。|(二階の部屋を、調べ尽くしていないようだ)");
S3("n_pok5", "四つの音が、静かに重なった。|持っているオルゴールが、同じ旋律を奏でる。|『その曲……知ってる。』|いつの間にか、リゼが扉のそばに立っていた。|『クララが、よく弾いていた曲だよ。』|…クララ。初めて聞く名前だ。|(この旋律は、時計塔で必要になりそうだ)");
S3("n_lise3", "『ねえ、聞いて。私、ずっとここにいるの。』|『だから館のことなら、何でも知っているつもりだったんだけど…。』|『最近、知らないことばかり出てくるの。不思議だね。』||『大丈夫。私はずっとここにいるよ。』|『三階には、まだ行ってないでしょう？ 家族の部屋があるの。』");
S3("n_pf3", "大きな家族の肖像画。|エドガー、エレノア、アルベルト、クララ、ノア、そして使用人の姿が並んでいる。|…六つ目の席だけ、ぽっかりと空いている。");
// 図書室(謎6)
S3("n_tree", "壁に掛けられた家系図。名前の横に、小さな印が添えられている。|当主エドガー(月)　夫人エレノア(星)|長男アルベルト(鍵)　長女クララ(花)|クララの子、ノア(鳥)|いちばん下の枠は、白紙のままだ。|『上の世代から、下の世代へ。』と、細い字で書き添えてある。");
S3("n_shOK", "五つの印を、世代の順に調べた。|本棚の奥で、かちりと音がした。|奥の板が外れ、古い記録と「庭の鍵」が出てきた。|「能力の記録」を手に入れた。");
S3("n_abil", "『この一族の者は、物に残された記憶を視ることができる。』|『その力は血筋に宿り、世代を越えて受け継がれていく。』|『ただし、他人の記憶を受け入れすぎてはならない。自分自身の記憶まで、失ってしまうから。』|…自分の力のことが、書かれている。|最後のページは白紙だった。見つめていると、文字がゆっくりと浮かび上がる。|『Bienvenue à la maison』|その下に、小さく。|『旋律の最後の音は、ラ。』");
S3("n_aw2", "その瞬間、視界が揺らいだ。|若い頃のクララが、本棚の前で誰かと話している。|…けれど、その相手の姿は見えない。|『お願い。私のことを忘れないで。』|その言葉とともに、映像が途切れた。|@h5 …っ、頭が…。|割れるように頭が痛む。|オルゴールを開くと、静かな旋律が流れ出した。|痛みが、少しずつ遠のいていく。|このオルゴールは、ただの形見ではないのかもしれない。|(能力が成長した。人物の記憶や会話も視えるようになった)");
S3("n_shDone", "本棚の奥は、空になっている。|家系図の白紙の枠が、こちらを見ている気がした。");
// 書斎・肖像画の間
S3("n_stDesk", "アルベルトの研究ノート。|『記憶は水のようなものだ。器がなければ、すべてこぼれ落ちる。』|『ならば器を作ればいい。人の記憶を、結晶に残す装置を。』|余白に、妹の字で一言。|『兄さん、無理はしないで。』");
S3("n_visAsk2", "この場所に残る記憶に、意識を向けてみますか？"); S3("n_noVis", "何かが残っている気配はある。|けれど、まだ視ることができない。");
S3("n_visStudy", "色が褪せ、青い影が部屋に満ちる。|若い男が、年配の男に深く頭を下げている。|『父さん、保存の期間を延ばさせてください。』|『…これ以上は、装置が持たん。』|『それでも。もう誰も、失いたくないんです。』|アルベルトの声は、少し震えていた。");
S3("n_pt0", "当主エドガーの肖像。|胸ポケットから、懐中時計の鎖がのぞいている。|厳しい顔つきの奥に、どこか疲れた影がある。");
S3("n_pt1", "夫人エレノアの肖像。|穏やかな微笑み。額縁の下に、小さな札がある。|『家族の食卓を、何よりも大切に。』");
S3("n_pt2", "長男アルベルトの肖像。|知的な目をした青年だ。|机の上に、淡く光る結晶が描かれている。");
S3("n_pt3", "長女クララの肖像。|優しい目の女性が、胸元で小さなオルゴールを抱えている。|…どこか、自分に似ている気がした。");
S3("n_visClara", "色が褪せ、青い影が部屋に満ちる。|女性が、幼い男の子の前にしゃがんでいる。|『母さん、どうして泣いているの？』|『…泣いてないわ。大丈夫。』|『あなたのことを、ずっと覚えていたいだけ。』|男の子は首をかしげて、にこりと笑った。|『じゃあ、僕も母さんのこと、忘れないよ。』");
S3("n_pt4", "ノアの肖像。|幼い少年が、木馬の隣で笑っている。|額縁の隅に、黒いリボンが結ばれている。|…日付の欄は、途中で途切れていた。");
S3("n_pt5", "絵のない額縁。|名札には、まだ何も書かれていない。|…いつか、誰かが描かれるはずだったのだろうか。");
// 中庭・温室(謎7)
S3("n_yardL", "裏口の扉は、固く閉ざされている。|錆びた鍵穴がある。(庭の鍵が必要なようだ)");
S3("n_fnt", "苔むした噴水。縁に、二つの名前が彫られている。|『Clara』と、その隣に…誰かの名前。|けれど、そちらは削り取られていて、読めなかった。");
S3("n_bench", "古いベンチ。|二人並んで座れる大きさだ。|座面は、ほんのり温かい気がした。");
S3("n_liseG1", "『あ、来てくれたんだ。ちょうど花の世話をしていたところなの。』|『いくつか枯れちゃってるけど…ここの子たちは、季節をちゃんと覚えているんだよ。』|『春、夏、秋、冬。花壇に、花を並べてあげて。』");
S3("n_liseG2", "『花って不思議だね。季節が来ると、ちゃんと思い出すの。』|『…私は、思い出せないことのほうが多いのに。』");
S3("n_liseG3", "『…ううん、気にしないで。大丈夫。』|『地下には、近づきたくないの。どうしてかは、分からないけど。』");
S3("n_liseG4", "『地下から戻ってきたんだね。』|『何か、分かった？ …ううん、まだ聞かないでおくね。』|『時計塔で待ってる。最後まで、見ていてね。』");
for (let i = 0; i < 4; i++) S3("n_fl" + i, ["チューリップの鉢。|雪どけの土から、まっさきに顔を出す花だ。", "ひまわりの鉢。|真夏の太陽を追いかけて、大きく咲く。", "コスモスの鉢。|秋風に揺れる、淡い桃色の花。", "クリスマスローズの鉢。|雪の中で、うつむきながら咲く冬の花。"][i]);
S3("n_bedDone", "四つの花壇が、それぞれの季節の花で満ちている。");
S3("n_p7ok", "四つの花が、それぞれの季節の花壇で咲きそろった。|温室の奥で、かたりと音がする。|土の中から、古い鍵が現れた。|「地下への鍵」を手に入れた。|…そのとき、花の香りとともに、誰かの記憶が流れ込んできた。|二人の少女が、この温室で笑っている。|一人はクララ。もう一人は…顔が、ぼやけている。|『ずっと友達でいようね。』|笑い声が、どこかリゼに似ている気がした。|リゼが、嬉しそうに笑う。|『ありがとう。昔も、誰かがこうして手伝ってくれた気がする。』|(温室の奥の棚に、古い記録があるようだ)");
S3("n_rec7", "古い記憶装置の、登録名簿の写し。|当主エドガー、夫人エレノア、アルベルト、クララ、ノア、セバスチャン、マーサ…。|余白に、クララの字で走り書きがある。|『大切な友達のことを、装置に残したい。』|『でも、何度探しても、名簿のどこにも、あの子の名前がない。』|…リゼの名前は、どこにも存在しなかった。");
S3("n_tell", "@h3 …リゼ。この館の記録に、あなたの名前はなかったんだ。|リゼは、黙り込んだ。|『……そうなんだ。』|しばらくして、彼女は小さく笑った。|『じゃあ、私は誰なんだろうね。』|答えることが、できなかった。");
// 地下(謎8)
S3("n_fireK", "暖炉脇の隠し通路には、古い錠前がかかっている。|(鍵が必要なようだ)");
S3("n_fireOpen", "地下への鍵を石板に差し込むと、床がゆっくりとずれた。|冷たい空気が、階段の下から上がってくる。|…階段の下へ、降りてみよう。");
S3("n_vaultIn", "地下は、ひんやりとしていた。|無数の淡い光が、闇の中で瞬いている。|記憶結晶だ。中には、館の人々の姿が映っている。|けれど、その映像はところどころ壊れていた。");
S3("n_cr0", "結晶の中で、一人の女性が微笑んでいる。|…クララだ。ノイズ混じりの映像の中で、誰かに手を振っている。");
S3("n_cr1", "結晶の中に、森の奥の洋館が映っている。|…この館だ。窓には、明かりが灯っている。");
S3("n_cr2", "結晶の中で、巨大な歯車が回りはじめる。|眩い光とともに、何かが「起動」した瞬間の記憶のようだ。");
S3("n_crb", "ひび割れた結晶。映像は砂嵐のようで、何も読み取れない。");
S3("n_dev0", "中央の装置は、沈黙している。|(管理室に、使い方の手掛かりがあるかもしれない)"); S3("n_dev1", "装置には、結晶をはめる三つの窪みがある。|(まだ、部屋の結晶をすべて調べていない)");
S3("n_devAsk", "装置には『人物』『場所』『出来事』と刻まれた、三つの窪みがある。|日記の言葉を思い出して、結晶をはめよう。");
S3("n_devOpt", "歯車の光る結晶|微笑む女性の結晶|洋館の映る結晶");
S3("n_devBad", "結晶は、窪みに合わず弾かれた。|…もう一度、最初から考えてみよう。");
S3("n_devDone", "装置は静かに脈打っている。|混ざり合った記憶は、いまは落ち着いている。");
S3("n_aw3", "窪みに結晶をはめると、装置が低くうなりはじめた。|『人物』『場所』『出来事』。三つの光が、ひとつに重なっていく。|装置の奥に、文字が浮かぶ。|『人物の記憶を保存する。…人物の人格を、再現する。』|この装置は、記憶を残すだけではなかった。|人の心そのものを、写し取ろうとしていたのだ。|その瞬間、これまで見てきた記憶が、一斉に流れ込んできた。|アルベルト。クララ。ノア。セバスチャン。マーサ。|…そして、リゼ。|記憶が、混ざりはじめる。|@h2 …自分の、名前は…？|自分の名前が、思い出せない。|そのとき、オルゴールが鳴った。|聞き覚えのある旋律が、混ざり合った記憶を、少しずつほどいていく。|{n}は、自分を取り戻した。|(覚醒第3段階。記憶の深層と、記憶のつながりが視える)|(オルゴールが、他人の記憶との混濁を抑えてくれるようになった)|右手の壁の奥で、かちりと音がした。記録室の扉が開いたようだ。");
S3("n_diary", "アルベルトの日記。|『人はいつか忘れてしまう。』|『大切だった人の顔も、声も、過ごした時間も。』|『それならば、記憶を残せばいい。』|『そうすれば、もう誰も失わずに済む。』|『保存の期間を延ばした。もう一年、もう十年。』|『装置は、悲鳴のような音を立てはじめている。それでも、止められない。止めたら、みんなが消えてしまう。』|『整理の順は、人物、場所、出来事。誰が、どこで、何があったのか。』|『クララが、友人の記憶を残したいと言った。装置が、人の姿を作りはじめている。』|…装置の故障は、突然起きたものではなかった。|長い年月をかけて積もった記憶が、装置の限界を超えてしまったのだ。|アルベルトも、クララも、悪人ではない。ただ、失いたくなかっただけだ。");
S3("n_bp", "記憶管理装置の設計図。|欄外に走り書き。『保存期間、無期限』。|その文字は、何度も書き直されている。");
S3("n_recL", "記録室の扉は、固く閉ざされている。|中央の装置と、何か関係があるようだ。");
S3("n_recR", "『記憶装置 復旧の記録』|『一、保存された記憶を、人物ごとに整理する。』|『二、混ざった記憶を、本人の想いに沿ってほどく。』|『三、五つの音で、時計塔の大時計を動かす。時が動けば、装置の時間も動き出す。』|…ただし、すべてを救う方法までは、ここには書かれていない。|(時計塔の扉が、中庭で待っている気がする)");
// 時計塔(謎9)
S3("n_towL", "塔の扉は、固く閉ざされている。|(地下の記録室を、まだ調べていない)");
S3("n_panel", "五つの音階パネルが並んでいる。|ド、ミ、ソ、ラ。|…最初の四音は音楽室の旋律。最後の一音は、図書室の記録。");
S3("n_pedAsk", "台座にオルゴールを置くと、五つの音を入力する仕掛けが現れた。");
S3("n_clockOn", "五つ目の音が、塔に響いた。|大時計が、ゆっくりと動き出す。|止まっていた時間が、長い年月ぶりに流れ出した。|館全体が、光に包まれる。|これまで話していた住人たちの姿が、次々と過去の姿に戻っていく。|セバスチャンは、若い頃の執事の姿に。|マーサは、厨房に立っていた頃の姿に。|ノアは、幼い少年の姿に。|そして、クララの姿が現れた。|…そういうことだったのだ。|館にいた人々は、今を生きる人間ではなかった。|館に保存された、過去の人々の記憶。|交わした言葉も、見てきた日常も、すべて、過去の記憶が再現していたもの。|リゼが、そっと現れた。|『やっと、ここまで来たんだね。』|『ねえ。お願いがあるの。』|『私のこと、最後まで見ていて。』");
S3("n_finalAsk", "大時計の針が、動いている。|館の記憶を、どうしますか？");
S3("n_finalOpt", "記憶を残す|記憶を手放す|自分の記憶を使って館を救う");
S3("n_keep", "{n}は、館の記憶を、ありのまま残すことを選んだ。|装置を静かに止める。…忘れないでいることが、{n}にできることだった。");
S3("n_let", "{n}は、記憶を手放すことを選んだ。|装置を静かに止める。…忘れることも、悲しいだけではないのかもしれない。");
S3("n_use", "{n}は、自分の記憶を差し出して、館を救うことを選んだ。|オルゴールの旋律が、{n}の記憶と、館の記憶を結びはじめる。");
S3("n_useFail", "…けれど、足りないものがある。|住人たちの記憶を、すべては修復しきれなかった。|装置は、静かに止まっていく。");
// エンディング本文
S3("end_bad", "{n}は、記憶を視ることをやめられなかった。|負担は限界に達し、自分の記憶と他人の記憶の境目が、静かに溶けていく。|ノアの記憶が、自分の幼い頃の思い出に変わっていく。|クララの記憶が、自分の母親の記憶に変わっていく。|…最後には、自分が誰なのかさえ、分からなくなった。|誰かが、{n}の手を握った。|リゼだった。|『大丈夫だよ。』|『ここにいれば、何も忘れなくて済むから。』|視界が、暗くなっていく。|最後に、オルゴールの音だけが聞こえていた。");
S3("end_normal", "{n}は、館の謎を解ききらないまま、外へ出ることを選んだ。|玄関へ向かうと、館の住人たちが見送りに集まっていた。|セバスチャンは深く頭を下げ、マーサは小さく手を振る。|リゼは、最後まで笑顔だった。|『またね。』|{n}は森を抜け、家へ戻った。|祖母に館のことを尋ねる。けれど祖母は、何も答えなかった。|ただ、オルゴールを、じっと見つめている。|館で何が起きていたのか、分からないまま、日常が戻ってきた。|数日後。何気なくオルゴールを開くと、知らないはずの旋律が流れた。|そして{n}は、なぜか、涙を流していた。");
S3("end_true", "{n}は、一族と、能力と、館の真実を理解していた。|オルゴールの旋律が、塔いっぱいに広がっていく。|記憶装置の歯車が、ゆっくりと速度を落としていく。|…完全に止めることはできなかった。長い年月、保存され続けた記憶のすべてを、救うことはできない。|館の人々の姿が、少しずつ薄れていく。|ノアが、笑いかけた。|『もう大丈夫だよ。』|『僕のこと、忘れないでね。』|セバスチャンが、深く頭を下げる。|マーサは最後に、家族のために作っていた料理のことを話してくれた。|リゼが、{n}の前に立った。|『ねえ。私のこと、覚えていてくれる？』|{n}がうなずくと、リゼは安心したように笑った。|館の記憶は、完全には消えなかった。けれど、もう以前のように、人々の記憶が混ざり合うことはない。|{n}は、館をあとにした。|家に帰ると、祖母が待っていた。|館の話をすると、祖母は少しだけ悲しそうに笑う。|@g4 『そう……あなたも、あの子たちに会ったのね。』");
S3("end_secret", "{n}は、装置を止めるのではなく、保存された記憶を整理して復旧する道を見つけた。|セバスチャン、マーサ、ノア、リゼ。|それぞれの記憶が、ひとつずつ修復されていく。装置の負荷が、少しずつ軽くなる。|館に残された人々は、自分たちが過去の記憶であることを、静かに理解した。|セバスチャンは、静かに言った。|『ようやく、主人も安心して眠れることでしょう。』|マーサは、涙を浮かべて笑った。|『最後に、みんなで食卓を囲めてよかったわ。』|ノアは、木馬を抱きしめる。|『これで、もう忘れなくていいんだね。』|けれど、リゼだけは少し違っていた。|リゼは、自分がクララの記憶から生まれた存在だと理解した。|『私は、クララが忘れたくなかったものなんだね。』|@h3 あなたがここにいたことは、ちゃんと覚えている。|リゼは、微笑んだ。|『ありがとう。』|記憶装置は、静かに安定した。|館の人々は、自分たちの記憶が役割を終えたことを受け入れ、ひとり、またひとり、静かに消えていく。|最後に、リゼが振り返った。|『Bienvenue à la maison。』|今度の言葉は、{n}を迎えるものではない。|自分たちの家に、ようやく帰ることができた、という意味だった。");
S3("end_another", "館の記憶が、静かに語りはじめる。|祖母は、かつてこの館を訪れた。そのとき館は、すでに記憶の劣化が進んでいた。|祖母は記憶視認の力で、クララの記憶の中にいる「リゼ」と出会った。|クララは、祖母に頼んだ。|『お願い。あの子を忘れないで。』|祖母はリゼを救おうとした。けれど装置はすでに限界に近く、完全には修復できなかった。|祖母は、オルゴールを使って、リゼとクララの記憶の一部を保存した。|そして、自分の記憶の一部も、装置に残した。|館を離れるとき、祖母は言った。|『いつか、この子が来るかもしれない。そのときは、どうか迎えてあげて。』|リゼは、その言葉を覚えていた。|だから{n}が館に来たとき、初対面のはずなのに「おかえりなさい」と言ったのだ。|{n}は、時計塔の最上階で、祖母が残した最後の記録を見つけた。|オルゴールと一緒に、小さな手紙が置かれている。|『あなたがこの手紙を読んでいるということは、あの館にたどり着いたのでしょう。』|『きっと、不思議な人たちに出会ったと思います。あの人たちは、もうこの世にはいません。』|『それでも、あの館で過ごした時間は、確かに存在していました。私はずっと、あの場所を忘れられませんでした。』|『でも、あなたには私と同じ思いをしてほしくなかった。だから、オルゴールを渡しました。』|『あなたが自分自身を見失わないように。そして、いつか本当の意味で、あの人たちを送り出せるように。』|『ありがとう。どうか、あなたはあなたの人生を歩んでください。いつかまた、笑って会いましょう。』|手紙を読み終えた、その瞬間。リゼが現れた。|『おばあちゃん、元気？』|{n}は、少し驚いた。リゼは笑っている。|『そっか。あなたのおばあちゃんは、ちゃんと帰れたんだね。』|{n}は、オルゴールを取り出し、完成した旋律を奏でた。|館全体が、やわらかな光に包まれる。|セバスチャン、マーサ、ノア、クララ、そしてアルベルト。住人たちが、一人ずつ現れて、感謝を伝えてくれた。|最後に、リゼが言った。|『ねえ、最後にひとつだけお願いしてもいい？』|『ここを出たら、外の世界のことを教えてね。』|@h3 『うん。たくさん話すよ。』|リゼは、満足そうに目を閉じた。|『ありがとう。』|館の人々は、光の中へ消えていった。|{n}は、森を抜け、祖母の家へ戻った。|祖母は、窓辺で待っていた。|@g1 『おかえりなさい。』|@h3 『ただいま。』|祖母は、{n}を抱きしめた。|オルゴールを開くと、今まで聞いたことのない最後の旋律が、静かに流れた。");
S3("g6", "目的: 階段が開いた。三階で、一族の記録を探そう。(図書室の家系図と本棚が気になる)");
S3("g7", "目的: 屋外の温室へ向かおう。厨房の裏口は、庭の鍵で開く。");
S3("g8", "目的: 応接間の暖炉脇の隠し通路から、地下へ降りよう。(管理室の日記と、記憶結晶を調べよう)");
S3("g9", "目的: 地下の記録室の扉が開いた。中の記録を調べよう。");
S3("g10", "目的: 中庭の時計塔へ向かおう。五つの音を入力する。");
S3("g11", "目的: 時計塔の台座で、最後の選択をしよう。");

// ---------- タイル(屋外・温室) ----------
const rnd = (x, y, n) => ((x * 73 + y * 151 + n * 31) % 7);
DRAW.G = (c, x, y) => { rect(c, "#1c2f23", x, y, TS, TS); rect(c, "#27412e", x + 3 + rnd(x, y, 1) % 4, y + 4, 1, 2); rect(c, "#27412e", x + 10, y + 9 + rnd(x, y, 2) % 3, 1, 2); };
DRAW.g = (c, x, y) => { rect(c, "#48434f", x, y, TS, TS); rect(c, "#5a5462", x + 1, y + 1, 6, 6); rect(c, "#5a5462", x + 9, y + 8, 6, 6); rect(c, "#38333f", x, y + 7, TS, 1); };
DRAW.H = (c, x, y) => { rect(c, "#12281a", x, y, TS, TS); rect(c, "#1d3d26", x + 1, y + 2, 5, 4); rect(c, "#1d3d26", x + 8, y + 7, 6, 5); rect(c, "#0c1c12", x, y + TS - 2, TS, 2); };
DRAW.N = (c, x, y) => { rect(c, "#26454d", x, y, TS, TS); rect(c, "#5f939e", x, y, TS, 1); rect(c, "#5f939e", x + 7, y, 1, TS); rect(c, "#3a6672", x + 2, y + 3, 3, 8); };
DRAW.F = (c, x, y) => { rect(c, "#33392f", x, y, TS, TS); rect(c, "#3d4637", x + 1, y + 1, 7, 7); rect(c, "#3d4637", x + 8, y + 8, 7, 7); rect(c, "#2a3027", x, y, TS, 1); };
for (const ch of "HN") SOLID.add(ch);
const mkx = (fill, wall, f) => { const r = Array.from({ length: 15 }, (_, y) => [...(y < 2 || y === 14 ? wall.repeat(20) : wall + fill.repeat(18) + wall)]);
  for (const [c, x, y, x2 = x, y2 = y] of f) for (let j = y; j <= y2; j++) for (let i = x; i <= x2; i++) r[j][i] = c; return r.map(a => a.join("")); };
const setT = (m, x, y, ch) => { m[y] = m[y].slice(0, x) + ch + m[y].slice(x + 1); };
const rowWith = (len, ch, xs, base = "#") => { const a = Array(len).fill(base); xs.forEach(x => a[x] = ch); return a.join(""); };

// ---------- マップ ----------
MAPS.f3 = mk([["D", 0, 8], ["C", 1, 8, 18, 8]]); MAPS.f3[1] = "####D###D###D###P###";
MAPS.stu = mk([["C", 4, 4, 15, 9], ["D", 9, 14]]);
MAPS.lib3 = mk([["C", 4, 5, 15, 10], ["D", 9, 14]]);
MAPS.prt = mk([["C", 3, 4, 16, 10], ["D", 9, 14]]); const PT_X = [2, 5, 8, 11, 14, 17]; MAPS.prt[1] = rowWith(20, "P", PT_X);
setT(MAPS.kit, 19, 8, "D");
MAPS.yard = mkx("G", "H", [["g", 1, 8, 18, 8], ["g", 9, 2, 9, 7], ["g", 16, 2, 16, 7], ["D", 0, 8], ["D", 9, 1], ["D", 16, 1]]);
MAPS.gh = mkx("F", "N", [["D", 9, 14]]);
MAPS.tow = mk([["C", 8, 3, 11, 12], ["D", 9, 14]]); setT(MAPS.tow, 9, 1, "K"); setT(MAPS.tow, 10, 1, "K");
MAPS.vault = mk([["D", 9, 14], ["D", 0, 8], ["D", 19, 8]]);
MAPS.adm = mk([["T", 5, 4, 12, 4], ["D", 19, 8]]);
MAPS.rec = mk([["D", 0, 8]]);
DOORS.f2["19,8"] = door("f3", 1, 8, "right", { lock: "p5", fail: "n_stairs3" });
DOORS.f3 = { "0,8": door("f2", 18, 8, "left"), "4,1": door("stu", 9, 13, "up"), "8,1": door("lib3", 9, 13, "up"), "12,1": door("prt", 9, 13, "up") };
DOORS.stu = { "9,14": door("f3", 4, 2, "down") }; DOORS.lib3 = { "9,14": door("f3", 8, 2, "down") }; DOORS.prt = { "9,14": door("f3", 12, 2, "down") };
DOORS.kit["19,8"] = door("yard", 1, 8, "right", { lock: "ykey", fail: "n_yardL" });
DOORS.yard = { "0,8": door("kit", 18, 8, "left"), "9,1": door("gh", 9, 13, "up"), "16,1": door("tow", 9, 13, "up", { lock: "rec", fail: "n_towL" }) };
DOORS.gh = { "9,14": door("yard", 9, 2, "down") }; DOORS.tow = { "9,14": door("yard", 16, 2, "down") };
DOORS.vault = { "9,14": door("par", 9, 3, "down"), "0,8": door("adm", 18, 8, "left"), "19,8": door("rec", 1, 8, "right", { lock: "p8", fail: "n_recL" }) };
DOORS.adm = { "19,8": door("vault", 1, 8, "right") }; DOORS.rec = { "0,8": door("vault", 18, 8, "left") };

// ---------- 配置 ----------
const MARKS = ["花", "月", "鳥", "鍵", "星"], ORDER = ["月", "星", "鍵", "花", "鳥"];
ENTITIES.f3 = [sv("sv5", 3, 11)];
ENTITIES.stu = [{ id: "stDesk", tx: 8, ty: 3, tw: 4, col: "#5a3a22", lbl: "机", act: "stDesk" }, { id: "stChair", tx: 9, ty: 5, col: "#4a3a2a", lbl: "椅子", act: "visStudy" },
  { id: "stSh1", spr: "bookshelf", tx: 2, ty: 2, tw: 2, msg: "B" }, { id: "stSh2", spr: "bookshelf", tx: 15, ty: 2, tw: 2, msg: "B" }];
ENTITIES.lib3 = [...MARKS.map((m, i) => ({ id: "sh" + i, spr: "bookshelf", tx: 2 + i * 3, ty: 2, tw: 2, lbl: m, ly: 20, act: "shelf", i })),
  { id: "tree", tx: 16, ty: 7, tw: 2, th: 2, col: "#b8a77a", lbl: "家系図", act: "tree" }];
ENTITIES.prt = [sv("sv12", 3, 11)];
ENTITIES.yard = [{ id: "fnt", tx: 12, ty: 11, tw: 2, th: 2, col: "#4a6a7a", lbl: "噴水", act: "fnt" }, { id: "bench", tx: 4, ty: 10, tw: 2, col: "#5a3a22", lbl: "ベンチ", act: "bench" }, sv("sv6", 3, 12)];
const FL = ["チューリップ", "ひまわり", "コスモス", "クリスマスローズ"], SEAS = ["春", "夏", "秋", "冬"], FLC = ["#e0507a", "#f0c020", "#e08ac0", "#eef0f8"];
ENTITIES.gh = [{ id: "liseG", spr: "hatgirl", dir: "down", tx: 9, ty: 8, act: "liseG" }, sv("sv7", 2, 12),
  ...[0, 1, 2, 3].map(i => ({ id: "bed" + i, tx: 3 + i * 4, ty: 4, tw: 2, th: 2, col: "#3b2a1a", lbl: SEAS[i], ly: 24, act: "bed", i })),   // ly:24 = 季節ラベルは花の下に出す(花を隠さない)
  ...[0, 1, 2, 3].map(i => ({ id: "fl" + i, tx: 3 + i * 4, ty: 11, tw: 2, col: "#8a5a3a", lbl: FL[i], act: "fl", i }))];
ENTITIES.vault = [{ id: "dev", tx: 9, ty: 6, tw: 2, th: 2, col: "#3a5a7a", lbl: "装置", act: "dev" },
  { id: "c0", tx: 4, ty: 4, col: "#7ac0ff", lbl: "◇", act: "cr", i: 0 }, { id: "c1", tx: 15, ty: 4, col: "#a0ffc0", lbl: "◇", act: "cr", i: 1 }, { id: "c2", tx: 4, ty: 10, col: "#ffd27a", lbl: "◇", act: "cr", i: 2 },
  { id: "cb1", tx: 15, ty: 10, col: "#5a5a6a", lbl: "◇", act: "crb" }, { id: "cb2", tx: 7, ty: 11, col: "#5a5a6a", lbl: "◇", act: "crb" }, { id: "cb3", tx: 13, ty: 3, col: "#5a5a6a", lbl: "◇", act: "crb" }, sv("sv8", 17, 12)];
ENTITIES.adm = [{ id: "diaryD", tx: 8, ty: 2, tw: 2, col: "#5a3a22", lbl: "日記", act: "diaryD" }, { id: "bp", tx: 13, ty: 8, tw: 2, col: "#6a6a7a", lbl: "設計図", act: "bp" }, sv("sv9", 3, 11)];
ENTITIES.rec = [{ id: "recD", tx: 8, ty: 3, tw: 3, col: "#6a5a3a", lbl: "記録", act: "recD" }, sv("sv10", 16, 11)];
ENTITIES.tow = [{ id: "ped", tx: 9, ty: 6, tw: 2, col: "#b8a77a", lbl: "台座", act: "ped" }, { id: "panel", tx: 4, ty: 3, tw: 3, col: "#3a5a7a", lbl: "ド ミ ソ ラ", act: "panel" }, sv("sv11", 16, 11)];
TILEACT["f3:16,1"] = "pf3"; PT_X.forEach((x, i) => TILEACT[`prt:${x},1`] = "pt" + i);

// 描画: ラベル文字・花壇の花
const _de6 = drawEntity;
drawEntity = (c, e) => { _de6(c, e);
  const x0 = e.tx * TS, w = (e.tw || 1) * TS;
  if (e.act === "bed") { const v = flags.bd[e.i]; if (v >= 0) { const im = spr("fl_" + v);
    for (let k = 0; k < 3; k++) { if (ready(im)) c.drawImage(im, x0 + 2 + k * 10, e.ty * TS + 3 + (k % 2) * 3, 9, 14); else { rect(c, "#2f6a3a", x0 + 4 + k * 8, e.ty * TS + 14, 1, 7); rect(c, FLC[v], x0 + 3 + k * 8, e.ty * TS + 11, 3, 3); } } } }
  if (e.lbl) { c.save(); c.font = "bold 7px sans-serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.shadowColor = "#000"; c.shadowBlur = 2; c.fillStyle = e.lc || "#f0e0a0";
    c.fillText(e.lbl, x0 + w / 2, e.ty * TS + (e.ly || 8)); c.restore(); } };

// ---------- 仕組み ----------
const visAsk = (key, fr) => say2("n_visAsk2", () => choose(L("n_visOpt"), i => { if (i === 0) vision(key, () => { if (fr) gain(fr); }); }));
const visAt = (key, fr, need = 2) => () => flags.aw < need ? say2("n_noVis") : visAsk(key, fr);
function syncWorld() {
  if (flags.p6) rm("room1", "lise");
  if (flags.p7 && !ENTITIES.gh.some(e => e.id === "ghRec")) ENTITIES.gh.push({ id: "ghRec", tx: 16, ty: 9, tw: 2, col: "#6b4a2a", lbl: "古い棚", act: "ghRec" });
  if (window.syncWorld2) window.syncWorld2();
}
Object.assign(ACT, {
  pf3: () => say2("n_pf3"), tree: () => say2("n_tree"), stDesk: () => say2("n_stDesk"), visStudy: visAt("n_visStudy", "f6"),
  shelf: e => { if (flags.p6) return say2("n_shDone"); const m = MARKS[e.i];
    flags.sp = ORDER[flags.sp | 0] === m ? (flags.sp | 0) + 1 : (ORDER[0] === m ? 1 : 0);
    if (flags.sp < 5) return say([`本棚の背に、「${m}」の印がある。`]);
    flags.p6 = flags.ykey = flags.abil = flags.note5 = true; flags.aw = 2; flags.sp = 0; solve(); gain("f5"); updateInv(); syncWorld();
    say([...L("n_shOK"), ...L("n_abil"), ...L("n_aw2")]); },
  pt0: () => say2("n_pt0"), pt1: () => say2("n_pt1"), pt2: () => say2("n_pt2"), pt4: () => say2("n_pt4"), pt5: () => say2("n_pt5"),
  pt3: () => say2("n_pt3", () => { if (flags.aw >= 2) visAsk("n_visClara", "f7"); }),
  fnt: () => say2("n_fnt"), bench: () => say2("n_bench"),
  fl: e => say2("n_fl" + e.i),
  bed: e => { if (flags.p7) return say2("n_bedDone"); let v = flags.bd[e.i]; v = v >= 3 ? -1 : v + 1; flags.bd[e.i] = v;
    const msg = v < 0 ? `${SEAS[e.i]}の花壇は、空っぽになった。` : `${SEAS[e.i]}の花壇に「${FL[v]}」を植えた。`;
    if (flags.bd.every((x, i) => x === i)) { flags.p7 = flags.ukey = true; solve(); gain("f8"); updateInv(); syncWorld(); return say([msg, ...L("n_p7ok")]); }
    say([msg]); },
  ghRec: () => { const first = !flags.rec7; flags.rec7 = true; if (first) gain("f9"); say(L("n_rec7")); },
  liseG: () => flags.liseTold ? say2(flags.p8 ? "n_liseG4" : "n_liseG3") : flags.rec7 ? say(L("n_tell"), () => { flags.liseTold = true; gain("f9b"); }) : say2(flags.p7 ? "n_liseG2" : "n_liseG1"),
  fire: () => !flags.seen6 ? say2("n_fireA") : !flags.p3 ? (flags.p3 = true, solve(), say2("n_fire")) : !flags.ukey ? say2("n_fireK")
    : flags.cellar ? go(door("vault", 9, 13, "up")) : (flags.cellar = true, say2("n_fireOpen", () => say2("n_vaultIn", () => go(door("vault", 9, 13, "up"))))),
  cr: e => { const first = !flags["cr" + e.i]; flags["cr" + e.i] = true; if (first) gain("fc" + e.i); say2("n_cr" + e.i); }, crb: () => say2("n_crb"),
  dev: () => { if (flags.p8) return say2("n_devDone"); if (!flags.diary) return say2("n_dev0"); if (!(flags.cr0 && flags.cr1 && flags.cr2)) return say2("n_dev1");
    const ANS = [1, 2, 0], NM = ["人物", "場所", "出来事"]; let k = 0;
    const ask = () => say([`「${NM[k]}」の窪みに、どの結晶をはめる？`], () => choose(L("n_devOpt"), i => { if (i !== ANS[k]) return say2("n_devBad"); if (++k < 3) ask();
      else { flags.p8 = true; flags.aw = 3; flags.boxCalm = true; solve(); gain("f10"); say(L("n_aw3")); } }));
    say2("n_devAsk", ask); },
  diaryD: () => { if (!flags.diary) gain("f11"); flags.diary = true; say(L("n_diary")); }, bp: () => say2("n_bp"),
  recD: () => { if (!flags.rec) gain("f12"); flags.rec = true; say(L("n_recR")); },
  panel: () => say2("n_panel"),
  ped: () => { if (flags.p9) return finalAsk();
    const ANS = [0, 1, 2, 0, 3]; let k = 0;   // ド→ミ→ソ→ド→ラ (最初の4音=音楽室 / 最後の1音=図書室の記録)
    const ask = () => say([`${k + 1}つ目の音は？`], () => choose(NOTES, i => { if (i !== ANS[k]) return say2("n_bad"); if (++k < 5) ask(); else { flags.p9 = true; solve(); say(L("n_clockOn"), finalAsk); } }));
    say2("n_pedAsk", ask); },
});
ACT.lise = () => say2(flags.p5 ? "n_lise3" : flags.sol >= 1 ? "n_lise2" : "n_lise1");
const finalAsk = () => say2("n_finalAsk", () => choose(L("n_finalOpt"), i => {
  const trueOK = flags.p5 && flags.p6 && flags.p8 && flags.p9 && flags.abil && flags.diary && flags.burden < 100, secretOK = i === 2 && subsDone() && flags.rec && flags.p8 && flags.burden < 100;
  say(L(["n_keep", "n_let", "n_use"][i]), () => secretOK ? ending("secret") : i === 2 ? say2("n_useFail", () => ending(trueOK ? "true" : "normal")) : ending(trueOK ? "true" : "normal")); }));

// ---------- エンディング(本文+余韻の一文) ----------
const END_CARD = { normal: ["NORMAL END", "帰る場所", "真実を知らなくても、帰る場所はある。"], true: ["TRUE END", "残された記憶", "すべては救えなかった。それでも、忘れないことはできる。"],
  bad: ["BAD END", "忘却の中へ", "あなたは、あなたを忘れてしまった。"], secret: ["SECRET END", "記憶の継承", "忘れることを恐れなくてもいい。大切なものは、誰かの心に残る。"],
  another: ["ANOTHER END", "ただいま", "記憶は消えても、想いは残る。そして、帰る場所はいつだってそこにある。"] };
ending = id => {
  window.inEnd = true; const v = document.createElement("div"); v.style.cssText = "position:absolute;inset:0;background:#000;z-index:5"; $("wrap").insertBefore(v, msgEl2); msgEl2.style.zIndex = 6;
  say(L("end_" + id), () => { mode = "end"; msgEl2.hidden = true; const [a, b, cap] = END_CARD[id];
    try { localStorage.yokanEnds = JSON.stringify([...new Set([...seen(), id])]); } catch (e) {}
    v.style.cssText += ";display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#b8a77a;text-align:center;padding:0 6%";
    v.innerHTML = `<h1 style="letter-spacing:.25em;font-weight:normal;margin:0;font-size:clamp(16px,3.4cqw,30px)">${a}</h1><h2 style="font-weight:normal;margin:0;letter-spacing:.2em;font-size:clamp(14px,2.6cqw,24px)">${b}</h2>` +
      `<p style="margin:0;color:#d8d0c0;font-size:clamp(11px,2cqw,18px);line-height:1.7">${cap}</p><p style="font-style:italic;color:#8a8090;margin:0;font-size:clamp(10px,1.6cqw,14px)">Bienvenue à la maison</p>` +
      `<button style="background:#1a1620;color:#d8d0c0;border:1px solid #5a4e6a;padding:8px 18px;font-size:16px;cursor:pointer">${L("toTitle")[0]}</button>`;
    v.querySelector("button").onclick = () => location.reload(); });
};

// ---------- 持ち物・記録・目的 ----------
const ITEM_HIDE = {};   // 使い終えたアイテムを持ち物から隠す条件(game7で追加)
const hasItem = k => (k === "box" || !!flags[k]) && !(ITEM_HIDE[k] && ITEM_HIDE[k]());
updateInv = () => { $("inv").textContent = t().invLabel + ITEM_KEYS.filter(hasItem).map(k => t().items[k]).join(" / "); };
goalKey = () => { const f = flags; return !f.p1 ? "g1" : !f.p2 ? "g2" : !f.p3 ? "g3" : !(f.p4 && f.p5) ? "g5" : !f.p6 ? "g6" : !f.p7 ? "g7" : !f.p8 ? "g8" : !f.rec ? "g9" : !f.p9 ? "g10" : "g11"; };
openItems = (i = 0) => { const f = flags, T = DECIDE.burdenTiers, lv = f.burden >= T[3] ? "危険な状態" : f.burden >= T[2] ? "自分の記憶に違和感" : f.burden >= T[1] ? "他人の声が混ざる" : f.burden >= T[0] ? "過去の記憶が見える" : "通常";
  const recs = RECS.filter(([k]) => f[k]);
  openMenu(tt("m_items"), [{ l: tt("m_goal"), fn: () => { const k = mn.i; detail(L(goalKey()), () => openItems(k)); } },
    { h: 1, l: `${tt("m_hi")}: ${ITEM_KEYS.filter(hasItem).map(k => t().items[k]).join(" / ")}` },
    ...(recs.length ? [{ h: 1, l: tt("m_hr") }, ...recs.map(([k, tx, nm]) => ({ l: nm, fn: () => { const j = mn.i; detail(L(tx), () => openItems(j)); } }))] : []),
    { h: 1, l: `記憶の断片: ${f.frag}` }, ...(f.aw ? [{ h: 1, l: `覚醒: 第${f.aw}段階 / 記憶の負担: ${lv}` }] : []),
    ...(window.trustLine ? [{ h: 1, l: window.trustLine() }] : []), { l: tt("m_back"), fn: pauseMenu }], i); };
const _cb6 = contBtn.onclick; contBtn.onclick = () => { _cb6(); syncWorld(); };
syncWorld(); for (const k in bgs) delete bgs[k]; updateInv(); applyLang();
try { const d = hasSave() && JSON.parse(localStorage[SK]); if (d && !MAPS[d.cur]) { delete localStorage[SK]; contBtn.hidden = true; } } catch (e) {}   // 旧構成のセーブは使えない(全マップが揃ってから判定)
