// =============================================
// 가돌 앱 — 6개 언어 병렬 읽기
// TTS · 사이드바 전체 성경 · 발음기호
// =============================================
'use strict';

// ── 상태 ─────────────────────────────────────
const state = {
  book: 'GEN',
  chapter: 1,
  activeLangs: new Set(['ko', 'en']),
  theme: 'dark',
  sheetOpen: false,
  activeWordEl: null,
  wordHighlight: false,
  currentVerseText: '',   // TTS용 현재 구절 텍스트
  currentVerseLang: 'ko', // TTS용 현재 언어
  lastTapWord: null,      // TTS 단어용
  lastTapLang: 'ko',
  ttsActive: false,
};

// ── DOM 레퍼런스 ──────────────────────────────
let versesWrap, wordSheet, sheetBody, sheetWord, sheetLangBadge,
    sheetBg, readingFill, tocOT, tocNT, headerInfo, chapterTitle,
    chapterLabel, prevBtn, nextBtn, sidebar, sidebarOverlay;

// TTS 인스턴스
let currentUtterance = null;

// ─────────────────────────────────────────────
// 초기화
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('gadol_user') || 'null');
  if (!user) { location.replace('index.html'); return; }

  versesWrap     = document.getElementById('versesWrap');
  wordSheet      = document.getElementById('wordSheet');
  sheetBody      = document.getElementById('sheetBody');
  sheetWord      = document.getElementById('sheetWord');
  sheetLangBadge = document.getElementById('sheetLangBadge');
  sheetBg        = document.getElementById('sheetBg');
  readingFill    = document.getElementById('readingFill');
  tocOT          = document.getElementById('tocOT');
  tocNT          = document.getElementById('tocNT');
  headerInfo     = document.getElementById('headerInfo');
  chapterTitle   = document.getElementById('chapterTitle');
  chapterLabel   = document.getElementById('chapterLabel');
  prevBtn        = document.getElementById('prevBtn');
  nextBtn        = document.getElementById('nextBtn');
  sidebar        = document.getElementById('sidebar');
  sidebarOverlay = document.getElementById('sidebarOverlay');

  const savedTheme = localStorage.getItem('gadol_theme') || 'dark';
  applyTheme(savedTheme, false);

  const savedLangs = JSON.parse(localStorage.getItem('gadol_langs') || 'null');
  if (savedLangs && Array.isArray(savedLangs)) {
    state.activeLangs = new Set(savedLangs);
    state.activeLangs.add('ko');
  }
  updateLangButtons();

  const params = new URLSearchParams(location.search);
  if (params.get('book')) state.book = params.get('book');
  if (params.get('ch'))   state.chapter = parseInt(params.get('ch')) || 1;

  buildToc();
  renderChapter();
  updateHeader();

  window.addEventListener('scroll', onScroll, { passive: true });
  setupSheetDrag();
  document.getElementById('menuBtn').addEventListener('click', openSidebar);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSheet(); closeSidebar(); stopTTS(); }
    if (e.key === 'ArrowRight') nextChapter();
    if (e.key === 'ArrowLeft')  prevChapter();
  });
  sheetBg.addEventListener('click', closeSheet);
});

// ─────────────────────────────────────────────
// 테마
// ─────────────────────────────────────────────
function applyTheme(t, save = true) {
  state.theme = t;
  document.documentElement.setAttribute('data-theme', t);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
  if (save) localStorage.setItem('gadol_theme', t);
}
function toggleTheme() { applyTheme(state.theme === 'dark' ? 'light' : 'dark'); }

// ─────────────────────────────────────────────
// 언어 토글
// ─────────────────────────────────────────────
function toggleLang(lang) {
  if (lang === 'ko') { showToast('개역한글(KO)은 항상 표시됩니다', 2000); return; }
  if (state.activeLangs.has(lang)) {
    const others = [...state.activeLangs].filter(l => l !== 'ko');
    if (others.length <= 1) { showToast('최소 1개의 언어를 선택해야 합니다'); return; }
    state.activeLangs.delete(lang);
  } else {
    state.activeLangs.add(lang);
  }
  localStorage.setItem('gadol_langs', JSON.stringify([...state.activeLangs]));
  updateLangButtons();
  renderChapter();
}
function updateLangButtons() {
  document.querySelectorAll('.lp').forEach(btn => {
    const lang = btn.dataset.lang;
    if (!lang) return;
    btn.classList.toggle('active', state.activeLangs.has(lang));
  });
}

// ─────────────────────────────────────────────
// 사이드바 — 전체 성경 목록 (구약/신약)
// ─────────────────────────────────────────────
function buildToc() {
  if (!tocOT || !tocNT) return;
  tocOT.innerHTML = '';
  tocNT.innerHTML = '';

  // 그룹별로 묶기
  const groupsOT = {};
  const groupsNT = {};
  BOOK_LIST.forEach(bk => {
    const target = bk.testament === 'OT' ? groupsOT : groupsNT;
    if (!target[bk.group]) target[bk.group] = [];
    target[bk.group].push(bk);
  });

  renderTocGroups(tocOT, groupsOT);
  renderTocGroups(tocNT, groupsNT);

  // 신약 하단 안내
  const ntNotice = document.createElement('div');
  ntNotice.className = 'toc-nt-notice';
  ntNotice.innerHTML = `<span>📖</span> <span>현재 <b>요한복음 1장</b>을 읽을 수 있으며, 나머지 구절들은 순차적으로 추가됩니다.</span>`;
  tocNT.appendChild(ntNotice);

  // 신약에서 데이터 있는 책(요한복음 등) 장 목록 자동 펼치기
  BOOK_LIST.filter(b => b.testament === 'NT').forEach(bk => {
    if (typeof BIBLE !== 'undefined' && BIBLE[`${bk.id}_1`]) {
      const bookItem = tocNT.querySelector(`.toc-book-item[data-book-id="${bk.id}"]`);
      if (bookItem) openChapDiv(bookItem, bk);
    }
  });

  // 현재 탭 활성화
  const curBk = BOOK_LIST.find(b => b.id === state.book);
  if (curBk) switchTestament(curBk.testament);
}

