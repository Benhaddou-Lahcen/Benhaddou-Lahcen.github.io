// Project Details Modal System
class ProjectModal {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.modalBody = document.getElementById('modalBody');
        this.closeBtn = document.querySelector('.modal-close');
        this.projects = this.getProjectData();
        
        this.init();
    }
    
    init() {
        // Add click listeners to all detail buttons
        document.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectCard = e.target.closest('.project-card');
                const projectId = projectCard.getAttribute('data-project');
                this.showProject(projectId);
            });
        });
        
        // Close modal events
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }
    
    getProjectData() {
        return {
            'api-integration': {
                title: 'API Integration Platform',
                status: 'Development in Progress',
                description: 'Building a comprehensive platform to automate and synchronize data flows between multiple SaaS applications with pre-built connectors and flexible data mapping.',
                features: [
                    'Pre-built connectors for popular SaaS applications',
                    'Flexible and intuitive data mapping system',
                    'Automatic error handling and retry mechanisms',
                    'Real-time monitoring of data flows',
                    'RESTful API for custom integrations',
                    'Secure OAuth2 authentication'
                ],
                technologies: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'React', 'OAuth2', 'Docker', 'Traefik'],
                challenges: [
                    'Managing data consistency across systems',
                    'Performance optimization for high volumes',
                    'Building a scalable microservices architecture'
                ],
                outcomes: [
                    '70% reduction in synchronization time',
                    'Highly available microservices architecture',
                    'Support for 10+ SaaS integrations'
                ]
            },
            'rentable': {
                title: 'Rentable Platform - P2P Marketplace',
                status: 'Production',
                description: 'Innovative peer-to-peer marketplace enabling users to rent or list their items with a secure payment system built on microservices architecture.',
                features: [
                    'Complete authentication and authorization system',
                    'Listing management with image upload (MinIO)',
                    'Secure payment integration with Stripe',
                    'Real-time messaging system',
                    'Automated email notifications',
                    'User rating and review system'
                ],
                technologies: ['Express.js', 'React', 'MongoDB', 'MinIO', 'Stripe API', 'Nodemailer', 'Redis'],
                challenges: [
                    'Implementing secure payment processing',
                    'Managing transactions and escrows',
                    'Optimizing image storage and delivery'
                ],
                outcomes: [
                    '500+ active users',
                    '25% conversion rate',
                    'Page load time < 2 seconds'
                ]
            },
            'chat': {
                title: 'Live Chat Application',
                status: 'Production',
                description: 'Scalable real-time messaging application using WebSockets and Kafka to support thousands of concurrent users with persistent message history.',
                features: [
                    'Real-time messaging with WebSockets',
                    'Private and public chat rooms',
                    'Persistent message history',
                    'Online presence indicators',
                    'Push notifications',
                    'File and media sharing'
                ],
                technologies: ['Spring Boot', 'Spring Cloud', 'Kafka', 'WebSockets', 'Redis', 'React', 'Docker', 'Cloudflare CDN'],
                challenges: [
                    'Horizontal scalability with Kafka',
                    'Real-time message synchronization',
                    'Managing user connections/disconnections'
                ],
                outcomes: [
                    'Support for 10,000+ concurrent connections',
                    'Average latency < 50ms',
                    '99.9% uptime'
                ]
            },
            'events': {
                title: 'Web Application for Academic Event Management',
                status: 'Production',
                description: 'Full-stack development of a microservices-based web platform for managing academic events at EHTP including conferences, workshops, and ceremonies.',
                features: [
                    'Event creation and management',
                    'Registration and ticketing system',
                    'Speaker and program management',
                    'Automatic certificate generation',
                    'Analytics dashboard',
                    'Feedback and evaluation system'
                ],
                technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'Microservices', 'PDF Generation'],
                challenges: [
                    'Microservices architecture for modularity',
                    'Handling peak loads during registrations',
                    'Dynamic PDF document generation'
                ],
                outcomes: [
                    'Used by 2,000+ students',
                    'Managing 50+ events per year',
                    '80% reduction in administrative time'
                ]
            }
        };
    }
    
    showProject(projectId) {
        const project = this.projects[projectId];
        if (!project) return;
        
        this.modalBody.innerHTML = `
            <div class="project-details">
                <div class="project-header-modal">
                    <h2>${project.title}</h2>
                    <span class="project-status">${project.status}</span>
                </div>
                
                <div class="project-section">
                    <h3><i class="fas fa-info-circle"></i> Description</h3>
                    <p>${project.description}</p>
                </div>
                
                <div class="project-section">
                    <h3><i class="fas fa-star"></i> Key Features</h3>
                    <ul class="feature-list">
                        ${project.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-section">
                    <h3><i class="fas fa-code"></i> Technologies Used</h3>
                    <div class="tech-stack">
                        ${project.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-section">
                    <h3><i class="fas fa-mountain"></i> Technical Challenges</h3>
                    <ul class="challenge-list">
                        ${project.challenges.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-section">
                    <h3><i class="fas fa-trophy"></i> Results & Impact</h3>
                    <ul class="outcome-list">
                        ${project.outcomes.map(o => `<li>${o}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ProjectModal();
});
