// =============================================
// 가돌 단어 사전 데이터
// 단어 클릭 시 즉시 보여줄 어휘 정보
// =============================================

const WORD_DICT = {

  // ===== ENGLISH WORDS (KJV) =====
  en: {
    'In': { word:'In', lang:'en', meaning:'~에서, ~에', pos:'전치사', lemma:'in', note:'위치·시간 전치사', examples:[{ text:'In the beginning God created…', ref:'창 1:1' }] },
    'beginning': { word:'beginning', lang:'en', meaning:'태초, 시작', pos:'명사', lemma:'beginning', note:'시간의 절대적 시작점', examples:[{ text:'In the beginning was the Word', ref:'요 1:1' }] },
    'God': { word:'God', lang:'en', meaning:'하나님', pos:'고유명사', lemma:'God', note:'창조주 하나님', examples:[{ text:'And God said, Let there be light', ref:'창 1:3' }] },
    'created': { word:'created', lang:'en', meaning:'창조하셨다', pos:'동사', lemma:'create', tense:'과거형', note:'무에서 유를 만드는 행위(히브리어: bara)', examples:[{ text:'God created the heaven and the earth', ref:'창 1:1' }] },
    'heaven': { word:'heaven', lang:'en', meaning:'하늘', pos:'명사', lemma:'heaven', note:'창공, 하늘나라를 모두 포함', examples:[{ text:'he made the stars also', ref:'창 1:16' }] },
    'earth': { word:'earth', lang:'en', meaning:'땅, 지구', pos:'명사', lemma:'earth', examples:[{ text:'the earth was without form', ref:'창 1:2' }] },
    'light': { word:'light', lang:'en', meaning:'빛', pos:'명사', lemma:'light', examples:[{ text:'Let there be light', ref:'창 1:3' }] },
    'darkness': { word:'darkness', lang:'en', meaning:'어두움', pos:'명사', lemma:'darkness', examples:[{ text:'darkness was upon the face of the deep', ref:'창 1:2' }] },
    'waters': { word:'waters', lang:'en', meaning:'물들', pos:'명사(복수)', lemma:'water', note:'물의 복수형. 고대 히브리 우주관에서 원초적 혼돈을 상징', examples:[{ text:'the Spirit moved upon the face of the waters', ref:'창 1:2' }] },
    'Word': { word:'Word', lang:'en', meaning:'말씀 (로고스)', pos:'명사', lemma:'Word', note:'그리스어 λόγος(logos) — 신적 이성과 계시를 의미', examples:[{ text:'In the beginning was the Word', ref:'요 1:1' }] },
    'made': { word:'made', lang:'en', meaning:'만들어졌다', pos:'동사', lemma:'make', tense:'과거형', examples:[{ text:'All things were made by him', ref:'요 1:3' }] },
    'flesh': { word:'flesh', lang:'en', meaning:'육신', pos:'명사', lemma:'flesh', note:'신이 인간의 몸을 입은 성육신(成肉身)을 의미', examples:[{ text:'the Word was made flesh', ref:'요 1:14' }] },
    'grace': { word:'grace', lang:'en', meaning:'은혜', pos:'명사', lemma:'grace', examples:[{ text:'full of grace and truth', ref:'요 1:14' }] },
    'truth': { word:'truth', lang:'en', meaning:'진리', pos:'명사', lemma:'truth', examples:[{ text:'grace and truth came by Jesus Christ', ref:'요 1:17' }] },
    'Lamb': { word:'Lamb', lang:'en', meaning:'어린 양', pos:'명사', lemma:'Lamb', note:'죄를 속하기 위한 희생제물의 상징. 예수를 가리킴', examples:[{ text:'Behold the Lamb of God', ref:'요 1:29' }] },
    'life': { word:'life', lang:'en', meaning:'생명', pos:'명사', lemma:'life', examples:[{ text:'In him was life', ref:'요 1:4' }] },
    'world': { word:'world', lang:'en', meaning:'세상', pos:'명사', lemma:'world', examples:[{ text:'the world was made by him', ref:'요 1:10' }] },
    'believed': { word:'believed', lang:'en', meaning:'믿었다', pos:'동사', lemma:'believe', tense:'과거형', examples:[{ text:'all men through him might believe', ref:'요 1:7' }] },
    'follow': { word:'follow', lang:'en', meaning:'따르다', pos:'동사', lemma:'follow', examples:[{ text:'Follow me', ref:'요 1:43' }] },
    'firmament': { word:'firmament', lang:'en', meaning:'궁창, 창공', pos:'명사', lemma:'firmament', note:'히브리어 raqia: 하늘의 돔 모양 천장', examples:[{ text:'Let there be a firmament in the midst', ref:'창 1:6' }] },
    'Spirit': { word:'Spirit', lang:'en', meaning:'성령, 하나님의 영', pos:'명사', lemma:'Spirit', examples:[{ text:'the Spirit of God moved upon the waters', ref:'창 1:2' }] },
    'image': { word:'image', lang:'en', meaning:'형상', pos:'명사', lemma:'image', note:'히브리어 tselem: 복사본, 형상', examples:[{ text:'Let us make man in our image', ref:'창 1:26' }] },
    'dominion': { word:'dominion', lang:'en', meaning:'다스림, 통치', pos:'명사', lemma:'dominion', examples:[{ text:'have dominion over the fish of the sea', ref:'창 1:28' }] },
    'Christ': { word:'Christ', lang:'en', meaning:'그리스도', pos:'고유명사', lemma:'Christ', note:'그리스어 Χριστός(Christos), 히브리어 Mashiach(메시야) — 기름 부음을 받은 자', examples:[{ text:'grace and truth came by Jesus Christ', ref:'요 1:17' }] },
    'Son': { word:'Son', lang:'en', meaning:'아들', pos:'명사', lemma:'Son', examples:[{ text:'the only begotten Son', ref:'요 1:18' }] },
    'baptize': { word:'baptize', lang:'en', meaning:'세례를 주다', pos:'동사', lemma:'baptize', examples:[{ text:'I baptize with water', ref:'요 1:26' }] },
  },

  // ===== CHINESE WORDS (CUV 和合本) =====
  zh: {
    '起初': { word:'起初', lang:'zh', pinyin:'qǐchū', meaning:'태초에, 처음에', pos:'부사', tone:'3성-1성', note:'시간의 절대적 시작을 의미. 요한복음 1:1의 太初(tàichū)와 유사', examples:[{ text:'起初，神创造天地。', ref:'창 1:1' }] },
    '太初': { word:'太初', lang:'zh', pinyin:'tàichū', meaning:'태초에, 아주 먼 처음', pos:'명사/부사', tone:'4성-1성', note:'창세기의 起初보다 더욱 강조된 "절대적 태초"', examples:[{ text:'太初有道', ref:'요 1:1' }] },
    '神': { word:'神', lang:'zh', pinyin:'shén', meaning:'하나님, 신', pos:'명사', tone:'2성', note:'중국어 성경에서 하나님을 지칭. 上帝(shàngdì)와 함께 사용됨', examples:[{ text:'神创造天地', ref:'창 1:1' }, { text:'道就是神', ref:'요 1:1' }] },
    '创造': { word:'创造', lang:'zh', pinyin:'chuàngzào', meaning:'창조하다', pos:'동사', tone:'4성-4성', note:'무에서 유를 만드는 행위', examples:[{ text:'神创造天地', ref:'창 1:1' }] },
    '天地': { word:'天地', lang:'zh', pinyin:'tiāndì', meaning:'천지, 하늘과 땅', pos:'명사', tone:'1성-4성', note:'우주 전체를 의미하는 관용어', examples:[{ text:'神创造天地', ref:'창 1:1' }] },
    '道': { word:'道', lang:'zh', pinyin:'dào', meaning:'말씀 (로고스), 도', pos:'명사', tone:'4성', note:'그리스어 Logos(λόγος)의 번역. 진리와 이성을 포함하는 철학적 개념', examples:[{ text:'太初有道，道与神同在', ref:'요 1:1' }] },
    '光': { word:'光', lang:'zh', pinyin:'guāng', meaning:'빛', pos:'명사', tone:'1성', examples:[{ text:'神说：要有光，就有了光', ref:'창 1:3' }] },
    '光明': { word:'光明', lang:'zh', pinyin:'guāngmíng', meaning:'빛, 광명', pos:'명사/형용사', tone:'1성-2성', examples:[{ text:'神造出两个大光体', ref:'창 1:16' }] },
    '说': { word:'说', lang:'zh', pinyin:'shuō', meaning:'말하다, 말씀하시다', pos:'동사', tone:'1성', note:'신의 말씀도 같은 동사 사용', examples:[{ text:'神说：要有光', ref:'창 1:3' }] },
    '生命': { word:'生命', lang:'zh', pinyin:'shēngmìng', meaning:'생명', pos:'명사', tone:'1성-4성', examples:[{ text:'在他里头有生命', ref:'요 1:4' }] },
    '恩典': { word:'恩典', lang:'zh', pinyin:'ēndiǎn', meaning:'은혜', pos:'명사', tone:'1성-3성', examples:[{ text:'充充满满地有恩典，有真理', ref:'요 1:14' }] },
    '真理': { word:'真理', lang:'zh', pinyin:'zhēnlǐ', meaning:'진리', pos:'명사', tone:'1성-3성', examples:[{ text:'恩典和真理都是由耶稣基督来的', ref:'요 1:17' }] },
    '肉身': { word:'肉身', lang:'zh', pinyin:'ròushēn', meaning:'육신', pos:'명사', tone:'4성-1성', note:'성육신(成肉身) — 신이 인간의 몸을 입음', examples:[{ text:'道成了肉身', ref:'요 1:14' }] },
    '世界': { word:'世界', lang:'zh', pinyin:'shìjiè', meaning:'세상', pos:'명사', tone:'4성-4성', examples:[{ text:'世界也是借着他造的', ref:'요 1:10' }] },
    '形像': { word:'形像', lang:'zh', pinyin:'xíngyòng', meaning:'형상', pos:'명사', tone:'2성-4성', note:'형태·모양·닮음을 의미', examples:[{ text:'照着我们的形像造人', ref:'창 1:26' }] },
    '羔羊': { word:'羔羊', lang:'zh', pinyin:'gāoyáng', meaning:'어린 양', pos:'명사', tone:'1성-2성', note:'희생 제물로서의 어린 양', examples:[{ text:'神的羔羊，除去世人罪孽的', ref:'요 1:29' }] },
    '罪': { word:'罪', lang:'zh', pinyin:'zuì', meaning:'죄', pos:'명사', tone:'4성', examples:[{ text:'除去世人罪孽的', ref:'요 1:29' }] },
    '水': { word:'水', lang:'zh', pinyin:'shuǐ', meaning:'물', pos:'명사', tone:'3성', examples:[{ text:'神的灵运行在水面上', ref:'창 1:2' }] },
    '施洗': { word:'施洗', lang:'zh', pinyin:'shīxǐ', meaning:'세례를 주다', pos:'동사', tone:'1성-3성', examples:[{ text:'我是用水施洗', ref:'요 1:26' }] },
    '信': { word:'信', lang:'zh', pinyin:'xìn', meaning:'믿다', pos:'동사', tone:'4성', examples:[{ text:'叫众人因他可以信', ref:'요 1:7' }] },
    '跟从': { word:'跟从', lang:'zh', pinyin:'gēncóng', meaning:'따르다, 좇다', pos:'动词', tone:'1성-2성', examples:[{ text:'两个门徒听见…就跟从了耶稣', ref:'요 1:37' }] },
    '见证': { word:'见证', lang:'zh', pinyin:'jiànzhèng', meaning:'증거, 증언', pos:'명사/동사', tone:'4성-4성', examples:[{ text:'约翰为他作见证', ref:'요 1:15' }] },
    '接待': { word:'接待', lang:'zh', pinyin:'jiēdài', meaning:'영접하다, 받아들이다', pos:'동사', tone:'1성-4성', examples:[{ text:'自己的人倒不接待他', ref:'요 1:11' }] },
    '黑暗': { word:'黑暗', lang:'zh', pinyin:'hēiàn', meaning:'어둠', pos:'명사/형용사', tone:'1성-4성', examples:[{ text:'光照在黑暗里', ref:'요 1:5' }] },
  },

  // ===== RUSSIAN WORDS (Synodal) =====
  ru: {
    'В': { word:'В', lang:'ru', stress:'в', meaning:'~에서, ~안에', pos:'전치사', case_gov:'전치격(예비격)', note:'장소·시간의 전치사. + 전치격(о, в)', examples:[{ text:'В начале сотворил Бог', ref:'창 1:1' }] },
    'начале': { word:'начале', lang:'ru', stress:'нача́ле', meaning:'태초에, 처음에', pos:'명사', lemma:'начало', case:'전치격', gender:'중성', note:'начало의 전치격. В начале = "태초에"', examples:[{ text:'В начале сотворил Бог небо и землю', ref:'창 1:1' }] },
    'сотворил': { word:'сотворил', lang:'ru', stress:'сотвори́л', meaning:'창조하셨다', pos:'동사', lemma:'сотворить', tense:'과거형', gender:'남성 단수', aspect:'완료상(perfective)', note:'сотворить = со+творить (완전히 만들어내다). 완료상 동사', examples:[{ text:'В начале сотворил Бог небо и землю', ref:'창 1:1' }] },
    'Бог': { word:'Бог', lang:'ru', stress:'Бог', meaning:'하나님', pos:'명사', case:'주격', gender:'남성', note:'신을 가리키는 고유명사. 주격 형태', examples:[{ text:'сотворил Бог небо и землю', ref:'창 1:1' }] },
    'небо': { word:'небо', lang:'ru', stress:'не́бо', meaning:'하늘', pos:'명사', case:'대격', gender:'중성', note:'небо의 대격. Бог сотворил что? → небо(하늘을)', examples:[{ text:'сотворил Бог небо и землю', ref:'창 1:1' }] },
    'землю': { word:'землю', lang:'ru', stress:'зе́млю', meaning:'땅을', pos:'명사', lemma:'земля', case:'대격', gender:'여성', note:'земля(땅)의 대격. 직접목적어', examples:[{ text:'сотворил Бог небо и землю', ref:'창 1:1' }] },
    'земля': { word:'земля', lang:'ru', stress:'земля́', meaning:'땅, 지구', pos:'명사', case:'주격', gender:'여성', examples:[{ text:'Земля же была безвидна и пуста', ref:'창 1:2' }] },
    'Слово': { word:'Слово', lang:'ru', stress:'Сло́во', meaning:'말씀 (로고스)', pos:'명사', case:'주격', gender:'중성', note:'그리스어 Logos(λόγος)의 러시아어 번역', examples:[{ text:'В начале было Слово', ref:'요 1:1' }] },
    'было': { word:'было', lang:'ru', stress:'бы́ло', meaning:'있었다', pos:'동사', lemma:'быть', tense:'과거형', gender:'중성', note:'быть(있다/이다)의 과거형 중성 형태', examples:[{ text:'В начале было Слово', ref:'요 1:1' }] },
    'Бога': { word:'Бога', lang:'ru', stress:'Бо́га', meaning:'하나님과(의)', pos:'명사', lemma:'Бог', case:'생격/대격', gender:'남성', note:'у Бога = 하나님과 함께, у + 생격', examples:[{ text:'Слово было у Бога', ref:'요 1:1' }] },
    'жизнь': { word:'жизнь', lang:'ru', stress:'жизнь', meaning:'생명', pos:'명사', case:'주격', gender:'여성', examples:[{ text:'В Нём была жизнь', ref:'요 1:4' }] },
    'свет': { word:'свет', lang:'ru', stress:'свет', meaning:'빛', pos:'명사', case:'주격', gender:'남성', examples:[{ text:'и жизнь была свет человеков', ref:'요 1:4' }] },
    'тьма': { word:'тьма', lang:'ru', stress:'тьма', meaning:'어두움', pos:'명사', case:'주격', gender:'여성', examples:[{ text:'И свет во тьме светит', ref:'요 1:5' }] },
    'мир': { word:'мир', lang:'ru', stress:'мир', meaning:'세상', pos:'명사', case:'주격', gender:'남성', note:'평화(мир)와 동형이의어. 문맥상 "세상"', examples:[{ text:'мир чрез Него начал быть', ref:'요 1:10' }] },
    'благодать': { word:'благодать', lang:'ru', stress:'благода́ть', meaning:'은혜', pos:'명사', case:'주격', gender:'여성', examples:[{ text:'полное благодати и истины', ref:'요 1:14' }] },
    'истина': { word:'истина', lang:'ru', stress:'и́стина', meaning:'진리', pos:'명사', case:'주격', gender:'여성', examples:[{ text:'благодать же и истина произошли', ref:'요 1:17' }] },
    'плоть': { word:'плоть', lang:'ru', stress:'плоть', meaning:'육신, 살', pos:'명사', case:'주격', gender:'여성', note:'성육신에서 사용되는 단어', examples:[{ text:'Слово стало плотию', ref:'요 1:14' }] },
    'Духа': { word:'Духа', lang:'ru', stress:'Ду́ха', meaning:'성령을, 영의', pos:'명사', lemma:'Дух', case:'생격/대격', gender:'남성', note:'Дух Святой(성령)의 생격 형태', examples:[{ text:'я видел Духа, сходящего с неба', ref:'요 1:32' }] },
    'Агнец': { word:'Агнец', lang:'ru', stress:'А́гнец', meaning:'어린 양', pos:'명사', case:'주격', gender:'남성', note:'하나님의 어린 양 — 예수를 가리키는 칭호', examples:[{ text:'вот Агнец Божий', ref:'요 1:29' }] },
    'крестить': { word:'крестить', lang:'ru', stress:'крести́ть', meaning:'세례를 주다', pos:'동사', lemma:'крестить', aspect:'불완료상', note:'세례(крещение)의 동사형', examples:[{ text:'я крещу в воде', ref:'요 1:26' }] },
    'сотворить': { word:'сотворить', lang:'ru', stress:'сотвори́ть', meaning:'창조하다', pos:'동사', aspect:'완료상(perfective)', note:'творить(만들다)의 완료상. 완전히 완성된 창조를 강조', examples:[{ text:'И сотворил Бог человека', ref:'창 1:27' }] },
    'человека': { word:'человека', lang:'ru', stress:'челове́ка', meaning:'사람을', pos:'명사', lemma:'человек', case:'대격', gender:'남성', examples:[{ text:'И сотворил Бог человека', ref:'창 1:27' }] },
    'образу': { word:'образу', lang:'ru', stress:'о́бразу', meaning:'형상대로', pos:'명사', lemma:'образ', case:'여격', gender:'남성', note:'по образу = ~의 형상대로, по + 여격', examples:[{ text:'сотворим человека по образу Нашему', ref:'창 1:26' }] },
    'следовал': { word:'следовал', lang:'ru', stress:'сле́довал', meaning:'따랐다', pos:'동사', lemma:'следовать', tense:'과거', gender:'남성', examples:[{ text:'оба ученика пошли за Иисусом', ref:'요 1:37' }] },
  },

  // ===== JAPANESE WORDS (口語訳, Public Domain) =====
  ja: {
    '初め': { word:'初め', lang:'ja', reading:'はじめ (hajime)', meaning:'처음, 태초', pos:'명사', note:'태초·처음을 뜻하는 일본어. 창세기의 初めに(はじめに)는 히브리어 bereshit의 번역', examples:[{ text:'初めに、神は天と地とを創造された。', ref:'창 1:1' }, { text:'初めに言があった。', ref:'요 1:1' }] },
    '神': { word:'神', lang:'ja', reading:'かみ (kami)', meaning:'하나님, 신', pos:'명사', note:'일본어로 神(かみ)는 일반적으로 신을 뜻하며, 성경에서는 창조주 하나님을 가리킵니다. 일본 신토(神道)의 신과 구별됩니다.', examples:[{ text:'神は天と地とを創造された', ref:'창 1:1' }] },
    '天': { word:'天', lang:'ja', reading:'てん / あめ (ten/ame)', meaning:'하늘', pos:'명사', note:'天(てん)는 하늘, 하나님의 나라를 의미. 天と地(てんとち) = 하늘과 땅 = 온 우주', examples:[{ text:'神は天と地とを創造された', ref:'창 1:1' }] },
    '地': { word:'地', lang:'ja', reading:'ち (chi)', meaning:'땅, 지구', pos:'명사', note:'大地(だいち)는 큰 땅. 창세기에서 천지(天地)는 온 우주를 의미', examples:[{ text:'神は天と地とを創造された', ref:'창 1:1' }] },
    '創造': { word:'創造', lang:'ja', reading:'そうぞう (sōzō)', meaning:'창조하다', pos:'동사/명사', note:'創(つくる=만들다)+造(つくる=짓다). 히브리어 bara(바라)처럼 무에서 유를 창조하는 행위', examples:[{ text:'神は天と地とを創造された', ref:'창 1:1' }] },
    '光': { word:'光', lang:'ja', reading:'ひかり (hikari)', meaning:'빛', pos:'명사', note:'光あれ(ひかりあれ) = "빛이 있으라"는 하나님의 첫 창조 명령', examples:[{ text:'神は「光あれ」と言われた', ref:'창 1:3' }] },
    '言': { word:'言', lang:'ja', reading:'こと (koto)', meaning:'말씀 (로고스)', pos:'명사', note:'요한복음에서 그리스어 Logos(λόγος)를 言(こと)으로 번역. 신적 말씀·이성을 의미', examples:[{ text:'初めに言があった', ref:'요 1:1' }] },
    '命': { word:'命', lang:'ja', reading:'いのち (inochi)', meaning:'생명', pos:'명사', note:'이노치(命)는 생명, 삶. 요한복음에서 예수님 안의 신적 생명을 가리킴', examples:[{ text:'この言の中に命があった', ref:'요 1:4' }] },
    '肉体': { word:'肉体', lang:'ja', reading:'にくたい (nikutai)', meaning:'육신, 육체', pos:'명사', note:'말씀이 육체가 된 성육신(成肉身)을 표현. 肉(にく=살) + 体(たい=몸)', examples:[{ text:'そして言は肉体となり', ref:'요 1:14' }] },
    '恵み': { word:'恵み', lang:'ja', reading:'めぐみ (megumi)', meaning:'은혜', pos:'명사', note:'めぐみ는 "은혜, 호의, 자비". 그리스어 charis(χάρις)의 번역. 値しないのに与えられる神の愛(자격 없는 자에게 주어지는 하나님의 사랑)', examples:[{ text:'めぐみとまこととに満ちていた', ref:'요 1:14' }] },
    'まこと': { word:'まこと', lang:'ja', reading:'まこと (makoto)', meaning:'진리, 참됨', pos:'명사', note:'まこと는 진실, 진리. 그리스어 aletheia(ἀλήθεια)의 번역', examples:[{ text:'めぐみとまこととに満ちていた', ref:'요 1:14' }] },
    '証し': { word:'証し', lang:'ja', reading:'あかし (akashi)', meaning:'증거, 증언', pos:'명사/동사', note:'あかし(証し)는 증거하다, 증언하다. 세례 요한의 사명을 표현', examples:[{ text:'彼は証しのためにきた', ref:'요 1:7' }] },
    '小羊': { word:'小羊', lang:'ja', reading:'こひつじ (kohitsuji)', meaning:'어린 양', pos:'명사', note:'小(ちいさい=작은) + 羊(ひつじ=양). 하나님의 어린 양 = 죄를 위한 희생 제물', examples:[{ text:'見よ、世の罪を取り除く神の小羊', ref:'요 1:29' }] },
    'バプテスマ': { word:'バプテスマ', lang:'ja', reading:'バプテスマ (baputesuma)', meaning:'세례', pos:'명사', note:'그리스어 baptisma(βάπτισμα)의 음역. 물에 잠김으로 죄를 씻고 새 생명을 받는 의식', examples:[{ text:'わたしは水でバプテスマを授けているが', ref:'요 1:26' }] },
    '御霊': { word:'御霊', lang:'ja', reading:'みたま (mitama)', meaning:'성령', pos:'명사', note:'御霊(みたま)는 하나님의 영, 성령(聖霊, せいれい). 御(み=존칭)+霊(たま=영혼·영)', examples:[{ text:'御霊がはとのように天から下ってきて', ref:'요 1:32' }] },
    '従う': { word:'従う', lang:'ja', reading:'したがう (shitagau)', meaning:'따르다, 좇다', pos:'동사', note:'従う(したがう)는 따르다, 복종하다. 제자들이 예수님을 따르는 행동', examples:[{ text:'ふたりの弟子は彼がそう言うのを聞いて、イエスに従った', ref:'요 1:37' }] },
  },

  // ===== SPANISH WORDS (Reina Valera 1909, Public Domain) =====
  es: {
    'En': { word:'En', lang:'es', meaning:'~에서, ~에', pos:'전치사', note:'장소·시간·상태를 나타내는 전치사. En el principio = 태초에', examples:[{ text:'En el principio creó Dios los cielos y la tierra.', ref:'창 1:1' }] },
    'principio': { word:'principio', lang:'es', meaning:'태초, 시작', pos:'명사', note:'처음, 시작점. el principio = 그 처음. 히브리어 bereshit, 그리스어 arche의 번역', examples:[{ text:'En el principio era el Verbo', ref:'요 1:1' }] },
    'Dios': { word:'Dios', lang:'es', meaning:'하나님', pos:'고유명사', note:'스페인어로 하나님을 가리킴. 라틴어 Deus에서 유래. 히브리어 Elohim의 번역', examples:[{ text:'En el principio creó Dios los cielos y la tierra', ref:'창 1:1' }] },
    'creó': { word:'creó', lang:'es', meaning:'창조하셨다', pos:'동사', lemma:'crear', tense:'단순 과거 3인칭 단수', note:'crear(창조하다)의 과거형. 히브리어 bara처럼 무에서 유를 만드는 창조', examples:[{ text:'En el principio creó Dios los cielos y la tierra', ref:'창 1:1' }] },
    'cielos': { word:'cielos', lang:'es', meaning:'하늘들', pos:'명사(복수)', lemma:'cielo', note:'cielo(하늘)의 복수형. 히브리어 shamayim(복수)를 반영', examples:[{ text:'creó Dios los cielos y la tierra', ref:'창 1:1' }] },
    'tierra': { word:'tierra', lang:'es', meaning:'땅, 지구', pos:'명사', note:'땅, 지구, 나라를 모두 의미. 히브리어 erets의 번역', examples:[{ text:'creó Dios los cielos y la tierra', ref:'창 1:1' }] },
    'luz': { word:'luz', lang:'es', meaning:'빛', pos:'명사', note:'히브리어 or(אוֹר)의 번역. 하나님의 첫 창조물', examples:[{ text:'Sea la luz; y fue la luz', ref:'창 1:3' }] },
    'Sea': { word:'Sea', lang:'es', meaning:'있어라, 되어라', pos:'동사', lemma:'ser', note:'ser(이다/있다)의 접속법 현재 3인칭 단수. 명령적 소원을 표현. Sea la luz = 빛이 있으라', examples:[{ text:'Sea la luz; y fue la luz', ref:'창 1:3' }] },
    'Verbo': { word:'Verbo', lang:'es', meaning:'말씀 (로고스)', pos:'명사', note:'그리스어 Logos(λόγος)의 라틴어-스페인어 번역. Verbum(라틴 불가타)에서 유래. 신적 말씀·이성·계시', examples:[{ text:'En el principio era el Verbo', ref:'요 1:1' }] },
    'era': { word:'era', lang:'es', meaning:'계셨다, 있었다', pos:'동사', lemma:'ser', tense:'불완료 과거 3인칭 단수', note:'ser의 불완료 과거. 계속적·습관적 과거를 표현. 영원한 존재를 강조', examples:[{ text:'En el principio era el Verbo', ref:'요 1:1' }] },
    'vida': { word:'vida', lang:'es', meaning:'생명', pos:'명사', note:'스페인어 vida는 생명, 삶. 그리스어 zoe(ζωή)의 번역. 영원한 신적 생명을 의미', examples:[{ text:'En él estaba la vida', ref:'요 1:4' }] },
    'carne': { word:'carne', lang:'es', meaning:'육신, 살', pos:'명사', note:'성육신을 표현하는 단어. "el Verbo se hizo carne" = 말씀이 육신이 되어. 라틴어 caro에서 유래', examples:[{ text:'el Verbo se hizo carne', ref:'요 1:14' }] },
    'gracia': { word:'gracia', lang:'es', meaning:'은혜', pos:'명사', note:'그리스어 charis(χάρις)의 번역. 자격 없는 자에게 베푸는 하나님의 호의와 사랑. 영어 grace와 같은 어원', examples:[{ text:'lleno de gracia y de verdad', ref:'요 1:14' }] },
    'verdad': { word:'verdad', lang:'es', meaning:'진리', pos:'명사', note:'스페인어 verdad는 진실, 진리. 그리스어 aletheia(ἀλήθεια)의 번역. "진짜인 것, 숨겨지지 않은 것"', examples:[{ text:'lleno de gracia y de verdad', ref:'요 1:14' }, { text:'la gracia y la verdad por Jesucristo vino', ref:'요 1:17' }] },
    'Cordero': { word:'Cordero', lang:'es', meaning:'어린 양', pos:'명사', note:'cordero는 어린 양. 하나님의 어린 양(Cordero de Dios)은 죄를 위한 희생 제물 예수를 가리킴', examples:[{ text:'He aquí el Cordero de Dios', ref:'요 1:29' }] },
    'mundo': { word:'mundo', lang:'es', meaning:'세상', pos:'명사', note:'스페인어 mundo는 세상, 우주. 그리스어 kosmos(κόσμος)의 번역', examples:[{ text:'He aquí el Cordero de Dios, que quita el pecado del mundo', ref:'요 1:29' }] },
    'pecado': { word:'pecado', lang:'es', meaning:'죄', pos:'명사', note:'스페인어 pecado는 죄, 허물. 라틴어 peccatum에서 유래. "quita el pecado del mundo" = 세상 죄를 지고 가다', examples:[{ text:'que quita el pecado del mundo', ref:'요 1:29' }] },
    'bautizo': { word:'bautizo', lang:'es', meaning:'세례를 주다', pos:'동사', lemma:'bautizar', note:'그리스어 baptizein에서 유래. 물로 세례를 줌으로 죄를 씻는 의식', examples:[{ text:'Yo bautizo con agua', ref:'요 1:26' }] },
    'imagen': { word:'imagen', lang:'es', meaning:'형상, 닮음', pos:'명사', note:'히브리어 tselem(צֶלֶם)의 번역. "a imagen de Dios" = 하나님의 형상대로. 라틴어 imago에서 유래(Imago Dei)', examples:[{ text:'a imagen de Dios lo creó', ref:'창 1:27' }] },
    'Sígueme': { word:'Sígueme', lang:'es', meaning:'나를 따르라', pos:'동사 명령형', lemma:'seguir', note:'seguir(따르다)의 명령형 + me(나를). 예수님의 제자 부르심에서 반복되는 표현', examples:[{ text:'Sígueme', ref:'요 1:43' }] },
    'testimonio': { word:'testimonio', lang:'es', meaning:'증거, 증언', pos:'명사', note:'그리스어 martyria(μαρτυρία)의 번역. 목격자의 증언. "순교자(mártir)"와 같은 어원', examples:[{ text:'Hubo un hombre enviado de Dios...Éste vino por testimonio', ref:'요 1:6-7' }] },
  }
};