function renderTocGroups(container, groups) {
  Object.entries(groups).forEach(([groupName, books]) => {
    const section = document.createElement('div');
    section.className = 'toc-group';
    section.dataset.group = groupName;

    // ── 그룹 헤더 ──
    const groupHeader = document.createElement('button');
    groupHeader.className = 'toc-group-header';
    groupHeader.innerHTML = `
      <span style="display:flex;align-items:center;gap:6px">
        <span>${groupName}</span>
        <span class="toc-group-count">${books.length}</span>
      </span>
      <span class="toc-group-arrow">▾</span>`;
    groupHeader.onclick = () => toggleGroup(section, groupHeader);

    const groupBody = document.createElement('div');
    groupBody.className = 'toc-group-body';

    // ── 책 목록 ──
    books.forEach(bk => {
      const bookItem = document.createElement('div');
      bookItem.className = 'toc-book-item';
      bookItem.dataset.bookId  = bk.id;
      bookItem.dataset.bookKo  = bk.ko;
      bookItem.dataset.bookEn  = bk.en.toLowerCase();

      const bookRow = document.createElement('div');
      bookRow.className = 'toc-book-row';

      // 책 이름 버튼 (클릭 → 1장 이동)
      const nameBtn = document.createElement('button');
      const hasAnyData = typeof BIBLE !== 'undefined' && !!BIBLE[`${bk.id}_1`];
      nameBtn.className = 'toc-book-name' + (state.book === bk.id ? ' active-book' : '') + (hasAnyData ? ' has-data' : ' no-data');
      nameBtn.innerHTML = `
        <span class="toc-book-ko">${bk.ko}</span>
        <span class="toc-book-en">${bk.en}</span>
        ${hasAnyData ? '<span class="toc-book-avail">읽기</span>' : ''}
        <span class="toc-book-ch-count">${bk.ch}장</span>`;
      nameBtn.onclick = () => {
        // 장 목록 펼치기
        const chapDiv = bookItem.querySelector('.toc-chaps');
        if (chapDiv && chapDiv.style.display === 'none') {
          openChapDiv(bookItem, bk);
        }
        if (getVerses(bk.id, 1).length > 0) goTo(bk.id, 1);
        else { showToast(`${bk.ko}은 준비 중입니다 🙏`); }
      };

      // 펼치기/접기 토글 버튼 (▾)
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'toc-book-toggle' + (state.book === bk.id ? ' open' : '');
      toggleBtn.title = `${bk.ko} 장 목록`;
      toggleBtn.textContent = state.book === bk.id ? '▴' : '▾';
      toggleBtn.onclick = (e) => {
        e.stopPropagation();
        const chapDiv = bookItem.querySelector('.toc-chaps');
        if (!chapDiv) return;
        const isOpen = chapDiv.style.display !== 'none';
        if (isOpen) {
          chapDiv.style.display = 'none';
          toggleBtn.textContent = '▾';
          toggleBtn.classList.remove('open');
        } else {
          openChapDiv(bookItem, bk);
          toggleBtn.textContent = '▴';
          toggleBtn.classList.add('open');
        }
      };

      bookRow.appendChild(nameBtn);
      bookRow.appendChild(toggleBtn);

      // 장 목록 (현재 책이면 자동 펼치기)
      const chapDiv = document.createElement('div');
      chapDiv.className = 'toc-chaps';
      chapDiv.style.display = state.book === bk.id ? 'flex' : 'none';
      if (state.book === bk.id) {
        renderChapBtns(chapDiv, bk);
        chapDiv.dataset.built = '1';
      }

      bookItem.appendChild(bookRow);
      bookItem.appendChild(chapDiv);
      groupBody.appendChild(bookItem);
    });

    section.appendChild(groupHeader);
    section.appendChild(groupBody);
    container.appendChild(section);
  });
}

function toggleGroup(section, header) {
  const body  = section.querySelector('.toc-group-body');
  const arrow = header.querySelector('.toc-group-arrow');
  const isOpen = body.style.display !== 'none';
  body.style.display  = isOpen ? 'none' : 'block';
  arrow.textContent   = isOpen ? '▸' : '▾';
  header.classList.toggle('collapsed', isOpen);
}

function openChapDiv(bookItem, bk) {
  const chapDiv  = bookItem.querySelector('.toc-chaps');
  const togBtn   = bookItem.querySelector('.toc-book-toggle');
  if (!chapDiv) return;
  chapDiv.style.display = 'flex';
  if (togBtn) { togBtn.textContent = '▴'; togBtn.classList.add('open'); }
  if (!chapDiv.dataset.built) {
    renderChapBtns(chapDiv, bk);
    chapDiv.dataset.built = '1';
  }
}

function renderChapBtns(chapDiv, bk) {
  chapDiv.innerHTML = '';
  const hasData = (id, ch) => typeof BIBLE !== 'undefined' && !!BIBLE[`${id}_${ch}`];
  for (let ch = 1; ch <= bk.ch; ch++) {
    const btn = document.createElement('button');
    btn.className = 'toc-ch-btn';
    if (state.book === bk.id && state.chapter === ch) btn.classList.add('active');
    const available = hasData(bk.id, ch);
    if (!available) btn.classList.add('unavailable');
    btn.textContent = ch;
    btn.title = available ? `${bk.ko} ${ch}장` : `${bk.ko} ${ch}장 (준비 중)`;
    btn.onclick = () => {
      if (!available) { showToast(`${bk.ko} ${ch}장은 준비 중입니다 🙏`); return; }
      goTo(bk.id, ch);
    };
    chapDiv.appendChild(btn);
  }
}

function switchTestament(t) {
  tocOT.style.display = t === 'OT' ? 'block' : 'none';
  tocNT.style.display = t === 'NT' ? 'block' : 'none';
  document.getElementById('tabOT').classList.toggle('active', t === 'OT');
  document.getElementById('tabNT').classList.toggle('active', t === 'NT');
  // 검색창 초기화
  const search = document.getElementById('tocSearch');
  if (search) search.value = '';
  // filterToc 재실행(숨겨진 항목 복원)
  filterToc('');
  // 탭 전환 시 스크롤 맨 위로
  const tocScroll = document.getElementById('tocScroll');
  if (tocScroll) tocScroll.scrollTop = 0;
}

// ── TOC 검색 필터 ──────────────────────────────
function filterToc(query) {
  const q = query.trim().toLowerCase();
  const panels = [tocOT, tocNT];
  panels.forEach(panel => {
    if (!panel) return;
    panel.querySelectorAll('.toc-book-item').forEach(item => {
      const ko = item.dataset.bookKo || '';
      const en = item.dataset.bookEn || '';
      const match = !q || ko.includes(q) || en.includes(q);
      item.style.display = match ? '' : 'none';
    });
    // 그룹 내 모든 항목이 숨겨진 경우 그룹도 숨기기
    panel.querySelectorAll('.toc-group').forEach(grp => {
      const visible = [...grp.querySelectorAll('.toc-book-item')].some(i => i.style.display !== 'none');
      grp.style.display = visible ? '' : 'none';
    });
    // 결과 없음 메시지
    let noRes = panel.querySelector('.toc-no-result');
    const anyVisible = [...panel.querySelectorAll('.toc-book-item')].some(i => i.style.display !== 'none');
    if (!anyVisible && q) {
      if (!noRes) {
        noRes = document.createElement('p');
        noRes.className = 'toc-no-result';
        panel.appendChild(noRes);
      }
      noRes.textContent = `"${query}"에 해당하는 성경이 없습니다`;
      noRes.style.display = '';
    } else if (noRes) {
      noRes.style.display = 'none';
    }
  });
}

