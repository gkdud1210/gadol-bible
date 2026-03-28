// =============================================
// 가돌 — 데이터 변환 및 성경 목록
// bible-data.js의 BIBLE_DATA를 app.js가 기대하는 형식으로 변환
// =============================================
'use strict';

// ── BIBLE_DATA → 플랫 BIBLE 객체 변환 ──
// app.js는 BIBLE['GEN_1'], BIBLE['JHN_1'] 형태로 접근
const BIBLE = {};
if (typeof BIBLE_DATA !== 'undefined') {
  Object.keys(BIBLE_DATA).forEach(bookId => {
    const book = BIBLE_DATA[bookId];
    if (book.chapters) {
      Object.keys(book.chapters).forEach(ch => {
        BIBLE[`${bookId}_${ch}`] = book.chapters[ch];
      });
    }
  });
}

// ── getVerses 함수 ──
function getVerses(bookId, chapter) {
  const key = `${bookId}_${chapter}`;
  return BIBLE[key] || [];
}

// ── 전체 성경 66권 목록 ──
// app.js가 사용하는 필드: id, ko, en, ch, testament, group
const BOOK_LIST = [
  // ═══ 구약성경 (OT) ═══
  // 율법서 (모세오경)
  { id:'GEN', ko:'창세기',   en:'Genesis',       ch:50, testament:'OT', group:'율법서' },
  { id:'EXO', ko:'출애굽기', en:'Exodus',         ch:40, testament:'OT', group:'율법서' },
  { id:'LEV', ko:'레위기',   en:'Leviticus',      ch:27, testament:'OT', group:'율법서' },
  { id:'NUM', ko:'민수기',   en:'Numbers',        ch:36, testament:'OT', group:'율법서' },
  { id:'DEU', ko:'신명기',   en:'Deuteronomy',    ch:34, testament:'OT', group:'율법서' },
  // 역사서
  { id:'JOS', ko:'여호수아', en:'Joshua',         ch:24, testament:'OT', group:'역사서' },
  { id:'JDG', ko:'사사기',   en:'Judges',         ch:21, testament:'OT', group:'역사서' },
  { id:'RUT', ko:'룻기',     en:'Ruth',           ch:4,  testament:'OT', group:'역사서' },
  { id:'1SA', ko:'사무엘상', en:'1 Samuel',       ch:31, testament:'OT', group:'역사서' },
  { id:'2SA', ko:'사무엘하', en:'2 Samuel',       ch:24, testament:'OT', group:'역사서' },
  { id:'1KI', ko:'열왕기상', en:'1 Kings',        ch:22, testament:'OT', group:'역사서' },
  { id:'2KI', ko:'열왕기하', en:'2 Kings',        ch:25, testament:'OT', group:'역사서' },
  { id:'1CH', ko:'역대상',   en:'1 Chronicles',   ch:29, testament:'OT', group:'역사서' },
  { id:'2CH', ko:'역대하',   en:'2 Chronicles',   ch:36, testament:'OT', group:'역사서' },
  { id:'EZR', ko:'에스라',   en:'Ezra',           ch:10, testament:'OT', group:'역사서' },
  { id:'NEH', ko:'느헤미야', en:'Nehemiah',       ch:13, testament:'OT', group:'역사서' },
  { id:'EST', ko:'에스더',   en:'Esther',         ch:10, testament:'OT', group:'역사서' },
  // 시가서
  { id:'JOB', ko:'욥기',     en:'Job',            ch:42, testament:'OT', group:'시가서' },
  { id:'PSA', ko:'시편',     en:'Psalms',         ch:150,testament:'OT', group:'시가서' },
  { id:'PRO', ko:'잠언',     en:'Proverbs',       ch:31, testament:'OT', group:'시가서' },
  { id:'ECC', ko:'전도서',   en:'Ecclesiastes',   ch:12, testament:'OT', group:'시가서' },
  { id:'SNG', ko:'아가',     en:'Song of Solomon', ch:8, testament:'OT', group:'시가서' },
  // 대선지서
  { id:'ISA', ko:'이사야',   en:'Isaiah',         ch:66, testament:'OT', group:'대선지서' },
  { id:'JER', ko:'예레미야', en:'Jeremiah',       ch:52, testament:'OT', group:'대선지서' },
  { id:'LAM', ko:'예레미야애가', en:'Lamentations', ch:5, testament:'OT', group:'대선지서' },
  { id:'EZK', ko:'에스겔',   en:'Ezekiel',        ch:48, testament:'OT', group:'대선지서' },
  { id:'DAN', ko:'다니엘',   en:'Daniel',         ch:12, testament:'OT', group:'대선지서' },
  // 소선지서
  { id:'HOS', ko:'호세아',   en:'Hosea',          ch:14, testament:'OT', group:'소선지서' },
  { id:'JOL', ko:'요엘',     en:'Joel',           ch:3,  testament:'OT', group:'소선지서' },
  { id:'AMO', ko:'아모스',   en:'Amos',           ch:9,  testament:'OT', group:'소선지서' },
  { id:'OBA', ko:'오바댜',   en:'Obadiah',        ch:1,  testament:'OT', group:'소선지서' },
  { id:'JON', ko:'요나',     en:'Jonah',          ch:4,  testament:'OT', group:'소선지서' },
  { id:'MIC', ko:'미가',     en:'Micah',          ch:7,  testament:'OT', group:'소선지서' },
  { id:'NAM', ko:'나훔',     en:'Nahum',          ch:3,  testament:'OT', group:'소선지서' },
  { id:'HAB', ko:'하박국',   en:'Habakkuk',       ch:3,  testament:'OT', group:'소선지서' },
  { id:'ZEP', ko:'스바냐',   en:'Zephaniah',      ch:3,  testament:'OT', group:'소선지서' },
  { id:'HAG', ko:'학개',     en:'Haggai',         ch:2,  testament:'OT', group:'소선지서' },
  { id:'ZEC', ko:'스가랴',   en:'Zechariah',      ch:14, testament:'OT', group:'소선지서' },
  { id:'MAL', ko:'말라기',   en:'Malachi',        ch:4,  testament:'OT', group:'소선지서' },

  // ═══ 신약성경 (NT) ═══
  // 복음서
  { id:'MAT', ko:'마태복음',   en:'Matthew',      ch:28, testament:'NT', group:'복음서' },
  { id:'MRK', ko:'마가복음',   en:'Mark',         ch:16, testament:'NT', group:'복음서' },
  { id:'LUK', ko:'누가복음',   en:'Luke',         ch:24, testament:'NT', group:'복음서' },
  { id:'JHN', ko:'요한복음',   en:'John',         ch:21, testament:'NT', group:'복음서' },
  // 역사서
  { id:'ACT', ko:'사도행전',   en:'Acts',         ch:28, testament:'NT', group:'역사서 (신약)' },
  // 바울서신
  { id:'ROM', ko:'로마서',     en:'Romans',       ch:16, testament:'NT', group:'바울서신' },
  { id:'1CO', ko:'고린도전서', en:'1 Corinthians', ch:16, testament:'NT', group:'바울서신' },
  { id:'2CO', ko:'고린도후서', en:'2 Corinthians', ch:13, testament:'NT', group:'바울서신' },
  { id:'GAL', ko:'갈라디아서', en:'Galatians',    ch:6,  testament:'NT', group:'바울서신' },
  { id:'EPH', ko:'에베소서',   en:'Ephesians',    ch:6,  testament:'NT', group:'바울서신' },
  { id:'PHP', ko:'빌립보서',   en:'Philippians',  ch:4,  testament:'NT', group:'바울서신' },
  { id:'COL', ko:'골로새서',   en:'Colossians',   ch:4,  testament:'NT', group:'바울서신' },
  { id:'1TH', ko:'데살로니가전서', en:'1 Thessalonians', ch:5, testament:'NT', group:'바울서신' },
  { id:'2TH', ko:'데살로니가후서', en:'2 Thessalonians', ch:3, testament:'NT', group:'바울서신' },
  { id:'1TI', ko:'디모데전서', en:'1 Timothy',    ch:6,  testament:'NT', group:'바울서신' },
  { id:'2TI', ko:'디모데후서', en:'2 Timothy',    ch:4,  testament:'NT', group:'바울서신' },
  { id:'TIT', ko:'디도서',     en:'Titus',        ch:3,  testament:'NT', group:'바울서신' },
  { id:'PHM', ko:'빌레몬서',   en:'Philemon',     ch:1,  testament:'NT', group:'바울서신' },
  // 일반서신
  { id:'HEB', ko:'히브리서',   en:'Hebrews',      ch:13, testament:'NT', group:'일반서신' },
  { id:'JAS', ko:'야고보서',   en:'James',        ch:5,  testament:'NT', group:'일반서신' },
  { id:'1PE', ko:'베드로전서', en:'1 Peter',      ch:5,  testament:'NT', group:'일반서신' },
  { id:'2PE', ko:'베드로후서', en:'2 Peter',      ch:3,  testament:'NT', group:'일반서신' },
  { id:'1JN', ko:'요한일서',   en:'1 John',       ch:5,  testament:'NT', group:'일반서신' },
  { id:'2JN', ko:'요한이서',   en:'2 John',       ch:1,  testament:'NT', group:'일반서신' },
  { id:'3JN', ko:'요한삼서',   en:'3 John',       ch:1,  testament:'NT', group:'일반서신' },
  { id:'JUD', ko:'유다서',     en:'Jude',         ch:1,  testament:'NT', group:'일반서신' },
  // 예언서
  { id:'REV', ko:'요한계시록', en:'Revelation',   ch:22, testament:'NT', group:'예언서 (신약)' },
];
