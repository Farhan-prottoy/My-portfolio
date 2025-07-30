// AI Avatar Chatbot (2025 Enhancement)
class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            // Personal Info
            'who are you': "I'm Farhan Arefin Khan, an Electrical & Electronic Engineering student at Sylhet Engineering College. I'm passionate about embedded systems, machine learning, and innovative engineering solutions!",
            'about': "I'm currently working on my thesis about '2D Material Flakes Detection Using Ensemble GMM And Neural Networks'. I have a CGPA of 3.57/4.00 and have solved 300+ programming problems across various platforms.",
            'education': "I'm pursuing my Bachelor's in EEE at Sylhet Engineering College (2020-2025). I also completed Industrial Technology training at TICI, Narsingdi with A+ grade, and Single Phase Electrical Wiring certification.",
            
            // Skills
            'skills': "I'm proficient in Python, C/C++, JavaScript, MATLAB, and web technologies. For ML, I use TensorFlow, PyTorch, NumPy, Pandas, and OpenCV. I also work with Arduino, ESP32, and embedded systems.",
            'programming': "I code in Python, C, C++, JavaScript, and MATLAB. I've solved 300+ problems on Codeforces (rating: 1009), CodeChef (rating: 1436), and LeetCode.",
            'machine learning': "I specialize in CNNs, Ensemble GMM, Neural Networks, and computer vision using TensorFlow, PyTorch, and OpenCV. My thesis focuses on 2D material classification.",
            'web development': "I work with HTML, CSS, JavaScript, and React. I create responsive, modern web applications with smooth animations and interactive features.",
            
            // Projects
            'projects': "My key projects include: 1) Three-Phase Inverter System using IGBT and Arduino, 2) Smart Light Switch with automatic control, 3) 2D Material Flakes Detection (my thesis project).",
            'thesis': "My thesis is on 'Detection And Classification Of 2D Material Flakes Using Ensemble GMM And Neural Networks'. It contributes to materials science and nanotechnology fields.",
            'inverter': "I developed a three-phase inverter system using IGBT technology controlled by Arduino. It demonstrates power electronics principles and embedded system integration for AC motor control.",
            
            // Contact & Collaboration
            'contact': "You can reach me at farhan.prottoy.17@gmail.com or call 01751948747. I'm also on LinkedIn as 'Farhan Arefin Khan'. I'm based in Sylhet District, Bangladesh.",
            'hire': "I'm open to opportunities in embedded systems, machine learning, IoT, and web development. Feel free to contact me at farhan.prottoy.17@gmail.com to discuss potential collaborations!",
            'collaboration': "I'd love to collaborate on innovative projects! I'm particularly interested in IoT systems, ML applications, power electronics, and web development projects.",
            
            // Technologies
            'arduino': "I have extensive experience with Arduino and ESP32 microcontrollers. I've built smart systems including automated lighting controls and three-phase inverter systems.",
            'matlab': "I use MATLAB and Simulink for signal processing, control systems, and simulation. It's essential for my engineering coursework and thesis research.",
            'python': "Python is my go-to language for machine learning, data analysis, and automation. I use it with TensorFlow, PyTorch, NumPy, and Pandas for my research.",
            
            // Default responses
            'hello': "Hello! 👋 I'm Farhan's AI assistant. Ask me about his skills, projects, education, or how to get in touch with him!",
            'help': "I can tell you about Farhan's:\n• Technical skills & programming languages\n• Projects & thesis work\n• Education & achievements\n• Contact information\n• Available for collaborations\n\nJust ask me anything!",
            'default': "I'd be happy to help! You can ask me about Farhan's skills, projects, education, contact info, or anything else you'd like to know about him. Try asking 'What are his skills?' or 'Tell me about his projects'."
        };
        
        this.init();
    }
    
    init() {
        this.createChatbot();
        this.setupEventListeners();
    }
    
    createChatbot() {
        const chatbotHTML = `
            <div id="portfolio-chatbot" class="chatbot-container">
                <div class="chatbot-toggle" id="chatbot-toggle">
                    <div class="chatbot-avatar">
                        <i class="fas fa-robot"></i>
                        <div class="pulse-ring"></div>
                    </div>
                    <div class="chatbot-badge">Ask me about Farhan!</div>
                </div>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-title">
                            <i class="fas fa-robot"></i>
                            <span>Farhan's AI Assistant</span>
                        </div>
                        <button class="chatbot-close" id="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="message bot-message">
                            <div class="message-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="message-content">
                                <p>Hi! I'm Farhan's AI assistant. Ask me about his skills, projects, education, or how to contact him! 🚀</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quick-questions">
                        <button class="quick-btn" data-question="What are his skills?">Skills</button>
                        <button class="quick-btn" data-question="Tell me about his projects">Projects</button>
                        <button class="quick-btn" data-question="How to contact him?">Contact</button>
                        <button class="quick-btn" data-question="Is he available for hire?">Hire</button>
                    </div>
                    
                    <div class="chatbot-input-area">
                        <input type="text" id="chatbot-input" placeholder="Ask me anything about Farhan..." autocomplete="off">
                        <button id="chatbot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
    
    setupEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const input = document.getElementById('chatbot-input');
        const send = document.getElementById('chatbot-send');
        const quickBtns = document.querySelectorAll('.quick-btn');
        
        toggle.addEventListener('click', () => this.toggleChatbot());
        close.addEventListener('click', () => this.closeChatbot());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        send.addEventListener('click', () => this.sendMessage());
        
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                this.addMessage(question, 'user');
                this.processMessage(question);
            });
        });
    }
    
    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const badge = document.querySelector('.chatbot-badge');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.style.display = 'flex';
            badge.style.display = 'none';
            setTimeout(() => {
                window.classList.add('open');
                document.getElementById('chatbot-input').focus();
            }, 10);
        } else {
            this.closeChatbot();
        }
    }
    
    closeChatbot() {
        const window = document.getElementById('chatbot-window');
        const badge = document.querySelector('.chatbot-badge');
        
        window.classList.remove('open');
        setTimeout(() => {
            window.style.display = 'none';
            badge.style.display = 'block';
        }, 300);
        
        this.isOpen = false;
    }
    
    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            // Simulate thinking delay
            setTimeout(() => {
                this.processMessage(message);
            }, 500);
        }
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        if (sender === 'bot') {
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add animation
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 100);
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = this.responses.default;
        
        // Find best matching response
        for (const [key, value] of Object.entries(this.responses)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }
        
        // Add typing indicator
        this.addTypingIndicator();
        
        setTimeout(() => {
            this.removeTypingIndicator();
            this.addMessage(response, 'bot');
        }, 1000);
    }
    
    addTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Chatbot Styles
const chatbotStyles = `
.chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chatbot-toggle {
    position: relative;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
}

.chatbot-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
}

