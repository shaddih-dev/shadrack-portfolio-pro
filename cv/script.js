// ============================================
// CV Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Theme Toggle
    // ============================================
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('cv-theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        let theme = 'light';
        if (body.classList.contains('dark-theme')) {
            theme = 'dark';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('cv-theme', theme);
        
        // Add smooth transition effect
        body.style.transition = 'all 0.3s ease';
    });
    
    // ============================================
    // Print Functionality
    // ============================================
    
    const printBtn = document.getElementById('printBtn');
    
    printBtn.addEventListener('click', function() {
        // Remove dark theme temporarily for printing
        const wasDarkTheme = body.classList.contains('dark-theme');
        
        if (wasDarkTheme) {
            body.classList.remove('dark-theme');
        }
        
        // Trigger print dialog
        window.print();
        
        // Restore dark theme if it was active
        if (wasDarkTheme) {
            body.classList.add('dark-theme');
        }
    });
    
    // ============================================
    // PDF Download (using browser print-to-PDF)
    // ============================================
    
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', function() {
        // Show instruction modal or toast
        showDownloadInstructions();
        
        // Small delay before triggering print
        setTimeout(() => {
            // Remove dark theme temporarily for PDF
            const wasDarkTheme = body.classList.contains('dark-theme');
            
            if (wasDarkTheme) {
                body.classList.remove('dark-theme');
            }
            
            // Trigger print dialog
            window.print();
            
            // Restore dark theme if it was active
            if (wasDarkTheme) {
                body.classList.add('dark-theme');
            }
        }, 100);
    });
    
    // ============================================
    // Download Instructions Toast
    // ============================================
    
    function showDownloadInstructions() {
        // Check if toast already exists
        let existingToast = document.querySelector('.download-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'download-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-info-circle"></i>
                <span>In the print dialog, select "Save as PDF" as the destination</span>
            </div>
        `;
        
        // Add styles
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #2563eb, #7c3aed);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInUp 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(toast);
        
        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .toast-content i {
            font-size: 1.25rem;
            flex-shrink: 0;
        }
        
        @media (max-width: 640px) {
            .download-toast {
                bottom: 1rem;
                right: 1rem;
                left: 1rem;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // Smooth Scroll for Internal Links
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ============================================
    // Animate Sections on Scroll
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all CV sections
    document.querySelectorAll('.cv-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // ============================================
    // Skill Tag Interactions
    // ============================================
    
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s ease;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ============================================
    // Print Event Listeners
    // ============================================
    
    // Before print - optimize for printing
    window.addEventListener('beforeprint', function() {
        console.log('Preparing CV for print...');
        // Could add any pre-print optimizations here
    });
    
    // After print - restore interactive features
    window.addEventListener('afterprint', function() {
        console.log('Print completed or cancelled');
    });
    
    // ============================================
    // Keyboard Shortcuts
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + P for print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            printBtn.click();
        }
        
        // Ctrl/Cmd + D for download
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            downloadBtn.click();
        }
        
        // Ctrl/Cmd + Shift + T for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeToggle.click();
        }
    });
    
    // ============================================
    // Contact Link Tracking (optional analytics)
    // ============================================
    
    document.querySelectorAll('.contact-item a, .social-links a').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Contact link clicked:', this.href);
            // Could integrate with analytics here
        });
    });
    
    // ============================================
    // Performance Monitoring
    // ============================================
    
    window.addEventListener('load', function() {
        // Log page load performance
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('CV loaded in:', pageLoadTime + 'ms');
        }
    });
    
    // ============================================
    // Initial Fade-In Animation
    // ============================================
    
    setTimeout(() => {
        document.querySelector('.cv-container').style.opacity = '1';
        document.querySelector('.cv-container').style.transform = 'translateY(0)';
    }, 100);
    
    // Set initial state
    const cvContainer = document.querySelector('.cv-container');
    cvContainer.style.opacity = '0';
    cvContainer.style.transform = 'translateY(20px)';
    cvContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
});

// ============================================
// Service Worker Registration (for offline support - optional)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below to enable offline support
        // navigator.serviceWorker.register('/cv/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
