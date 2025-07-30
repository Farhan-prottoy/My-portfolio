// Sticky Table of Contents with ScrollSpy (2025 Enhancement)
class StickyTableOfContents {
    constructor() {
        this.sections = [];
        this.currentSection = null;
        this.init();
    }

    init() {
        this.createTableOfContents();
        this.setupScrollSpy();
        this.setupEventListeners();
    }

    createTableOfContents() {
        const sections = document.querySelectorAll('section[id]');
        const tocContainer = document.createElement('div');
        tocContainer.className = 'sticky-toc';
        tocContainer.innerHTML = `
            <div class="toc-header">
                <i class="fas fa-list"></i>
                <span>Contents</span>
                <button class="toc-toggle" id="toc-toggle">
                    <i class="fas fa-chevron-up"></i>
                </button>
            </div>
            <nav class="toc-nav" id="toc-nav">
                <ul class="toc-list">
                    ${Array.from(sections).map(section => {
                        const title = this.getSectionTitle(section);
                        return `
                            <li class="toc-item">
                                <a href="#${section.id}" class="toc-link" data-section="${section.id}">
                                    <span class="toc-bullet"></span>
                                    <span class="toc-text">${title}</span>
                                </a>
                            </li>
                        `;
                    }).join('')}
                </ul>
                <div class="toc-progress">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
            </nav>
        `;

        document.body.appendChild(tocContainer);
        
        // Store sections for scroll spy
        this.sections = Array.from(sections).map(section => ({
            id: section.id,
            element: section,
            offset: section.getBoundingClientRect().top + window.pageYOffset
        }));
    }

    getSectionTitle(section) {
        const heading = section.querySelector('h1, h2, h3');
        if (heading) {
            return heading.textContent.trim();
        }
        
        // Fallback titles based on section ID
        const titles = {
            'home': 'Home',
            'about': 'About Me',
            'education': 'Education',
            'skills': 'Technical Skills',
            'projects': 'Projects',
            'contact': 'Contact'
        };
        
        return titles[section.id] || section.id.charAt(0).toUpperCase() + section.id.slice(1);
    }

    setupScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const tocLink = document.querySelector(`[data-section="${id}"]`);
                
                if (entry.isIntersecting) {
                    // Remove active from all links
                    document.querySelectorAll('.toc-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active to current link
                    if (tocLink) {
                        tocLink.classList.add('active');
                        this.currentSection = id;
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        });

        // Observe all sections
        this.sections.forEach(section => {
            observer.observe(section.element);
        });
    }

    setupEventListeners() {
        // Toggle TOC visibility
        const toggle = document.getElementById('toc-toggle');
        const nav = document.getElementById('toc-nav');
        let isExpanded = true;

        toggle.addEventListener('click', () => {
            isExpanded = !isExpanded;
            nav.classList.toggle('collapsed', !isExpanded);
            toggle.querySelector('i').className = isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        });

        // Smooth scroll for TOC links
        document.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update progress bar on scroll
        window.addEventListener('scroll', () => {
            this.updateProgressBar();
        });

        // Show/hide TOC based on scroll position
        window.addEventListener('scroll', () => {
            const toc = document.querySelector('.sticky-toc');
            const heroSection = document.getElementById('home');
            const heroHeight = heroSection ? heroSection.offsetHeight : 0;
            
            if (window.scrollY > heroHeight * 0.3) {
                toc.classList.add('visible');
            } else {
                toc.classList.remove('visible');
            }
        });
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / documentHeight) * 100;
        
        if (progressBar) {
            progressBar.style.height = `${Math.min(scrollProgress, 100)}%`;
        }
    }
}

// Sticky TOC Styles
const tocStyles = `
.sticky-toc {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(102, 126, 234, 0.2);
    border-radius: 15px;
    z-index: 1000;
    min-width: 200px;
    max-width: 250px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-50%) translateX(100%);
}

.sticky-toc.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(0);
}

.toc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px 15px 0 0;
    font-weight: 600;
    font-size: 0.9rem;
}

.toc-header i {
    margin-right: 8px;
}

.toc-toggle {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.toc-toggle:hover {
    background: rgba(255, 255, 255, 0.2);
}

.toc-nav {
    max-height: 400px;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.toc-nav.collapsed {
    max-height: 0;
}

.toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.toc-item {
    border-bottom: 1px solid rgba(102, 126, 234, 0.1);
}

.toc-item:last-child {
    border-bottom: none;
}

.toc-link {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    position: relative;
}

.toc-link:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
}

.toc-link.active {
    background: rgba(102, 126, 234, 0.15);
    color: #667eea;
    font-weight: 600;
}

.toc-link.active .toc-bullet {
    background: #667eea;
    transform: scale(1.2);
}

.toc-bullet {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ccc;
    margin-right: 12px;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.toc-text {
    line-height: 1.3;
}

.toc-progress {
    position: relative;
    width: 4px;
    height: 100px;
    background: rgba(102, 126, 234, 0.1);
    margin: 15px auto;
    border-radius: 2px;
    overflow: hidden;
}

.progress-bar {
    width: 100%;
    height: 0%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    transition: height 0.1s ease;
}

/* Dark theme support */
[data-theme="dark"] .sticky-toc {
    background: rgba(26, 26, 46, 0.95);
    border-color: rgba(102, 126, 234, 0.3);
}

[data-theme="dark"] .toc-link {
    color: #ffffff;
}

[data-theme="dark"] .toc-link:hover {
    background: rgba(102, 126, 234, 0.2);
}

[data-theme="dark"] .toc-item {
    border-bottom-color: rgba(102, 126, 234, 0.2);
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
    .sticky-toc {
        right: 15px;
        min-width: 180px;
    }
}

@media (max-width: 768px) {
    .sticky-toc {
        display: none; /* Hide on mobile to avoid clutter */
    }
}

/* Hover effects */
.sticky-toc:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-50%) translateX(0) scale(1.02);
}

/* Animation for entry */
@keyframes slideInFromRight {
    from {
        transform: translateY(-50%) translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateY(-50%) translateX(0);
        opacity: 1;
    }
}

.sticky-toc.visible {
    animation: slideInFromRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
`;

// Add styles to document
const tocStyleSheet = document.createElement('style');
tocStyleSheet.textContent = tocStyles;
document.head.appendChild(tocStyleSheet);

// Initialize TOC when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StickyTableOfContents();
});
