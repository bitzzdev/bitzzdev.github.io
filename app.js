// ═══════════════════════════════════════════════════════════
// LENIS SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

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

document.querySelectorAll('[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const text = el.getAttribute('data-cursor');
        if (cursorBubble && text) cursorBubble.textContent = text;
        cursor?.classList.add('active');
    });
    el.addEventListener('mouseleave', () => cursor?.classList.remove('active'));
});

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
    btn.addEventListener('click', () => { aboutModal?.classList.remove('open'); document.body.style.overflow = ''; lenis?.start(); }
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

        // Split by words, then group into lines based on natural breaks
        const words = text.split(/\s+/);
        const lines = [];
        let currentLine = [];

        words.forEach((word, i) => {
            currentLine.push(word);
            // Create a line break at natural pause points or every ~6-8 words
            const isPause = /[.,;:!?]$/.test(word);
            const isLongEnough = currentLine.length >= 6;
            const isEnd = i === words.length - 1;

            if (isPause || isLongEnough || isEnd) {
                lines.push(currentLine.join(' '));
                currentLine = [];
            }
        });

        // If there are remaining words
        if (currentLine.length > 0) {
            lines.push(currentLine.join(' '));
        }

        lines.forEach(lineText => {
            const lineEl = document.createElement('span');
            lineEl.classList.add('line');
            lineEl.textContent = lineText + ' ';
            container.appendChild(lineEl);
        });
    });
}

splitTextIntoLines();

// Scroll-based highlight effect
function setupScrollHighlight() {
    const scrollTexts = document.querySelectorAll('[data-scroll-text]');

    scrollTexts.forEach(container => {
        const lines = container.querySelectorAll('.line');
        if (lines.length === 0) return;

        // Calculate the container's scroll progress
        const updateLines = () => {
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const containerTop = rect.top;
            const containerHeight = rect.height;

            // How far through the container we've scrolled (0 = top of viewport, 1 = bottom)
            const scrollProgress = (windowHeight - containerTop) / (containerHeight + windowHeight);

            lines.forEach((line, index) => {
                const lineRect = line.getBoundingClientRect();
                const lineCenter = lineRect.top + lineRect.height / 2;
                const viewportCenter = windowHeight / 2;

                // Distance from viewport center (normalized)
                const distance = Math.abs(lineCenter - viewportCenter) / windowHeight;

                // Lines near center are fully bright, lines further away dim
                if (distance < 0.3) {
                    line.style.color = 'rgba(243, 242, 239, 1)';
                } else if (distance < 0.6) {
                    const opacity = 1 - ((distance - 0.3) / 0.3) * 0.65;
                    line.style.color = `rgba(243, 242, 239, ${opacity})`;
                } else {
                    line.style.color = 'rgba(243, 242, 239, 0.12)';
                }
            });
        };

        // Use Lenis scroll event
        lenis.on('scroll', updateLines);
        // Also update on regular scroll for initial state
        window.addEventListener('scroll', updateLines, { passive: true });
        updateLines();
    });
}

// Wait for Lenis to be ready
setTimeout(setupScrollHighlight, 100);

// ═══════════════════════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════════════════════
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

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
    quoteEl.style.transform = 'translateY(10px)';
    setTimeout(() => {
        quoteEl.innerHTML = `<p class="testimonial-quote">"${t.quote}"</p><div class="testimonial-author"><div class="testimonial-avatar">${t.initials}</div><div><div class="testimonial-name">${t.name}</div><div class="testimonial-role">${t.role}</div></div></div>`;
        quoteEl.style.opacity = '1';
        quoteEl.style.transform = 'translateY(0)';
    }, 300);
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentTestimonial));
}

prevBtn?.addEventListener('click', () => { currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length; updateSlider(); });
nextBtn?.addEventListener('click', () => { currentTestimonial = (currentTestimonial + 1) % testimonials.length; updateSlider(); });
dots.forEach(dot => { dot.addEventListener('click', () => { currentTestimonial = parseInt(dot.getAttribute('data-index')); updateSlider(); }); });
if (quoteEl) quoteEl.style.transition = 'opacity 0.3s, transform 0.3s';

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
        if (target) lenis.scrollTo(target, { offset: 0, duration: 1.5 });
    });
});

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
