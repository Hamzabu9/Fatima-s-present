/* ══════════════════════════════════════════════
   FATIMATU'S BIRTHDAY — LOVE THEME JAVASCRIPT
   ══════════════════════════════════════════════ */

/* ═══ GLOBALS ═══ */
let audioCtx, masterGain, musicPlaying = false, musicMuted = false;
let heartsCaught = 0, framesUnlocked = 0, allUnlocked = false;
let melodyTimeout, finaleInterval;
let consecutiveHearts = 0, loveLetterShown = false;
let currentSlide = 0, unlockedSlides = 0;

let customAudioPlayer = new Audio('dave-ft-tems-raindance-trendybeatzcom_RUN4g8DP.mp3');
customAudioPlayer.loop = true;
let isDarkTheme = false;

/* GAME LOGIC GLOBALS */
let currentCombo = 0;

const imageFiles = [
  'image/Baby fatima.JPG', 'image/toddler fatima.JPG', 'image/child fatima.JPG', 'image/7 years.JPG', 'image/8 Years.JPG',
  'image/13.JPG', 'image/18.JPG', 'image/19.JPG', 'image/19.2.JPG', 'image/20.JPG',
  'image/adorable.JPG', 'image/awesome.JPG', 'image/beatuful.JPG', 'image/Just so cute.JPG', 'image/petroleum phase.JPG'
];

const eras = [
  "The Beginning", "First Steps", "Baby Smiles", "Little Explorer", "Growing Up",
  "School Days", "Creative Soul", "Blossoming", "Finding Her Way", "Her Own Rhythm",
  "Seeing the World", "Her Strength", "Almost Now", "Today", "The Queen She Is"
];

const captions = [
  "Every journey begins with a first breath",
  "The world got brighter the day you arrived",
  "That smile — it was magic from the start",
  "Curious, brave, and full of wonder",
  "Growing more beautiful with every season",
  "A brilliant mind finding its wings",
  "Your creativity lights up every room",
  "Blossoming into someone truly remarkable",
  "Every step you took shaped who you are",
  "Your own rhythm, your own song",
  "The world is lucky to have you in it",
  "Stronger than you'll ever fully know",
  "So close to everything you've dreamed of",
  "Today, we celebrate all of you",
  "Forever and always — our Beautiful Fatima"
];

const stories = [
  "The day you came into this world, everything changed. The air felt different, the sky looked brighter. You were so tiny, so perfect — a miracle wrapped in the softest blanket.",
  "Those first little steps you took — wobbly, brave, determined. You'd fall and get right back up. Even then, nothing could stop you.",
  "Your smile could light up the darkest room. People would stop just to watch you giggle. You had this pure, unfiltered joy that was contagious.",
  "Always curious, always exploring. Mud puddles, butterflies, the neighbor's cat — everything was an adventure with you.",
  "Watching you grow was like watching a flower bloom in real time. Every day brought something new — a new reason to be proud.",
  "School days! You walked in there like you owned the place. Smart, bright, and full of questions nobody could answer.",
  "You've always had this creative spark. You see beauty where others see ordinary. That's a rare gift, Fatimatu.",
  "This was the season you really started to bloom. More confident, more graceful, more YOU.",
  "Not every path was easy, but you walked them all with courage. You found your way because you never gave up.",
  "You started moving to your own beat, making your own choices. You don't follow footsteps — you create them.",
  "The world opened up for you, and you embraced every bit of it with grace.",
  "There's a strength in you that goes deeper than most people will ever know. Behind that smile is a warrior.",
  "Look how far you've come. Every dream is within reach. You're almost there, and it's breathtaking to witness.",
  "Right here, right now — you are everything. Today is a celebration of every moment that made you who you are.",
  "You are royalty, Fatimatu. Not because of a crown, but because of the way you carry yourself. Happy Birthday, my beautiful Fatima."
];

const clues = [
  "You have the most beautiful smile...",
  "Your laugh is my favorite sound...",
  "You make ordinary days magical...",
  "I'm so lucky to know you...",
  "You've grown into someone extraordinary..."
];

const secretLetter = `It was the 27th of July, 2024 — the first day I saw you. I still remember it clearly. It was your sister's graduation. You were so beautiful, but what I noticed first was how you couldn't really stay in one place. You looked a little restless, moving around, and somehow we kept making eye contact again and again.

Every time it happened, I wanted to come talk to you. I really did. But the courage just wasn't there that day. Still, something about those small moments made me feel like maybe you also noticed me too.

Later I started learning little things about you, and it made me admire you even more. You once wanted to be a doctor — a general surgeon or maybe a gynecologist — someone who could help people and care for them. Now you're studying petroleum engineering, which honestly shows how strong and determined you are to take on something challenging and build your future.

I also heard that you love cooking, you love babies, and you love books. That combination is rare. It tells me you have a soft heart, but also a thoughtful mind. You're the kind of person who cares deeply about people and the little things in life.

You're a shy girl, but sometimes the quiet ones have the most beautiful hearts. And from what I've seen, your best quality is how caring and kind you are. That kind of kindness is something you don't see every day.

Your name is Fatima Rufai, from Sokoto. Even just saying your name feels special to me now, because it reminds me of the first day I noticed you.

I'm not writing this to pressure you or make things awkward. I just wanted to be honest about something I've been keeping in my mind since that day. Sometimes you meet someone and they stay in your thoughts longer than you expect. You became one of those people for me.

If you're comfortable with it, I would really like to get to know you better — slowly, naturally, just two people talking and learning about each other.

And if nothing else, I just hope this letter makes you smile, even if only a little.

— Someone who has been thinking about you since July 27th`;

const giftLetter = `On this beautiful day, I want you to know how special you truly are.

Every smile you share, every laugh you give — they mean the world.

From your very first days to the incredible person you are today, watching you grow has been one of life's greatest joys.

I hope this birthday brings you as much joy as you bring to everyone around you.

Wishing you a year full of love, laughter, and everything you deserve.

Happy Birthday!

— With all the love in the world`;