function goTo(bookId, chapter) {
  state.book = bookId;
  state.chapter = chapter;
  stopTTS();
  closeSidebar();
  renderChapter();
  updateHeader();
  buildToc();
  // 현재 성경이 신약이면 신약 탭 활성화
  const bk = BOOK_LIST.find(b => b.id === bookId);
  if (bk) switchTestament(bk.testament);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.pushState(null, '', `?book=${bookId}&ch=${chapter}`);
}

// ─────────────────────────────────────────────
// 헤더 업데이트
// ─────────────────────────────────────────────
function updateHeader() {
  const bk = BOOK_LIST.find(b => b.id === state.book);
  const title = bk ? `${bk.ko} ${state.chapter}장` : '';
  if (headerInfo)   headerInfo.textContent = title;
  if (chapterTitle) chapterTitle.textContent = title;
  if (chapterLabel) chapterLabel.textContent = bk ? bk.en + ' Chapter ' + state.chapter : '';
  document.title = `${title} — 가돌`;
}

// ─────────────────────────────────────────────
// 장 이동
// ─────────────────────────────────────────────
function prevChapter() {
  const bk = BOOK_LIST.find(b => b.id === state.book);
  if (!bk) return;
  if (state.chapter > 1) { goTo(state.book, state.chapter - 1); }
  else {
    const idx = BOOK_LIST.indexOf(bk);
    if (idx > 0) { const p = BOOK_LIST[idx-1]; goTo(p.id, p.ch); }
    else showToast('첫 번째 장입니다');
  }
}
function nextChapter() {
  const bk = BOOK_LIST.find(b => b.id === state.book);
  if (!bk) return;
  if (state.chapter < bk.ch) { goTo(state.book, state.chapter + 1); }
  else {
    const idx = BOOK_LIST.indexOf(bk);
    if (idx < BOOK_LIST.length - 1) { goTo(BOOK_LIST[idx+1].id, 1); }
    else showToast('마지막 장입니다');
  }
}

// ─────────────────────────────────────────────
// 챕터 렌더링
// ─────────────────────────────────────────────
function renderChapter() {
  if (!versesWrap) return;
  const verses = getVerses(state.book, state.chapter);
  if (!verses || verses.length === 0) {
    versesWrap.innerHTML = `
      <div class="no-chapter">
        <div class="no-chapter-icon">🙏</div>
        <p>이 장의 본문은 아직 준비 중입니다.</p>
        <p style="font-size:0.8rem;margin-top:6px;opacity:0.6">현재 창세기 1장 · 요한복음 1장이 제공됩니다</p>
      </div>`;
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
    return;
  }
  const bk = BOOK_LIST.find(b => b.id === state.book);
  versesWrap.innerHTML = verses.map(v => buildVerseCard(v, bk)).join('');
  applyHighlights();
  const idx = BOOK_LIST.indexOf(bk);
  if (prevBtn) prevBtn.disabled = (idx === 0 && state.chapter === 1);
  if (nextBtn) nextBtn.disabled = (idx === BOOK_LIST.length - 1 && state.chapter === bk.ch);
}

// ─────────────────────────────────────────────
// 구절 카드 생성
// ─────────────────────────────────────────────
const LANG_INFO = {
  ko: { label:'KRV', cls:'ko', name:'개역한글' },
  en: { label:'WEB', cls:'en', name:'English'  },
  zh: { label:'和合', cls:'zh', name:'中文'    },
  ru: { label:'Син', cls:'ru', name:'Русский'  },
  ja: { label:'口語', cls:'ja', name:'日本語'  },
  es: { label:'RV',  cls:'es', name:'Español'  },
};
const TTS_LANG = { ko:'ko-KR', en:'en-US', zh:'zh-CN', ru:'ru-RU', ja:'ja-JP', es:'es-ES' };