// =============================================
// 문장 구조 데이터 (구절별)
// =============================================
const SENTENCE_STRUCT = {
  'GEN-1-1': {
    en: [
      { role:'부사구', orig:'In the beginning', ko:'태초에' },
      { role:'주어', orig:'God', ko:'하나님이' },
      { role:'서술어', orig:'created', ko:'창조하셨다' },
      { role:'목적어', orig:'the heaven and the earth', ko:'하늘과 땅을' }
    ],
    zh: [
      { role:'부사어', orig:'起初', ko:'태초에' },
      { role:'주어', orig:'神', ko:'하나님이' },
      { role:'서술어', orig:'创造', ko:'창조하셨다' },
      { role:'목적어', orig:'天地', ko:'천지를' }
    ],
    ru: [
      { role:'부사구', orig:'В начале', ko:'태초에' },
      { role:'서술어', orig:'сотворил', ko:'창조하셨다' },
      { role:'주어', orig:'Бог', ko:'하나님이' },
      { role:'목적어', orig:'небо и землю', ko:'하늘과 땅을' }
    ],
    ko: [
      { role:'부사어', orig:'태초에', ko:'처음에' },
      { role:'주어', orig:'하나님이', ko:'God' },
      { role:'목적어', orig:'천지를', ko:'heaven & earth' },
      { role:'서술어', orig:'창조하시니라', ko:'created(완료형)' }
    ]
  },
  'JHN-1-1': {
    en: [
      { role:'부사구', orig:'In the beginning', ko:'태초에' },
      { role:'동사', orig:'was', ko:'계셨다' },
      { role:'주어', orig:'the Word', ko:'말씀이' },
      { role:'보어', orig:'with God', ko:'하나님과 함께' }
    ],
    zh: [
      { role:'부사어', orig:'太初', ko:'태초에' },
      { role:'동사', orig:'有', ko:'있었다' },
      { role:'주어', orig:'道', ko:'말씀이' },
      { role:'보어', orig:'与神同在', ko:'하나님과 함께' }
    ],
    ru: [
      { role:'부사구', orig:'В начале', ko:'태초에' },
      { role:'동사', orig:'было', ko:'계셨다' },
      { role:'주어', orig:'Слово', ko:'말씀이' },
      { role:'보어', orig:'у Бога', ko:'하나님께' }
    ],
    ko: [
      { role:'부사어', orig:'태초에', ko:'In the beginning' },
      { role:'주어', orig:'말씀이', ko:'Word' },
      { role:'보어', orig:'하나님과 함께', ko:'with God' },
      { role:'서술어', orig:'계시니라', ko:'was(과거)' }
    ]
  },
  'JHN-1-14': {
    en: [
      { role:'주어', orig:'the Word', ko:'말씀이' },
      { role:'동사', orig:'was made', ko:'되셨다' },
      { role:'보어', orig:'flesh', ko:'육신이' },
      { role:'부사구', orig:'and dwelt among us', ko:'우리 가운데 거하시며' }
    ],
    zh: [
      { role:'주어', orig:'道', ko:'말씀이' },
      { role:'동사', orig:'成了', ko:'되셨다' },
      { role:'보어', orig:'肉身', ko:'육신이' },
      { role:'부사구', orig:'住在我们中间', ko:'우리 가운데 거하시며' }
    ],
    ru: [
      { role:'주어', orig:'Слово', ko:'말씀이' },
      { role:'동사', orig:'стало', ko:'되셨다' },
      { role:'보어', orig:'плотию', ko:'육신이' },
      { role:'부사구', orig:'и обитало с нами', ko:'우리와 함께 거하시며' }
    ],
    ko: [
      { role:'주어', orig:'말씀이', ko:'the Word' },
      { role:'보어', orig:'육신이', ko:'flesh' },
      { role:'서술어', orig:'되어', ko:'was made(수동형)' },
      { role:'부사어', orig:'우리 가운데 거하시매', ko:'dwelt among us' }
    ]
  },
  'GEN-1-27': {
    en: [
      { role:'주어', orig:'God', ko:'하나님이' },
      { role:'서술어', orig:'created', ko:'창조하셨다' },
      { role:'목적어', orig:'man', ko:'사람을' },
      { role:'부사구', orig:'in his own image', ko:'자기 형상대로' }
    ],
    zh: [
      { role:'주어', orig:'神', ko:'하나님이' },
      { role:'부사어', orig:'照着自己的形像', ko:'자기 형상대로' },
      { role:'서술어', orig:'造人', ko:'사람을 만드시되' },
      { role:'병렬', orig:'造男造女', ko:'남자와 여자를 만드심' }
    ],
    ru: [
      { role:'서술어', orig:'И сотворил', ko:'창조하셨다' },
      { role:'주어', orig:'Бог', ko:'하나님이' },
      { role:'목적어', orig:'человека', ko:'사람을' },
      { role:'부사구', orig:'по образу Своему', ko:'자기 형상대로' }
    ],
    ko: [
      { role:'주어', orig:'하나님이', ko:'God' },
      { role:'부사어', orig:'자기 형상 곧 하나님의 형상대로', ko:'in his image' },
      { role:'목적어', orig:'사람을', ko:'man' },
      { role:'서술어', orig:'창조하시되', ko:'created' }
    ]
  }
};

