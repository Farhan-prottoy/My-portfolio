// Particle animation for hero section
class Particle {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Default options
        this.options = {
            count: 50,
            color: '#ffffff',
            maxSpeed: 0.5,
            minSpeed: 0.1,
            maxSize: 3,
            minSize: 1,
            connectDistance: 100,
            interactive: true,
            ...options
        };
        
        this.particles = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };
        
        this.initParticles();
        this.initEvents();
        
        window.requestAnimationFrame(this.animate.bind(this));
    }
    
    initParticles() {
        const { count, maxSize, minSize, maxSpeed, minSpeed } = this.options;
        
        for (let i = 0; i < count; i++) {
            const size = Math.random() * (maxSize - minSize) + minSize;
            
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: size,
                speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
                speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    initEvents() {
        if (this.options.interactive) {
            this.canvas.addEventListener('mousemove', e => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });
            
            this.canvas.addEventListener('mouseout', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
            
            // For touch devices
            this.canvas.addEventListener('touchmove', e => {
                if (e.touches[0]) {
                    const rect = this.canvas.getBoundingClientRect();
                    this.mouse.x = e.touches[0].clientX - rect.left;
                    this.mouse.y = e.touches[0].clientY - rect.top;
                }
            });
            
            this.canvas.addEventListener('touchend', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
        
        // Resize handler
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }
    
    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
            
            // Connect particles if they're close enough
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.connectDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / this.options.connectDistance)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });
    }
    
    update() {
        this.particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY = -particle.speedY;
            }
            
            // Interactive - particles respond to mouse
            if (this.options.interactive && this.mouse.x && this.mouse.y) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = this.mouse.radius / distance;
                    const angle = Math.atan2(dy, dx);
                    
                    particle.x += Math.cos(angle) * force * 0.2;
                    particle.y += Math.sin(angle) * force * 0.2;
                }
            }
        });
    }
    
    animate() {
        this.update();
        this.draw();
        window.requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Ensure it doesn't interfere with other interactions
    
    // Add canvas to hero section
    if (heroSection) {
        heroSection.insertBefore(canvas, heroSection.firstChild);
        
        // Initialize particles
        new Particle(canvas, {
            count: 80,
            color: '#ffffff',
            maxSize: 3,
            connectDistance: 150
        });
    }
});

// Magnetic buttons effect
document.addEventListener('DOMContentLoaded', () => {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const moveX = (e.clientX - centerX) * 0.3;
            const moveY = (e.clientY - centerY) * 0.3;
            
            btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            
            // Add magnetic effect to child elements if needed
            const childItems = btn.querySelectorAll('.magnetic-child');
            childItems.forEach(item => {
                item.style.transform = `translate3d(${moveX * 0.5}px, ${moveY * 0.5}px, 0)`;
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0, 0, 0)';
            
            // Reset child elements
            const childItems = btn.querySelectorAll('.magnetic-child');
            childItems.forEach(item => {
                item.style.transform = 'translate3d(0, 0, 0)';
            });
        });
    });
});

// Text scramble effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#_';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize text scramble on page load
document.addEventListener('DOMContentLoaded', () => {
    // Apply to elements with class 'scramble-text'
    const scrambleElements = document.querySelectorAll('.scramble-text');
    
    scrambleElements.forEach(el => {
        const originalText = el.textContent;
        const fx = new TextScramble(el);
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fx.setText(originalText);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(el);
    });
});

// Tilt effect for cards
document.addEventListener('DOMContentLoaded', () => {
    const tiltItems = document.querySelectorAll('.tilt-effect');
    
    tiltItems.forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (centerY - y) / 15;
            const angleY = (x - centerX) / 15;
            
            item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});