function buildVerseCard(verse, bk) {
  const { v } = verse;
  const verseRef = `${bk ? bk.ko : state.book} ${state.chapter}:${v}`;
  const langOrder = ['ko','en','zh','ru','ja','es'];
  let lines = '';

  langOrder.forEach(lang => {
    if (!state.activeLangs.has(lang)) return;
    const text = verse[lang];
    if (!text) return;
    const info = LANG_INFO[lang];
    const tokenized = tokenizeText(text, lang);
    // 각 구절 줄에 TTS 버튼 추가
    lines += `
      <div class="verse-line verse-${lang}">
        <span class="lang-label lang-label-${lang}">${info.label}</span>
        <span class="verse-text ${lang}-text">${tokenized}</span>
        <button class="verse-tts-btn" onclick="speakText(${JSON.stringify(text)}, '${lang}', this)" title="${info.name} 음성 재생">🔊</button>
      </div>`;
  });

  const favKey = `${state.book}_${state.chapter}_${v}`;
  const isFav = getFavorites().some(f => f.key === favKey);
  const hasMemo = getMemos()[favKey];
  return `
    <article class="verse-card" id="v${v}" data-v="${v}">
      <div class="verse-num-wrap">
        <span class="verse-num">${v}</span>
        <span class="verse-ref">${verseRef}</span>
        <button class="verse-memo-btn ${hasMemo ? 'has-memo' : ''}" onclick="openMemoModal('${state.book}',${state.chapter},${v})" title="메모">📝</button>
        <button class="verse-fav-btn ${isFav ? 'fav-active' : ''}" onclick="toggleFav('${state.book}',${state.chapter},${v},this)" title="저장">${isFav ? '❤️' : '♡'}</button>
      </div>
      <div class="verse-lines">${lines}</div>
    </article>`;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─────────────────────────────────────────────
// 토크나이저 (언어별)
// ─────────────────────────────────────────────
function tokenizeText(text, lang) {
  switch(lang) {
    case 'ko': return tokenizeKo(text);
    case 'en': return tokenizeEn(text);
    case 'zh': return tokenizeZh(text);
    case 'ru': return tokenizeRu(text);
    case 'ja': return tokenizeJa(text);
    case 'es': return tokenizeEs(text);
    default:   return escapeHtml(text);
  }
}

function tokenizeKo(text) {
  return text.replace(/([^\s,.:;!?()\[\]]+)/g, (match) => {
    const clean = match.replace(/[,.:;!?()\[\]'"]/g, '');
    const key = findKoKey(clean);
    if (key) return `<span class="word-tap ko-word" data-word="${key}" data-lang="ko" onclick="onWordTap(this)">${escapeHtml(match)}</span>`;
    return escapeHtml(match);
  });
}
function findKoKey(word) {
  if (!word || typeof KO_DICT === 'undefined') return null;
  if (KO_DICT[word]) return word;
  const stems = [word, word.replace(/[은는이가을를의에서로와과도만]/g,''), word.slice(0,-1), word.slice(0,-2)];
  for (const s of stems) { if (s && KO_DICT[s]) return s; }
  return null;
}

function tokenizeEn(text) {
  return text.replace(/([A-Za-zÀ-ÿ''-]+)/g, (match) => {
    const key = match.toLowerCase().replace(/['']/g,'');
    if (typeof EN_DICT !== 'undefined' && EN_DICT[key])
      return `<span class="word-tap en-word" data-word="${key}" data-orig="${escapeHtml(match)}" data-lang="en" onclick="onWordTap(this)">${escapeHtml(match)}</span>`;
    return escapeHtml(match);
  });
}

function tokenizeZh(text) {
  if (typeof ZH_DICT === 'undefined') return escapeHtml(text);
  let result = '', i = 0;
  while (i < text.length) {
    let matched = false;
    for (let len = 4; len >= 1; len--) {
      const seg = text.slice(i, i+len);
      if (ZH_DICT[seg]) {
        result += `<span class="word-tap zh-word" data-word="${escapeHtml(seg)}" data-lang="zh" onclick="onWordTap(this)">${escapeHtml(seg)}</span>`;
        i += len; matched = true; break;
      }
    }
    if (!matched) { result += escapeHtml(text[i]); i++; }
  }
  return result;
}

function tokenizeRu(text) {
  if (typeof RU_DICT === 'undefined') return escapeHtml(text);
  return text.replace(/([А-Яа-яЁёA-Za-z]+)/g, (match) => {
    const key = match.toLowerCase();
    if (RU_DICT[key]) return `<span class="word-tap ru-word" data-word="${key}" data-orig="${escapeHtml(match)}" data-lang="ru" onclick="onWordTap(this)">${escapeHtml(match)}</span>`;
    return escapeHtml(match);
  });
}

function tokenizeJa(text) {
  if (typeof JA_DICT === 'undefined') return escapeHtml(text);
  let result = '', i = 0;
  while (i < text.length) {
    let matched = false;
    for (let len = 5; len >= 1; len--) {
      const seg = text.slice(i, i+len);
      if (JA_DICT[seg]) {
        result += `<span class="word-tap ja-word" data-word="${escapeHtml(seg)}" data-lang="ja" onclick="onWordTap(this)">${escapeHtml(seg)}</span>`;
        i += len; matched = true; break;
      }
    }
    if (!matched) { result += escapeHtml(text[i]); i++; }
  }
  return result;
}

function tokenizeEs(text) {
  if (typeof ES_DICT === 'undefined') return escapeHtml(text);
  return text.replace(/([A-Za-záéíóúüñÁÉÍÓÚÜÑ''-]+)/g, (match) => {
    const key = match.toLowerCase().replace(/['']/g,'');
    if (ES_DICT[key]) return `<span class="word-tap es-word" data-word="${key}" data-orig="${escapeHtml(match)}" data-lang="es" onclick="onWordTap(this)">${escapeHtml(match)}</span>`;
    return escapeHtml(match);
  });
}

// ─────────────────────────────────────────────
// 단어 탭 핸들러
// ─────────────────────────────────────────────
function onWordTap(el) {
  const word = el.dataset.word;
  const lang = el.dataset.lang;
  const orig = el.dataset.orig || word;
  if (state.activeWordEl === el && state.sheetOpen) { closeSheet(); return; }
  if (state.activeWordEl) state.activeWordEl.classList.remove('tapped');
  el.classList.add('tapped');
  state.activeWordEl = el;
  state.lastTapWord = orig;
  state.lastTapLang = lang;
  showWordSheet(word, lang, orig);
}

// ─────────────────────────────────────────────
// 단어 시트 표시
// ─────────────────────────────────────────────
async function showWordSheet(word, lang, orig) {
  sheetWord.textContent = orig;
  const langLabels = { ko:'한국어', en:'English', zh:'中文', ru:'Русский', ja:'日本語', es:'Español' };
  sheetLangBadge.textContent = langLabels[lang] || lang;
  sheetLangBadge.className = `sheet-lang-badge ${lang}`;
  sheetBody.innerHTML = '<div class="sheet-loading"><div class="spinner sm"></div><span>불러오는 중...</span></div>';
  openSheet();
  switch(lang) {
    case 'en': renderEnSheet(word, orig); break;
    case 'ko': await renderKoSheet(word); break;
    case 'zh': renderZhSheet(word); break;
    case 'ru': renderRuSheet(word, orig); break;
    case 'ja': renderJaSheet(word); break;
    case 'es': renderEsSheet(word, orig); break;
  }
  // 애니메이션(300ms) 완료 후 스크롤 위치 강제 초기화
  setTimeout(() => {
    if (sheetBody) {
      sheetBody.scrollTop = 0;
    }
  }, 350);
}

// ── 발음 행 HTML 생성 헬퍼 ──
function pronRow(label, value, cls = '') {
  return value ? `<tr><th>${label}</th><td class="pron-val ${cls}">${value}</td></tr>` : '';
}

// ── 영어 단어 시트 ──────────────────────────
function renderEnSheet(word, orig) {
  const entry = (typeof EN_DICT !== 'undefined') ? EN_DICT[word] : null;
  if (!entry) { sheetBody.innerHTML = `<p class="no-data">"${orig}" — 사전 정보 없음</p>`; return; }
  let pronHtml = `
    <div class="pron-box">
      <span class="pron-box-icon">🗣️</span>
      <div>
        <div style="font-size:0.7rem;color:var(--text4);margin-bottom:2px">원어 (English)</div>
        <span class="pron-ipa" style="color:var(--en-color)">${entry.lemma || orig}</span>
      </div>
    </div>`;
  let html = `
    <div class="sheet-section">
      <div class="sheet-section-title">📖 기본 정보</div>
      ${pronHtml}
      <table class="dict-table">
        <tr><th>품사</th><td>${entry.pos}</td></tr>
        <tr><th>한국어 뜻</th><td class="ko-meaning">${entry.ko}</td></tr>
        ${entry.lemma && entry.lemma.toLowerCase() !== word ? `<tr><th>기본형</th><td><em>${entry.lemma}</em></td></tr>` : ''}
      </table>
    </div>`;
  if (entry.note) html += `<div class="sheet-section"><div class="sheet-section-title">💡 어원 / 참고</div><p class="sheet-note">${entry.note}</p></div>`;
  if (typeof KO_DICT !== 'undefined') {
    const koMeaning = entry.ko.split(',')[0].trim();
    if (KO_DICT[koMeaning]) html += `<div class="sheet-section"><div class="sheet-section-title">🔗 연관 백과사전</div><button class="link-btn" onclick="showWordSheet('${koMeaning}','ko','${koMeaning}')">「${koMeaning}」 백과사전 보기 →</button></div>`;
  }
  sheetBody.innerHTML = html;
}

// ── 한국어 단어 시트 (백과사전) ──────────────
async function renderKoSheet(word) {
  const entry = (typeof KO_DICT !== 'undefined') ? KO_DICT[word] : null;
  if (!entry) { sheetBody.innerHTML = `<p class="no-data">"${word}" — 백과사전 정보 없음</p>`; return; }
  let html = '';
  entry.sections.forEach(sec => {
    html += `<div class="sheet-section"><div class="sheet-section-title">${sec.title}</div><p class="sheet-note">${sec.text}</p></div>`;
  });
  if (entry.wiki) {
    html += `<div class="sheet-section wiki-section"><div class="sheet-section-title">📚 Wikipedia 요약</div><p class="wiki-summary">${entry.wiki.summary}</p><a href="${entry.wiki.url}" target="_blank" class="wiki-link">🔗 Wikipedia에서 더 읽기: ${entry.wiki.title}</a></div>`;
  }
  if (entry.osm) {
    const { name, lat, lon } = entry.osm;
    const tileUrl = buildOsmPreviewUrl(lat, lon, 13);
    const mapLink = buildOsmLinkUrl(lat, lon, 13);
    html += `<div class="sheet-section osm-section"><div class="sheet-section-title">🗺️ 지도 위치: ${name}</div><div class="osm-map-wrap"><img class="osm-tile" src="${tileUrl}" alt="${name}" onerror="this.closest('.osm-map-wrap').innerHTML='<p class=\\'no-data\\'>지도 로딩 실패</p>'"/><div class="osm-pin">📍</div></div><a href="${mapLink}" target="_blank" class="osm-link">🗺️ OpenStreetMap에서 열기</a><p class="osm-coords">위도 ${lat.toFixed(4)}° / 경도 ${lon.toFixed(4)}°</p></div>`;
  }
  sheetBody.innerHTML = html;
  if (entry.wiki) {
    const apiData = await fetchWikiSummary(entry.wiki.title);
    if (apiData && apiData.extract && wordSheet.classList.contains('open')) {
      const wikiEl = wordSheet.querySelector('.wiki-summary');
      if (wikiEl && apiData.extract.length > entry.wiki.summary.length)
        wikiEl.textContent = apiData.extract.slice(0,300) + (apiData.extract.length > 300 ? '...' : '');
      if (apiData.thumbnail) {
        const wikiSec = wordSheet.querySelector('.wiki-section');
        if (wikiSec && !wikiSec.querySelector('.wiki-thumb')) {
          const img = document.createElement('img');
          img.className = 'wiki-thumb'; img.src = apiData.thumbnail; img.alt = entry.wiki.title;
          wikiSec.insertBefore(img, wikiSec.querySelector('.wiki-summary'));
        }
      }
    }
  }
}

// ── 중국어 단어 시트 (병음 강조 표시) ────────
function renderZhSheet(word) {
  const entry = (typeof ZH_DICT !== 'undefined') ? ZH_DICT[word] : null;
  if (!entry) { sheetBody.innerHTML = `<p class="no-data">"${word}" — 사전 정보 없음</p>`; return; }
  let pinyinHtml = '';
  if (entry.pinyin) {
    pinyinHtml = `
      <div class="pron-box">
        <span class="pron-box-icon">🗣️</span>
        <div>
          <div style="font-size:0.7rem;color:var(--text4);margin-bottom:2px">拼音 (병음)</div>
          <span class="pron-ipa pinyin">${entry.pinyin}</span>
        </div>
      </div>`;
  }
  sheetBody.innerHTML = `
    <div class="sheet-section">
      <div class="sheet-section-title">📖 기본 정보</div>
      ${pinyinHtml}
      <table class="dict-table">
        <tr><th>한국어 뜻</th><td class="ko-meaning">${entry.ko}</td></tr>
        ${entry.note ? `<tr><th>어원 / 참고</th><td>${entry.note}</td></tr>` : ''}
      </table>
    </div>
    <div class="sheet-section">
      <div class="sheet-section-title">🎵 성조 안내</div>
      <p class="sheet-note" style="font-size:0.82rem">
        ā á ǎ à = 1성(평탄) 2성(올라감) 3성(내려갔다올라감) 4성(내려감)<br>
        숫자 없음 = 경성(짧고 약하게)
      </p>
    </div>`;
}

// ── 러시아어 단어 시트 (강세 발음기호 포함) ───
function renderRuSheet(word, orig) {
  const entry = (typeof RU_DICT !== 'undefined') ? RU_DICT[word] : null;
  if (!entry) { sheetBody.innerHTML = `<p class="no-data">"${orig}" — 사전 정보 없음</p>`; return; }
  let pronHtml = '';
  if (entry.pron) {
    pronHtml = `
      <div class="pron-box">
        <span class="pron-box-icon">🗣️</span>
        <div>
          <div style="font-size:0.7rem;color:var(--text4);margin-bottom:2px">발음 (대문자=강세음절)</div>
          <span class="pron-ipa pron-ru">${entry.pron}</span>
        </div>
      </div>`;
  }
  sheetBody.innerHTML = `
    <div class="sheet-section">
      <div class="sheet-section-title">📖 기본 정보</div>
      ${pronHtml}
      <table class="dict-table">
        <tr><th>원형</th><td><em>${orig}</em></td></tr>
        <tr><th>한국어 뜻</th><td class="ko-meaning">${entry.ko}</td></tr>
        ${entry.note ? `<tr><th>어원 / 참고</th><td>${entry.note}</td></tr>` : ''}
      </table>
    </div>
    <div class="sheet-section">
      <div class="sheet-section-title">💡 러시아어 발음 안내</div>
      <p class="sheet-note" style="font-size:0.82rem">
        대문자로 표시된 음절에 강세. Ё(요)는 항상 강세.<br>
        Х = 한국어 'ㅎ', Ж = 'ㅈ', Ш = 'ㅅ', Щ = 'ㅅ+ㅅ'
      </p>
    </div>`;
}

// ── 일본어 단어 시트 (후리가나/로마자) ────────
function renderJaSheet(word) {
  const entry = (typeof JA_DICT !== 'undefined') ? JA_DICT[word] : null;
  if (!entry) { sheetBody.innerHTML = `<p class="no-data">"${word}" — 사전 정보 없음</p>`; return; }
  let pronHtml = '';
  if (entry.pron) {
    const match = entry.pron.match(/^(.*?)\s*\(([^)]+)\)$/);
    const hiragana = match ? match[1].replace(/・/g, '') : entry.pron;
    const romaji   = match ? match[2] : '';
    pronHtml = `
      <div class="pron-box">
        <span class="pron-box-icon">🗣️</span>
        <div>
          <div style="font-size:0.7rem;color:var(--text4);margin-bottom:2px">読み方 (읽기)</div>
          <span class="pron-ipa pron-ja">${hiragana}</span>
          ${romaji ? `<span style="font-size:0.8rem;color:var(--text3);margin-left:8px">(${romaji})</span>` : ''}
        </div>
      </div>`;
  }
  sheetBody.innerHTML = `
    <div class="sheet-section">
      <div class="sheet-section-title">📖 기본 정보</div>
      ${pronHtml}
      <table class="dict-table">
        <tr><th>한국어 뜻</th><td class="ko-meaning">${entry.ko}</td></tr>
        ${entry.note ? `<tr><th>어원 / 참고</th><td>${entry.note}</td></tr>` : ''}
      </table>
    </div>
    <div class="sheet-section">
      <div class="sheet-section-title">💡 일본어 발음 안내</div>
      <p class="sheet-note" style="font-size:0.82rem">
        일본어는 기본적으로 모든 음절을 균등하게 발음.<br>
        ō = おう, ū = うう (장음). っ = 자음 두 번 발음.
      </p>
    </div>`;
}

// ── 스페인어 단어 시트 (강세 발음기호) ────────
function renderEsSheet(word, orig) {
  const entry = (typeof ES_DICT !== 'undefined') ? ES_DICT[word] : null;
  if (!entry) { sheetBody.innerHTML = `<p class="no-data">"${orig}" — 사전 정보 없음</p>`; return; }
  let pronHtml = '';
  if (entry.pron) {
    pronHtml = `
      <div class="pron-box">
        <span class="pron-box-icon">🗣️</span>
        <div>
          <div style="font-size:0.7rem;color:var(--text4);margin-bottom:2px">Pronunciación (발음, 대문자=강세)</div>
          <span class="pron-ipa pron-es">${entry.pron}</span>
        </div>
      </div>`;
  }
  sheetBody.innerHTML = `
    <div class="sheet-section">
      <div class="sheet-section-title">📖 기본 정보</div>
      ${pronHtml}
      <table class="dict-table">
        <tr><th>원어</th><td><em>${orig}</em></td></tr>
        <tr><th>한국어 뜻</th><td class="ko-meaning">${entry.ko}</td></tr>
        ${entry.note ? `<tr><th>어원 / 참고</th><td>${entry.note}</td></tr>` : ''}
      </table>
    </div>
    <div class="sheet-section">
      <div class="sheet-section-title">💡 스페인어 발음 안내</div>
      <p class="sheet-note" style="font-size:0.82rem">
        대문자 음절에 강세. J/G(모음 앞) = 'ㅎ'처럼. LL/Y = 'ㅑ'처럼.<br>
        RR = 강하게 굴림. Ñ = '냐' 음. V = B와 같이 'ㅂ' 발음.
      </p>
    </div>`;
}

// ─────────────────────────────────────────────
// TTS (Web Speech API)
// ─────────────────────────────────────────────
let _ttsBtn = null; // 현재 재생 중인 버튼

function speakText(text, lang, btn) {
  if (!('speechSynthesis' in window)) { showToast('이 브라우저는 음성을 지원하지 않습니다'); return; }
  stopTTS();
  // 버튼 애니메이션
  if (btn) {
    _ttsBtn = btn;
    btn.classList.add('playing');
    btn.textContent = '⏸';
  }
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = TTS_LANG[lang] || 'ko-KR';
  utter.rate = lang === 'zh' ? 0.8 : lang === 'ru' ? 0.82 : 0.88;
  utter.pitch = 1.0;
  utter.onstart  = () => { state.ttsActive = true; };
  utter.onend    = () => {
    state.ttsActive = false;
    if (_ttsBtn) { _ttsBtn.classList.remove('playing'); _ttsBtn.textContent = '🔊'; _ttsBtn = null; }
  };
  utter.onerror  = () => {
    state.ttsActive = false;
    if (_ttsBtn) { _ttsBtn.classList.remove('playing'); _ttsBtn.textContent = '🔊'; _ttsBtn = null; }
    showToast('음성 재생 실패 — 브라우저 설정을 확인해 주세요');
  };
  currentUtterance = utter;
  window.speechSynthesis.speak(utter);
}

function stopTTS() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  state.ttsActive = false;
  if (_ttsBtn) { _ttsBtn.classList.remove('playing'); _ttsBtn.textContent = '🔊'; _ttsBtn = null; }
}

// 하단 내비 "듣기" — 현재 장 전체를 순서대로 읽기
function speakCurrentVerse() {
  const verses = getVerses(state.book, state.chapter);
  if (!verses || !verses.length) { showToast('읽을 구절이 없습니다'); return; }
  if (state.ttsActive) { stopTTS(); setNavActive('navRead'); return; }
  setNavActive('navTTS');
  const firstLang = [...state.activeLangs][0];
  const fullText = verses.map(v => v[firstLang]).filter(Boolean).join(' ');
  speakText(fullText, firstLang, null);
  const langName = { ko:'한국어', en:'영어', zh:'중국어', ru:'러시아어', ja:'일본어', es:'스페인어' };
  showToast(`🔊 ${langName[firstLang] || firstLang} 음성 재생 중... (다시 누르면 중단)`, 3000);
}

// 시트 내 단어 TTS
function speakWord() {
  if (state.lastTapWord) {
    const btn = document.getElementById('sheetTtsBtn');
    speakText(state.lastTapWord, state.lastTapLang, btn);
  }
}

// ─────────────────────────────────────────────
// Wikipedia API
// ─────────────────────────────────────────────
async function fetchWikiSummary(title) {
  try {
    const url = `https://ko.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    return { extract: data.extract||'', thumbnail: data.thumbnail?.source||null, pageUrl: data.content_urls?.desktop?.page||'' };
  } catch { return null; }
}

// ─────────────────────────────────────────────
// OSM
// ─────────────────────────────────────────────
function buildOsmPreviewUrl(lat, lon, z) {
  const x = Math.floor((lon+180)/360 * Math.pow(2,z));
  const y = Math.floor((1 - Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 * Math.pow(2,z));
  return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
}
function buildOsmLinkUrl(lat, lon, z) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${z}/${lat}/${lon}`;
}

// ─────────────────────────────────────────────
// 저장(즐겨찾기) 기능
// ─────────────────────────────────────────────
function getFavorites() {
  try { return JSON.parse(localStorage.getItem('gadol_favorites') || '[]'); }
  catch { return []; }
}
function saveFavorites(favs) {
  localStorage.setItem('gadol_favorites', JSON.stringify(favs));
}
function toggleFav(book, chapter, verse, btn) {
  const key = `${book}_${chapter}_${verse}`;
  let favs = getFavorites();
  const idx = favs.findIndex(f => f.key === key);
  if (idx >= 0) {
    favs.splice(idx, 1);
    btn.classList.remove('fav-active');
    btn.textContent = '♡';
  } else {
    const bk = BOOK_LIST.find(b => b.id === book);
    const verses = getVerses(book, chapter);
    const v = verses.find(vv => vv.v === verse);
    favs.unshift({ key, book, chapter, verse, bookName: bk ? bk.ko : book, ko: v ? v.ko : '', savedAt: Date.now() });
    btn.classList.add('fav-active');
    btn.textContent = '❤️';
  }
  saveFavorites(favs);
}
function toggleFavPanel() {
  const panel = document.getElementById('favPanel');
  const isOpen = panel.classList.contains('open');
  document.getElementById('memoPanel').classList.remove('open');
  if (isOpen) {
    panel.classList.remove('open');
    setNavActive('navRead');
  } else {
    renderFavPanel();
    panel.classList.add('open');
    setNavActive('navFav');
  }
}
function renderFavPanel() {
  const body = document.getElementById('favPanelBody');
  const favs = getFavorites();
  if (!favs.length) {
    body.innerHTML = '<p class="fav-empty">저장한 말씀이 없습니다.<br>구절 옆 ♡ 버튼을 눌러 저장해보세요.</p>';
    return;
  }
  body.innerHTML = favs.map((f, i) => `
    <div class="fav-item" onclick="goToFavVerse('${f.book}',${f.chapter},${f.verse})">
      <div class="fav-item-ref">${f.bookName} ${f.chapter}:${f.verse}</div>
      <div class="fav-item-text">${f.ko || ''}</div>
      <button class="fav-item-del" onclick="event.stopPropagation(); removeFav(${i})" title="삭제">✕</button>
    </div>`).join('');
}
function removeFav(idx) {
  const favs = getFavorites();
  favs.splice(idx, 1);
  saveFavorites(favs);
  renderFavPanel();
  renderChapter();
}
function goToFavVerse(book, chapter, verse) {
  state.book = book;
  state.chapter = chapter;
  renderChapter();
  updateURL();
  toggleFavPanel();
  setTimeout(() => {
    const el = document.getElementById('v' + verse);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('highlighted'); setTimeout(() => el.classList.remove('highlighted'), 2000); }
  }, 100);
}

// ─────────────────────────────────────────────
// 하이라이트 (롱프레스)
// ─────────────────────────────────────────────
function getHighlights() {
  try { return JSON.parse(localStorage.getItem('gadol_highlights') || '{}'); }
  catch { return {}; }
}
function saveHighlights(hl) { localStorage.setItem('gadol_highlights', JSON.stringify(hl)); }

function applyHighlights() {
  const hls = getHighlights();
  document.querySelectorAll('.verse-card').forEach(card => {
    const v = card.dataset.v;
    const key = `${state.book}_${state.chapter}_${v}`;
    card.classList.remove('hl-yellow','hl-green','hl-blue','hl-pink','hl-purple');
    if (hls[key]) card.classList.add('hl-' + hls[key]);
  });
}

function setHighlight(book, chapter, verse, color) {
  const hls = getHighlights();
  const key = `${book}_${chapter}_${verse}`;
  if (!color || color === 'none') { delete hls[key]; }
  else { hls[key] = color; }
  saveHighlights(hls);
  const card = document.getElementById('v' + verse);
  if (card) {
    card.classList.remove('hl-yellow','hl-green','hl-blue','hl-pink','hl-purple');
    if (color && color !== 'none') card.classList.add('hl-' + color);
  }
}

let _hlPicker = null;
function showHlPicker(verse) {
  removeHlPicker();
  const colors = ['yellow','green','blue','pink','purple','none'];
  const labels = { none: '✕' };
  const div = document.createElement('div');
  div.className = 'hl-picker';
  div.id = 'hlPicker';
  colors.forEach(c => {
    const btn = document.createElement('button');
    btn.className = `hl-picker-btn hl-c-${c}`;
    if (labels[c]) btn.textContent = labels[c];
    btn.onclick = () => { setHighlight(state.book, state.chapter, verse, c); removeHlPicker(); };
    div.appendChild(btn);
  });
  document.body.appendChild(div);
  _hlPicker = div;
  setTimeout(() => document.addEventListener('click', _hlPickerOutside, { once: true }), 10);
}
function _hlPickerOutside(e) { if (_hlPicker && !_hlPicker.contains(e.target)) removeHlPicker(); }
function removeHlPicker() { if (_hlPicker) { _hlPicker.remove(); _hlPicker = null; } }

function setupLongPress() {
  const wrap = document.getElementById('versesWrap');
  if (!wrap) return;
  let timer = null, activeVerse = null;
  wrap.addEventListener('touchstart', e => {
    const card = e.target.closest('.verse-card');
    if (!card) return;
    activeVerse = parseInt(card.dataset.v);
    timer = setTimeout(() => {
      navigator.vibrate && navigator.vibrate(30);
      showHlPicker(activeVerse);
      timer = null;
    }, 500);
  }, { passive: true });
  wrap.addEventListener('touchmove', () => { if (timer) { clearTimeout(timer); timer = null; } }, { passive: true });
  wrap.addEventListener('touchend', () => { if (timer) { clearTimeout(timer); timer = null; } }, { passive: true });
}

// ─────────────────────────────────────────────
// 메모 기능
// ─────────────────────────────────────────────
function getMemos() {
  try { return JSON.parse(localStorage.getItem('gadol_memos') || '{}'); }
  catch { return {}; }
}
function saveMemos(m) { localStorage.setItem('gadol_memos', JSON.stringify(m)); }

let _memoTarget = null;
let _memoHlColor = null;
function openMemoModal(book, chapter, verse) {
  _memoTarget = { book, chapter, verse };
  const key = `${book}_${chapter}_${verse}`;
  const bk = BOOK_LIST.find(b => b.id === book);
  const ref = `${bk ? bk.ko : book} ${chapter}:${verse}`;
  const verses = getVerses(book, chapter);
  const v = verses.find(vv => vv.v === verse);

  document.getElementById('memoModalRef').textContent = ref;
  document.getElementById('memoModalVerse').textContent = v ? v.ko : '';
  const textarea = document.getElementById('memoTextarea');
  const memos = getMemos();
  textarea.value = memos[key] ? memos[key].text : '';

  // 현재 하이라이트 색상 표시
  const hls = getHighlights();
  _memoHlColor = hls[key] || null;
  document.querySelectorAll('.memo-hl-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.color === (_memoHlColor || 'none'));
  });

  document.getElementById('memoModalBg').classList.add('visible');
  document.getElementById('memoModal').classList.add('open');
  setTimeout(() => textarea.focus(), 200);
}
function pickHlColor(btn) {
  document.querySelectorAll('.memo-hl-btn').forEach(b => b.classList.remove('selected'));
  const color = btn.dataset.color;
  _memoHlColor = (color === 'none') ? null : color;
  btn.classList.add('selected');
}
function closeMemoModal() {
  document.getElementById('memoModalBg').classList.remove('visible');
  document.getElementById('memoModal').classList.remove('open');
  _memoTarget = null;
}
function saveMemoFromModal() {
  if (!_memoTarget) return;
  const key = `${_memoTarget.book}_${_memoTarget.chapter}_${_memoTarget.verse}`;
  const text = document.getElementById('memoTextarea').value.trim();
  const memos = getMemos();
  if (text) {
    const bk = BOOK_LIST.find(b => b.id === _memoTarget.book);
    const verses = getVerses(_memoTarget.book, _memoTarget.chapter);
    const v = verses.find(vv => vv.v === _memoTarget.verse);
    memos[key] = {
      text, book: _memoTarget.book, chapter: _memoTarget.chapter,
      verse: _memoTarget.verse, bookName: bk ? bk.ko : _memoTarget.book,
      ko: v ? v.ko : '', savedAt: Date.now()
    };
  } else {
    delete memos[key];
  }
  saveMemos(memos);
  // 하이라이트 저장
  setHighlight(_memoTarget.book, _memoTarget.chapter, _memoTarget.verse, _memoHlColor || 'none');
  closeMemoModal();
  renderChapter();
  showToast('저장되었습니다');
}

