// ====================================
// MAIN JAVASCRIPT
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initScrollEffects();
    initProjectModals();
    initContactForm();
});

// ====================================
// NAVIGATION
// ====================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
        
        // Navbar shadow on scroll
        const navbar = document.querySelector('.navbar');
        if (scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// ====================================
// THEME TOGGLE
// ====================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Toggle theme
    themeToggle?.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ====================================
// SCROLL EFFECTS
// ====================================

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.project-card, .blog-card-large, .blog-card-small, .skill-category, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ====================================
// PROJECT MODALS
// ====================================

function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');
    
    const projects = {
        'api-integration': {
            title: 'API Integration Platform',
            status: 'Development in Progress',
            description: 'Building a comprehensive platform to automate and synchronize data flows between multiple SaaS applications.',
            features: [
                'Pre-built connectors for popular SaaS apps (Salesforce, HubSpot, Stripe, etc.)',
                'Visual data mapping interface with drag-and-drop',
                'Real-time data synchronization with conflict resolution',
                'Webhook management and event-driven architecture',
                'OAuth2 authentication with secure token management',
                'Monitoring dashboard with analytics and logs'
            ],
            technologies: ['Spring Boot', 'Apache Kafka', 'PostgreSQL', 'Redis', 'React', 'OAuth2', 'Docker', 'Traefik'],
            challenges: [
                'Ensuring data consistency across distributed systems',
                'Handling rate limits from various APIs',
                'Building a scalable message queue architecture',
                'Implementing secure authentication flows'
            ],
            outcomes: [
                '70% reduction in manual data entry tasks',
                'Support for 15+ SaaS integrations',
                'Processing 100K+ events daily',
                'Sub-second latency for most operations'
            ]
        },
        'rentable': {
            title: 'Rentable Platform - P2P Marketplace',
            status: 'Live in Production',
            description: 'A peer-to-peer marketplace enabling users to rent out their items or find things to rent nearby.',
            features: [
                'User authentication with JWT and session management',
                'Item listing with image upload to MinIO object storage',
                'Stripe payment integration with escrow system',
                'Real-time messaging between renters and owners',
                'Rating and review system',
                'Email notifications for bookings and messages'
            ],
            technologies: ['Express.js', 'React', 'MongoDB', 'MinIO', 'Stripe API', 'Nodemailer', 'Redis', 'Socket.io'],
            challenges: [
                'Implementing secure payment flows with Stripe',
                'Managing transaction states and refunds',
                'Optimizing image storage and delivery',
                'Building real-time chat with message persistence'
            ],
            outcomes: [
                '500+ active users',
                '1000+ items listed',
                '$50K+ in transactions processed',
                '4.5/5 average user rating'
            ]
        },
        'chat': {
            title: 'Live Chat Application',
            status: 'Live in Production',
            description: 'Scalable real-time messaging application supporting thousands of concurrent users.',
            features: [
                'Real-time messaging with WebSocket connections',
                'Public and private chat rooms',
                'Message history with pagination',
                'Online/offline presence indicators',
                'File and image sharing',
                'Message reactions and threading'
            ],
            technologies: ['Spring Boot', 'Spring Cloud', 'Kafka', 'WebSockets', 'Redis', 'PostgreSQL', 'React', 'Docker'],
            challenges: [
                'Scaling WebSocket connections across multiple servers',
                'Message ordering and delivery guarantees',
                'Handling connection failures and reconnection',
                'Optimizing message storage and retrieval'
            ],
            outcomes: [
                '10,000+ concurrent connections',
                '< 50ms message latency',
                '99.9% uptime',
                '1M+ messages processed daily'
            ]
        },
        'events': {
            title: 'Academic Event Management Platform',
            status: 'Production',
            description: 'Comprehensive platform for managing all academic events at EHTP university.',
            features: [
                'Event creation with custom registration forms',
                'QR code-based check-in system',
                'Automated certificate generation',
                'Email campaigns and notifications',
                'Analytics dashboard for organizers',
                'Integration with university calendar'
            ],
            technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'PDF Generation', 'Email Service'],
            challenges: [
                'Handling registration spikes during popular events',
                'Generating unique certificates at scale',
                'Building a flexible form builder',
                'Ensuring data privacy compliance'
            ],
            outcomes: [
                '2,000+ active users',
                '50+ events managed per year',
                '80% reduction in administrative time',
                '95% attendee satisfaction rate'
            ]
        }
    };
    
    // Open modal
    document.querySelectorAll('.btn-project-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            const projectId = projectCard.getAttribute('data-project');
            showProjectModal(projects[projectId]);
        });
    });
    
    function showProjectModal(project) {
        if (!project) return;
        
        modalBody.innerHTML = `
            <div class="project-modal-content">
                <h2>${project.title}</h2>
                <span class="project-status ${project.status.includes('Progress') ? 'status-progress' : 'status-live'}">
                    ${project.status}
                </span>
                
                <div class="modal-section">
                    <h3><i class="fas fa-info-circle"></i> Overview</h3>
                    <p>${project.description}</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-star"></i> Key Features</h3>
                    <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-code"></i> Technologies</h3>
                    <div class="tech-badges">
                        ${project.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-mountain"></i> Technical Challenges</h3>
                    <ul>${project.challenges.map(c => `<li>${c}</li>`).join('')}</ul>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-trophy"></i> Results & Impact</h3>
                    <ul>${project.outcomes.map(o => `<li>${o}</li>`).join('')}</ul>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ====================================
// CONTACT FORM
// ====================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const mailtoLink = `mailto:lahcenbenhaddou282@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        // Reset form
        form.reset();
        
        // Show success message
        showNotification('Your email client will open. Thank you for reaching out!');
    });
}

// ====================================
// NOTIFICATION SYSTEM
// ====================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ====================================
// SMOOTH SCROLL
// ====================================

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

console.log('✨ Portfolio loaded successfully!');
