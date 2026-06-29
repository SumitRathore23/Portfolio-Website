// ===== script.js =====

// ---------- DOM Ready ----------
document.addEventListener('DOMContentLoaded', function() {

    // ---------- Loading Screen ----------
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });

    // ---------- Initialize AOS ----------
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 50
    });

    // ---------- Animated Background (Canvas) ----------
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = {
        x: null,
        y: null,
        radius: 120
    };

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', function(e) {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.3 + 0.1;
        }
        update() {
            // Mouse interaction (repulsion)
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const forceX = (dx / dist) * force * 1.2;
                    const forceY = (dy / dist) * force * 1.2;
                    this.x += forceX;
                    this.y += forceY;
                }
            }

            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist/130)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ---------- Theme Toggle ----------
    const themeToggle = document.getElementById('themeToggle');
    let darkMode = false;

    // Check for saved theme
    if (localStorage.getItem('theme') === 'dark') {
        darkMode = true;
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function() {
        darkMode = !darkMode;
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        this.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // ---------- Mobile Menu ----------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    function toggleMobileMenu() {
        const isOpen = navLinks.classList.toggle('open');
        navOverlay.classList.toggle('open', isOpen);
        menuToggle.innerHTML = isOpen ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }

    menuToggle.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', toggleMobileMenu);

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            navOverlay.classList.remove('open');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // ---------- Navigation Active Link ----------
    const sections = document.querySelectorAll('.section');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ---------- Contact Form ----------
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name') || 'User';
        
        // Show success message with animation
        const btn = this.querySelector('.btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
            btn.style.background = '#00b894';
            btn.style.borderColor = '#00b894';
            
            // Reset after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
                this.reset();
            }, 3000);
        }, 1500);
    });

    // ---------- Year in Footer ----------
    document.getElementById('year').textContent = new Date().getFullYear();

    // ---------- Smooth Scroll for Nav Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });



    // ---------- Glitch Text Effect ----------
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
            setTimeout(() => {
                glitchText.style.transform = 'translate(0, 0)';
            }, 50);
        }, 2000);
    }

    // ---------- Scroll Progress Bar ----------
    window.addEventListener('scroll', function() {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // ---------- Interactive Code Editor Tabs ----------
    const codeTabs = document.querySelectorAll('.editor-tab');
    const codeContents = document.querySelectorAll('.code-content');

    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            codeTabs.forEach(t => t.classList.remove('active'));
            codeContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const fileType = this.getAttribute('data-file');
            const targetContent = document.getElementById(`code-${fileType}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ---------- Project Filtering ----------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categoryAttr = card.getAttribute('data-category') || '';
                const categories = categoryAttr.split(' ');
                
                card.classList.remove('show-anim');

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hide');
                    // Force reflow to restart CSS animation
                    void card.offsetWidth;
                    card.classList.add('show-anim');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ---------- Stats Counters Scroll Trigger ----------
    const statsSection = document.querySelector('.stats-row');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            const numbers = originalText.match(/\d+/g);
            if (!numbers) return;
            
            const targetVal = parseInt(numbers[0], 10);
            let startVal = 0;
            if (targetVal > 1000) {
                startVal = targetVal - 50;
            }
            
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quad
                const easeProgress = progress * (2 - progress);
                const currentVal = Math.floor(startVal + (targetVal - startVal) * easeProgress);
                
                stat.textContent = originalText.replace(numbers[0], currentVal);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = originalText;
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ---------- Luna AI Assistant ----------
    const lunaTrigger = document.getElementById('lunaTrigger');
    const lunaChatWindow = document.getElementById('lunaChatWindow');
    const lunaClose = document.getElementById('lunaClose');
    const lunaMessages = document.getElementById('lunaMessages');
    const lunaInputForm = document.getElementById('lunaInputForm');
    const lunaInput = document.getElementById('lunaInput');
    const lunaChips = document.getElementById('lunaChips');

    // Toggle Chat Window
    lunaTrigger.addEventListener('click', function() {
        const isOpen = lunaChatWindow.classList.toggle('open');
        if (isOpen) {
            const badge = lunaTrigger.querySelector('.luna-badge');
            if (badge) badge.style.display = 'none';
            setTimeout(() => lunaInput.focus(), 300);
        }
    });

    lunaClose.addEventListener('click', function() {
        lunaChatWindow.classList.remove('open');
    });

    // Close chat if clicked outside
    document.addEventListener('click', function(e) {
        if (!lunaChatWindow.contains(e.target) && !lunaTrigger.contains(e.target) && lunaChatWindow.classList.contains('open')) {
            lunaChatWindow.classList.remove('open');
        }
    });

    // Helper to add user message
    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'luna-message user-message';
        msg.textContent = text;
        lunaMessages.appendChild(msg);
        lunaMessages.scrollTop = lunaMessages.scrollHeight;
    }

    // Helper to add bot message with typing indicator
    function addBotReply(text, action = null) {
        const typing = document.createElement('div');
        typing.className = 'luna-message bot-message typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        lunaMessages.appendChild(typing);
        lunaMessages.scrollTop = lunaMessages.scrollHeight;

        setTimeout(() => {
            typing.remove();
            const msg = document.createElement('div');
            msg.className = 'luna-message bot-message';
            msg.innerHTML = text;
            lunaMessages.appendChild(msg);
            lunaMessages.scrollTop = lunaMessages.scrollHeight;

            if (action) action();
        }, 800 + Math.random() * 600);
    }

    // NLP Intent Matcher
    function processUserText(text) {
        const cleanText = text.toLowerCase().trim();

        // 1. Project filtering
        if (cleanText.includes('react') || cleanText.includes('front')) {
            addBotReply("I've filtered the projects to show Sumit's <strong>React</strong> work! Scroll up to check them out.", () => {
                const reactBtn = document.querySelector('.filter-btn[data-filter="react"]');
                if (reactBtn) reactBtn.click();
                scrollToSection('projects');
            });
            return;
        }
        if (cleanText.includes('node') || cleanText.includes('back')) {
            addBotReply("Here are Sumit's <strong>Node.js</strong> and backend projects.", () => {
                const nodeBtn = document.querySelector('.filter-btn[data-filter="node"]');
                if (nodeBtn) nodeBtn.click();
                scrollToSection('projects');
            });
            return;
        }
        if (cleanText.includes('python') || cleanText.includes('ai') || cleanText.includes('chatbot')) {
            addBotReply("I've filtered the projects to show Sumit's <strong>Python</strong> and AI-related work.", () => {
                const pyBtn = document.querySelector('.filter-btn[data-filter="python"]');
                if (pyBtn) pyBtn.click();
                scrollToSection('projects');
            });
            return;
        }
        if (cleanText.includes('project') || cleanText.includes('work') || cleanText.includes('portfolio')) {
            addBotReply("Sure! Here are all of Sumit's featured projects.", () => {
                const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
                if (allBtn) allBtn.click();
                scrollToSection('projects');
            });
            return;
        }

        // 2. Navigation
        if (cleanText.includes('skill') || cleanText.includes('tech') || cleanText.includes('languages') || cleanText.includes('expert')) {
            addBotReply("Let's look at Sumit's technical expertise and skills!", () => {
                scrollToSection('skills');
            });
            return;
        }
        if (cleanText.includes('contact') || cleanText.includes('email') || cleanText.includes('hire') || cleanText.includes('phone') || cleanText.includes('message')) {
            addBotReply("Let's navigate to the contact section so you can get in touch with Sumit.", () => {
                scrollToSection('contact');
            });
            return;
        }
        if (cleanText.includes('home') || cleanText.includes('top') || cleanText.includes('start')) {
            addBotReply("Scrolling to the top!", () => {
                scrollToSection('home');
            });
            return;
        }

        // 3. Resume
        if (cleanText.includes('resume') || cleanText.includes('cv') || cleanText.includes('download')) {
            addBotReply("Downloading Sumit's resume now... 📄 Let me know if you have any questions about his background!", () => {
                const resumeBtn = document.querySelector('a[href="resume.pdf"]');
                if (resumeBtn) resumeBtn.click();
            });
            return;
        }

        // 4. Information about Sumit
        if (cleanText.includes('who is') || cleanText.includes('about') || cleanText.includes('sumit') || cleanText.includes('education') || cleanText.includes('background')) {
            addBotReply("Sumit Rathore is a Full Stack Developer and B.Tech CSE student (2023-27). He is passionate about building scalable web applications, RESTful APIs, and exploring AI-driven web experiences. He knows React, Node.js, Python, C++, and MongoDB!");
            return;
        }

        // 5. Greetings
        if (cleanText.includes('hello') || cleanText.includes('hi') || cleanText.includes('hey') || cleanText.includes('greetings')) {
            addBotReply("Hello! How can I help you explore Sumit's portfolio today? 😊");
            return;
        }

        // 6. Clear chat
        if (cleanText === 'clear') {
            lunaMessages.innerHTML = '';
            addBotReply("Chat history cleared! What can I help you with?");
            return;
        }

        // Default
        addBotReply("I'm here to help! You can ask me to:<br>• <strong>'Show React projects'</strong><br>• <strong>'Go to Skills'</strong><br>• <strong>'Download Resume'</strong><br>• <strong>'Go to Contact'</strong>");
    }

    // Scroll Helper
    function scrollToSection(id) {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Form Submission
    lunaInputForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = lunaInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        lunaInput.value = '';

        processUserText(text);
    });

    // Chip click handler
    lunaChips.addEventListener('click', function(e) {
        const chip = e.target.closest('.chip-btn');
        if (!chip) return;

        const text = chip.getAttribute('data-input');
        addUserMessage(text);
        processUserText(text);
    });

    // ---------- Sliding Nav Indicator ----------
    const navLinksContainer = document.getElementById('navLinks');
    const navIndicator = document.getElementById('navIndicator');

    function updateIndicator() {
        const activeLink = navLinksContainer.querySelector('.nav-link.active');
        if (activeLink && navIndicator) {
            const containerRect = navLinksContainer.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            
            navIndicator.style.opacity = '1';
            
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                navIndicator.style.left = '32px'; // Matching padding of vertical links
                navIndicator.style.width = 'calc(100% - 64px)';
                navIndicator.style.top = `${linkRect.top - containerRect.top}px`;
                navIndicator.style.height = `${linkRect.height}px`;
            } else {
                navIndicator.style.left = `${linkRect.left - containerRect.left}px`;
                navIndicator.style.width = `${linkRect.width}px`;
                navIndicator.style.top = `${linkRect.top - containerRect.top}px`;
                navIndicator.style.height = `${linkRect.height}px`;
            }
        } else if (navIndicator) {
            navIndicator.style.opacity = '0';
        }
    }

    // Set initial position and update on events
    setTimeout(updateIndicator, 500); // Small delay to let browser render
    window.addEventListener('scroll', updateIndicator);
    window.addEventListener('resize', updateIndicator);

    // Hover effect: slide indicator to hovered link, restore on leave
    navLinksAll.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!navIndicator) return;
            const containerRect = navLinksContainer.getBoundingClientRect();
            const linkRect = this.getBoundingClientRect();
            navIndicator.style.opacity = '1';
            
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                navIndicator.style.left = '32px';
                navIndicator.style.width = 'calc(100% - 64px)';
                navIndicator.style.top = `${linkRect.top - containerRect.top}px`;
                navIndicator.style.height = `${linkRect.height}px`;
            } else {
                navIndicator.style.left = `${linkRect.left - containerRect.left}px`;
                navIndicator.style.width = `${linkRect.width}px`;
                navIndicator.style.top = `${linkRect.top - containerRect.top}px`;
                navIndicator.style.height = `${linkRect.height}px`;
            }
        });
        link.addEventListener('mouseleave', updateIndicator);
    });

    // ---------- Magnetic Elements ----------
    const magneticElements = document.querySelectorAll('.social-link, .theme-toggle, .menu-toggle, .btn-primary, .btn-outline, .filter-btn');
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.03)`;
            this.style.transition = 'none';
        });
        elem.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ---------- 3D Tilt Cards ----------
    const tiltCards = document.querySelectorAll('.project-card, .skill-category, .stat-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees tilt
            const rotateY = ((x - centerX) / centerX) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            this.style.boxShadow = '0 30px 60px rgba(42, 125, 225, 0.18)';
            this.style.transition = 'none';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.transition = 'all 0.4s ease';
        });
    });

    // ---------- Console Greeting ----------
    console.log('%c🚀 Sumit\'s Portfolio', 'font-size: 24px; font-weight: bold; color: #2a7de1;');
    console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'font-size: 14px; color: #6c5ce7;');

});