function toggleMemoPanel() {
  const panel = document.getElementById('memoPanel');
  const isOpen = panel.classList.contains('open');
  // 다른 패널 닫기
  document.getElementById('favPanel').classList.remove('open');
  if (isOpen) {
    panel.classList.remove('open');
    setNavActive('navRead');
  } else {
    renderMemoPanel();
    panel.classList.add('open');
    setNavActive('navMemo');
  }
}
function renderMemoPanel() {
  const body = document.getElementById('memoPanelBody');
  const memos = getMemos();
  const list = Object.values(memos).sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
  if (!list.length) {
    body.innerHTML = '<p class="fav-empty">작성한 메모가 없습니다.<br>말씀을 탭하고 메모를 남겨보세요.</p>';
    return;
  }
  body.innerHTML = list.map(m => {
    const key = `${m.book}_${m.chapter}_${m.verse}`;
    const date = m.savedAt ? new Date(m.savedAt).toLocaleDateString('ko-KR') : '';
    return `
    <div class="memo-item" onclick="goToMemoVerse('${m.book}',${m.chapter},${m.verse})">
      <div class="memo-item-top">
        <span class="memo-item-ref">${m.bookName} ${m.chapter}:${m.verse}</span>
        <span class="memo-item-date">${date}</span>
      </div>
      <div class="memo-item-verse">${m.ko || ''}</div>
      <div class="memo-item-text">${m.text}</div>
      <button class="fav-item-del" onclick="event.stopPropagation(); deleteMemo('${key}')" title="삭제">✕</button>
    </div>`;
  }).join('');
}
function deleteMemo(key) {
  const memos = getMemos();
  delete memos[key];
  saveMemos(memos);
  renderMemoPanel();
  renderChapter();
}
function goToMemoVerse(book, chapter, verse) {
  state.book = book;
  state.chapter = chapter;
  renderChapter();
  updateURL();
  toggleMemoPanel();
  setTimeout(() => {
    const el = document.getElementById('v' + verse);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('highlighted'); setTimeout(() => el.classList.remove('highlighted'), 2000); }
  }, 100);
}

