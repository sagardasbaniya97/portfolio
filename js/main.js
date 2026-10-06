/* ══ LOADER ══ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 1900);
});

/* ══ CUSTOM CURSOR ══ */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animCursor() {
  dot.style.left  = mouseX + 'px';
  dot.style.top   = mouseY + 'px';
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.tag,.stat-box,.project-card,.cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => { dot.style.transform='translate(-50%,-50%) scale(2)'; ring.style.width='56px'; ring.style.height='56px'; ring.style.borderColor='rgba(230,92,36,.9)'; });
  el.addEventListener('mouseleave', () => { dot.style.transform='translate(-50%,-50%) scale(1)'; ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='rgba(230,92,36,.6)'; });
});

/* ══ SCROLL PROGRESS ══ */
const prog = document.getElementById('scroll-progress');
const scrTop = document.getElementById('scrollTop');
const nav    = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = p + '%';
  scrTop.classList.toggle('show', window.scrollY > 500);
  nav.classList.toggle('scrolled', window.scrollY > 60);
  // active nav
  let curr = '';
  document.querySelectorAll('section[id]').forEach(s => { if (window.scrollY >= s.offsetTop - 220) curr = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + curr));
});
scrTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ══ NAV HAMBURGER ══ */
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : ''; });
function closeMob() { ham.classList.remove('open'); mob.classList.remove('open'); document.body.style.overflow = ''; }

/* ══ HERO CANVAS PARTICLES ══ */
(function() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.5 + .5,
      alpha: Math.random() * .5 + .15,
    });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    // connections
    particles.forEach((p, i) => {
      particles.slice(i + 1).forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(230,92,36,${.12 * (1 - d / 120)})`;
          ctx.lineWidth = .6;
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      });
    });
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,92,36,${p.alpha})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══ TYPED ANIMATION ══ */
const words = ['Web Developer', 'Frontend Builder', 'SQL Learner', 'Prompt Engineering', 'Problem Solver'];
let wi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type() {
  const word = words[wi];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
    setTimeout(type, 80);
  } else {
    typedEl.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 400); return; }
    setTimeout(type, 40);
  }
}
setTimeout(type, 2200);

/* ══ REVEAL ON SCROLL ══ */
const revEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.1 });
revEls.forEach(el => io.observe(el));

/* ══ ANIMATED COUNTERS ══ */
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    let cur = 0;
    const step = target / 40;
    const int = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur) + suffix;
      if (cur >= target) clearInterval(int);
    }, 35);
    cio.unobserve(el);
  });
}, { threshold: .5 });
counters.forEach(el => cio.observe(el));

function handleForm(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = encodeURIComponent(f.get('subject') || 'Portfolio message from ' + f.get('name'));
  const body = encodeURIComponent(f.get('message') + '\n\n' + f.get('name') + ' (' + f.get('email') + ')');
  window.location.href = 'mailto:sagardasbaniya97@gmail.com?subject=' + subject + '&body=' + body;
}
