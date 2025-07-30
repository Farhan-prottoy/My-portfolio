// Tech Stack Badges with Icons (2025 Enhancement)
class TechBadges {
    constructor() {
        this.techStack = {
            'Python': { icon: 'fab fa-python', color: '#3776ab', category: 'programming' },
            'C': { icon: 'fas fa-code', color: '#00599C', category: 'programming' },
            'C++': { icon: 'fas fa-code', color: '#00599C', category: 'programming' },
            'JavaScript': { icon: 'fab fa-js-square', color: '#f7df1e', category: 'programming' },
            'HTML': { icon: 'fab fa-html5', color: '#e34f26', category: 'web' },
            'CSS': { icon: 'fab fa-css3-alt', color: '#1572b6', category: 'web' },
            'React': { icon: 'fab fa-react', color: '#61dafb', category: 'web' },
            'MATLAB': { icon: 'fas fa-calculator', color: '#ff8c00', category: 'tools' },
            'TensorFlow': { icon: 'fas fa-brain', color: '#ff6f00', category: 'ml' },
            'PyTorch': { icon: 'fas fa-fire', color: '#ee4c2c', category: 'ml' },
            'Arduino': { icon: 'fas fa-microchip', color: '#00979d', category: 'embedded' },
            'ESP32': { icon: 'fas fa-wifi', color: '#e94b3c', category: 'embedded' },
            'NumPy': { icon: 'fas fa-chart-line', color: '#013243', category: 'ml' },
            'Pandas': { icon: 'fas fa-table', color: '#150458', category: 'ml' },
            'OpenCV': { icon: 'fas fa-eye', color: '#5c3ee8', category: 'ml' },
            'AutoCAD': { icon: 'fas fa-drafting-compass', color: '#ee3124', category: 'design' },
            'Git': { icon: 'fab fa-git-alt', color: '#f05032', category: 'tools' },
            'GitHub': { icon: 'fab fa-github', color: '#181717', category: 'tools' }
        };
        this.init();
    }

    init() {
        this.enhanceSkillTags();
        this.createFloatingBadges();
        this.addHoverEffects();
    }

    enhanceSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            const techName = tag.textContent.trim();
            const tech = this.findTech(techName);
            
            if (tech) {
                tag.innerHTML = `
                    <i class="${tech.icon}" style="color: ${tech.color}; margin-right: 8px;"></i>
                    <span>${techName}</span>
                `;
                tag.style.border = `2px solid ${tech.color}20`;
                tag.classList.add('enhanced-skill-tag');
                
                // Add hover effect
                tag.addEventListener('mouseenter', () => {
                    tag.style.background = `${tech.color}20`;
                    tag.style.borderColor = tech.color;
                    tag.style.transform = 'translateY(-2px) scale(1.05)';
                });
                
                tag.addEventListener('mouseleave', () => {
                    tag.style.background = '';
                    tag.style.borderColor = `${tech.color}20`;
                    tag.style.transform = '';
                });
            }
        });
    }

    findTech(name) {
        // Direct match
        if (this.techStack[name]) return this.techStack[name];
        
        // Fuzzy match for variations
        const lowerName = name.toLowerCase();
        for (const [key, value] of Object.entries(this.techStack)) {
            if (key.toLowerCase().includes(lowerName) || lowerName.includes(key.toLowerCase())) {
                return value;
            }
        }
        
        // Default for competitive programming platforms
        if (lowerName.includes('codeforces') || lowerName.includes('codechef') || lowerName.includes('leetcode')) {
            return { icon: 'fas fa-trophy', color: '#ffd700', category: 'competitive' };
        }
        
        return null;
    }

    createFloatingBadges() {
        const heroSection = document.querySelector('.hero');
        const badgeContainer = document.createElement('div');
        badgeContainer.className = 'floating-tech-badges';
        
        // Select key technologies for floating animation
        const keyTechs = ['Python', 'JavaScript', 'React', 'TensorFlow', 'Arduino', 'MATLAB'];
        
        keyTechs.forEach((techName, index) => {
            const tech = this.techStack[techName];
            if (tech) {
                const badge = document.createElement('div');
                badge.className = 'floating-badge';
                badge.innerHTML = `<i class="${tech.icon}"></i>`;
                badge.style.color = tech.color;
                badge.style.animationDelay = `${index * 0.5}s`;
                badgeContainer.appendChild(badge);
            }
        });
        
        heroSection.appendChild(badgeContainer);
    }

    addHoverEffects() {
        // Add pulse effect to project icons
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const icon = card.querySelector('.project-icon i');
            if (icon) {
                card.addEventListener('mouseenter', () => {
                    icon.style.animation = 'pulse 0.6s ease-in-out';
                });
                
                card.addEventListener('mouseleave', () => {
                    icon.style.animation = '';
                });
            }
        });
    }
}

// Tech Badge Animations
const techBadgeStyles = `
.enhanced-skill-tag {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.enhanced-skill-tag::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
}

.enhanced-skill-tag:hover::before {
    left: 100%;
}

.floating-tech-badges {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.floating-badge {
    position: absolute;
    font-size: 2rem;
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
}

.floating-badge:nth-child(1) { top: 20%; left: 10%; animation-duration: 7s; }
.floating-badge:nth-child(2) { top: 50%; left: 85%; animation-duration: 8s; }
.floating-badge:nth-child(3) { top: 70%; left: 15%; animation-duration: 6s; }
.floating-badge:nth-child(4) { top: 30%; left: 70%; animation-duration: 9s; }
.floating-badge:nth-child(5) { top: 80%; left: 60%; animation-duration: 7s; }
.floating-badge:nth-child(6) { top: 15%; left: 50%; animation-duration: 8s; }

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-20px) rotate(5deg); }
    50% { transform: translateY(-10px) rotate(-5deg); }
    75% { transform: translateY(-15px) rotate(3deg); }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

/* Dark theme support for tech badges */
[data-theme="dark"] .enhanced-skill-tag {
    border-color: var(--accent-color, #667eea) !important;
    color: var(--text-color, #ffffff);
}

[data-theme="dark"] .floating-badge {
    opacity: 0.15;
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = techBadgeStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TechBadges();
});