// ─────────────────────────────────────────────
// 바텀시트 열기/닫기
// ─────────────────────────────────────────────
function openSheet() {
  wordSheet.classList.add('open');
  sheetBg.classList.add('visible');
  state.sheetOpen = true;
  setTimeout(() => {
    if (sheetBody) sheetBody.scrollTop = 0;
  }, 50);
}
function closeSheet() {
  if (!wordSheet) return;
  wordSheet.classList.remove('open');
  sheetBg.classList.remove('visible');
  state.sheetOpen = false;
  if (state.activeWordEl) { state.activeWordEl.classList.remove('tapped'); state.activeWordEl = null; }
}
function setupSheetDrag() {
  const handle = document.getElementById('sheetHandle');
  if (!handle) return;
  let startY = 0, dragging = false;

  handle.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    dragging = true;
  }, { passive: true });

  handle.addEventListener('touchmove', e => {
    if (!dragging) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 20) { closeSheet(); dragging = false; }
  }, { passive: true });

  handle.addEventListener('touchend', () => { dragging = false; });

  if (sheetBody) {
    let bodyStartY = 0, bodyDragging = false;
    sheetBody.addEventListener('touchstart', e => {
      bodyStartY = e.touches[0].clientY;
      bodyDragging = sheetBody.scrollTop <= 0;
    }, { passive: true });
    sheetBody.addEventListener('touchmove', e => {
      if (!bodyDragging) return;
      const dy = e.touches[0].clientY - bodyStartY;
      if (dy > 20) { closeSheet(); bodyDragging = false; }
    }, { passive: true });
    sheetBody.addEventListener('touchend', () => { bodyDragging = false; }, { passive: true });
  }
}