const wishes = [
  { icon: "♡", title: "Love", text: "May your heart always be full of love — the kind that lifts you and makes every day brighter." },
  { icon: "✦", title: "Dreams", text: "May every dream you've ever whispered to the stars find its way to you this year." },
  { icon: "◈", title: "Health", text: "Wishing you strength, energy, and radiant health — the foundation of everything beautiful." },
  { icon: "⬡", title: "Joy", text: "May laughter fill your days and happiness wrap around you like sunshine." },
  { icon: "△", title: "Success", text: "Every goal you set, every ambition you chase — may they all bow to your determination." },
  { icon: "○", title: "Peace", text: "In a noisy world, may you always find your calm — where your soul can breathe." },
  { icon: "◇", title: "Growth", text: "May you continue to bloom and surprise even yourself with how far you can go." },
  { icon: "□", title: "Adventure", text: "May life take you to incredible places — and may every journey feel like coming home." },
  { icon: "☆", title: "Magic", text: "May this year be full of beautiful surprises, serendipity, and breathtaking moments." }
];

/* ═══════════════════════════
   THEME TOGGLE
   ═══════════════════════════ */
function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  if (isDarkTheme) document.body.classList.add('theme-dark');
  else document.body.classList.remove('theme-dark');
}

/* ═══════════════════════════
   SONG UPLOAD LOGIC
   ═══════════════════════════ */
const audioInput = document.getElementById('audioUpload');
if (audioInput) {
  audioInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      if (customAudioPlayer) { customAudioPlayer.pause(); customAudioPlayer = null; }
      const objectURL = URL.createObjectURL(file);
      customAudioPlayer = new Audio(objectURL);
      customAudioPlayer.loop = true;
      document.getElementById('songUploadLabel').innerHTML = "🎵 Song Selected! Ready.";
      document.getElementById('songUploadLabel').style.borderColor = "var(--red)";
      document.getElementById('songUploadLabel').style.color = "var(--red)";
    }
  });
}

function toggleAudioControls() {
  musicMuted = !musicMuted;
  document.getElementById('musicBtn').textContent = musicMuted ? '🔇' : '🔊';
  if (customAudioPlayer) {
    musicMuted ? customAudioPlayer.pause() : customAudioPlayer.play();
  } else {
    if (musicMuted) { masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1); clearTimeout(melodyTimeout); }
    else { masterGain.gain.setTargetAtTime(0.25, audioCtx.currentTime, 0.1); playMelody(0.1); }
  }
}

/* ═══════════════════════════
   STARFIELD + CONSTELLATION
   ═══════════════════════════ */
const sfCanvas = document.getElementById('starfield');
const sfCtx = sfCanvas.getContext('2d');
let sfStars = [];
let mouseX = -999, mouseY = -999;

function initStarfield() {
  sfCanvas.width = innerWidth; sfCanvas.height = innerHeight;
  sfStars = [];
  for (let i = 0; i < 150; i++) {
    sfStars.push({
      x: Math.random() * sfCanvas.width, y: Math.random() * sfCanvas.height,
      r: Math.random() * 1.6 + 0.3, a: Math.random(),
      da: (Math.random() - 0.5) * 0.012,
      vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12
    });
  }
}
function drawStarfield() {
  sfCtx.clearRect(0, 0, sfCanvas.width, sfCanvas.height);
  for (let i = 0; i < sfStars.length; i++) {
    const s = sfStars[i];
    s.a += s.da; if (s.a > 1 || s.a < 0.1) s.da *= -1;
    s.x += s.vx; s.y += s.vy;
    if (s.x < 0) s.x = sfCanvas.width; if (s.x > sfCanvas.width) s.x = 0;
    if (s.y < 0) s.y = sfCanvas.height; if (s.y > sfCanvas.height) s.y = 0;
    const dMouse = Math.hypot(s.x - mouseX, s.y - mouseY);
    const ci = dMouse < 140 ? (1 - dMouse / 140) * 0.5 : 0;

    // RED constellation lines
    for (let j = i + 1; j < sfStars.length; j++) {
      const s2 = sfStars[j]; const d = Math.hypot(s.x - s2.x, s.y - s2.y);
      const cd = dMouse < 180 ? 110 : 70;
      if (d < cd) {
        sfCtx.beginPath(); sfCtx.moveTo(s.x, s.y); sfCtx.lineTo(s2.x, s2.y);
        sfCtx.strokeStyle = `rgba(255, 59, 92, ${(1 - d / cd) * 0.15 + ci * 0.15})`;
        sfCtx.lineWidth = 0.5; sfCtx.stroke();
      }
    }
    // RED stars
    sfCtx.beginPath(); sfCtx.arc(s.x, s.y, s.r + ci * 1.5, 0, Math.PI * 2);
    sfCtx.fillStyle = `rgba(255, 59, 92, ${s.a + ci})`; sfCtx.fill();
  }
  requestAnimationFrame(drawStarfield);
}
initStarfield(); drawStarfield();
window.addEventListener('resize', initStarfield);
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
document.addEventListener('touchmove', e => { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; });

/* ═══════════════════════════
   GLOWING SVG HEART
   ═══════════════════════════ */
function drawSVGHeart(ctx, x, y, size, coreColor, outerColor, alpha) {
  ctx.save(); ctx.globalAlpha = alpha;
  ctx.translate(x, y); ctx.scale(size / 30, size / 30);

  // Outer glow shadow
  ctx.shadowBlur = 15 + Math.random() * 10;
  ctx.shadowColor = outerColor;

  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.bezierCurveTo(-15, -25, -30, -5, 0, 15);
  ctx.moveTo(0, -8);
  ctx.bezierCurveTo(15, -25, 30, -5, 0, 15);

  // Bright Core Fill
  const grad = ctx.createRadialGradient(0, -5, 0, 0, 0, 18);
  grad.addColorStop(0, '#FFFFFF');
  grad.addColorStop(0.3, coreColor);
  grad.addColorStop(1, outerColor);

  ctx.fillStyle = grad; ctx.fill();
  ctx.restore();
}

