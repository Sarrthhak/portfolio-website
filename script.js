/* ============================================================
   CUSTOM CURSOR
============================================================ */
const dot       = document.getElementById('cursor-dot');
const ring      = document.getElementById('cursor-ring');
const butterfly = document.getElementById('butterfly-cursor');
 
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, bfX = 0, bfY = 0;
let lastX = 0, lastY = 0, trailCount = 0;
 
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  const angle = Math.atan2(mouseY - lastY, mouseX - lastX) * (180 / Math.PI);
  butterfly.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  lastX = mouseX; lastY = mouseY;
  createTrail(mouseX, mouseY);
});
 
function lerp(a, b, t) { return a + (b - a) * t; }
function animateCursor() {
  ringX = lerp(ringX, mouseX, 0.12); ringY = lerp(ringY, mouseY, 0.12);
  ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
  bfX = lerp(bfX, mouseX, 0.08); bfY = lerp(bfY, mouseY, 0.08);
  butterfly.style.left = bfX + 'px'; butterfly.style.top = bfY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
 
function createTrail(x, y) {
  if (trailCount > 8) return;
  const t = document.createElement('div');
  t.classList.add('butterfly-trail');
  const size = Math.random() * 7 + 4;
  t.style.cssText = `left:${x+(Math.random()-.5)*16}px;top:${y+(Math.random()-.5)*16}px;width:${size}px;height:${size}px;background:rgba(214,185,140,${Math.random()*.4+.2});`;
  document.body.appendChild(t);
  trailCount++;
  setTimeout(() => { t.remove(); trailCount--; }, 800);
}
 
document.addEventListener('mouseenter', () => { dot.style.opacity=1; ring.style.opacity=1; butterfly.style.opacity=1; });
document.addEventListener('mouseleave', () => { dot.style.opacity=0; ring.style.opacity=0; butterfly.style.opacity=0; });
 
const interactives = 'a, button, .cert-card, .project-card, .about-card, .contact-link, .skill-tag, .sketch-card, .edu-card';
document.querySelectorAll(interactives).forEach(el => {
  el.addEventListener('mouseenter', () => { dot.style.width='12px'; dot.style.height='12px'; ring.style.width='50px'; ring.style.height='50px'; ring.style.borderColor='rgba(214,185,140,0.9)'; });
  el.addEventListener('mouseleave', () => { dot.style.width='8px';  dot.style.height='8px';  ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='rgba(214,185,140,0.6)'; });
});
 
let idleTimer;
document.addEventListener('mousemove', () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    let t = 0;
    const fl = setInterval(() => { t += 0.05; butterfly.style.top = (bfY + Math.sin(t)*5) + 'px'; if (t > Math.PI*2) clearInterval(fl); }, 16);
  }, 2000);
});
 
/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
 
/* ============================================================
   NAVBAR SCROLL
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { navbar.style.padding='12px 60px'; navbar.style.background='rgba(8,8,8,0.95)'; }
  else                      { navbar.style.padding='20px 60px'; navbar.style.background='rgba(10,10,10,0.7)'; }
});
 
/* ============================================================
   MOBILE NAV
============================================================ */
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (links.classList.contains('mobile-open')) {
    links.classList.remove('mobile-open'); links.removeAttribute('style');
  } else {
    links.classList.add('mobile-open');
    links.style.cssText='display:flex;flex-direction:column;position:fixed;top:65px;right:0;background:rgba(17,17,17,0.97);border-left:1px solid rgba(214,185,140,0.1);padding:32px 40px;gap:24px;z-index:999;backdrop-filter:blur(20px);';
  }
}
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  const l = document.querySelector('.nav-links'); l.classList.remove('mobile-open'); l.removeAttribute('style');
}));
 
/* ============================================================
   CERTIFICATE DATA  (with Google Drive PDF links)
============================================================ */
const certs = {
  nptel: {
    issuer:   'NPTEL · IIT Kharagpur',
    title:    'Deep Learning',
    meta:     'Jan – Apr 2025  ·  12-Week Course  ·  Score: 65%  ·  Elite',
    desc:     'Consolidated score of 65% — Online Assignments: 20.31/25, Proctored Exam: 45/75. Roll No: NPTEL25EE16S647501040.',
    img:      'c2.png',   // certificate preview image (see note below)
    pdfLink:  'https://drive.google.com/file/d/1VBO5vzM0H9Iml8uuFqJkUjR-RZ83AMYm/view?usp=drive_link'
  },
  dsa: {
    issuer:   'Udemy',
    title:    'Mastering Data Structures & Algorithms using C and C++',
    meta:     'Nov 26, 2025  ·  76 Total Hours  ·  Instructor: Abdul Bari  ·  Ref: UC-2271f992',
    desc:     'Certificate of Completion for a comprehensive DSA course using C and C++.',
    img:      'c5.png',
    pdfLink:  'https://drive.google.com/file/d/1daNQjn3yQsF4keoYlBCvCbjQrI8_YNpI/view?usp=drive_link'
  },
  cpp: {
    issuer:   'Udemy',
    title:    'Learn C++ Programming — Beginner to Advance — Deep Dive in C++',
    meta:     'Nov 26, 2025  ·  30.5 Total Hours  ·  Instructor: Abdul Bari  ·  Ref: UC-a154b290',
    desc:     'Certificate of Completion for in-depth C++ programming from beginner to advanced level.',
    img:      'c3.png',
    pdfLink:  'https://drive.google.com/file/d/17vdAVfo2fA7nO99p85h4A0YkskEj8ayb/view?usp=drive_link'
  },
  automata: {
    issuer:   'Infosys Springboard',
    title:    'Computational Theory: Language Principle & Finite Automata Theory',
    meta:     'Completed Aug 31, 2025  ·  Issued Sep 10, 2025',
    desc:     'Covers formal language theory, finite automata, regular expressions, and computational complexity.',
    img:      'c1.png',
    pdfLink:  'https://drive.google.com/file/d/1hoklImuTaPwUpJkevSs9caAMg6jSFcSB/view?usp=drive_link'
  },
  genai: {
    issuer:   'Infosys Springboard',
    title:    'Master Generative Al & Generative Al tools(ChatGPT & more)',
    meta:     'Completed Aug 20, 2025  ·  Issued Dec 10, 2025',
    desc:     'Building generative AI applications and solutions using no-code tools and platforms.',
    img:      'c4.png',
    pdfLink:  'https://drive.google.com/file/d/1CyCbND1x14lC7ovo7jUkHMs1C9qtTIgz/view?usp=drive_link'
  }
};
 