.chatbot-avatar i {
    font-size: 24px;
    z-index: 2;
    position: relative;
}

.pulse-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    animation: pulse-ring 2s infinite ease-out;
}

@keyframes pulse-ring {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}

.chatbot-badge {
    position: absolute;
    bottom: 70px;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    white-space: nowrap;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

.chatbot-window {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 350px;
    height: 500px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: none;
    flex-direction: column;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chatbot-window.open {
    transform: translateY(0);
    opacity: 1;
}

.chatbot-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 20px;
    border-radius: 15px 15px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chatbot-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
}

.chatbot-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}

.chatbot-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

.chatbot-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.message {
    display: flex;
    gap: 10px;
    max-width: 80%;
}

.user-message {
    align-self: flex-end;
    flex-direction: row-reverse;
}

.user-message .message-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.message-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    flex-shrink: 0;
}

.message-content {
    background: #f5f5f5;
    padding: 12px 15px;
    border-radius: 15px;
    color: #333;
    line-height: 1.4;
}

.message-content p {
    margin: 0;
    font-size: 14px;
}

.quick-questions {
    padding: 15px 20px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    border-top: 1px solid #eee;
}

.quick-btn {
    background: #f0f0f0;
    border: none;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    color: #667eea;
    font-weight: 500;
}

.quick-btn:hover {
    background: #667eea;
    color: white;
    transform: translateY(-1px);
}

.chatbot-input-area {
    padding: 15px 20px;
    display: flex;
    gap: 10px;
    border-top: 1px solid #eee;
}

#chatbot-input {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 25px;
    outline: none;
    font-size: 14px;
    transition: border-color 0.2s;
}

#chatbot-input:focus {
    border-color: #667eea;
}

#chatbot-send {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

#chatbot-send:hover {
    transform: scale(1.05);
}

.typing-indicator .message-content {
    background: #f0f0f0;
    padding: 15px;
}

.typing-dots {
    display: flex;
    gap: 4px;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    background: #667eea;
    border-radius: 50%;
    animation: typing 1.5s infinite ease-in-out;
}

.typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 60%, 100% {
        transform: scale(1);
        opacity: 0.5;
    }
    30% {
        transform: scale(1.3);
        opacity: 1;
    }
}

/* Dark theme support */
[data-theme="dark"] .chatbot-window {
    background: #1a1a1a;
    color: #ffffff;
}

[data-theme="dark"] .message-content {
    background: #2a2a2a;
    color: #ffffff;
}

[data-theme="dark"] .message-avatar {
    background: #2a2a2a;
}

[data-theme="dark"] .quick-btn {
    background: #2a2a2a;
    color: #667eea;
}

[data-theme="dark"] #chatbot-input {
    background: #2a2a2a;
    border-color: #444;
    color: #ffffff;
}

[data-theme="dark"] .quick-questions,
[data-theme="dark"] .chatbot-input-area {
    border-top-color: #333;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .chatbot-window {
        width: 300px;
        height: 450px;
    }
    
    .chatbot-container {
        bottom: 15px;
        right: 15px;
    }
}
`;

// Add styles to document
const chatbotStyleSheet = document.createElement('style');
chatbotStyleSheet.textContent = chatbotStyles;
document.head.appendChild(chatbotStyleSheet);

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});