/* ═══════════════════════════
   CONFETTI (No balloons)
   ═══════════════════════════ */
function spawnConfetti(count = 35) {
  const colors = ['#FF3B5C', '#2B7CFF', '#FFFFFF', '#FF6B9D'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div'); c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.width = (5 + Math.random() * 9) + 'px';
    c.style.height = (4 + Math.random() * 9) + 'px';
    c.style.animationDuration = (3.5 + Math.random() * 4) + 's';
    c.style.animationDelay = (Math.random() * 3) + 's';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(c);
    c.addEventListener('animationend', () => c.remove());
  }
}
spawnConfetti();

/* ═══════════════════════════
   MUSIC SYSTEM (Fallback Synth/SFX)
   ═══════════════════════════ */
const melodyNotes = [[261.6, .75], [261.6, .25], [293.7, 1], [261.6, 1], [349.2, 1], [329.6, 2], [261.6, .75], [261.6, .25], [293.7, 1], [261.6, 1], [392.0, 1], [349.2, 2], [261.6, .75], [261.6, .25], [523.3, 1], [440.0, 1], [349.2, 1], [329.6, 1], [293.7, 2], [466.2, .75], [466.2, .25], [440.0, 1], [349.2, 1], [392.0, 1], [349.2, 2]];
function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const comp = audioCtx.createDynamicsCompressor();
  comp.threshold.value = -24; comp.knee.value = 30; comp.ratio.value = 12; comp.connect(audioCtx.destination);
  masterGain = audioCtx.createGain(); masterGain.gain.value = 0.25;
  const dl = audioCtx.createDelay(); dl.delayTime.value = 0.2;
  const fb = audioCtx.createGain(); fb.gain.value = 0.14;
  const wet = audioCtx.createGain(); wet.gain.value = 0.1;
  masterGain.connect(comp); masterGain.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(comp);
}
function playMelody(sd) {
  if (!audioCtx || musicMuted || customAudioPlayer) return;
  const bl = 0.5; let t = audioCtx.currentTime + (sd || 0.05);
  for (const [f, d] of melodyNotes) {
    const l = d * bl;
    const o1 = audioCtx.createOscillator(), g1 = audioCtx.createGain(); o1.type = 'sine'; o1.frequency.value = f;
    g1.gain.setValueAtTime(0.13, t); g1.gain.exponentialRampToValueAtTime(0.001, t + l - 0.02); o1.connect(g1); g1.connect(masterGain); o1.start(t); o1.stop(t + l);
    const o2 = audioCtx.createOscillator(), g2 = audioCtx.createGain(); o2.type = 'triangle'; o2.frequency.value = f;
    g2.gain.setValueAtTime(0.05, t); g2.gain.exponentialRampToValueAtTime(0.001, t + l - 0.02); o2.connect(g2); g2.connect(masterGain); o2.start(t); o2.stop(t + l);
    t += l;
  }
  melodyTimeout = setTimeout(() => playMelody(0), (melodyNotes.reduce((s, n) => s + n[1], 0) * bl - 0.1) * 1000);
}
function playSFX(freqs, durs, gains, type) {
  if (!audioCtx || musicMuted) return;
  const t = audioCtx.currentTime;
  freqs.forEach((f, i) => {
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(gains[i], t + durs[i].start); g.gain.exponentialRampToValueAtTime(0.001, t + durs[i].end);
    o.connect(g); g.connect(masterGain); o.start(t + durs[i].start); o.stop(t + durs[i].end);
  });
}
function playChime() { playSFX([659, 880], [{ start: 0, end: 0.15 }, { start: 0.08, end: 0.25 }], [0.15, 0.15], 'sine'); }
function playMiss() { playSFX([150, 100], [{ start: 0, end: 0.2 }, { start: 0.15, end: 0.4 }], [0.2, 0.2], 'square'); }
function playFanfare() { playSFX([261.6, 329.6, 392, 523.3], [{ start: 0, end: 0.2 }, { start: 0.15, end: 0.35 }, { start: 0.3, end: 0.5 }, { start: 0.45, end: 0.7 }], [0.15, 0.15, 0.15, 0.15], 'triangle'); }
function startFinaleLayer() {
  if (!audioCtx || musicMuted) return;
  const notes = [784, 880, 988, 1047, 988, 1047, 1175, 1047]; let idx = 0;
  finaleInterval = setInterval(() => {
    if (musicMuted) return;
    const t = audioCtx.currentTime, f = notes[idx % notes.length];
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = 'square'; o.frequency.value = f;
    g.gain.setValueAtTime(0.035, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
    o.connect(g); g.connect(masterGain); o.start(t); o.stop(t + 0.12); idx++;
  }, 120);
}

/* ═══════════════════════════
   TYPEWRITER EFFECT
   ═══════════════════════════ */
function typeWriter(el, text, speed = 30, cb) {
  el.innerHTML = ''; let i = 0;
  const cursor = document.createElement('span'); cursor.className = 'typewriter-cursor'; el.appendChild(cursor);
  function type() {
    if (i < text.length) {
      const ch = text.charAt(i);
      if (ch === '\n') el.insertBefore(document.createElement('br'), cursor);
      else el.insertBefore(document.createTextNode(ch), cursor);
      i++; setTimeout(type, speed);
    } else { setTimeout(() => { cursor.remove(); if (cb) cb(); }, 1200); }
  }
  type();
}
function switchStage(from, to) {
  document.getElementById(from).classList.remove('active');
  setTimeout(() => document.getElementById(to).classList.add('active'), 200);
}

/* ═══════════════════════════
   STAGE 1 → BEGIN
   ═══════════════════════════ */
function beginJourney() {
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  musicPlaying = true;
  document.getElementById('musicBtn').style.display = 'flex';

  if (customAudioPlayer) { customAudioPlayer.play().catch(e => console.log("Audio play error", e)); }
  else { playMelody(0.2); }

  switchStage('stage1', 'stage2');
  setTimeout(startHeartGame, 800);
}

/* ═══════════════════════════
   STAGE 2 — GAME OVER & COMBO
   ═══════════════════════════ */
const gc = document.getElementById('gameCanvas');
const gctx = gc.getContext('2d');
let gameHearts = [], particles = [], gameRunning = false, gameTimer = 60, gameInterval;
// Bright UI Neon colors for glowing hearts
const heartColors = [
  ['#FFF', '#FF3B5C'], ['#FFF', '#2B7CFF'], ['#FFF', '#F9A826'],
  ['#FFF', '#A855F7'], ['#FFF', '#34D399']
];
let isLetterOpen = false;
let specialSpawns = [];

function startHeartGame() {
  gc.width = innerWidth; gc.height = innerHeight;
  heartsCaught = 0; gameHearts = []; particles = []; gameTimer = 60;
  consecutiveHearts = 0; loveLetterShown = false; isLetterOpen = false;
  currentCombo = 0;
  specialSpawns = [45, 15]; // Spawn the special heart at 45s and 15s remaining

  document.getElementById('gameScore').textContent = '♡ 0 / 15';

  gameRunning = true;
  gameInterval = setInterval(() => {
    if (isLetterOpen) return;
    gameTimer--;
    const m = Math.floor(gameTimer / 60), s = gameTimer % 60;
    document.getElementById('gameTimer').textContent = `⏱ ${m}:${s < 10 ? '0' : ''}${s}`;

    if (specialSpawns.includes(gameTimer) && !loveLetterShown) {
      spawnSpecialHeart();
    }

    if (gameTimer <= 0) { gameRunning = false; clearInterval(gameInterval); allUnlocked = true; endGame(); }
  }, 1000);
  spawnHeartLoop(); requestAnimationFrame(gameLoop);
}

function spawnSpecialHeart() {
  if (!gameRunning) return;
  gameHearts.push({
    x: Math.random() * (gc.width - 150) + 75, y: -80, size: 80,
    speed: 1.8 + Math.random() * 0.8,
    c1: '#FFD700', c2: '#FFA500', // Gold!
    alpha: 1, shrink: false, missed: false,
    wobble: Math.random() * Math.PI * 2, wobbleSpeed: 0.05,
    rotation: Math.random() * 0.3 - 0.15,
    isSpecial: true
  });
}

function spawnHeartLoop() {
  if (!gameRunning) return;
  const size = 20 + Math.random() * 18;
  const ci = Math.floor(Math.random() * heartColors.length);
  gameHearts.push({
    x: Math.random() * (gc.width - 60) + 30, y: -50, size,
    speed: 1.2 + Math.random() * 2.0,
    c1: heartColors[ci][0], c2: heartColors[ci][1],
    alpha: 1, shrink: false, missed: false,
    wobble: Math.random() * Math.PI * 2, wobbleSpeed: 0.015 + Math.random() * 0.02,
    rotation: Math.random() * 0.3 - 0.15
  });
  setTimeout(spawnHeartLoop, 350 + Math.random() * 450);
}

function handleMissedHeart() {
  playMiss();
  currentCombo = 0;
  consecutiveHearts = 0;
}

function showComboText(x, y, comboAmt) {
  const el = document.getElementById('comboDisplay');
  el.textContent = `${comboAmt}x Combo!`;
  el.style.left = `${x}px`; el.style.top = `${y}px`;

  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
}

function gameLoop() {
  if (!gameRunning && gameHearts.length === 0 && particles.length === 0) return;
  gctx.clearRect(0, 0, gc.width, gc.height);

  for (let i = gameHearts.length - 1; i >= 0; i--) {
    const h = gameHearts[i];
    if (h.shrink) {
      h.alpha -= 0.02; h.size *= 0.96;
      if (h.alpha <= 0) { gameHearts.splice(i, 1); continue; }
    } else {
      h.y += h.speed; h.wobble += h.wobbleSpeed; h.x += Math.sin(h.wobble) * 0.5;
      if (h.y > gc.height + 40 && !h.missed) {
        h.missed = true; h.shrink = true;
        if (!isLetterOpen) handleMissedHeart();
      }
    }

    drawSVGHeart(gctx, h.x, h.y, h.size, h.c1, h.c2, h.alpha);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy; p.vy += 0.07; p.alpha -= 0.016;
    if (p.alpha <= 0) { particles.splice(i, 1); continue; }
    gctx.globalAlpha = p.alpha; gctx.fillStyle = p.color;
    gctx.beginPath(); gctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); gctx.fill(); gctx.globalAlpha = 1;
  }

  requestAnimationFrame(gameLoop);
}