// =============================================
// Q&A 데이터
// =============================================
const QA_DATA = {
  'GEN-1-1': [
    {
      q: { ko:'누가 천지를 창조하셨습니까?', en:'Who created the heavens and the earth?', zh:'谁创造了天地？', ru:'Кто сотворил небо и землю?' },
      a: { ko:'하나님이 천지를 창조하셨습니다.', en:'God created the heavens and the earth.', zh:'神创造了天地。', ru:'Бог сотворил небо и землю.' }
    },
    {
      q: { ko:'하나님은 무엇을 창조하셨습니까?', en:'What did God create?', zh:'神创造了什么？', ru:'Что сотворил Бог?' },
      a: { ko:'하나님은 천지를 창조하셨습니다.', en:'God created the heavens and the earth.', zh:'神创造了天地。', ru:'Бог сотворил небо и землю.' }
    }
  ],
  'GEN-1-3': [
    {
      q: { ko:'하나님이 무엇이 있으라고 하셨습니까?', en:'What did God say to let there be?', zh:'神说要有什么？', ru:'Что сказал Бог, чтобы было?' },
      a: { ko:'하나님이 빛이 있으라고 하셨습니다.', en:'God said, Let there be light.', zh:'神说，要有光。', ru:'Бог сказал: да будет свет.' }
    }
  ],
  'GEN-1-27': [
    {
      q: { ko:'하나님이 사람을 어떻게 창조하셨습니까?', en:'How did God create man?', zh:'神怎样创造了人？', ru:'Как Бог сотворил человека?' },
      a: { ko:'하나님이 자기 형상대로 사람을 창조하셨습니다.', en:'God created man in his own image.', zh:'神照着自己的形像造人。', ru:'Бог сотворил человека по образу Своему.' }
    },
    {
      q: { ko:'하나님은 남자와 여자 중 무엇을 만드셨습니까?', en:'Did God create male and female?', zh:'神造了男人和女人吗？', ru:'Мужчину и женщину сотворил Бог?' },
      a: { ko:'남자와 여자를 창조하셨습니다.', en:'Male and female created he them.', zh:'乃是照着他的形像造男造女。', ru:'Мужчину и женщину сотворил их.' }
    }
  ],
  'GEN-1-31': [
    {
      q: { ko:'하나님이 지으신 모든 것이 어떠하셨습니까?', en:'What did God think about all He had made?', zh:'神看所造的一切怎么样？', ru:'Что увидел Бог о всём созданном?' },
      a: { ko:'보시기에 심히 좋았습니다.', en:'It was very good.', zh:'都甚好。', ru:'Хорошо весьма.' }
    }
  ],
  'JHN-1-1': [
    {
      q: { ko:'태초에 무엇이 계셨습니까?', en:'What was in the beginning?', zh:'太初有什么？', ru:'Что было в начале?' },
      a: { ko:'태초에 말씀이 계셨습니다.', en:'In the beginning was the Word.', zh:'太初有道。', ru:'В начале было Слово.' }
    },
    {
      q: { ko:'말씀은 누구와 함께 계셨습니까?', en:'Who was the Word with?', zh:'道与谁同在？', ru:'С Кем было Слово?' },
      a: { ko:'말씀은 하나님과 함께 계셨습니다.', en:'The Word was with God.', zh:'道与神同在。', ru:'Слово было у Бога.' }
    },
    {
      q: { ko:'말씀은 누구이십니까?', en:'Who was the Word?', zh:'道是谁？', ru:'Кем было Слово?' },
      a: { ko:'말씀은 곧 하나님이십니다.', en:'The Word was God.', zh:'道就是神。', ru:'Слово было Бог.' }
    }
  ],
  'JHN-1-3': [
    {
      q: { ko:'만물이 누구로 말미암아 지은 바 되었습니까?', en:'Through whom were all things made?', zh:'万物是借着谁造的？', ru:'Через кого всё начало быть?' },
      a: { ko:'만물이 말씀으로 말미암아 지은 바 되었습니다.', en:'All things were made by him (the Word).', zh:'万物是借着他（道）造的。', ru:'Всё чрез Него (Слово) начало быть.' }
    }
  ],
  'JHN-1-4': [
    {
      q: { ko:'말씀 안에 무엇이 있었습니까?', en:'What was in him (the Word)?', zh:'在他里头有什么？', ru:'Что было в Нём?' },
      a: { ko:'생명이 있었습니다.', en:'In him was life.', zh:'在他里头有生命。', ru:'В Нём была жизнь.' }
    },
    {
      q: { ko:'이 생명은 무엇이었습니까?', en:'What was this life?', zh:'这生命是什么？', ru:'Чем была эта жизнь?' },
      a: { ko:'이 생명은 사람들의 빛이었습니다.', en:'The life was the light of men.', zh:'这生命就是人的光。', ru:'Жизнь была свет человеков.' }
    }
  ],
  'JHN-1-14': [
    {
      q: { ko:'말씀이 무엇이 되셨습니까?', en:'What did the Word become?', zh:'道成了什么？', ru:'Чем стало Слово?' },
      a: { ko:'말씀이 육신이 되셨습니다.', en:'The Word was made flesh.', zh:'道成了肉身。', ru:'Слово стало плотию.' }
    },
    {
      q: { ko:'말씀은 어디에 거하셨습니까?', en:'Where did the Word dwell?', zh:'道住在哪里？', ru:'Где обитало Слово?' },
      a: { ko:'우리 가운데 거하셨습니다.', en:'He dwelt among us.', zh:'住在我们中间。', ru:'Обитало с нами.' }
    }
  ],
  'JHN-1-29': [
    {
      q: { ko:'요한은 예수님을 무엇이라고 불렀습니까?', en:'What did John call Jesus?', zh:'约翰称耶稣为什么？', ru:'Кем назвал Иоанн Иисуса?' },
      a: { ko:'하나님의 어린 양이라고 불렀습니다.', en:'The Lamb of God.', zh:'神的羔羊。', ru:'Агнец Божий.' }
    }
  ],
  'JHN-1-12': [
    {
      q: { ko:'예수님을 영접하는 자들에게 무슨 권세가 주어졌습니까?', en:'What power was given to those who received him?', zh:'接待他的人得了什么权柄？', ru:'Какую власть дал Он принявшим Его?' },
      a: { ko:'하나님의 자녀가 되는 권세가 주어졌습니다.', en:'Power to become the sons of God.', zh:'作神的儿女的权柄。', ru:'Власть быть чадами Божиими.' }
    }
  ]
};

