// ============================================
// DYNAMIC CONTENT LOADER
// Loads all extended content from JSON files
// Makes everything clickable and interactive
// ============================================

class PortfolioContentLoader {
    constructor() {
        this.extendedContent = null;
        this.projects = null;
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.renderInitialContent();
    }

    async loadData() {
        try {
            // Load extended content
            const extendedResponse = await fetch('/data/extended-content.json');
            this.extendedContent = await extendedResponse.json();

            // Load projects
            const projectsResponse = await fetch('/data/projects.json');
            this.projects = await projectsResponse.json();

            console.log('✅ Content loaded successfully!');
        } catch (error) {
            console.error('Error loading content:', error);
            // Use fallback mock data if files not found
            this.loadMockData();
        }
    }

    loadMockData() {
        console.log('📦 Loading mock data...');
        this.extendedContent = {
            certifications: [],
            achievements: [],
            workExperience: [],
            blogPosts: [],
            services: [],
            faqs: [],
            tools: {},
            extendedStats: {}
        };
        this.projects = { projects: [], testimonials: [], skills: {}, statistics: {} };
    }

    setupEventListeners() {
        // Project card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.project-card')) {
                const projectId = e.target.closest('.project-card').dataset.projectId;
                this.showProjectModal(projectId);
            }

            // Service card clicks
            if (e.target.closest('.service-card')) {
                const serviceId = e.target.closest('.service-card').dataset.serviceId;
                this.showServiceModal(serviceId);
            }

            // Blog post clicks
            if (e.target.closest('.blog-card')) {
                const postId = e.target.closest('.blog-card').dataset.postId;
                this.showBlogModal(postId);
            }

            // Certification clicks
            if (e.target.closest('.cert-card')) {
                const certId = e.target.closest('.cert-card').dataset.certId;
                this.showCertificationModal(certId);
            }

            // FAQ clicks
            if (e.target.closest('.faq-item')) {
                e.target.closest('.faq-item').classList.toggle('active');
            }