function handleGameClick(e) {
  if (!gameRunning || isLetterOpen) return;
  const rect = gc.getBoundingClientRect();
  const cx = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
  const cy = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;

  for (let i = gameHearts.length - 1; i >= 0; i--) {
    const h = gameHearts[i];
    if (!h.shrink && Math.hypot(cx - h.x, cy - h.y) < h.size * 1.5) {
      if (h.isSpecial && !loveLetterShown) {
        loveLetterShown = true; isLetterOpen = true;
        document.getElementById('loveLetter').classList.add('active');
        spawnRosePetals();
        typeWriter(document.getElementById('llReveal'), secretLetter, 18);
        playChime();
      } else {
        heartsCaught++; consecutiveHearts++; currentCombo++;
        if (currentCombo >= 2) showComboText(h.x, h.y, currentCombo);
        document.getElementById('gameScore').textContent = `♡ ${heartsCaught} / 15`;
        playChime();
      }

      const cols = ['#FFFFFF', h.c2];
      for (let j = 0; j < 18; j++) {
        particles.push({
          x: h.x, y: h.y,
          vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8 - 2,
          r: 1.5 + Math.random() * 3.5, alpha: 1,
          color: cols[Math.floor(Math.random() * cols.length)]
        });
      }
      gameHearts.splice(i, 1);

      // Clues
      if (heartsCaught % 3 === 0 && heartsCaught / 3 <= 5) {
        const el = document.getElementById('gameClue'); el.textContent = clues[heartsCaught / 3 - 1]; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2800);
      }

      if (heartsCaught >= 15) { gameRunning = false; clearInterval(gameInterval); setTimeout(endGame, 900); }
      break;
    }
  }
}
gc.addEventListener('mousedown', handleGameClick);
gc.addEventListener('touchstart', e => { e.preventDefault(); handleGameClick(e); }, { passive: false });