// =============================================
// 한국어 단어 백과사전 (KO_DICT)
// 개역한글 본문의 핵심 어절 클릭 시 보여줄 설명
// =============================================

const KO_DICT = {

  // ── 창세기 1장 핵심 어휘 ──

  '태초에': {
    word: '태초에', lang: 'ko',
    meaning: '맨 처음에, 시간이 시작되기 전',
    pos: '명사+조사',
    encyclopedia: '태초(太初)는 "가장 처음"을 뜻하는 한자어입니다. 성경에서 태초는 단순한 시작점이 아니라, 하나님이 존재하시고 시간과 공간이 만들어지기 이전의 영원을 가리킵니다.',
    note: '히브리어 원어: בְּרֵאשִׁית (bereshit) — "처음에, 시작에"',
    examples: [{ text: '태초에 하나님이 천지를 창조하시니라', ref: '창 1:1' }, { text: '태초에 말씀이 계시니라', ref: '요 1:1' }]
  },

  '하나님이': {
    word: '하나님이', lang: 'ko',
    meaning: '하나님께서 (주어)',
    pos: '명사+주격조사',
    encyclopedia: '하나님은 성경의 하나님, 곧 천지를 창조하신 유일한 신을 가리킵니다. 한국어 "하나님"은 "하나(오직 하나)인 분"에서 유래했다는 설이 있습니다. 히브리어 원어는 אֱלֹהִים(엘로힘)으로, 복수형 어미를 가지지만 단수 동사와 함께 쓰여 삼위일체의 신을 암시합니다.',
    note: '히브리어: אֱלֹהִים (Elohim) — 복수형 어미, 단수 의미',
    examples: [{ text: '태초에 하나님이 천지를 창조하시니라', ref: '창 1:1' }, { text: '하나님이 가라사대 빛이 있으라', ref: '창 1:3' }]
  },

  '천지를': {
    word: '천지를', lang: 'ko',
    meaning: '하늘과 땅을 (우주 전체)',
    pos: '명사+목적격조사',
    encyclopedia: '천지(天地)는 하늘(天)과 땅(地)을 함께 이르는 말로, 히브리어 שָׁמַיִם וָאָרֶץ(하늘들과 땅)의 번역입니다. 고대 히브리 문학에서 "하늘과 땅"은 존재하는 모든 것, 즉 우주 전체를 나타내는 표현(merism)입니다.',
    note: '히브리어: שָׁמַיִם וָאָרֶץ (shamayim wa-arets) — 온 우주를 의미',
    examples: [{ text: '태초에 하나님이 천지를 창조하시니라', ref: '창 1:1' }]
  },

  '창조하시니라': {
    word: '창조하시니라', lang: 'ko',
    meaning: '창조하셨다, 만드셨다',
    pos: '동사',
    encyclopedia: '창조(創造)는 "없는 것을 있게 만들다"라는 의미입니다. 히브리어 원어 בָּרָא(바라)는 오직 하나님만 주어로 쓰이는 특별한 동사로, 인간이 무언가를 "만드는" 행위와 구별됩니다. 하나님께서만 무(無)에서 유(有)를 만드실 수 있다는 신학적 의미를 담고 있습니다.',
    note: '히브리어: בָּרָא (bara) — 오직 하나님만 주어로 쓰이는 창조 동사',
    examples: [{ text: '태초에 하나님이 천지를 창조하시니라', ref: '창 1:1' }]
  },

  '빛이': {
    word: '빛이', lang: 'ko',
    meaning: '빛이 (주어)',
    pos: '명사+주격조사',
    encyclopedia: '빛(אוֹר, or)은 하나님의 첫 번째 창조물입니다. 태양이 4일째에 만들어지기 전에 이미 빛이 존재했다는 점에서, 이 빛은 물리적 빛 이전의 하나님의 영광의 빛을 의미한다고도 해석됩니다. 요한복음에서는 예수님이 세상의 빛으로 불립니다.',
    note: '히브리어: אוֹר (or) — 빛. 첫째 날의 창조물',
    examples: [{ text: '하나님이 가라사대 빛이 있으라', ref: '창 1:3' }, { text: '이 생명은 사람들의 빛이라', ref: '요 1:4' }]
  },

  '있으라': {
    word: '있으라', lang: 'ko',
    meaning: '있어라! (명령형)',
    pos: '동사 명령형',
    encyclopedia: '하나님의 창조는 말씀으로 이루어집니다. "있으라"는 히브리어 יְהִי(예히)로, "그것이 되게 하라"는 뜻입니다. 하나님이 말씀하시자 즉시 그대로 되었습니다. 이는 하나님의 말씀이 창조의 능력을 가지고 있음을 보여줍니다.',
    note: '히브리어: יְהִי (yehi) — "있으라, 되어라"',
    examples: [{ text: '빛이 있으라 하시매 빛이 있었고', ref: '창 1:3' }]
  },

  '땅이': {
    word: '땅이', lang: 'ko',
    meaning: '땅이 (주어)',
    pos: '명사+주격조사',
    encyclopedia: '땅(הָאָרֶץ, ha-arets)은 히브리어로 땅, 지구, 나라를 의미합니다. 창세기 1장 2절에서 땅은 아직 형태가 없고 텅 빈 상태로 묘사됩니다. 이 상태를 히브리어로 "토후 와보후(tohu wa-vohu)"라고 합니다.',
    note: '히브리어: אֶרֶץ (erets) — 땅, 지구',
    examples: [{ text: '땅이 혼돈하고 공허하며', ref: '창 1:2' }]
  },

  '혼돈하고': {
    word: '혼돈하고', lang: 'ko',
    meaning: '형태가 없고 무질서한',
    pos: '형용사',
    encyclopedia: '혼돈(混沌)은 히브리어 "토후(tohu)"의 번역입니다. 아직 형태가 없고 텅 빈 원초적 상태를 가리킵니다. 하나님의 창조는 이 혼돈을 질서로 바꾸는 과정입니다.',
    note: '히브리어: תֹּהוּ (tohu) — 황폐함, 형태 없음',
    examples: [{ text: '땅이 혼돈하고 공허하며', ref: '창 1:2' }]
  },

  '공허하며': {
    word: '공허하며', lang: 'ko',
    meaning: '텅 비어 있으며',
    pos: '형용사',
    encyclopedia: '공허(空虛)는 히브리어 "보후(bohu)"의 번역으로 "텅 빔, 공허함"을 의미합니다. "토후와보후(tohu wa-bohu)"는 성경에서 창조 이전 상태를 나타내는 유명한 표현입니다.',
    note: '히브리어: בֹּהוּ (bohu) — 텅 빔, 공허',
    examples: [{ text: '땅이 혼돈하고 공허하며', ref: '창 1:2' }]
  },

  '궁창이': {
    word: '궁창이', lang: 'ko',
    meaning: '하늘의 공간, 창공',
    pos: '명사+주격조사',
    encyclopedia: '궁창(穹蒼)은 히브리어 "라키아(raqia)"의 번역으로, "펼쳐진 것, 펴놓은 것"을 의미합니다. 고대 히브리인들은 하늘을 단단하게 펼쳐진 돔처럼 생각했습니다. 이 궁창 위에는 물이 있고, 아래에도 물이 있다고 묘사됩니다.',
    note: '히브리어: רָקִיעַ (raqia) — 펼쳐진 창공, 하늘',
    examples: [{ text: '물 가운데 궁창이 있어', ref: '창 1:6' }]
  },

  '광명이': {
    word: '광명이', lang: 'ko',
    meaning: '빛나는 천체들, 광체들',
    pos: '명사+주격조사',
    encyclopedia: '광명(光明)은 빛을 발하는 천체들을 가리킵니다. 창세기 1장 16절에서 "두 큰 광명"은 태양(낮을 주관)과 달(밤을 주관)을 의미합니다. 성경은 이들이 신이 아니라 하나님의 피조물임을 강조합니다.',
    note: '히브리어: מְאֹרֹת (meorot) — 빛을 내는 것들, 광체들',
    examples: [{ text: '하늘의 궁창에 광명이 있어', ref: '창 1:14' }]
  },

  '형상대로': {
    word: '형상대로', lang: 'ko',
    meaning: '모양을 따라, 닮은 모습으로',
    pos: '명사+부사격조사',
    encyclopedia: '형상(形像)은 히브리어 "첼렘(tselem)"의 번역으로 "형태, 모상, 복사본"을 의미합니다. 하나님의 형상대로 창조된 사람(이마고 데이, Imago Dei)은 이성, 도덕, 영성, 창조성 등 하나님을 닮은 속성을 가짐을 의미합니다. 이는 인간의 존엄성의 근거입니다.',
    note: '히브리어: צֶלֶם (tselem) — 형상. 라틴어: Imago Dei',
    examples: [{ text: '하나님이 자기 형상 곧 하나님의 형상대로 사람을 창조하시되', ref: '창 1:27' }]
  },

  // ── 요한복음 1장 핵심 어휘 ──

  '말씀이': {
    word: '말씀이', lang: 'ko',
    meaning: '말씀께서 (주어)',
    pos: '명사+주격조사',
    encyclopedia: '말씀(로고스)은 그리스어 Λόγος(logos)의 번역입니다. 요한복음은 예수 그리스도를 "태초부터 계신 말씀"으로 소개합니다. 그리스 철학에서 로고스는 우주의 이성과 질서를 의미했고, 유대 전통에서는 하나님의 창조적 말씀을 뜻했습니다. 요한은 이 두 의미를 통합하여 예수님을 묘사했습니다.',
    note: '그리스어: Λόγος (Logos) — 말씀, 이성, 계시',
    examples: [{ text: '태초에 말씀이 계시니라', ref: '요 1:1' }, { text: '말씀이 육신이 되어', ref: '요 1:14' }]
  },

  '계시니라': {
    word: '계시니라', lang: 'ko',
    meaning: '계셨다, 영원히 존재하셨다',
    pos: '동사',
    encyclopedia: '"계시니라"의 원어 그리스어는 ἦν(en, 있었다)입니다. 이는 단순히 시작된 것이 아니라 "이미 계속해서 존재하셨다"는 지속적 존재를 강조합니다. 예수님은 창조되신 분이 아니라 영원 전부터 계신 분임을 나타냅니다.',
    note: '그리스어: ἦν (en) — 계속적 과거, 영원한 존재',
    examples: [{ text: '태초에 말씀이 계시니라', ref: '요 1:1' }]
  },

  '생명이': {
    word: '생명이', lang: 'ko',
    meaning: '생명이 (주어)',
    pos: '명사+주격조사',
    encyclopedia: '생명(ζωή, zoe)은 단순한 생물학적 생명이 아니라, 하나님께로부터 오는 영원한 생명을 뜻합니다. 요한복음에서 생명은 예수님 안에 있으며, 그 생명이 모든 사람의 빛입니다.',
    note: '그리스어: ζωή (zoe) — 신적 생명, 영원한 생명',
    examples: [{ text: '그 안에 생명이 있었으니', ref: '요 1:4' }]
  },

  '빛이라': {
    word: '빛이라', lang: 'ko',
    meaning: '빛이다',
    pos: '명사+서술격조사',
    encyclopedia: '빛(φῶς, phos)은 요한복음에서 어둠과 대조되는 핵심 상징입니다. 예수님은 세상의 참 빛이시며, 어두움은 이 빛을 이길 수 없습니다. 이 빛은 모든 사람을 비추는 보편적 빛입니다.',
    note: '그리스어: φῶς (phos) — 빛, 계시의 빛',
    examples: [{ text: '이 생명은 사람들의 빛이라', ref: '요 1:4' }]
  },

  '육신이': {
    word: '육신이', lang: 'ko',
    meaning: '육체가, 몸이',
    pos: '명사+주격조사',
    encyclopedia: '육신(σάρξ, sarx)은 인간의 물질적 몸을 의미합니다. "말씀이 육신이 되어"는 신학적으로 성육신(成肉身, Incarnation)이라 불립니다. 영원한 하나님의 아들이 인간의 몸을 입고 이 땅에 오신 사건으로, 기독교 신학의 핵심입니다.',
    note: '그리스어: σάρξ (sarx) — 육체. 성육신 = Incarnation',
    examples: [{ text: '말씀이 육신이 되어 우리 가운데 거하시매', ref: '요 1:14' }]
  },

  '은혜와': {
    word: '은혜와', lang: 'ko',
    meaning: '은혜가 (열거)',
    pos: '명사+접속조사',
    encyclopedia: '은혜(χάρις, charis)는 받을 자격이 없는 자에게 베푸는 호의와 사랑을 의미합니다. 구약의 율법(律法)과 대비되어, 예수 그리스도를 통해 오는 하나님의 무조건적 사랑과 선물을 나타냅니다.',
    note: '그리스어: χάρις (charis) — 은혜, 무상의 호의',
    examples: [{ text: '은혜와 진리가 충만하더라', ref: '요 1:14' }]
  },

  '진리가': {
    word: '진리가', lang: 'ko',
    meaning: '진리가 (주어)',
    pos: '명사+주격조사',
    encyclopedia: '진리(ἀλήθεια, aletheia)는 "숨겨지지 않은 것", 즉 온전히 드러난 실재를 의미합니다. 요한복음에서 예수님은 "나는 진리다"라고 선언하십니다. 율법은 모세를 통해 왔지만, 은혜와 진리는 예수 그리스도를 통해 완전히 드러났습니다.',
    note: '그리스어: ἀλήθεια (aletheia) — 참됨, 실재',
    examples: [{ text: '은혜와 진리는 예수 그리스도로 말미암아 온 것이라', ref: '요 1:17' }]
  },

  '세례를': {
    word: '세례를', lang: 'ko',
    meaning: '세례를 (목적어)',
    pos: '명사+목적격조사',
    encyclopedia: '세례(βάπτισμα, baptisma)는 물에 잠기거나 물을 뿌려 죄를 씻고 새 생명으로 들어가는 의식입니다. 요한은 회개를 상징하는 물 세례를 베풀었고, 예수님은 성령으로 세례를 주실 분으로 소개됩니다.',
    note: '그리스어: βάπτισμα (baptisma) — 잠금, 씻음',
    examples: [{ text: '나는 물로 세례를 주거니와', ref: '요 1:26' }]
  },

  '권세를': {
    word: '권세를', lang: 'ko',
    meaning: '권세를, 권리를 (목적어)',
    pos: '명사+목적격조사',
    encyclopedia: '권세(ἐξουσία, exousia)는 "권리, 권위, 능력"을 뜻합니다. 예수님을 영접하고 그 이름을 믿는 자들에게 "하나님의 자녀가 되는 권세"가 주어집니다. 이는 죄인에서 하나님의 자녀로의 신분 변화를 의미합니다.',
    note: '그리스어: ἐξουσία (exousia) — 권리, 권위',
    examples: [{ text: '하나님의 자녀가 되는 권세를 주셨으니', ref: '요 1:12' }]
  },

  '만물이': {
    word: '만물이', lang: 'ko',
    meaning: '모든 것이 (주어)',
    pos: '명사+주격조사',
    encyclopedia: '만물(πάντα, panta)은 "모든 것"을 의미합니다. 요한복음은 우주의 모든 것이 말씀(로고스)을 통해 창조되었다고 선언합니다. 단 하나도 말씀 없이 된 것이 없다는 표현은 예수님의 창조자 되심을 강조합니다.',
    note: '그리스어: πάντα (panta) — 모든 것',
    examples: [{ text: '만물이 그로 말미암아 지은 바 되었으니', ref: '요 1:3' }]
  },

  '독생자의': {
    word: '독생자의', lang: 'ko',
    meaning: '외아들의, 유일하신 아들의',
    pos: '명사+관형격조사',
    encyclopedia: '독생자(μονογενής, monogenes)는 "유일하게 난, 하나뿐인"이라는 뜻입니다. 예수님만이 하나님의 본질에서 나신 유일한 아들이심을 강조합니다. 요한복음 3장 16절의 "독생자"와 같은 단어입니다.',
    note: '그리스어: μονογενής (monogenes) — 유일하게 난, 하나뿐인',
    examples: [{ text: '아버지의 독생자의 영광이요', ref: '요 1:14' }]
  },

  '증거하여': {
    word: '증거하여', lang: 'ko',
    meaning: '증언하여, 증거를 내어',
    pos: '동사',
    encyclopedia: '증거(μαρτυρία, martyria)는 법적 증언처럼 직접 보고 경험한 것을 선언하는 행위입니다. 세례 요한의 사명은 예수님에 대해 증거하는 것이었습니다. "순교자(martyr)"라는 단어도 이 그리스어에서 유래했습니다.',
    note: '그리스어: μαρτυρία (martyria) — 증언. 순교자(martyr)의 어원',
    examples: [{ text: '요한이 그에 대하여 증거하여', ref: '요 1:15' }]
  }
};