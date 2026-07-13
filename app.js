document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu on link click
    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Ecosystem Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const ecosystemContent = document.getElementById('ecosystem-content');

    const frontendContent = `
        <span class="ecosystem-tag">React / JS</span>
        <h3 class="ecosystem-heading">Intuitive, Blazing Fast Interfaces</h3>
        <p class="ecosystem-text">The visual tier is optimized for high conversion. We employ lightweight components, custom Tailwind themes, and modular components that load instantly. Perfect Core Web Vitals is our standard.</p>
        <div class="tech-grid">
            <div class="tech-item">
                <div class="tech-name">JS / TS</div>
                <div class="tech-desc">Robust Logic</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">Tailwind</div>
                <div class="tech-desc">Responsive Utility</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">Vite / ESB</div>
                <div class="tech-desc">Blazing Bundles</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">A11y / SEO</div>
                <div class="tech-desc">Max Accessibility</div>
            </div>
        </div>
    `;

    const devopsContent = `
        <span class="ecosystem-tag">CI/CD / Cloud</span>
        <h3 class="ecosystem-heading">Architecting for Scale & Reliability</h3>
        <p class="ecosystem-text">I don't just code; I orchestrate. From automated deployment pipelines to edge-computing strategies, I ensure your product remains stable under heavy load and deploys in seconds.</p>
        <div class="tech-grid">
            <div class="tech-item">
                <div class="tech-name">Docker</div>
                <div class="tech-desc">Containerized</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">GitHub Act</div>
                <div class="tech-desc">Auto-Deployed</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">Vercel/AWS</div>
                <div class="tech-desc">Edge Delivery</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">Terraform</div>
                <div class="tech-desc">Infra-as-Code</div>
            </div>
        </div>
    `;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            ecosystemContent.style.opacity = '0';
            setTimeout(() => {
                ecosystemContent.innerHTML = btn.dataset.tab === 'frontend' ? frontendContent : devopsContent;
                ecosystemContent.style.opacity = '1';
            }, 300);
        });
    });

    // Testimonials Slider
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
        quoteEl.style.opacity = '0';
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
        }, 300);
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentTestimonial);
        });
    };

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateSlider();
        });
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateSlider();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentTestimonial = parseInt(dot.dataset.index);
            updateSlider();
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const project = document.getElementById('form-project').value;
            const message = document.getElementById('form-message').value.trim();

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
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Ecosystem content transition
    if (ecosystemContent) {
        ecosystemContent.style.transition = 'opacity 0.3s';
    }

    // Quote transition
    if (quoteEl) {
        quoteEl.style.transition = 'opacity 0.3s';
    }
});