function endGame() {
  framesUnlocked = allUnlocked ? 15 : heartsCaught;
  spawnConfetti(45);
  setTimeout(() => { switchStage('stage2', 'stage3'); setTimeout(buildCarousel, 600); }, 1200);
}

/* ═══════════════════════════
   SECRET LOVE LETTER
   ═══════════════════════════ */
function spawnRosePetals() {
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div'); p.className = 'rose-petal';
    p.innerHTML = `<svg width="18" height="18" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="6" ry="9" fill="rgba(255,59,92,0.6)" transform="rotate(${Math.random() * 360} 10 10)"/></svg>`;
    p.style.left = Math.random() * 100 + 'vw'; p.style.animationDuration = (4 + Math.random() * 4) + 's'; p.style.animationDelay = (Math.random() * 3) + 's'; document.body.appendChild(p); p.addEventListener('animationend', () => p.remove());
  }
}
function closeLoveLetter() { document.getElementById('loveLetter').classList.remove('active'); isLetterOpen = false; currentCombo = 0; consecutiveHearts = 0; }

/* ═══════════════════════════
   STAGE 3 — 3-CARD CAROUSEL
   ═══════════════════════════ */
function buildCarousel() {
  unlockedSlides = framesUnlocked; currentSlide = Math.floor(unlockedSlides / 2); // start in middle

  const track = document.getElementById('carouselTrack'); track.innerHTML = '';
  for (let i = 0; i < 15; i++) {
    const card = document.createElement('div'); card.id = `car-${i}`; card.className = 'car-card hidden-right'; card.onclick = () => handleCardClick(i);
    const imgSrc = i < unlockedSlides ? imageFiles[i] : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzY2NiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjRweCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvY2tlZDwvdGV4dD48L3N2Zz4=';
    card.innerHTML = `<img src="${imgSrc}" alt="${eras[i]}"><div class="car-overlay"><div class="car-era">${eras[i]}</div><div class="car-cap">${captions[i]}</div></div>`;
    track.appendChild(card);
  }

  let revealed = 0;
  function revealNext() {
    if (revealed >= unlockedSlides) return;
    revealed++; updateProgressBar(revealed);
    if (revealed === 1) updateCarouselUI();
    if (revealed >= 15) setTimeout(() => document.getElementById('btnContinue').classList.add('show'), 800);
    if (revealed < unlockedSlides) setTimeout(revealNext, allUnlocked ? 150 : 400);
  }
  setTimeout(revealNext, 300);
}

function updateCarouselUI() {
  const cards = document.querySelectorAll('.car-card');
  cards.forEach((card, i) => {
    card.className = 'car-card';
    if (i >= unlockedSlides) card.classList.add(i > currentSlide ? 'hidden-right' : 'hidden-left');
    else if (i === currentSlide) card.classList.add('active');
    else if (i === currentSlide - 1) card.classList.add('prev');
    else if (i === currentSlide + 1) card.classList.add('next');
    else if (i < currentSlide - 1) card.classList.add('hidden-left');
    else if (i > currentSlide + 1) card.classList.add('hidden-right');
  });
  document.getElementById('carouselInfo').textContent = `${currentSlide + 1} / ${unlockedSlides} Memory Navigated`;
  document.getElementById('prevBtn').disabled = (currentSlide === 0); document.getElementById('nextBtn').disabled = (currentSlide >= unlockedSlides - 1);
}

function showSlide(idx) { if (idx < 0 || idx >= unlockedSlides) return; currentSlide = idx; updateCarouselUI(); }
function nextSlide() { if (currentSlide < unlockedSlides - 1) showSlide(currentSlide + 1); }
function prevSlide() { if (currentSlide > 0) showSlide(currentSlide - 1); }

function handleCardClick(idx) {
  if (idx >= unlockedSlides) return;
  if (idx === currentSlide) {
    document.getElementById('lbImg').src = imageFiles[idx]; document.getElementById('lbCaption').textContent = captions[idx]; document.getElementById('lbStory').textContent = stories[idx]; document.getElementById('lightbox').classList.add('open');
  } else { showSlide(idx); }
}
function updateProgressBar(n) { document.getElementById('progressLabel').textContent = `Memories Unlocked: ${n} / 15`; document.getElementById('progressFill').style.width = `${(n / 15) * 100}%`; }

let touchStartX = 0; document.getElementById('stage3').addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true }); document.getElementById('stage3').addEventListener('touchend', e => { const diff = touchStartX - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); } }, { passive: true });
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }

/* ═══════════════════════════
   WISH CARD WALL
   ═══════════════════════════ */
let wishesFlipped = 0;
function goToWishWall() {
  document.getElementById('stage3').classList.remove('active');
  setTimeout(() => { document.getElementById('wishWall').classList.add('active'); buildWishWall(); }, 200);
}
function buildWishWall() {
  const grid = document.getElementById('wishGrid'); grid.innerHTML = ''; wishesFlipped = 0;
  wishes.forEach((w, i) => {
    const card = document.createElement('div'); card.className = 'wish-card'; card.id = `wish-${i}`;
    card.innerHTML = `<div class="wish-card-inner"><div class="wish-front">${w.icon}</div><div class="wish-back"><strong>${w.title}</strong><p>${w.text}</p></div></div>`;
    card.addEventListener('click', () => flipWish(i)); grid.appendChild(card);
  });
}
function flipWish(i) {
  const card = document.getElementById(`wish-${i}`); if (card.classList.contains('flipped')) return;
  card.classList.add('flipped'); playChime(); wishesFlipped++;
  document.getElementById('wishCounter').textContent = `${wishesFlipped} / 9 wishes revealed`;
  if (wishesFlipped >= 9) setTimeout(() => document.getElementById('btnWishContinue').classList.add('show'), 500);
}

