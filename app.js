/**
 * bitz.dev | Freelance Portfolio Controller Logic
 * Handcrafted by Bitupan Borah
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Menu Drawer Toggle
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerIcon = document.getElementById('burger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => mobileMenu.classList.remove('scale-y-95', 'opacity-0'), 10);
                burgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('scale-y-95', 'opacity-0');
                setTimeout(() => mobileMenu.classList.add('hidden'), 200);
                burgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });

        // Close menu when clicking links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                burgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }


    // ==========================================
    // 2. Interactive Ecosystem Tab Switcher
    // ==========================================
    const tabFrontend = document.getElementById('tab-frontend');
    const tabDevops = document.getElementById('tab-devops');
    const ecosystemContent = document.getElementById('ecosystem-content');

    const ecosystemData = {
        frontend: {
            tag: "React / JS",
            heading: "Intuitive, Blazing Fast Interfaces",
            text: "The visual tier is optimized for high conversion. We employ lightweight components, custom Tailwind themes, and modular components that load instantly. Perfect Core Web Vitals is our standard.",
            grid: [
                { title: "JS / TS", desc: "Robust Logic" },
                { title: "Tailwind", desc: "Responsive Utility" },
                { title: "Vite / ESB", desc: "Blazing Bundles" },
                { title: "A11y / SEO", desc: "Max Accessibility" }
            ]
        },
        devops: {
            tag: "CI / CD / Edge Delivery",
            heading: "Automated, Globally Distributed Deployments",
            text: "Focus on high-speed delivery. Your code is automatically tested, compiled, and pushed to edge server nodes (Vercel, Netlify, or AWS Edge), offering sub-millisecond response times to any client, anywhere in the world.",
            grid: [
                { title: "Git Automation", desc: "Continuous Delivery" },
                { title: "Edge Nodes CDN", desc: "Under 100ms TTFB" },
                { title: "Docker Container", desc: "Consistent Builds" },
                { title: "Web Performance", desc: "Speed Standards" }
            ]
        }
    };

    function switchEcosystemTab(tabName, activeBtn) {
        // Fade out
        ecosystemContent.style.opacity = '0';
        
        // Reset tab buttons
        [tabFrontend, tabDevops].forEach(btn => {
            if (btn) {
                btn.className = "tab-btn w-full text-left px-5 py-3.5 bg-transparent text-white/75 hover:text-white font-bold rounded-xl flex items-center justify-between border border-white/10 hover:border-white/20 transition-all duration-200";
                const indicator = btn.querySelector('span:last-child');
                if (indicator) indicator.className = "w-2 h-2 rounded-full bg-white/20";
            }
        });

        // Highlight active button
        activeBtn.className = "tab-btn w-full text-left px-5 py-3.5 bg-brand-lime text-brand-dark font-bold rounded-xl flex items-center justify-between border border-brand-lime transition-all duration-200";
        const activeIndicator = activeBtn.querySelector('span:last-child');
        if (activeIndicator) activeIndicator.className = "w-2 h-2 rounded-full bg-brand-dark";

        // Build new HTML after fading out
        setTimeout(() => {
            const data = ecosystemData[tabName];
            
            let gridHTML = '';
            data.grid.forEach(item => {
                gridHTML += `
                    <div class="p-4 bg-white/5 rounded-xl text-center border border-white/5 hover:border-brand-lime/20 transition-all">
                        <p class="text-xs font-bold text-brand-lime font-mono">${item.title}</p>
                        <p class="text-[10px] text-white/40 mt-1">${item.desc}</p>
                    </div>
                `;
            });

            ecosystemContent.innerHTML = `
                <div>
                    <div class="flex items-center space-x-3 mb-6">
                        <span class="px-3 py-1 bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-bold rounded-full font-mono">${data.tag}</span>
                        <h3 class="text-xl font-bold">${data.heading}</h3>
                    </div>
                    <p class="text-white/70 text-sm leading-relaxed mb-6">
                        ${data.text}
                    </p>
                    
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                        ${gridHTML}
                    </div>
                </div>
            `;
            
            // Fade in
            ecosystemContent.style.opacity = '1';
        }, 200);
    }

    if (tabFrontend && tabDevops && ecosystemContent) {
        tabFrontend.addEventListener('click', () => switchEcosystemTab('frontend', tabFrontend));
        tabDevops.addEventListener('click', () => switchEcosystemTab('devops', tabDevops));
    }


    // ==========================================
    // 3. Testimonial Slider System
    // ==========================================
    const testimonials = [
        {
            quote: `"Bitupan's work was exceptional. He rewritten our entire web interface using custom-tailored elements. Our loading speeds went from 4.2 seconds to under 0.8 seconds, and organic checkouts spiked by 35% within the first month itself."`,
            author: "Johnathan S.",
            role: "SaaS Founder, Austin TX",
            initials: "JS"
        },
        {
            quote: `"As a startup founder, I needed rapid execution without sacrificing security. Bitz built our client onboarding portal in just two weeks. Outstanding responsiveness, clean code comments, and total commitment."`,
            author: "Elena Rostova",
            role: "CTO, Berlin",
            initials: "ER"
        },
        {
            quote: `"The API integration was seamless. Bitz solved a critical bottleneck in our webhook delivery pipeline that was costing us client data. He is highly communicative, methodical, and delivers top-tier results."`,
            author: "David K.",
            role: "Director, Singapore",
            initials: "DK"
        }
    ];

    let activeIndex = 0;
    const quoteEl = document.getElementById('testimonial-quote');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    const dots = document.querySelectorAll('.test-dot');

    function updateTestimonial(index) {
        if (!quoteEl) return;
        
        quoteEl.style.opacity = '0';
        
        // Update pagination indicators (dots)
        dots.forEach((dot, dIdx) => {
            if (dIdx === index) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-brand-dark');
            } else {
                dot.classList.remove('bg-brand-dark');
                dot.classList.add('bg-gray-300');
            }
        });

        setTimeout(() => {
            const current = testimonials[index];
            quoteEl.innerHTML = `
                <p class="text-lg md:text-xl font-medium text-brand-dark italic leading-relaxed">
                    ${current.quote}
                </p>
                <div class="flex items-center space-x-4 mt-8">
                    <div class="w-12 h-12 rounded-full bg-brand-dark text-brand-lime font-bold text-sm flex items-center justify-center">
                        ${current.initials}
                    </div>
                    <div>
                        <h4 class="font-bold text-brand-dark text-base">${current.author}</h4>
                        <p class="text-xs text-gray-500 font-mono">${current.role}</p>
                    </div>
                </div>
            `;
            quoteEl.style.opacity = '1';
        }, 200);
    }

    if (sliderPrev && sliderNext) {
        sliderPrev.addEventListener('click', () => {
            activeIndex = (activeIndex === 0) ? testimonials.length - 1 : activeIndex - 1;
            updateTestimonial(activeIndex);
            resetAutoplay();
        });

        sliderNext.addEventListener('click', () => {
            activeIndex = (activeIndex === testimonials.length - 1) ? 0 : activeIndex + 1;
            updateTestimonial(activeIndex);
            resetAutoplay();
        });
    }

    // Auto playing slider
    let autoplayInterval = setInterval(() => {
        activeIndex = (activeIndex === testimonials.length - 1) ? 0 : activeIndex + 1;
        updateTestimonial(activeIndex);
    }, 8000);

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            activeIndex = (activeIndex === testimonials.length - 1) ? 0 : activeIndex + 1;
            updateTestimonial(activeIndex);
        }, 8000);
    }


    // ==========================================
    // 4. Contact Form Validation & Simulated Net Call
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formSubmit = document.getElementById('form-submit');

    if (contactForm && formSuccess && formSubmit) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all mandatory fields.');
                return;
            }

            // Set loading state on button
            const originalButtonText = formSubmit.innerHTML;
            formSubmit.disabled = true;
            formSubmit.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Deploying Brief...</span>
            `;

            // Simulated response delay
            setTimeout(() => {
                // Show success banner
                formSuccess.classList.remove('hidden');
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Reset form values
                contactForm.reset();

                // Restore button state
                formSubmit.disabled = false;
                formSubmit.innerHTML = originalButtonText;

                // Hide success banner after 6 seconds
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 6000);

            }, 1500);
        });
    }

});
