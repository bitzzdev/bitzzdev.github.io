document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing app...');

    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerIcon = document.getElementById('burger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            console.log('Menu toggle click detected');
            e.preventDefault();
            e.stopPropagation();
            
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                console.log('Opening menu');
                mobileMenu.classList.remove('hidden');
                if (burgerIcon) burgerIcon.classList.add('hidden');
                if (closeIcon) closeIcon.classList.remove('hidden');
            } else {
                console.log('Closing menu');
                mobileMenu.classList.add('hidden');
                if (burgerIcon) burgerIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            }
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Mobile link clicked, closing menu');
                mobileMenu.classList.add('hidden');
                if (burgerIcon) burgerIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            });
        });
    } else {
        console.error('Menu elements not found:', { menuToggle, mobileMenu });
    }

    // ==========================================
    // 2. Ecosystem Tab Switcher
    // ==========================================
    const tabFrontend = document.getElementById('tab-frontend');
    const tabDevops = document.getElementById('tab-devops');
    const ecosystemContent = document.getElementById('ecosystem-content');

    if (tabFrontend && tabDevops && ecosystemContent) {
        const frontendContent = `
                            <div>
                                <div class="flex items-center space-x-3 mb-6">
                                    <span class="px-3 py-1 bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-bold rounded-full font-mono">React / JS</span>
                                    <h3 class="text-xl font-bold">Intuitive, Blazing Fast Interfaces</h3>
                                </div>
                                <p class="text-white/70 text-sm leading-relaxed mb-6">
                                    The visual tier is optimized for high conversion. We employ lightweight components, custom Tailwind themes, and modular components that load instantly. Perfect Core Web Vitals is our standard.
                                </p>
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                                    <div class="p-4 bg-white/5 rounded-xl text-center border border-white/5 hover:border-brand-lime/20 transition-all">
                                        <p class="text-xs font-bold text-brand-lime font-mono">JS / TS</p>
                                        <p class="text-[10px] text-white/40 mt-1">Robust Logic</p>
                                    </div>
                                    <div class="p-4 bg-white/5 rounded-xl text-center border border-white/5 hover:border-brand-lime/20 transition-all">
                                        <p class="text-xs font-bold text-brand-lime font-mono">Tailwind</p>
                                        <p class="text-[10px] text-white/40 mt-1">Responsive Utility</p>
                                    </div>
                                    <div class="p-4 bg-white/5 rounded-xl text-center border border-white/5 hover:border-brand-lime/20 transition-all">
                                        <p class="text-xs font-bold text-brand-lime font-mono">Vite / ESB</p>
                                        <p class="text-[10px] text-white/40 mt-1">Blazing Bundles</p>
                                    </div>
                                    <div class="p-4 bg-white/5 rounded-xl text-center border border-white/5 hover:border-brand-lime/20 transition-all">
                                        <p class="text-xs font-bold text-brand-lime font-mono">A11y / SEO</p>
                                        <p class="text-[10px] text-white/40 mt-1">Max Accessibility</p>
                                    </div>
                                </div>
                            </div>
        `;
        const devopsContent = `
                            <div>
                                <div class="flex items-center space-x-3 mb-6">
                                    <span class="px-3 py-1 bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-bold rounded-full font-mono">CI/CD / Cloud</span>
                                    <h3 class="text-xl font-bold">Architecting for Scale & Reliability</h3>
                                </div>
                                <p class="text-white/70 text-sm leading-relaxed mb-6">
                                    I don't just code; I orchestrate. From automated deployment pipelines to edge-computing strategies, I ensure your product remains stable under heavy load and deploys in seconds.
                                </p>
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                                    <div class="p-4 bg-white/5 rounded-xl text-center border border-white/5 hover:border-brand-lime/20 transition-all">
                                        <p class="text-xs font-bold text-brand-lime font-mono">Docker</p>
                                        <p class="text-[10px] text-white/40 mt-1">Containerized</p>
                                    </div>
                                    <div class="p-4 bg-white/5 rounded-xl text-center border border-white/5 hover:border-brand-lime/20 transition-all">
                                        <p class="text-xs font-bold text-brand-lime font-mono">GitHub Act</p>
                                        <p class="text-[10px] text-white/40 mt-1">Auto-Deployed</p>
                                    </div>
                                    <div class="p-4 bg-white/5 rounded-xl text-center border border-white/5 hover:border-brand-lime/20 transition-all">
                                        <p class="text-xs font-bold text-brand-lime font-mono">Vercel/AWS</p>
                                        <p class="text-[10px] text-white/40 mt-1">Edge Delivery</p>
                                    </div>
                                    <div class="p-4 bg-white/5 rounded-xl text-center border border-white/5 hover:border-brand-lime/20 transition-all">
                                        <p class="text-xs font-bold text-brand-lime font-mono">Terraform</p>
                                        <p class="text-[10px] text-white/40 mt-1">Infra-as-Code</p>
                                    </div>
                                </div>
                            </div>
        `;

        const switchTab = (activeTab, inactiveTab, content) => {
            activeTab.classList.add('bg-brand-lime', 'text-brand-dark', 'border-brand-lime');
            activeTab.classList.remove('bg-transparent', 'text-white/75', 'border-white/10');
            inactiveTab.classList.remove('bg-brand-lime', 'text-brand-dark', 'border-brand-lime');
            inactiveTab.classList.add('bg-transparent', 'text-white/75', 'border-white/10');
            ecosystemContent.style.opacity = '0';
            setTimeout(() => {
                ecosystemContent.innerHTML = content;
                ecosystemContent.style.opacity = '1';
            }, 300);
        };

        tabFrontend.addEventListener('click', () => switchTab(tabFrontend, tabDevops, frontendContent));
        tabDevops.addEventListener('click', () => switchTab(tabDevops, tabFrontend, devopsContent));
    }

    // ==========================================
    // 3. Testimonials Slider
    // ==========================================
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
    const dots = document.querySelectorAll('.test-dot');
    let currentTestimonial = 0;

    if (quoteEl && prevBtn && nextBtn) {
        const updateSlider = () => {
            const t = testimonials[currentTestimonial];
            quoteEl.style.opacity = '0';
            setTimeout(() => {
                quoteEl.innerHTML = `
                    <p class="text-lg md:text-xl font-medium text-brand-dark italic leading-relaxed">
                        "${t.quote}"
                    </p>
                    <div class="flex items-center space-x-4 mt-8">
                        <div class="w-12 h-12 rounded-full bg-brand-dark text-brand-lime font-bold text-sm flex items-center justify-center">
                            ${t.initials}
                        </div>
                        <div>
                            <h4 class="font-bold text-brand-dark text-base">${t.name}</h4>
                            <p class="text-xs text-gray-500 font-mono">${t.role}</p>
                        </div>
                    </div>
                `;
                quoteEl.style.opacity = '1';
            }, 300);
            dots.forEach((dot, idx) => {
                dot.classList.toggle('bg-brand-dark', idx === currentTestimonial);
                dot.classList.toggle('bg-gray-300', idx !== currentTestimonial);
            });
        };

        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateSlider();
        });
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateSlider();
        });
        updateSlider();
    }

    // ==========================================
    // 4. Contact Form
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formSubmit = document.getElementById('form-submit');

    if (contactForm && formSubmit) {
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
            const body = encodeURIComponent(`Name: ${name}

Email: ${email}

Project Type: ${project}

Message:
${message}`);
            window.location.href = `mailto:bitupanborah1k@gmail.com?subject=${subject}&body=${body}`;

            if (formSuccess) {
                formSuccess.classList.remove('hidden');
                contactForm.reset();
                setTimeout(() => formSuccess.classList.add('hidden'), 5000);
            }
        });
    }

    console.log('Initialization complete.');
});
