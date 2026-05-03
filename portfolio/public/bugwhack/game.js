// ── Config ──────────────────────────────────────────────────────────────────
const COLS = 6, ROWS = 4, TOTAL = COLS * ROWS;

const DIFF = {
  easy:   { time: 40, spawnMs: 1100, bugLife: 1800, maxBugs: 4 },
  medium: { time: 30, spawnMs: 750,  bugLife: 1300, maxBugs: 6 },
  hard:   { time: 25, spawnMs: 500,  bugLife: 900,  maxBugs: 8 },
};

// Bug types: [emoji, points, weight, label]
const BUG_TYPES = [
  { id: 'normal', emoji: '🐛', pts: 10,  weight: 50, label: '+10' },
  { id: 'speedy', emoji: '🦟', pts: 20,  weight: 25, label: '+20' },
  { id: 'bomb',   emoji: '💣', pts: -15, weight: 15, label: '-15 💥' },
  { id: 'golden', emoji: '🌟', pts: 50,  weight: 10, label: '+50 ⭐' },
];

const RANKS = [
  { min: 500, label: '🏆 Legend',      color: '#ffd700' },
  { min: 300, label: '💎 Expert',      color: '#00b4ff' },
  { min: 150, label: '🥈 Pro',         color: '#a855f7' },
  { min: 50,  label: '🥉 Apprentice',  color: '#00e5a0' },
  { min: 0,   label: '🐣 Rookie',      color: '#64748b' },
];

// ── State ────────────────────────────────────────────────────────────────────
let score = 0, lives = 3, timeLeft = 30, bugsSquashed = 0;
let combo = 0, bestCombo = 0, missStreak = 0;
let activeBugs = {};   // cellIndex → { type, timerId }
let spawnTimer, countdownTimer;
let difficulty = 'easy';
let gameRunning = false;

// ── DOM refs ─────────────────────────────────────────────────────────────────
const screens      = { start: q('#start-screen'), game: q('#game-screen'), end: q('#end-screen') };
const scoreEl      = q('#score');
const timerEl      = q('#timer');
const livesEl      = q('#lives');
const comboBanner  = q('#combo-banner');
const gridEl       = q('#grid');
const hiScoreDisp  = q('#hi-score-display');

function q(sel) { return document.querySelector(sel); }

// ── Helpers ──────────────────────────────────────────────────────────────────
function getHiScore() { return parseInt(localStorage.getItem('bw_hi') || '0'); }
function setHiScore(v) { localStorage.setItem('bw_hi', v); }

