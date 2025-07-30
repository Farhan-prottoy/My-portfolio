// AI Avatar Chatbot with Gemini API Integration (2025 Enhancement)
class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.geminiApiKey = null; // Will be set by user
        this.geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        this.conversationHistory = [];
        
        // Comprehensive knowledge base about Farhan
        this.farhanKnowledgeBase = `
You are Farhan Arefin Khan's AI assistant. Here is comprehensive information about him:

PERSONAL INFORMATION:
- Full Name: Farhan Arefin Khan
- Current Status: Electrical & Electronic Engineering Student at Sylhet Engineering College
- Study Period: 2020-2025
- Current CGPA: 3.57/4.00
- Location: Sylhet District, Bangladesh
- Email: farhan.prottoy.17@gmail.com
- Phone: 01751948747
- LinkedIn: Farhan Arefin Khan

EDUCATION & TRAINING:
1. Bachelor of Science in Electrical and Electronic Engineering
   - Institution: Sylhet Engineering College
   - Period: 2020-2025
   - CGPA: 3.57/4.00
   - Thesis: "Detection And Classification Of 2D Material Flakes Using Ensemble GMM And Neural Networks"

2. Industrial Technology on Electrical Engineering & Instrumentation
   - Institution: Training Institute for Chemical Industries (TICI), Narsingdi
   - Period: January 2024
   - Grade: A+

3. Single Phase Electrical Wiring and Installation
   - Institution: Sylhet Engineering College
   - Period: May 2023

TECHNICAL SKILLS:
Programming Languages: Python, C, C++, MATLAB, HTML, CSS, JavaScript
Machine Learning & AI: NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch, OpenCV, CNNs, Neural Networks, Ensemble GMM
Embedded Systems: Arduino, ESP32, Proteus, Microprocessors
Design & Simulation: MATLAB, Simulink, AutoCAD, SAM
Web Development: HTML, CSS, JavaScript, React
Problem Solving: Data Structures, Algorithms

COMPETITIVE PROGRAMMING:
- Codeforces Rating: 1009
- CodeChef Rating: 1436
- LeetCode: Active solver
- Total Problems Solved: 300+

MAJOR PROJECTS:
1. Three-Phase Inverter System using IGBT and Arduino
   - Technology: IGBT, Arduino, Power Electronics
   - Purpose: AC motor control applications
   - Status: Completed

2. Smart Light Switch with Manual and Automatic Control
   - Technology: IoT, Sensors, Automation
   - Features: Manual operation, automatic environmental control
   - Status: Completed

3. 2D Material Flakes Detection (Thesis Project)
   - Technology: Ensemble GMM, Neural Networks, Computer Vision
   - Field: Materials Science, Nanotechnology
   - Status: In Progress (Current Research)

4. Interactive Portfolio Website
   - Technology: HTML5, CSS3, JavaScript, Modern Web Technologies
   - Features: Dark/Light mode, AI chatbot, Responsive design
   - Status: Completed

RESEARCH INTERESTS:
- 2D Materials and Nanotechnology
- Machine Learning Applications in Materials Science
- Embedded Systems and IoT
- Power Electronics and Motor Control
- Computer Vision and Image Processing

CAREER INTERESTS:
- Embedded Systems Engineering
- Machine Learning Engineering
- IoT System Development
- Power Electronics
- Research and Development in Materials Science

AVAILABILITY:
- Open to collaboration on innovative projects
- Available for internships and entry-level positions
- Interested in research opportunities
- Looking for projects in ML, IoT, and embedded systems

PERSONALITY & APPROACH:
- Passionate about cutting-edge technology
- Problem-solving oriented
- Always eager to learn new technologies
- Bridge between theoretical knowledge and practical applications
- Innovative engineering solutions focused

Always respond as if you are Farhan's personal AI assistant who knows him well. Be conversational, helpful, and provide detailed information when asked. If someone asks about opportunities, emphasize his skills and availability for collaboration.
`;

        this.fallbackResponses = {
            'hello': "Hello! 👋 I'm Farhan's AI assistant. Ask me anything about his skills, projects, education, or how to get in touch with him!",
            'help': "I can tell you about Farhan's:\n• Technical skills & programming languages\n• Projects & thesis work\n• Education & achievements\n• Contact information\n• Career interests and availability\n\nJust ask me anything naturally!",
            'default': "I'd be happy to help! You can ask me anything about Farhan - his background, skills, projects, research, or how to contact him. Try asking something like 'What's his experience with machine learning?' or 'Tell me about his thesis project'."
        };
        
        this.init();
    }
    
    init() {
        this.createChatbot();
        this.setupEventListeners();
        this.checkGeminiAPI();
    }
    
    checkGeminiAPI() {
        // Check if Gemini API key is available
        const storedApiKey = localStorage.getItem('gemini-api-key');
        if (storedApiKey) {
            this.geminiApiKey = storedApiKey;
        } else {
            // Show API key setup message
            this.showAPIKeySetup();
        }
    }
    
    showAPIKeySetup() {
        const setupMessage = `
            <div class="api-setup-notice">
                <h4>🚀 Upgrade to Smart AI Chat</h4>
                <p>To unlock advanced AI conversations, add your Google Gemini API key:</p>
                <div class="api-input-group">
                    <input type="password" id="gemini-api-input" placeholder="Enter your Gemini API key..." />
                    <button id="save-api-key">Save</button>
                </div>
                <small>
                    <a href="https://makersuite.google.com/app/apikey" target="_blank">
                        Get your free API key here
                    </a>
                </small>
                <p><em>Don't have an API key? No worries! I can still answer basic questions about Farhan.</em></p>
            </div>
        `;
        
        setTimeout(() => {
            this.addMessage(setupMessage, 'bot', true);
            this.setupAPIKeyHandlers();
        }, 1000);
    }
    
    setupAPIKeyHandlers() {
        const saveBtn = document.getElementById('save-api-key');
        const input = document.getElementById('gemini-api-input');
        
        if (saveBtn && input) {
            saveBtn.addEventListener('click', () => {
                const apiKey = input.value.trim();
                if (apiKey && apiKey.length > 20) {
                    this.geminiApiKey = apiKey;
                    localStorage.setItem('gemini-api-key', apiKey);
                    this.addMessage("🎉 Great! I'm now powered by Google Gemini AI. I can have much more natural conversations about Farhan. Try asking me anything!", 'bot');
                    
                    // Remove the setup notice
                    const notice = document.querySelector('.api-setup-notice');
                    if (notice) notice.remove();
                    
                    // Update header status
                    const statusEl = document.querySelector('.ai-status');
                    if (statusEl) {
                        statusEl.className = 'ai-status powered';
                        statusEl.textContent = '🧠 AI Powered';
                    }
                } else {
                    this.addMessage("Please enter a valid Gemini API key. It should be a long string starting with 'AIza...'", 'bot');
                }
            });
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveBtn.click();
                }
            });
        }
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
                            <div class="ai-status ${this.geminiApiKey ? 'powered' : 'basic'}">
                                ${this.geminiApiKey ? '🧠 AI Powered' : '💬 Basic Mode'}
                            </div>
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
                                <p>Hi! I'm Farhan's AI assistant. Ask me anything about his background, skills, projects, or research! 🚀</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quick-questions">
                        <button class="quick-btn" data-question="Tell me about Farhan's background">Background</button>
                        <button class="quick-btn" data-question="What are his technical skills?">Skills</button>
                        <button class="quick-btn" data-question="Show me his projects">Projects</button>
                        <button class="quick-btn" data-question="What's his thesis about?">Thesis</button>
                        <button class="quick-btn" data-question="How can I contact him?">Contact</button>
                        <button class="quick-btn" data-question="Is he available for opportunities?">Hire</button>
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
                
                // Add typing indicator
                this.addTypingIndicator();
                
                // Process message with AI or fallback
                if (this.geminiApiKey) {
                    this.processMessageWithGemini(question);
                } else {
                    this.processMessageWithFallback(question);
                }
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
            
            // Add typing indicator
            this.addTypingIndicator();
            
            // Process message with AI or fallback
            if (this.geminiApiKey) {
                this.processMessageWithGemini(message);
            } else {
                this.processMessageWithFallback(message);
            }
        }
    }
    
    async processMessageWithGemini(message) {
        try {
            // Add conversation context
            const fullPrompt = `${this.farhanKnowledgeBase}

Previous conversation:
${this.conversationHistory.slice(-6).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User: ${message}

Please respond as Farhan's AI assistant. Be conversational, helpful, and provide detailed information about Farhan based on the knowledge base above. If the question is not about Farhan, politely redirect the conversation back to topics about him.`;

            const response = await fetch(`${this.geminiEndpoint}?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: fullPrompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "I'm sorry, I couldn't process that request. Please try asking something else about Farhan.";

            // Store conversation history
            this.conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: aiResponse }
            );

            // Keep only last 10 exchanges
            if (this.conversationHistory.length > 20) {
                this.conversationHistory = this.conversationHistory.slice(-20);
            }

            this.removeTypingIndicator();
            this.addMessage(aiResponse, 'bot');

        } catch (error) {
            console.error('Gemini API Error:', error);
            this.removeTypingIndicator();
            this.addMessage("I'm having trouble connecting to my AI brain. Let me try to answer with my basic knowledge...", 'bot');
            
            // Fallback to basic responses
            setTimeout(() => {
                this.processMessageWithFallback(message);
            }, 1000);
        }
    }
    
    processMessageWithFallback(message) {
        const lowerMessage = message.toLowerCase();
        let response = this.fallbackResponses.default;
        
        // Enhanced keyword matching for better responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = this.fallbackResponses.hello;
        } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
            response = this.fallbackResponses.help;
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('programming') || lowerMessage.includes('language') || lowerMessage.includes('technical')) {
            response = "Farhan is skilled in Python, C/C++, JavaScript, MATLAB, and web technologies. For machine learning, he uses TensorFlow, PyTorch, NumPy, Pandas, and OpenCV. He also works with Arduino, ESP32, and embedded systems. He has solved 300+ programming problems across Codeforces (1009), CodeChef (1436), and LeetCode.";
        } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('show me')) {
            response = "Farhan's key projects include: 1) Three-Phase Inverter System using IGBT and Arduino for AC motor control, 2) Smart Light Switch with IoT and automatic environmental control, 3) 2D Material Flakes Detection using Ensemble GMM and Neural Networks (his thesis), and 4) This interactive portfolio website with AI chatbot and modern features.";
        } else if (lowerMessage.includes('thesis') || lowerMessage.includes('research') || lowerMessage.includes('2d material')) {
            response = "Farhan's thesis is on 'Detection And Classification Of 2D Material Flakes Using Ensemble GMM And Neural Networks'. This research contributes to materials science and nanotechnology fields, focusing on computer vision and machine learning applications for 2D material analysis.";
        } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('college') || lowerMessage.includes('background')) {
            response = "Farhan is pursuing his Bachelor's in Electrical & Electronic Engineering at Sylhet Engineering College (2020-2025) with a CGPA of 3.57/4.00. He also completed Industrial Technology training at TICI, Narsingdi with A+ grade, and Single Phase Electrical Wiring certification.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('phone')) {
            response = "You can reach Farhan at farhan.prottoy.17@gmail.com or call 01751948747. He's also on LinkedIn as 'Farhan Arefin Khan'. He's based in Sylhet District, Bangladesh and is always open to discussing new opportunities and collaborations.";
        } else if (lowerMessage.includes('hire') || lowerMessage.includes('job') || lowerMessage.includes('opportunity') || lowerMessage.includes('available') || lowerMessage.includes('work')) {
            response = "Yes! Farhan is actively looking for opportunities in embedded systems, machine learning, IoT, and web development. He's particularly interested in research roles, engineering positions, and collaborative projects. Feel free to contact him at farhan.prottoy.17@gmail.com to discuss potential opportunities!";
        } else if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
            response = "Farhan specializes in machine learning with experience in CNNs, Ensemble GMM, Neural Networks, and computer vision. He uses TensorFlow, PyTorch, NumPy, Pandas, and OpenCV. His current thesis focuses on 2D material classification using advanced ML techniques, and he's passionate about applying AI to solve real-world engineering problems.";
        } else if (lowerMessage.includes('arduino') || lowerMessage.includes('embedded') || lowerMessage.includes('iot')) {
            response = "Farhan has extensive experience with Arduino and ESP32 microcontrollers. He's built smart systems including automated lighting controls and three-phase inverter systems. He's passionate about IoT development and creating innovative embedded solutions.";
        }
        
        setTimeout(() => {
            this.removeTypingIndicator();
            this.addMessage(response, 'bot');
        }, 1000);
    }
    
    addMessage(text, sender, isHTML = false) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        if (sender === 'bot') {
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    ${isHTML ? text : `<p>${text}</p>`}
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

// Enhanced Chatbot Styles with API Setup
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
    width: 380px;
    height: 550px;
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
    flex-direction: column;
    align-items: flex-start;
}

.ai-status {
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 10px;
    margin-top: 2px;
}

.ai-status.basic {
    background: rgba(255, 255, 255, 0.2);
}

.ai-status.powered {
    background: rgba(76, 175, 80, 0.3);
    border: 1px solid rgba(76, 175, 80, 0.5);
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
    max-width: 85%;
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

.api-setup-notice {
    background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
    padding: 20px;
    border-radius: 15px;
    border: 2px solid rgba(102, 126, 234, 0.2);
}

.api-setup-notice h4 {
    margin: 0 0 10px 0;
    color: #667eea;
}

.api-input-group {
    display: flex;
    gap: 10px;
    margin: 15px 0;
}

.api-input-group input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 12px;
}

.api-input-group button {
    padding: 10px 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}

.api-setup-notice small {
    display: block;
    margin: 10px 0;
}

.api-setup-notice small a {
    color: #667eea;
    text-decoration: none;
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
    font-size: 11px;
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

[data-theme="dark"] .api-setup-notice {
    background: #2a2a2a;
    border-color: #444;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .chatbot-window {
        width: 320px;
        height: 500px;
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
