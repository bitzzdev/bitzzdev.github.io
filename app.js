console.log('[bitz.dev] app.js loaded');

// ═══════════════════════════════════════════════════════════
// LENIS SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════
let lenis;

function initLenis() {
    if (typeof Lenis === 'undefined') {
        console.warn('[bitz.dev] Lenis not available, retrying...');
        return;
    }

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    console.log('[bitz.dev] Lenis initialized');
}

function waitForLenis() {
    if (typeof Lenis !== 'undefined') {
        initLenis();
    } else {
        setTimeout(waitForLenis, 200);
    }
}

// Retry for up to 5 seconds, then give up
const retryStart = Date.now();
const smartRetry = () => {
    if (typeof Lenis !== 'undefined') {
        initLenis();
    } else if (Date.now() - retryStart < 5000) {
        setTimeout(smartRetry, 200);
    } else {
        console.warn('[bitz.dev] Lenis did not load — smooth scroll disabled');
    }
};
smartRetry();

// ═══════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════
const cursor = document.getElementById('cursor');
const cursorBubble = document.getElementById('cursor-bubble');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    if (cursor) cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// ═══════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle?.addEventListener('click', () => { mobileMenu?.classList.add('open'); document.body.style.overflow = 'hidden'; lenis?.stop(); });
menuClose?.addEventListener('click', () => { mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; lenis?.start(); });
mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; lenis?.start(); });
});

// ═══════════════════════════════════════════════════════════
// ABOUT MODAL
// ═══════════════════════════════════════════════════════════
const aboutModal = document.getElementById('about-modal');
document.querySelectorAll('[data-open-about]').forEach(btn => {
    btn.addEventListener('click', () => { aboutModal?.classList.add('open'); document.body.style.overflow = 'hidden'; lenis?.stop(); });
});
document.querySelectorAll('[data-close-about]').forEach(btn => {
    btn.addEventListener('click', () => { aboutModal?.classList.remove('open'); document.body.style.overflow = ''; lenis?.start(); });
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { aboutModal?.classList.remove('open'); mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; lenis?.start(); }
});

// ═══════════════════════════════════════════════════════════
// SCROLL TEXT — LINE-BY-LINE HIGHLIGHT
// ═══════════════════════════════════════════════════════════
function splitTextIntoLines() {
    document.querySelectorAll('[data-scroll-text]').forEach(container => {
        const text = container.textContent.trim();
        container.innerHTML = '';

        const sentences = text.split(/(?<=[.!?])\s+/);

        sentences.forEach((sentence, sentenceIdx) => {
            const words = sentence.split(/\s+/);
            let currentLine = [];

            words.forEach((word, wordIdx) => {
                currentLine.push(word);
                const isPause = /[.,;:!?]$/.test(word);
                const isLongEnough = currentLine.length >= 5;
                const isSentenceEnd = wordIdx === words.length - 1;

                if (isPause || isLongEnough || isSentenceEnd) {
                    const lineEl = document.createElement('span');
                    lineEl.classList.add('line');
                    lineEl.textContent = currentLine.join(' ') + ' ';
                    container.appendChild(lineEl);
                    currentLine = [];
                }
            });

            if (sentenceIdx < sentences.length - 1) {
                const spacer = document.createElement('span');
                spacer.innerHTML = '&nbsp;';
                container.appendChild(spacer);
            }
        });
    });
}

splitTextIntoLines();