// ─────────────────────────────────────────────
// 사이드바
// ─────────────────────────────────────────────
function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    const activeBook = sidebar.querySelector('.toc-book-name.active-book');
    if (activeBook) {
      activeBook.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, 320);
}
function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────────
// 스크롤 진행 바
// ─────────────────────────────────────────────
function onScroll() {
  const docEl = document.documentElement;
  const pct = docEl.scrollHeight - docEl.clientHeight > 0
    ? (window.scrollY / (docEl.scrollHeight - docEl.clientHeight)) * 100 : 0;
  if (readingFill) readingFill.style.width = pct + '%';
}

// ─────────────────────────────────────────────
// 내비게이션 보조
// ─────────────────────────────────────────────
function scrollToTop() { window.scrollTo({ top:0, behavior:'smooth' }); }
function highlightMode() {
  state.wordHighlight = !state.wordHighlight;
  document.querySelectorAll('.word-tap').forEach(el => el.classList.toggle('highlight-all', state.wordHighlight));
  showToast(state.wordHighlight ? '✨ 단어 강조 모드 ON — 탭해서 뜻 확인!' : '단어 강조 해제');
}
function setNavActive(id) {
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(id);
  if (btn) btn.classList.add('active');
}
function doLogout() { localStorage.removeItem('gadol_user'); location.href = 'index.html'; }

// ─────────────────────────────────────────────
// 토스트
// ─────────────────────────────────────────────
let _toastTimer;
function showToast(msg, duration = 2500) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}