/* ============================================================
   CERTIFICATE MODAL
============================================================ */
function openModal(id) {
  const c = certs[id];
  document.getElementById('modal-issuer').textContent = c.issuer;
  document.getElementById('modal-title').textContent  = c.title;
  document.getElementById('modal-meta').textContent   = c.meta;
 
  // Build preview: try image, fall back to styled placeholder
  const previewWrap = document.getElementById('cert-preview-wrap');
  previewWrap.innerHTML = '';
  const imgEl = new Image();
  imgEl.src = c.img;
  imgEl.onload = () => {
    const wrap = document.createElement('div'); wrap.className = 'cert-preview-img';
    const i = document.createElement('img'); i.src = c.img; i.alt = c.title;
    wrap.appendChild(i); previewWrap.appendChild(wrap);
  };
  imgEl.onerror = () => {
    previewWrap.innerHTML = `
      <div class="cert-preview-placeholder">
        <span>📜</span>
        <p>${c.desc}</p>
      </div>`;
  };
 
  // Download button opens Google Drive link in new tab
  const btn = document.getElementById('modal-download-btn');
  btn.href = c.pdfLink;
  btn.target = '_blank';
  btn.rel = 'noopener';
 
  document.getElementById('cert-modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCertModal(e) {
  if (!e || e.target === document.getElementById('cert-modal-overlay') || e.currentTarget.classList.contains('modal-close')) {
    document.getElementById('cert-modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}
 
/* ============================================================
   SKETCH MODAL
============================================================ */
const sketchData = [
  { img: '1.jpeg', caption: 'Vinsmoke Sanji', series: 'One Piece' },
  { img: '2.jpeg', caption: 'Roronoa Zoro',   series: 'One Piece' },
  { img: '3.jpeg', caption: 'Shinobu Kocho',  series: 'Demon Slayer' },
  { img: '4.jpeg', caption: 'Eren Yeager',    series: 'Attack on Titan' }
];
 
function openSketchModal(idx) {
  const s = sketchData[idx];
  document.getElementById('sketch-modal-img').src = s.img;
  document.getElementById('sketch-modal-img').alt = s.caption;
  document.getElementById('sketch-modal-name').textContent   = s.caption;
  document.getElementById('sketch-modal-series').textContent = s.series;
  document.getElementById('sketch-modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeSketchModal(e) {
  if (!e || e.target === document.getElementById('sketch-modal-overlay') || e.currentTarget.classList.contains('sketch-modal-close')) {
    document.getElementById('sketch-modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}
 
/* ============================================================
   CONTACT FORM  — EmailJS
   Uses EmailJS free tier. Service/Template IDs are configured
   in index.html <head> init call.
============================================================ */
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn    = document.getElementById('form-submit-btn');
  const status = document.getElementById('form-status');
  status.className = 'form-status';
  status.style.display = 'none';
 
  btn.textContent = 'Sending…';
  btn.disabled = true;
 
  const params = {
    from_name:  document.getElementById('field-name').value,
    from_email: document.getElementById('field-email').value,
    subject:    document.getElementById('field-subject').value,
    message:    document.getElementById('field-message').value,
    to_email:   'sarthakpipladiya31@gmail.com'
  };
 
  try {
    // emailjs.send(serviceID, templateID, params)
    // Replace 'service_XXXXXXX' and 'template_XXXXXXX' with your actual IDs
    await emailjs.send('service_cyl8sbl', 'template_dkkflos', params);
    status.className = 'form-status success';
    status.textContent = '✓ Message sent! I\'ll get back to you soon.';
    this.reset();
  } catch (err) {
    console.error(err);
    status.className = 'form-status error';
    status.textContent = '✗ Something went wrong. Please email me directly at sarthakpipladiya31@gmail.com';
  }
 
  btn.textContent = 'Send Message →';
  btn.disabled = false;
});