/* ═══════════════════════════
   STAGE 4 — GIFT
   ═══════════════════════════ */
function goStage4() { document.getElementById('wishWall').classList.remove('active'); setTimeout(() => { document.getElementById('stage4').classList.add('active'); createGiftBeams(); }, 200); }
function createGiftBeams() { const beams = document.getElementById('giftBeams'); beams.innerHTML = ''; for (let i = 0; i < 10; i++) { const beam = document.createElement('div'); beam.className = 'gift-beam'; beam.style.transform = `rotate(${i * 36}deg)`; beam.style.opacity = 0.2 + Math.random() * 0.4; beams.appendChild(beam); } }
let giftOpened = false;
function openGift() {
  if (giftOpened) return; const gb = document.getElementById('giftBox'); gb.classList.add('shake');
  setTimeout(() => {
    gb.classList.remove('shake'); document.getElementById('giftLid').classList.add('open'); document.getElementById('giftBeams').classList.add('show');
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div'); el.className = 'svg-float-heart'; const sz = 10 + Math.random() * 14; const c = [['#FF3B5C', '#2B7CFF'], ['#FFFFFF', '#FF3B5C'], ['#2B7CFF', '#FFFFFF']][Math.floor(Math.random() * 3)]; const uid = 'gh' + Date.now() + i;
      el.innerHTML = `<svg width="${sz}" height="${sz}" viewBox="-15 -15 30 30"><path d="M0,-8 C-15,-25 -30,-5 0,15 M0,-8 C15,-25 30,-5 0,15" fill="url(#${uid})"/><defs><linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c[0]}"/><stop offset="100%" stop-color="${c[1]}"/></linearGradient></defs></svg>`;
      el.style.left = Math.random() * 100 + 'vw'; el.style.animationDuration = (3 + Math.random() * 3.5) + 's'; el.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px'); document.body.appendChild(el); el.addEventListener('animationend', () => el.remove());
    }
    playFanfare(); setTimeout(() => { document.getElementById('giftBox').style.display = 'none'; document.getElementById('giftText').style.display = 'none'; document.getElementById('letterCard').classList.add('show'); typeWriter(document.getElementById('letterText'), giftLetter, 22); }, 1000); giftOpened = true;
  }, 800);
}

/* ═══════════════════════════
   SPARKLER STAGE
   ═══════════════════════════ */
function goSparkler() { document.getElementById('stage4').classList.remove('active'); setTimeout(() => { document.getElementById('sparklerStage').classList.add('active'); startSparkler(); }, 200); }
function startSparkler() {
  const canvas = document.getElementById('sparklerCanvas'); const ctx = canvas.getContext('2d'); canvas.width = innerWidth; canvas.height = innerHeight;
  const cx = canvas.width / 2, cy = canvas.height / 2; const sparkP = []; const heartPath = [];
  for (let t = 0; t <= Math.PI * 2; t += 0.05) { const sc = Math.min(canvas.width, canvas.height) * 0.06; const x = sc * 16 * Math.pow(Math.sin(t), 3); const y = -sc * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)); heartPath.push({ x: cx + x, y: cy + y }); }
  let pIdx = 0, trail = [];
  function loop() {
    ctx.fillStyle = isDarkTheme ? 'rgba(11, 12, 16, 0.05)' : 'rgba(250, 250, 252, 0.05)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (pIdx < heartPath.length) {
      const pt = heartPath[pIdx]; trail.push(pt);
      for (let i = 0; i < 5; i++) { sparkP.push({ x: pt.x, y: pt.y, vx: (Math.random() - 0.5) * 3.5, vy: (Math.random() - 0.5) * 3.5, r: 0.8 + Math.random() * 1.8, alpha: 1, color: ['#FF3B5C', '#2B7CFF', '#FFFFFF'][Math.floor(Math.random() * 3)] }); } pIdx += 2;
    }
    if (trail.length > 1) { ctx.beginPath(); ctx.moveTo(trail[0].x, trail[0].y); for (let i = 1; i < trail.length; i++) ctx.lineTo(trail[i].x, trail[i].y); ctx.strokeStyle = '#FF3B5C'; ctx.lineWidth = 2; ctx.shadowBlur = 15; ctx.shadowColor = '#FF3B5C'; ctx.stroke(); ctx.shadowBlur = 0; }
    for (let i = sparkP.length - 1; i >= 0; i--) { const p = sparkP[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.alpha -= 0.018; if (p.alpha <= 0) { sparkP.splice(i, 1); continue; } ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; }
    if (pIdx < heartPath.length || sparkP.length > 0) requestAnimationFrame(loop); else setTimeout(() => { document.getElementById('sparklerStage').classList.remove('active'); setTimeout(goStage5, 200); }, 1200);
  }
  loop();
}

/* ═══════════════════════════
   STAGE 5 — FINALE
   ═══════════════════════════ */