function weightedRandom(types) {
  const total = types.reduce((s, t) => s + t.weight, 0);
  let r = Math.random() * total;
  for (const t of types) { r -= t.weight; if (r <= 0) return t; }
  return types[0];
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Build Grid ───────────────────────────────────────────────────────────────
function buildGrid() {
  gridEl.innerHTML = '';
  for (let i = 0; i < TOTAL; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.idx = i;
    cell.addEventListener('click', onCellClick);
    gridEl.appendChild(cell);
  }
}

function getCell(idx) { return gridEl.children[idx]; }

// ── Spawn Bug ────────────────────────────────────────────────────────────────
function spawnBug() {
  if (!gameRunning) return;
  const cfg = DIFF[difficulty];
  if (Object.keys(activeBugs).length >= cfg.maxBugs) return;

  // Pick a free cell
  const free = [];
  for (let i = 0; i < TOTAL; i++) if (!activeBugs[i]) free.push(i);
  if (!free.length) return;

  const idx  = free[Math.floor(Math.random() * free.length)];
  const type = weightedRandom(BUG_TYPES);
  const cell = getCell(idx);

  cell.classList.add('has-bug', `bug-${type.id}`);
  cell.textContent = type.emoji;

  const timerId = setTimeout(() => removeBug(idx, true), cfg.bugLife);
  activeBugs[idx] = { type, timerId };
}

function removeBug(idx, escaped) {
  const bug = activeBugs[idx];
  if (!bug) return;
  clearTimeout(bug.timerId);
  delete activeBugs[idx];

  const cell = getCell(idx);
  cell.classList.remove('has-bug', `bug-${bug.type.id}`);
  cell.textContent = '';

  if (escaped && bug.type.id !== 'bomb') {
    // Bug escaped — lose a life
    loseLife();
  }
}

// ── Click Handler ─────────────────────────────────────────────────────────────
function onCellClick(e) {
  if (!gameRunning) return;
  const idx = parseInt(e.currentTarget.dataset.idx);
  const bug = activeBugs[idx];

  if (!bug) {
    // Missed — empty cell click
    missStreak++;
    combo = 0;
    updateComboBanner();
    flashCell(idx, 'miss');
    return;
  }

  // Hit!
  clearTimeout(bug.timerId);
  delete activeBugs[idx];

  const cell = getCell(idx);
  cell.classList.remove('has-bug', `bug-${bug.type.id}`);
  cell.textContent = '';

  if (bug.type.id === 'bomb') {
    // Bomb — lose points & life
    addScore(bug.type.pts);
    loseLife();
    combo = 0;
    flashCell(idx, 'miss');
    showPop(e.clientX, e.clientY, bug.type.label, '#ff4466');
  } else {
    combo++;
    missStreak = 0;
    if (combo > bestCombo) bestCombo = combo;
    bugsSquashed++;

    const multiplier = combo >= 5 ? 3 : combo >= 3 ? 2 : 1;
    const earned = bug.type.pts * multiplier;
    addScore(earned);
    flashCell(idx, 'hit');

    const popLabel = multiplier > 1 ? `${bug.type.label} x${multiplier}!` : bug.type.label;
    const popColor = bug.type.id === 'golden' ? '#ffd700' : '#00e5a0';
    showPop(e.clientX, e.clientY, popLabel, popColor);
    updateComboBanner();
  }
}

function flashCell(idx, cls) {
  const cell = getCell(idx);
  cell.classList.add(cls);
  setTimeout(() => cell.classList.remove(cls), 280);
}

// ── Score & Lives ─────────────────────────────────────────────────────────────
function addScore(delta) {
  score = Math.max(0, score + delta);
  scoreEl.textContent = score;
}

function loseLife() {
  lives = Math.max(0, lives - 1);
  livesEl.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
  if (lives === 0) endGame();
}

function updateComboBanner() {
  if (combo >= 5) {
    comboBanner.textContent = `🔥 COMBO x${combo}! UNSTOPPABLE!`;
  } else if (combo >= 3) {
    comboBanner.textContent = `⚡ COMBO x${combo}!`;
  } else {
    comboBanner.textContent = '';
  }
}

// ── Floating Score Pop ────────────────────────────────────────────────────────
function showPop(x, y, label, color) {
  const el = document.createElement('div');
  el.className = 'score-pop';
  el.textContent = label;
  el.style.color = color;
  el.style.left = `${x - 20}px`;
  el.style.top  = `${y - 20}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 820);
}

// ── Timer ─────────────────────────────────────────────────────────────────────
function startCountdown() {
  countdownTimer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 8) timerEl.classList.add('danger');
    if (timeLeft <= 0) endGame();
  }, 1000);
}

// ── Game Flow ─────────────────────────────────────────────────────────────────
function startGame() {
  const cfg = DIFF[difficulty];
  score = 0; lives = 3; timeLeft = cfg.time;
  bugsSquashed = 0; combo = 0; bestCombo = 0; missStreak = 0;
  activeBugs = {};
  gameRunning = true;

  scoreEl.textContent = '0';
  timerEl.textContent = cfg.time;
  timerEl.classList.remove('danger');
  livesEl.textContent = '❤️❤️❤️';
  comboBanner.textContent = '';

  buildGrid();
  showScreen('game');

  spawnTimer = setInterval(spawnBug, cfg.spawnMs);
  startCountdown();
}

function endGame() {
  gameRunning = false;
  clearInterval(spawnTimer);
  clearInterval(countdownTimer);

  // Clear remaining bugs
  Object.keys(activeBugs).forEach(idx => {
    clearTimeout(activeBugs[idx].timerId);
    const cell = getCell(parseInt(idx));
    cell.classList.remove('has-bug', ...BUG_TYPES.map(t => `bug-${t.id}`));
    cell.textContent = '';
  });
  activeBugs = {};

  // Update hi score
  const hi = getHiScore();
  if (score > hi) setHiScore(score);
  const newHi = getHiScore();

  // Rank
  const rank = RANKS.find(r => score >= r.min) || RANKS[RANKS.length - 1];

  // Populate end screen
  q('#final-score').textContent = score;
  q('#final-bugs').textContent  = bugsSquashed;
  q('#final-combo').textContent = `${bestCombo}x`;
  q('#final-hi').textContent    = newHi;
  q('#end-title').textContent   = lives === 0 ? 'Crashed! 💥' : 'Time\'s Up! ⏰';
  q('#end-icon').textContent    = lives === 0 ? '💥' : '⏰';

  const badge = q('#rank-badge');
  badge.textContent = rank.label;
  badge.style.background = `${rank.color}22`;
  badge.style.border = `1.5px solid ${rank.color}`;
  badge.style.color  = rank.color;

  showScreen('end');
}

// ── UI Events ─────────────────────────────────────────────────────────────────
q('#start-btn').addEventListener('click', startGame);
q('#play-again-btn').addEventListener('click', startGame);
q('#menu-btn').addEventListener('click', () => {
  hiScoreDisp.textContent = getHiScore();
  showScreen('start');
});

document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    difficulty = btn.dataset.diff;
  });
});

// ── Init ──────────────────────────────────────────────────────────────────────
hiScoreDisp.textContent = getHiScore();
showScreen('start');
