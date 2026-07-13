document.addEventListener('DOMContentLoaded', () => {
    // ═══════════════════════════════════════════════════════════
    // CUSTOM CURSOR
    // ═══════════════════════════════════════════════════════════
    const cursor = document.getElementById('cursor');
    const cursorBubble = document.getElementById('cursor-bubble');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        if (cursor) {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor hover effects
    const cursorElements = document.querySelectorAll('[data-cursor]');
    cursorElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const text = el.getAttribute('data-cursor');
            if (cursorBubble && text) {
                cursorBubble.textContent = text;
            }
            cursor?.classList.add('active');

            // Check if element is near right edge
            const rect = el.getBoundingClientRect();
            if (rect.right > window.innerWidth - 100) {
                cursor?.classList.add('active-edge');
            }
        });

        el.addEventListener('mouseleave', () => {
            cursor?.classList.remove('active', 'active-edge');
        });
    });

    // ═══════════════════════════════════════════════════════════
    // MOBILE MENU
    // ═══════════════════════════════════════════════════════════
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle?.addEventListener('click', () => {
        mobileMenu?.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    menuClose?.addEventListener('click', () => {
        mobileMenu?.classList.remove('open');
        document.body.style.overflow = '';
    });

    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ═══════════════════════════════════════════════════════════
    // ABOUT MODAL
    // ═══════════════════════════════════════════════════════════
    const aboutModal = document.getElementById('about-modal');
    const openAboutBtns = document.querySelectorAll('[data-open-about]');
    const closeAboutBtns = document.querySelectorAll('[data-close-about]');

    openAboutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            aboutModal?.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    closeAboutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            aboutModal?.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            aboutModal?.classList.remove('open');
            mobileMenu?.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ═══════════════════════════════════════════════════════════
    // SCROLL REVEAL ANIMATIONS
    // ═══════════════════════════════════════════════════════════
    const revealElements = document.querySelectorAll('.reveal, .split-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ═══════════════════════════════════════════════════════════
    // TESTIMONIALS SLIDER
    // ═══════════════════════════════════════════════════════════
    const testimonials = [
        {
            quote: "Bitupan's work was exceptional. He rewritten our entire web interface using custom-tailored elements. Our loading speeds went from 4.2 seconds to under 0.8 seconds, and organic checkouts spiked by 35% within the first month itself.",
            name: "Johnathan S.",
            role: "SaaS Founder, Austin TX",
            initials: "JS"
        },
        {
            quote: "The attention to detail is unmatched. Every pixel is in place, and the performance is breathtaking. He didn't just build a site; he built a conversion engine for our agency.",
            name: "Sarah Chen",
            role: "Creative Director, Tokyo",
            initials: "SC"
        },
        {
            quote: "Professional, transparent, and incredibly fast. Bitupan delivered a complex dashboard architecture in half the estimated time without compromising a single feature.",
            name: "Marcus Thorne",
            role: "CTO, FinTech Global",
            initials: "MT"
        }
    ];

    const quoteEl = document.getElementById('testimonial-quote');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;

    const updateSlider = () => {
        const t = testimonials[currentTestimonial];
        if (!quoteEl) return;

        quoteEl.style.opacity = '0';
        quoteEl.style.transform = 'translateY(10px)';

        setTimeout(() => {
            quoteEl.innerHTML = `
                <p class="testimonial-quote">"${t.quote}"</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">${t.initials}</div>
                    <div>
                        <div class="testimonial-name">${t.name}</div>
                        <div class="testimonial-role">${t.role}</div>
                    </div>
                </div>
            `;
            quoteEl.style.opacity = '1';
            quoteEl.style.transform = 'translateY(0)';
        }, 300);

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentTestimonial);
        });
    };

    prevBtn?.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    });

    nextBtn?.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateSlider();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentTestimonial = parseInt(dot.getAttribute('data-index'));
            updateSlider();
        });
    });

    // Add transition styles
    if (quoteEl) {
        quoteEl.style.transition = 'opacity 0.3s, transform 0.3s';
    }

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

        if (!name || !email || !message) {
            alert('Please fill out all mandatory fields.');
            return;
        }

        const subject = encodeURIComponent(`New Project Inquiry: ${project}`);
        const body = encodeURIComponent(`Name: ${name}\n\nEmail: ${email}\n\nProject Type: ${project}\n\nMessage:\n${message}`);
        window.location.href = `mailto:bitupanborah1k@gmail.com?subject=${subject}&body=${body}`;

        if (formSuccess) {
            formSuccess.classList.add('visible');
            contactForm.reset();
            setTimeout(() => formSuccess.classList.remove('visible'), 5000);
        }
    });

    // ═══════════════════════════════════════════════════════════
    // SMOOTH SCROLL
    // ═══════════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ═══════════════════════════════════════════════════════════
    // NAV SCROLL EFFECT
    // ═══════════════════════════════════════════════════════════
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ═══════════════════════════════════════════════════════════
    // PARALLAX EFFECT ON HERO
    // ═══════════════════════════════════════════════════════════
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroTitle && scrolled < window.innerHeight) {
            heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroTitle.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        if (heroSubtitle && scrolled < window.innerHeight) {
            heroSubtitle.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroSubtitle.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    }, { passive: true });

    // ═══════════════════════════════════════════════════════════
    // STAGGER ANIMATION FOR GRID ITEMS
    // ═══════════════════════════════════════════════════════════
    const staggerItems = document.querySelectorAll('.work-item, .process-item, .metric-item');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    staggerItems.forEach(item => {
        item.classList.add('reveal');
        staggerObserver.observe(item);
    });
});
