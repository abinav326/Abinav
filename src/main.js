import './style.css';

// Vite automatically discovers every image placed in public/images at build time.
// Add .jpg/.jpeg/.png/.webp files there and they will appear in the Projects gallery.
const projectFiles = import.meta.glob('./projects/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
});

const projects = Object.entries(projectFiles)
  .map(([path, url]) => ({
    title: path.split('/').pop().replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
    image: url
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

const fallbackProjects = [
  { title: 'Your next project', image: null, text: 'Project photos will appear here as you add them to the images folder.' },
  { title: 'Built with care', image: null, text: 'Add completed-home photographs to showcase the quality of your work.' },
  { title: 'More projects coming', image: null, text: 'The gallery is ready to grow with every new build.' }
];

const gallery = projects.length ? projects : fallbackProjects;

const icon = (name) => ({
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5 9 3l2 5-2.1 1.5a15 15 0 0 0 5.6 5.6L16 13l5 2 .5 2.4c.2 1.2-.8 2.3-2 2.4C10.8 20.2 3.8 13.2 4.2 4.5c.1-1.2 1.2-2.2 2.4-2.4Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>'
}[name]);

document.querySelector('#app').innerHTML = `
  <header class="site-header" id="top">
    <a class="brand" href="#top" aria-label="Abitha Construction home">
      <span class="brand-mark">AC</span>
      <span class="brand-copy"><strong>ABITHA</strong><small>CONSTRUCTION</small></span>
    </a>
    <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">${icon('menu')}</button>
    <nav class="nav" aria-label="Main navigation">
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#projects">Projects</a>
      <a href="#contact" class="nav-cta">Start a conversation ${icon('arrow')}</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-noise"></div>
      <div class="hero-content reveal">
        <p class="eyebrow"><span></span> Palappuram · Ottapalam</p>
        <h1>Spaces built<br /><em>to feel like home.</em></h1>
        <p class="hero-text">Thoughtful planning, dependable execution and practical building guidance — from the first idea to the finished space.</p>
        <div class="hero-actions">
          <a class="button button-light" href="#projects">Explore our work ${icon('arrow')}</a>
          <a class="text-link" href="tel:+919544880990">Call Haridasan ${icon('phone')}</a>
        </div>
      </div>
      <div class="hero-architecture" aria-hidden="true">
        <div class="arch-frame arch-back"></div><div class="arch-frame arch-mid"></div><div class="arch-frame arch-front"></div>
        <div class="arch-roof"></div><div class="arch-window w1"></div><div class="arch-window w2"></div><div class="arch-door"></div>
        <div class="arch-ground"></div>
      </div>
      <div class="hero-scroll">Scroll to explore <span></span></div>
    </section>

    <section class="intro section-pad" id="about">
      <div class="section-label reveal">01 / OUR APPROACH</div>
      <div class="intro-grid">
        <h2 class="reveal">A better build starts with a <span>better plan.</span></h2>
        <div class="intro-copy reveal">
          <p>At Abitha Construction, every project begins with understanding how you want to live, work and use the space. We focus on clean planning, honest guidance and work that lasts.</p>
          <p>Based in Palappuram, Ottapalam, we bring a personal approach to residential building and renovation.</p>
          <a class="arrow-link" href="#contact">Let's discuss your project ${icon('arrow')}</a>
        </div>
      </div>
    </section>

    <section class="services section-pad" id="services">
      <div class="section-label reveal">02 / SERVICES</div>
      <div class="services-head">
        <h2 class="reveal">From idea to<br /><span>finished space.</span></h2>
        <p class="reveal">Practical support for homeowners who want clarity at every stage.</p>
      </div>
      <div class="service-list">
        <article class="service reveal"><span class="service-no">01</span><div><h3>Design & Planning</h3><p>Turn your requirements into a clear, practical plan before construction begins.</p></div><span class="service-arrow">${icon('arrow')}</span></article>
        <article class="service reveal"><span class="service-no">02</span><div><h3>Home Renovation</h3><p>Refresh, improve and rework existing spaces with careful attention to the details.</p></div><span class="service-arrow">${icon('arrow')}</span></article>
        <article class="service reveal"><span class="service-no">03</span><div><h3>Building Consulting</h3><p>Get straightforward guidance to make better decisions throughout your building journey.</p></div><span class="service-arrow">${icon('arrow')}</span></article>
      </div>
    </section>

    <section class="projects section-pad" id="projects">
      <div class="section-label reveal">03 / SELECTED WORK</div>
      <div class="projects-head">
        <div><h2 class="reveal">Work that speaks<br /><span>for itself.</span></h2></div>
        <p class="reveal">Swipe through completed projects. New photos can be added directly to the <code>public/images</code> folder.</p>
      </div>
      <div class="gallery-wrap reveal">
        <div class="gallery" id="gallery">
          ${gallery.map((project, i) => `
            <article class="project-card">
              <div class="project-image ${project.image ? '' : 'placeholder'}">
                ${project.image ? `<img src="${project.image}" alt="${project.title}" loading="lazy" />` : `<div class="placeholder-art"><span>AC</span><small>${String(i + 1).padStart(2, '0')}</small></div>`}
                <span class="project-index">${String(i + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}</span>
              </div>
              <div class="project-meta"><h3>${project.title}</h3><span>View project ${icon('arrow')}</span></div>
            </article>`).join('')}
        </div>
        <div class="gallery-controls"><button id="prev" aria-label="Previous project">←</button><div class="gallery-progress"><span id="progress"></span></div><button id="next" aria-label="Next project">→</button></div>
      </div>
    </section>

    <section class="promise section-pad">
      <div class="promise-card reveal">
        <div><p class="eyebrow dark"><span></span> THE ABITHA PROMISE</p><h2>Built with care.<br /><em>Guided with clarity.</em></h2></div>
        <div class="promise-points"><p>${icon('check')} Clear communication</p><p>${icon('check')} Practical solutions</p><p>${icon('check')} Personal attention</p></div>
      </div>
    </section>

    <section class="contact section-pad" id="contact">
      <div class="contact-grid reveal">
        <div><div class="section-label">04 / CONTACT</div><h2>Have a project<br /><span>in mind?</span></h2><p>Tell us what you're planning. Let's talk about the right way to bring it to life.</p></div>
        <div class="contact-card">
          <a href="tel:+919544880990" class="contact-line"><span>${icon('phone')}</span><div><small>Call</small><strong>95448 80990</strong></div>${icon('arrow')}</a>
          <a href="tel:+917907794955" class="contact-line"><span>${icon('phone')}</span><div><small>Call</small><strong>79077 94955</strong></div>${icon('arrow')}</a>
          <div class="contact-line"><span>${icon('pin')}</span><div><small>Location</small><strong>Palappuram, Ottapalam</strong></div></div>
        </div>
      </div>
    </section>
  </main>

  <footer><div class="footer-brand"><span class="brand-mark">AC</span><span><strong>ABITHA CONSTRUCTION</strong><small>PALAPPURAM, OTTAPALAM</small></span></div><p>© ${new Date().getFullYear()} Abitha Construction. Built for better spaces.</p><a href="#top">Back to top ↑</a></footer>
`;

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.innerHTML = icon(open ? 'close' : 'menu');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.innerHTML = icon('menu');
}));

const galleryEl = document.querySelector('#gallery');
const progress = document.querySelector('#progress');
const updateProgress = () => {
  const max = galleryEl.scrollWidth - galleryEl.clientWidth;
  progress.style.width = `${max <= 0 ? 100 : Math.max(12, (galleryEl.scrollLeft / max) * 100)}%`;
};
galleryEl.addEventListener('scroll', updateProgress, { passive: true });
document.querySelector('#next').addEventListener('click', () => galleryEl.scrollBy({ left: galleryEl.clientWidth * .82, behavior: 'smooth' }));
document.querySelector('#prev').addEventListener('click', () => galleryEl.scrollBy({ left: -galleryEl.clientWidth * .82, behavior: 'smooth' }));
updateProgress();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 24);
  if (y > lastY && y > 180) header.classList.add('hide');
  else header.classList.remove('hide');
  lastY = y;
}, { passive: true });