function goStage5() {
  document.getElementById('stage5').classList.add('active');

  setTimeout(() => {
    startFireworks();
    buildDancer();
    spawnFinaleHearts();
    startFinaleLayer();
    setTimeout(() => document.getElementById('finaleTitle').classList.add('show'), 400);
    setTimeout(() => document.getElementById('finaleSub').classList.add('show'), 1000);

    // Trigger Final Explosion after 7 seconds of looking at Stage 5
    setTimeout(goStage6, 7000);
  }, 400);
}
const fwCanvas = document.getElementById('fireworksCanvas'); const fwCtx = fwCanvas.getContext('2d'); let fireworks = [], fwSparks = [], fwRunning = false;
function startFireworks() { fwCanvas.width = innerWidth; fwCanvas.height = innerHeight; fwRunning = true; launchFW(); requestAnimationFrame(fwLoop); }
function launchFW() { if (!fwRunning) return; const colors = ['#FF3B5C', '#2B7CFF', '#FFFFFF']; fireworks.push({ x: Math.random() * fwCanvas.width, y: fwCanvas.height, targetY: fwCanvas.height * 0.1 + Math.random() * fwCanvas.height * 0.35, vy: -8 - Math.random() * 5, color: colors[Math.floor(Math.random() * colors.length)], exploded: false }); setTimeout(launchFW, 600 + Math.random() * 900); }
function fwLoop() {
  if (!fwRunning) return;
  fwCtx.fillStyle = isDarkTheme ? 'rgba(11, 12, 16, 0.1)' : 'rgba(250, 250, 252, 0.1)'; fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
  for (let i = fireworks.length - 1; i >= 0; i--) { const f = fireworks[i]; f.y += f.vy; if (f.y <= f.targetY && !f.exploded) { f.exploded = true; for (let j = 0; j < 70; j++) { const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 5.5; fwSparks.push({ x: f.x, y: f.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, alpha: 1, color: f.color, r: 1 + Math.random() * 2 }); } fireworks.splice(i, 1); continue; } if (!f.exploded) { fwCtx.fillStyle = f.color; fwCtx.shadowBlur = 6; fwCtx.shadowColor = f.color; fwCtx.beginPath(); fwCtx.arc(f.x, f.y, 2, 0, Math.PI * 2); fwCtx.fill(); fwCtx.shadowBlur = 0; } }
  for (let i = fwSparks.length - 1; i >= 0; i--) { const s = fwSparks[i]; s.x += s.vx; s.y += s.vy; s.vy += 0.12; s.alpha -= 0.01; if (s.alpha <= 0) { fwSparks.splice(i, 1); continue; } fwCtx.globalAlpha = s.alpha; fwCtx.fillStyle = s.color; fwCtx.beginPath(); fwCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2); fwCtx.fill(); fwCtx.globalAlpha = 1; }
  requestAnimationFrame(fwLoop);
}
function buildDancer() {
  const c = document.getElementById('dancerContainer');
  c.innerHTML = `<svg width="120" height="200" viewBox="0 0 120 200">
    <g id="dBody" style="transition:transform 180ms ease-in-out; transform-origin: 60px 100px;">
      <!-- Minecraft Head: 8x8 mapped to 40x40 -->
      <g id="dHead" style="transition:transform 180ms ease-in-out; transform-origin: 60px 40px;">
        <rect x="40" y="20" width="40" height="40" fill="#D4956B"/>
        <!-- Hair -->
        <rect x="40" y="20" width="40" height="10" fill="#3E2723"/>
        <rect x="40" y="20" width="10" height="20" fill="#3E2723"/>
        <rect x="70" y="20" width="10" height="20" fill="#3E2723"/>
        <!-- Eyes -->
        <rect x="45" y="40" width="10" height="5" fill="#FFFFFF"/>
        <rect x="47" y="40" width="5" height="5" fill="#3B5998"/>
        <rect x="65" y="40" width="10" height="5" fill="#FFFFFF"/>
        <rect x="68" y="40" width="5" height="5" fill="#3B5998"/>
        <!-- Mouth -->
        <rect x="55" y="50" width="10" height="5" fill="#A1887F"/>
      </g>
      <!-- Minecraft Body: 4x8x4 mapped to 40x60 -->
      <rect x="40" y="60" width="40" height="60" fill="#FF3B5C"/>
      <line x1="40" y1="120" x2="80" y2="120" stroke="#000" stroke-width="1" opacity="0.3"/> <!-- waist -->
      <!-- Minecraft Left Arm: 4x12x4 mapped to 15x60 -->
      <g id="dLA" style="transition:transform 180ms ease-in-out; transform-origin: 32px 65px;">
        <rect x="25" y="60" width="15" height="60" fill="#D4956B"/>
        <rect x="25" y="60" width="15" height="20" fill="#FF3B5C"/> <!-- Sleeve -->
      </g>
      <!-- Minecraft Right Arm: 4x12x4 mapped to 15x60 -->
      <g id="dRA" style="transition:transform 180ms ease-in-out; transform-origin: 88px 65px;">
        <rect x="80" y="60" width="15" height="60" fill="#D4956B"/>
        <rect x="80" y="60" width="15" height="20" fill="#FF3B5C"/> <!-- Sleeve -->
      </g>
      <!-- Minecraft Left Leg: 4x12x4 mapped to 20x60 -->
      <g id="dLL" style="transition:transform 180ms ease-in-out; transform-origin: 50px 120px;">
        <rect x="40" y="120" width="20" height="60" fill="#1A237E"/>
        <rect x="40" y="165" width="20" height="15" fill="#424242"/> <!-- Shoe -->
      </g>
      <!-- Minecraft Right Leg: 4x12x4 mapped to 20x60 -->
      <g id="dRL" style="transition:transform 180ms ease-in-out; transform-origin: 70px 120px;">
        <rect x="60" y="120" width="20" height="60" fill="#1A237E"/>
        <rect x="60" y="165" width="20" height="15" fill="#424242"/> <!-- Shoe -->
      </g>
    </g>
  </svg>`;
  let f = 0;
  // Minecraft walking cycle
  const fr = [
    { b: 'translate(0, 0)', h: 'rotate(0)', la: 'rotate(30deg)', ra: 'rotate(-30deg)', ll: 'rotate(-30deg)', rl: 'rotate(30deg)' },
    { b: 'translate(0, -5px)', h: 'rotate(-5deg)', la: 'rotate(0)', ra: 'rotate(0)', ll: 'rotate(0)', rl: 'rotate(0)' },
    { b: 'translate(0, 0)', h: 'rotate(0)', la: 'rotate(-30deg)', ra: 'rotate(30deg)', ll: 'rotate(30deg)', rl: 'rotate(-30deg)' },
    { b: 'translate(0, -5px)', h: 'rotate(5deg)', la: 'rotate(0)', ra: 'rotate(0)', ll: 'rotate(0)', rl: 'rotate(0)' }
  ];
  setInterval(() => { const d = fr[f % 4]; document.getElementById('dBody').style.transform = d.b; document.getElementById('dHead').style.transform = d.h; document.getElementById('dLA').style.transform = d.la; document.getElementById('dRA').style.transform = d.ra; document.getElementById('dLL').style.transform = d.ll; document.getElementById('dRL').style.transform = d.rl; f++; }, 250);
}
function spawnFinaleHearts() {
  setInterval(() => {
    const el = document.createElement('div'); el.className = 'svg-float-heart'; const sz = 12 + Math.random() * 18; const c = [['#FF3B5C', '#FFFFFF'], ['#2B7CFF', '#FF3B5C']][Math.floor(Math.random() * 2)]; const uid = 'fh' + Date.now() + Math.random();
    el.innerHTML = `<svg width="${sz}" height="${sz}" viewBox="-15 -15 30 30"><path d="M0,-8 C-15,-25 -30,-5 0,15 M0,-8 C15,-25 30,-5 0,15" fill="url(#${uid})"/><defs><linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c[0]}"/><stop offset="100%" stop-color="${c[1]}"/></linearGradient></defs></svg>`;
    el.style.left = Math.random() * 100 + 'vw'; el.style.animationDuration = (5 + Math.random() * 5) + 's'; el.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px'); document.body.appendChild(el); el.addEventListener('animationend', () => el.remove());
  }, 300);
}

