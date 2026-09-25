// ================= Days Together =================
// EDIT ME: set the date you got together here
const START_DATE = new Date('2022-09-25T00:00:00');

function updateDaysTogether() {
  const daysEl = document.getElementById('daysTogether');
  if (!daysEl) return;
  const diffDays = Math.floor((new Date() - START_DATE) / (1000 * 60 * 60 * 24));
  daysEl.textContent = Math.max(diffDays, 0);
}

updateDaysTogether();
setInterval(updateDaysTogether, 60 * 1000);

// ================= Floating Hearts Background =================
const heartsBg = document.getElementById('heartsBg');
const heartSymbols = ['💗', '💕', '💖', '❤️', '💓'];

function spawnHeart() {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${14 + Math.random() * 22}px`;
  const duration = 6 + Math.random() * 6;
  heart.style.animationDuration = `${duration}s`;
  heartsBg.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(spawnHeart, 600);

// ================= Envelope Open/Close =================
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const backdrop = document.getElementById('backdrop');
const letterClose = document.getElementById('letterClose');

// move these to <body> so "fixed" isn't trapped by ancestors using perspective/overflow
document.body.appendChild(backdrop);
document.body.appendChild(letter);

function toggleEnvelope(open) {
  envelope.classList.toggle('open', open);
  backdrop.classList.toggle('show', open);
  letter.classList.toggle('open', open);
}

envelope.addEventListener('click', () => toggleEnvelope(!letter.classList.contains('open')));
letter.addEventListener('click', (e) => e.stopPropagation());
letterClose.addEventListener('click', () => toggleEnvelope(false));
backdrop.addEventListener('click', () => toggleEnvelope(false));

// ================= Background Music =================
const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

function playMusic() {
  bgMusic.play()
    .then(() => musicBtn.classList.add('playing'))
    .catch(() => { /* autoplay blocked until the user interacts with the page */ });
}

function pauseMusic() {
  bgMusic.pause();
  musicBtn.classList.remove('playing');
}

musicBtn.addEventListener('click', () => (bgMusic.paused ? playMusic() : pauseMusic()));

// try to autoplay immediately, then retry on the first user interaction if blocked
playMusic();
document.addEventListener('click', function playOnFirstInteraction() {
  if (bgMusic.paused) playMusic();
  document.removeEventListener('click', playOnFirstInteraction);
}, { once: true });

// ================= Footer Year =================
document.getElementById('yearNow').textContent = new Date().getFullYear();

