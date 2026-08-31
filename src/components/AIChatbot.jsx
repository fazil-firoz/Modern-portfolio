import React, { useState, useEffect, useRef } from 'react';

const FAZIL_KNOWLEDGE = {
  name: "Fazil Firoz",
  role: "Software Engineer / Full-Stack Web Developer",
  company: "Antas Technologies",
  location: "Infopark, Kochi, Kerala, India",
  experiencePeriod: "2025 – Present (1+ Year)",
  resumeUrl: "https://drive.google.com/file/d/1_5UOnTnYpTpAmlexkF0fw0LVKGw7BUBx/view?usp=drive_link",
  skills: [
    "C# & ASP.NET Core",
    "React.js & Modern JavaScript (ES6+)",
    "Python & Django Web Framework",
    "PostgreSQL & SQL Query Optimization",
    "RESTful API Development & Integration",
    "Unit Testing & Debugging",
    "HTML5, CSS3, Bootstrap & Responsive Layouts",
    "Flutter (Dart) & MySQL"
  ],
  experience: [
    "Designed & developed Hospital Management Systems (HMS) for enterprise clients across Dubai and India (ASP.NET Core, React, SQL, PostgreSQL).",
    "Built and contributed to a CRM system for an overseas educational consultancy, streamlining student application workflows.",
    "Engineered robust backend C# modules and improved database query execution speed.",
    "Integrated third-party & RESTful APIs to ensure smooth communication between microservices.",
    "Resolved production issues and conducted unit testing across software modules."
  ],
  education: [
    "Master of Computer Applications (MCA) — MES College of Engineering, Kuttippuram (APJ Abdul Kalam Technological University) (2023 – 2025)",
    "Python Web Development Certification — Luminar Technolab, Kakkanad (National Council for Technology & Training) (2022 – 2023)",
    "Bachelor of Computer Applications (BCA) — Majlis Arts and Science College, Puramannur (University of Calicut) (2019 – 2022)"
  ],
  projects: [
    {
      name: "E-Commerce Web App",
      desc: "Full-featured online store with 3D product animations, C# backend API, PostgreSQL, Razorpay payment gateway & cart management.",
      tech: "C#, React.js, PostgreSQL, Razorpay, 3D Animations",
      link: "https://e-commerce-web-app-woad-nine.vercel.app/"
    },
    {
      name: "Self-Billing System",
      desc: "Intelligent supermarket self-checkout system enabling QR product scanning, auto-billing & smartphone payments.",
      tech: "Python Django, HTML/CSS, JS, Flutter, MySQL",
      link: "https://github.com/fazil-firoz/Main-Project.git"
    },
    {
      name: "Learnify",
      desc: "E-learning platform where instructors post video courses & students enroll securely.",
      tech: "Python Django, Bootstrap, MySQL",
      link: "https://github.com/fazil-firoz/Learnify.git"
    },
    {
      name: "Personal Portfolio",
      desc: "Responsive developer portfolio showcasing projects, skills, and professional journey.",
      tech: "HTML, CSS, JavaScript, Bootstrap",
      link: "https://fazil-firoz.github.io/Portfolio_new/"
    },
    {
      name: "Notebook Portfolio",
      desc: "Interactive notebook-themed portfolio with paper textures and handwritten layouts.",
      tech: "React, CSS, Vercel",
      link: "https://note-book-portfolio-eta.vercel.app/"
    },
    {
      name: "Modern 3D Portfolio",
      desc: "Ultra-modern developer portfolio featuring 3D floating ID card with GSAP ScrollTrigger physics.",
      tech: "React, GSAP, ScrollTrigger, Vite",
      link: "https://github.com/fazil-firoz/Modern-portfolio.git"
    },
    {
      name: "News24",
      desc: "Real-time news application fetching live news dynamically via News API.",
      tech: "HTML, CSS, JS, News API",
      link: "https://github.com/fazil-firoz/News-App.git"
    },
    {
      name: "Bono's",
      desc: "Static web application exploring front-end web structure and layout.",
      tech: "HTML, CSS",
      link: "https://fazil-firoz.github.io/bonos/"
    }
  ]
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hi! 👋 I'm **Fazil's AI Assistant**. Ask me anything about Fazil Firoz's experience, technical skills, projects, education, or resume!`,
      time: getCurrentTime(),
      quickPills: [
        { label: '💼 Work Experience', prompt: 'Tell me about Fazil\'s work experience' },
        { label: '⚡ Technical Skills', prompt: 'What are Fazil\'s main technical skills?' },
        { label: '🚀 Featured Projects', prompt: 'Show me Fazil\'s projects' },
        { label: '🎓 Education', prompt: 'What is Fazil\'s educational background?' },
        { label: '📄 Resume & Contact', prompt: 'How can I contact Fazil or view his resume?' }
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const handleSend = (textToSend) => {
    const query = textToSend || input.trim();
    if (!query) return;

    // Add User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: getCurrentTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI thinking & response
    setTimeout(() => {
      const responseText = processQuery(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText.reply,
        time: getCurrentTime(),
        quickPills: responseText.pills || null
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const processQuery = (rawQuery) => {
    const q = rawQuery.toLowerCase();

    // 1. Experience / Job / Company
    if (q.includes('exp') || q.includes('work') || q.includes('job') || q.includes('company') || q.includes('antas') || q.includes('infopark') || q.includes('hms') || q.includes('crm')) {
      return {
        reply: `**Fazil Firoz** is currently a **Software Engineer at Antas Technologies** (Infopark, Kochi, India).\n\nKey Highlights:\n- 1+ Year developing enterprise web applications.\n- Built Hospital Management Systems (HMS) for clients in Dubai & India using ASP.NET Core, React, and PostgreSQL.\n- Developed CRM systems for overseas educational consultancies.\n- Specializes in C# backend APIs, database optimization, and RESTful API integration.`,
        pills: [
          { label: '⚡ Technical Skills', prompt: 'What are Fazil\'s technical skills?' },
          { label: '🚀 Projects', prompt: 'Tell me about his projects' }
        ]
      };
    }

    // 2. Technical Skills
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('c#') || q.includes('react') || q.includes('django') || q.includes('sql') || q.includes('asp.net') || q.includes('python')) {
      return {
        reply: `Here is **Fazil's Core Tech Stack**:\n\n• **Backend**: C#, ASP.NET Core, Python, Django, REST APIs\n• **Frontend**: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, GSAP\n• **Databases**: PostgreSQL, SQL, MySQL\n• **Mobile & Tools**: Flutter (Dart), Git/GitHub, Razorpay Integration, Unit Testing`,
        pills: [
          { label: '💼 Work Experience', prompt: 'What experience does he have?' },
          { label: '📄 Download Resume', prompt: 'Give me Fazil\'s resume link' }
        ]
      };
    }

    // 3. Projects
    if (q.includes('project') || q.includes('ecommerce') || q.includes('billing') || q.includes('learnify') || q.includes('news') || q.includes('bono') || q.includes('build')) {
      return {
        reply: `Fazil has built **8 featured projects**:\n\n1. **E-Commerce Web App** (C#, React, PostgreSQL, Razorpay)\n2. **Self-Billing System** (Python Django, QR code checkout, Flutter, MySQL)\n3. **Learnify E-Learning** (Python Django, Bootstrap, MySQL)\n4. **Modern 3D Portfolio** (React, GSAP ScrollTrigger, Vite)\n5. **Personal Showcase Portfolio** (HTML, CSS, JS)\n6. **Notebook Portfolio** (React, Vercel)\n7. **News24 App** (REST API Integration)\n8. **Bono's Static Webpage** (HTML/CSS)`,
        pills: [
          { label: '🌐 View E-Commerce App', prompt: 'Tell me about E-Commerce project' },
          { label: '💼 Work Experience', prompt: 'Tell me about his work experience' }
        ]
      };
    }

    // 4. Education / Degrees
    if (q.includes('edu') || q.includes('degree') || q.includes('mca') || q.includes('bca') || q.includes('college') || q.includes('luminar') || q.includes('university') || q.includes('qualif')) {
      return {
        reply: `**Academic & Certifications**:\n\n🎓 **Master of Computer Applications (MCA)** (2023 – 2025)\n• MES College of Engineering, Kuttippuram (KTU)\n\n📜 **Python Web Development Expert** (2022 – 2023)\n• Luminar Technolab, Kakkanad (NCTT)\n\n🎓 **Bachelor of Computer Applications (BCA)** (2019 – 2022)\n• Majlis Arts and Science College (Calicut University)`,
        pills: [
          { label: '💼 Work Experience', prompt: 'Tell me about his work experience' },
          { label: '⚡ Technical Skills', prompt: 'What are his skills?' }
        ]
      };
    }

    // 5. Contact / Hire / Resume / Location
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('resume') || q.includes('location') || q.includes('kochi') || q.includes('address')) {
      return {
        reply: `**Get in Touch with Fazil Firoz**:\n\n• 📍 **Location**: Infopark, Kochi, Kerala, India\n• 💼 **Role**: Software Engineer / Full-Stack Developer\n• 📄 **Official Resume**: [View / Download Resume](${FAZIL_KNOWLEDGE.resumeUrl})\n• 🔗 **LinkedIn / GitHub**: Available on portfolio contact cards below!`,
        pills: [
          { label: '💼 Work Experience', prompt: 'Tell me about Fazil\'s work experience' },
          { label: '🚀 Projects', prompt: 'Show me Fazil\'s projects' }
        ]
      };
    }

    // 6. Greetings / Intro
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('who') || q.includes('fazil')) {
      return {
        reply: `Hello! 👋 I'm **Fazil Firoz's AI Assistant**.\n\nFazil is a **Software Engineer at Infopark, Kochi** with 1+ year of experience building C#, ASP.NET Core, React, and Python Django web applications.\n\nHow can I help you today?`,
        pills: [
          { label: '💼 Work Experience', prompt: 'Tell me about his work experience' },
          { label: '⚡ Technical Skills', prompt: 'What are his technical skills?' },
          { label: '📄 Resume', prompt: 'Where can I download his resume?' }
        ]
      };
    }

    // Default Fallback
    return {
      reply: `I'm here to answer questions about **Fazil Firoz**! You can ask me about:\n\n• His **Work Experience** at Infopark Kochi\n• His **Technical Skills** (C#, React, ASP.NET Core, Django)\n• His **Featured Projects**\n• His **Education & MCA Degree**\n• How to **Download his Resume** or contact him.`,
      pills: [
        { label: '💼 Experience', prompt: 'Tell me about his work experience' },
        { label: '⚡ Skills', prompt: 'What are his skills?' },
        { label: '🚀 Projects', prompt: 'Show me his projects' }
      ]
    };
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Chat cleared! How can I assist you with information about Fazil Firoz?`,
        time: getCurrentTime(),
        quickPills: [
          { label: '💼 Work Experience', prompt: 'Tell me about Fazil\'s work experience' },
          { label: '⚡ Technical Skills', prompt: 'What are Fazil\'s technical skills?' },
          { label: '🚀 Projects', prompt: 'Show me Fazil\'s projects' }
        ]
      }
    ]);
  };

  // Helper renderer to support simple markdown links & bolding
  const renderFormattedText = (text) => {
    const parts = text.split('\n');
    return parts.map((line, lineIdx) => {
      // Simple markdown bold conversion **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const elements = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          elements.push(line.substring(lastIndex, match.index));
        }
        elements.push(<strong key={`b-${lineIdx}-${match.index}`}>{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < line.length) {
        elements.push(line.substring(lastIndex));
      }

      // Render link if present [text](url)
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      const lineText = elements.map(el => typeof el === 'string' ? el : el).join('');
      const linkMatch = linkRegex.exec(lineText);

      if (linkMatch) {
        return (
          <p key={lineIdx} className="ai-msg-paragraph">
            {lineText.replace(linkRegex, '')}{' '}
            <a href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="ai-chat-link">
              {linkMatch[1]} ↗
            </a>
          </p>
        );
      }

      return (
        <p key={lineIdx} className="ai-msg-paragraph">
          {elements.length > 0 ? elements : line}
        </p>
      );
    });
  };

  return (
    <>
      {/* ── FLOATING BOT LAUNCHER BUTTON (FIXED BOTTOM-LEFT) ── */}
      <div className="ai-bot-launcher-wrapper">
        <button
          type="button"
          className={`ai-bot-launcher-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? "Close AI Assistant" : "Ask AI Assistant about Fazil"}
          aria-label="AI Portfolio Assistant"
        >
          <div className="ai-bot-pulse-ring" />
          <div className="ai-bot-icon-box">
            {isOpen ? (
              <svg className="ai-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <div className="ai-icon-inner">
                <svg className="ai-sparkle-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                <span className="ai-badge-dots">AI</span>
              </div>
            )}
          </div>
          {!isOpen && (
            <div className="ai-launcher-tooltip">
              <span className="ai-online-dot" />
              <span>Ask AI Chat</span>
            </div>
          )}
        </button>
      </div>

      {/* ── AI CHAT MODAL WINDOW (FLOATING BOTTOM-LEFT) ── */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-info">
              <div className="ai-avatar-box">
                <svg className="ai-avatar-sparkle" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <div className="ai-header-titles">
                <div className="ai-header-name">
                  <span>Fazil's AI Bot</span>
                  <span className="ai-header-badge">AI Assistant</span>
                </div>
                <div className="ai-header-status">
                  <span className="ai-status-dot" />
                  <span>Online · Portfolio Intelligence</span>
                </div>
              </div>
            </div>

            <div className="ai-header-actions">
              <button
                type="button"
                className="ai-action-btn"
                onClick={handleClearChat}
                title="Clear Chat History"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai-action-icon">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
              <button
                type="button"
                className="ai-action-btn"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="ai-action-icon">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body / Messages List */}
          <div className="ai-chat-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-message-row ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="ai-msg-avatar">FZ</div>
                )}

                <div className="ai-msg-content">
                  <div className="ai-msg-bubble">
                    {renderFormattedText(msg.text)}
                  </div>
                  <div className="ai-msg-time">{msg.time}</div>

                  {/* Quick Recommendation Pills */}
                  {msg.quickPills && msg.quickPills.length > 0 && (
                    <div className="ai-quick-pills-row">
                      {msg.quickPills.map((pill, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="ai-quick-pill"
                          onClick={() => handleSend(pill.prompt)}
                        >
                          {pill.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="ai-message-row msg-bot">
                <div className="ai-msg-avatar">FZ</div>
                <div className="ai-msg-bubble ai-typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer / Input Bar */}
          <form
            className="ai-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="ai-chat-input"
              placeholder="Ask about Fazil's skills, experience..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="ai-chat-send-btn"
              disabled={!input.trim()}
              title="Send Message"
            >
              <svg className="ai-send-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