            // Close modal
            if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
                this.closeModal();
            }
        });
    }

    renderInitialContent() {
        this.renderCertifications();
        this.renderAchievements();
        this.renderWorkExperience();
        this.renderBlogPosts();
        this.renderServices();
        this.renderFAQs();
        this.renderTools();
        this.updateStats();
    }

    // ========== CERTIFICATIONS ==========
    renderCertifications() {
        const container = document.getElementById('certifications-container');
        if (!container || !this.extendedContent.certifications) return;

        const html = this.extendedContent.certifications.map(cert => `
            <div class="cert-card" data-cert-id="${cert.id}" data-aos="fade-up">
                <div class="cert-badge">
                    <i class="fas fa-certificate"></i>
                </div>
                <h3>${cert.name}</h3>
                <p class="cert-issuer">${cert.issuer}</p>
                <p class="cert-date">${this.formatDate(cert.date)}</p>
                <div class="cert-skills">
                    ${cert.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <button class="btn-view-cert">View Details</button>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    showCertificationModal(certId) {
        const cert = this.extendedContent.certifications.find(c => c.id == certId);
        if (!cert) return;

        const modal = `
            <div class="modal active" id="certModal">
                <div class="modal-content cert-modal">
                    <span class="modal-close">&times;</span>
                    <div class="cert-header">
                        <div class="cert-icon">
                            <i class="fas fa-award"></i>
                        </div>
                        <h2>${cert.name}</h2>
                        <p class="cert-issuer-large">${cert.issuer}</p>
                    </div>
                    <div class="cert-body">
                        <div class="cert-info">
                            <div class="info-item">
                                <i class="fas fa-calendar"></i>
                                <span>Issued: ${this.formatDate(cert.date)}</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-id-card"></i>
                                <span>ID: ${cert.credentialId}</span>
                            </div>
                        </div>
                        <p class="cert-description">${cert.description}</p>
                        <div class="cert-skills-modal">
                            <h4>Skills Covered:</h4>
                            ${cert.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                        </div>
                        <a href="${cert.verifyUrl}" target="_blank" class="btn-verify">
                            <i class="fas fa-check-circle"></i> Verify Credential
                        </a>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modal);
    }

    // ========== ACHIEVEMENTS ==========
    renderAchievements() {
        const container = document.getElementById('achievements-container');
        if (!container || !this.extendedContent.achievements) return;

        const html = this.extendedContent.achievements.map(achievement => `
            <div class="achievement-card" data-aos="zoom-in">
                <div class="achievement-icon">${achievement.icon}</div>
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <div class="achievement-stats">
                    <div class="stat">
                        <strong>${achievement.metric}</strong>
                        <span>Metric</span>
                    </div>
                    <div class="stat">
                        <strong>${achievement.impact}</strong>
                        <span>Impact</span>
                    </div>
                </div>
                <span class="achievement-date">${achievement.date}</span>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    // ========== WORK EXPERIENCE ==========
    renderWorkExperience() {
        const container = document.getElementById('experience-container');
        if (!container || !this.extendedContent.workExperience) return;

        const html = this.extendedContent.workExperience.map((job, index) => `
            <div class="experience-item" data-aos="fade-right" data-aos-delay="${index * 100}">
                <div class="timeline-marker ${job.current ? 'current' : ''}"></div>
                <div class="experience-content">
                    <div class="experience-header">
                        <div>
                            <h3>${job.position}</h3>
                            <p class="company">${job.company} · ${job.type}</p>
                        </div>
                        <div class="date-range">
                            ${this.formatDate(job.startDate)} - ${job.current ? 'Present' : this.formatDate(job.endDate)}
                        </div>
                    </div>
                    <p class="experience-description">${job.description}</p>
                    
                    <div class="experience-section">
                        <h4><i class="fas fa-tasks"></i> Key Responsibilities:</h4>
                        <ul>
                            ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="experience-section">
                        <h4><i class="fas fa-trophy"></i> Achievements:</h4>
                        <ul class="achievements-list">
                            ${job.achievements.map(ach => `<li>${ach}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="experience-technologies">
                        ${job.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    // ========== BLOG POSTS ==========
    renderBlogPosts() {
        const container = document.getElementById('blog-container');
        if (!container || !this.extendedContent.blogPosts) return;

        const featuredPosts = this.extendedContent.blogPosts.filter(post => post.featured);
        const html = featuredPosts.map(post => `
            <article class="blog-card" data-post-id="${post.id}" data-aos="fade-up">
                <div class="blog-image" style="background: linear-gradient(135deg, #0066ff, #00ff88);">
                    <span class="blog-category">${post.category}</span>
                </div>
                <div class="blog-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(post.publishDate)}</span>
                        <span><i class="fas fa-clock"></i> ${post.readTime}</span>
                        <span><i class="fas fa-eye"></i> ${post.views} views</span>
                    </div>
                    <div class="blog-tags">
                        ${post.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <button class="btn-read-more">Read More →</button>
                </div>
            </article>
        `).join('');

        container.innerHTML = html;
    }

    showBlogModal(postId) {
        const post = this.extendedContent.blogPosts.find(p => p.id == postId);
        if (!post) return;

        const modal = `
            <div class="modal active" id="blogModal">
                <div class="modal-content blog-modal">
                    <span class="modal-close">&times;</span>
                    <article class="blog-article">
                        <header class="blog-header">
                            <span class="blog-category-badge">${post.category}</span>
                            <h1>${post.title}</h1>
                            <div class="blog-meta-header">
                                <span><i class="fas fa-user"></i> ${post.author}</span>
                                <span><i class="fas fa-calendar"></i> ${this.formatDate(post.publishDate)}</span>
                                <span><i class="fas fa-clock"></i> ${post.readTime} read</span>
                            </div>
                            <div class="blog-stats">
                                <span><i class="fas fa-eye"></i> ${post.views} views</span>
                                <span><i class="fas fa-heart"></i> ${post.likes} likes</span>
                            </div>
                        </header>
                        <div class="blog-content-full">
                            <p>${post.content}</p>
                            <p>This is a placeholder article. Full content would be loaded here with formatting, images, code snippets, and more.</p>
                        </div>
                        <div class="blog-tags-full">
                            ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                        </div>
                    </article>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modal);
    }

    // ========== SERVICES ==========
    renderServices() {
        const container = document.getElementById('services-container');
        if (!container || !this.extendedContent.services) return;

        const html = this.extendedContent.services.map(service => `
            <div class="service-card ${service.category}" data-service-id="${service.id}" data-aos="flip-left">
                <div class="service-icon">${service.icon}</div>
                <h3>${service.name}</h3>
                <p>${service.shortDescription}</p>
                <div class="service-pricing">
                    <span class="price-from">From ${service.pricing.basic.price}</span>
                    <span class="duration">${service.pricing.basic.duration}</span>
                </div>
                <button class="btn-service-details">View Details →</button>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    showServiceModal(serviceId) {
        const service = this.extendedContent.services.find(s => s.id == serviceId);
        if (!service) return;

        const modal = `
            <div class="modal active" id="serviceModal">
                <div class="modal-content service-modal">
                    <span class="modal-close">&times;</span>
                    <div class="service-header">
                        <div class="service-icon-large">${service.icon}</div>
                        <h2>${service.name}</h2>
                        <p class="service-category-badge">${service.category}</p>
                    </div>
                    <div class="service-body">
                        <p class="service-description-full">${service.fullDescription}</p>
                        
                        <div class="service-section">
                            <h3><i class="fas fa-check-circle"></i> Features</h3>
                            <ul class="features-list">
                                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="service-section">
                            <h3><i class="fas fa-box"></i> Deliverables</h3>
                            <ul class="deliverables-list">
                                ${service.deliverables.map(del => `<li>${del}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="pricing-tiers">
                            <h3><i class="fas fa-dollar-sign"></i> Pricing Options</h3>
                            <div class="tiers-grid">
                                ${Object.entries(service.pricing).map(([tier, details]) => `
                                    <div class="pricing-tier ${tier}">
                                        <h4>${tier.charAt(0).toUpperCase() + tier.slice(1)}</h4>
                                        <div class="price-large">${details.price}</div>
                                        <p class="duration">${details.duration}</p>
                                        <p class="tier-description">${details.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="service-section">
                            <h3><i class="fas fa-list"></i> Process</h3>
                            <ol class="process-steps">
                                ${service.processSteps.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>

                        <a href="#contact" class="btn-get-started">Get Started →</a>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modal);
    }

    // ========== FAQs ==========
    renderFAQs() {
        const container = document.getElementById('faq-container');
        if (!container || !this.extendedContent.faqs) return;

        // Group by category
        const categories = {};
        this.extendedContent.faqs.forEach(faq => {
            if (!categories[faq.category]) {
                categories[faq.category] = [];
            }
            categories[faq.category].push(faq);
        });

        const html = Object.entries(categories).map(([category, faqs]) => `
            <div class="faq-category" data-aos="fade-up">
                <h3 class="faq-category-title">
                    <i class="fas fa-folder"></i> ${category}
                </h3>
                <div class="faq-items">
                    ${faqs.map(faq => `
                        <div class="faq-item">
                            <div class="faq-question">
                                <span>${faq.question}</span>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="faq-answer">
                                <p>${faq.answer}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    // ========== TOOLS ==========
    renderTools() {
        const container = document.getElementById('tools-container');
        if (!container || !this.extendedContent.tools) return;

        const html = Object.entries(this.extendedContent.tools).map(([category, tools]) => `
            <div class="tools-category" data-aos="fade-up">
                <h3>${this.formatToolCategory(category)}</h3>
                <div class="tools-grid">
                    ${tools.map(tool => `
                        <div class="tool-item">
                            <i class="fas fa-check"></i>
                            <span>${tool}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    // ========== PROJECT MODAL ==========
    showProjectModal(projectId) {
        const project = this.projects.projects.find(p => p.id == projectId);
        if (!project) return;

        const modal = `
            <div class="modal active" id="projectModal">
                <div class="modal-content project-modal">
                    <span class="modal-close">&times;</span>
                    <div class="project-header">
                        <h2>${project.title}</h2>
                        <div class="project-meta">
                            <span class="project-year">${project.year}</span>
                            <span class="project-client">${project.client}</span>
                            <span class="project-duration">${project.duration}</span>
                        </div>
                    </div>
                    <div class="project-body">
                        <p class="project-description-full">${project.fullDescription}</p>
                        
                        <div class="project-section">
                            <h3><i class="fas fa-star"></i> Key Features</h3>
                            <ul class="features-list">
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="project-section">
                            <h3><i class="fas fa-code"></i> Technologies Used</h3>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                            </div>
                        </div>

                        <div class="project-metrics">
                            <h3><i class="fas fa-chart-line"></i> Results & Metrics</h3>
                            <div class="metrics-grid">
                                ${Object.entries(project.metrics).map(([key, value]) => `
                                    <div class="metric-card">
                                        <div class="metric-value">${value}</div>
                                        <div class="metric-label">${this.formatMetricLabel(key)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="project-links">
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn-project-link"><i class="fas fa-external-link-alt"></i> View Live</a>` : ''}
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn-project-link"><i class="fab fa-github"></i> View Code</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modal);
    }

    // ========== STATS UPDATE ==========
    updateStats() {
        if (!this.extendedContent.extendedStats) return;

        const stats = this.extendedContent.extendedStats;
        Object.entries(stats).forEach(([key, value]) => {
            const element = document.querySelector(`[data-stat="${key}"]`);
            if (element) {
                element.textContent = value;
            }
        });
    }

    // ========== UTILITIES ==========
    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.add('fade-out');
            setTimeout(() => modal.remove(), 300);
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    formatToolCategory(category) {
        return category.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    formatMetricLabel(key) {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioLoader = new PortfolioContentLoader();
    console.log('🚀 Portfolio Content Loader Initialized!');
});