function initScrollHighlight() {
    const scrollTexts = document.querySelectorAll('[data-scroll-text]');

    function updateLines() {
        const windowHeight = window.innerHeight;
        const viewportCenter = windowHeight / 2;

        scrollTexts.forEach(container => {
            const lines = container.querySelectorAll('.line');
            lines.forEach((line) => {
                const rect = line.getBoundingClientRect();
                const lineCenter = rect.top + rect.height / 2;
                const distance = Math.abs(lineCenter - viewportCenter) / (windowHeight / 2);

                let opacity;
                if (distance < 0.25) {
                    opacity = 1;
                } else if (distance < 0.9) {
                    opacity = 1 - ((distance - 0.25) / 0.65) * 0.9;
                } else {
                    opacity = 0.1;
                }
                line.style.color = `rgba(243, 242, 239, ${Math.max(0.1, Math.min(1, opacity))})`;
            });
        });
    }

    function scrollLoop() {
        updateLines();
        requestAnimationFrame(scrollLoop);
    }
    requestAnimationFrame(scrollLoop);

    window.addEventListener('scroll', updateLines, { passive: true });
    updateLines();
}

initScrollHighlight();

// ═══════════════════════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════════════════════
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ═══════════════════════════════════════════════════════════
// STAGGER ANIMATION
// ═══════════════════════════════════════════════════════════
const staggerItems = document.querySelectorAll('.work-item, .process-item, .metric-item');
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), index * 100);
    });
}, { threshold: 0.1 });
staggerItems.forEach(item => { item.classList.add('reveal'); staggerObserver.observe(item); });

// ═══════════════════════════════════════════════════════════
// TESTIMONIALS SLIDER
// ═══════════════════════════════════════════════════════════
const testimonials = [
    { quote: "Bitupan's work was exceptional. He rewritten our entire web interface using custom-tailored elements. Our loading speeds went from 4.2 seconds to under 0.8 seconds, and organic checkouts spiked by 35% within the first month itself.", name: "Johnathan S.", role: "SaaS Founder, Austin TX", initials: "JS" },
    { quote: "The attention to detail is unmatched. Every pixel is in place, and the performance is breathtaking. He didn't just build a site; he built a conversion engine for our agency.", name: "Sarah Chen", role: "Creative Director, Tokyo", initials: "SC" },
    { quote: "Professional, transparent, and incredibly fast. Bitupan delivered a complex dashboard architecture in half the estimated time without compromising a single feature.", name: "Marcus Thorne", role: "CTO, FinTech Global", initials: "MT" }
];

const quoteEl = document.getElementById('testimonial-quote');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
const dots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;

function updateSlider() {
    const t = testimonials[currentTestimonial];
    if (!quoteEl) return;
    quoteEl.style.opacity = '0';
    setTimeout(() => {
        quoteEl.innerHTML = `<p class="testimonial-quote">"${t.quote}"</p><div class="testimonial-author"><div class="testimonial-avatar">${t.initials}</div><div><div class="testimonial-name">${t.name}</div><div class="testimonial-role">${t.role}</div></div></div>`;
        quoteEl.style.opacity = '1';
    }, 300);
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentTestimonial));
}

prevBtn?.addEventListener('click', () => { currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length; updateSlider(); });
nextBtn?.addEventListener('click', () => { currentTestimonial = (currentTestimonial + 1) % testimonials.length; updateSlider(); });
dots.forEach(dot => { dot.addEventListener('click', () => { currentTestimonial = parseInt(dot.getAttribute('data-index')); updateSlider(); }); });
if (quoteEl) quoteEl.style.transition = 'opacity 0.3s';

// ═══════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const project = document.getElementById('form-project')?.value;
    const message = document.getElementById('form-message')?.value.trim();
    if (!name || !email || !message) { alert('Please fill out all mandatory fields.'); return; }
    const subject = encodeURIComponent(`New Project Inquiry: ${project}`);
    const body = encodeURIComponent(`Name: ${name}\n\nEmail: ${email}\n\nProject Type: ${project}\n\nMessage:\n${message}`);
    window.location.href = `mailto:bitupanborah1k@gmail.com?subject=${subject}&body=${body}`;
    if (formSuccess) { formSuccess.classList.add('visible'); contactForm.reset(); setTimeout(() => formSuccess.classList.remove('visible'), 5000); }
});

// ═══════════════════════════════════════════════════════════
// SMOOTH SCROLL FOR ANCHOR LINKS
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.5 });
            else target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('[bitz.dev] app.js ready');