/* ═══════════════════════════
   STAGE 6 — ALL IMAGES EXPLOSION
   ═══════════════════════════ */
function goStage6() {
  const s5 = document.getElementById('stage5');
  s5.style.transition = 'opacity 1.5s';
  s5.style.opacity = '0';

  setTimeout(() => {
    s5.classList.remove('active');
    s5.style.opacity = '';
    document.getElementById('stage6').classList.add('active');
    startFinalExplosion();
  }, 1500);
}

function startFinalExplosion() {
  const collage = document.getElementById('finalCollage');
  collage.innerHTML = '';

  // Create all 15 images in a clustered grid pattern
  const pieces = [];
  const cols = 5;
  const rows = 3;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cw = Math.min(w * 0.12, 100);
  const ch = Math.min(w * 0.16, 130);

  // Calculate center offsets
  const startX = (w - (cols * cw)) / 2;
  const startY = (h - (rows * ch)) / 2;

  imageFiles.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'collage-piece';

    // Initial random placement far off screen
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.max(w, h);
    const initX = Math.cos(angle) * dist;
    const initY = Math.sin(angle) * dist;
    const rot = (Math.random() - 0.5) * 120;

    img.style.transform = `translate3d(${initX}px, ${initY}px, 0) scale(0.1) rotate(${rot}deg)`;
    img.style.setProperty('--rot', `${rot}deg`);

    collage.appendChild(img);
    pieces.push(img);
  });

  // Stage 6.1: Fly inwards to form the collage
  setTimeout(() => {
    pieces.forEach((img, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const targetX = startX + (col * (cw + 10)) - (w / 2) + cw / 2;
      const targetY = startY + (row * (ch + 10)) - (h / 2) + ch / 2;

      // Slight random wobble for realism
      const finalRot = (Math.random() - 0.5) * 15;

      img.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(1) rotate(${finalRot}deg)`;
      img.style.opacity = '1';
    });
  }, 100);

  // Stage 6.2: Explode outwards and reveal final text
  setTimeout(() => {
    pieces.forEach((img) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.max(w, h) * 1.5; // push far past screen edge
      const exX = Math.cos(angle) * dist;
      const exY = Math.sin(angle) * dist;

      img.style.transform = `translate3d(${exX}px, ${exY}px, 0) scale(2) rotate(${Math.random() * 360}deg)`;
      img.classList.add('exploded');
    });

    const ft = document.getElementById('absoluteFinaleText');
    ft.style.display = 'block';
    // Force reflow
    void ft.offsetWidth;
    ft.style.opacity = '1';

    // Special Effects!
    spawnConfetti(100);
    spawnFinaleHearts();

    setTimeout(() => {
      document.getElementById('btnReplay').style.display = 'block';
    }, 2000);

  }, 4500); // Wait 4.5 seconds admiring the collage before it drops
}

/* ═══════════════════════════
   REPLAY
   ═══════════════════════════ */
function replay() {
  heartsCaught = 0; framesUnlocked = 0; allUnlocked = false; giftOpened = false; fwRunning = false; wishesFlipped = 0; consecutiveHearts = 0; loveLetterShown = false; currentSlide = 0; unlockedSlides = 0;
  clearTimeout(melodyTimeout); clearInterval(finaleInterval); clearInterval(gameInterval);
  document.getElementById('btnReplay').style.display = 'none';
  const gb = document.getElementById('giftBox'); if (gb) gb.style.display = '';
  document.getElementById('giftLid').classList.remove('open'); document.getElementById('giftBeams').classList.remove('show'); document.getElementById('giftText').style.display = '';
  document.getElementById('letterCard').classList.remove('show'); document.getElementById('finaleTitle').classList.remove('show'); document.getElementById('finaleSub').classList.remove('show'); document.getElementById('btnContinue').classList.remove('show'); document.getElementById('btnWishContinue').classList.remove('show');

  const ft = document.getElementById('absoluteFinaleText');
  ft.style.opacity = '0';
  setTimeout(() => ft.style.display = 'none', 500);

  document.querySelectorAll('.stage,#wishWall,#sparklerStage,#loveLetter').forEach(s => s.classList.remove('active'));
  document.getElementById('stage1').classList.add('active'); fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height); spawnConfetti();
  if (musicPlaying && !musicMuted && !customAudioPlayer) { clearTimeout(melodyTimeout); playMelody(0.2); }
}

window.addEventListener('resize', () => { if (gc.width) { gc.width = innerWidth; gc.height = innerHeight; } if (fwCanvas.width && fwRunning) { fwCanvas.width = innerWidth; fwCanvas.height = innerHeight; } });
