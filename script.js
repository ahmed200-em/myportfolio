// Mobile Navigation Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');

    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

    // Prevent body scroll when menu is open (iOS improvement)
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking on navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');

            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable body scroll
        });
    });
});

// Typing Animation
const phrases = [
    'Web Developer',
    'Full Stack Developer',
    'Cybersecurity Engineer',
    'Security Specialist'
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeWriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const current = phrases[currentPhrase];

    if (isDeleting) {
        typingElement.textContent = current.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typingElement.textContent = current.substring(0, currentChar + 1);
        currentChar++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentChar === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeWriter, 1000);
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 100;

        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + suffix;
                setTimeout(updateCount, 20);
            } else {
                stat.textContent = target + suffix;
            }
        };

        updateCount();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger stats animation
            if (entry.target.classList.contains('stats')) {
                animateStats();
                observer.unobserve(entry.target);
            }

            // Add fade-in animation
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.stat-item, .skill-item, .project-card, .stats');

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const name = formData.get('name') || form.querySelector('input[type="text"]').value;
            const email = formData.get('email') || form.querySelector('input[type="email"]').value;
            const subject = formData.get('subject') || form.querySelectorAll('input[type="text"]')[1].value;
            const message = formData.get('message') || form.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        background-color: ${type === 'success' ? '#00ff88' : '#ff4444'};
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Performance optimization
let ticking = false;

function updateOnScroll() {
    updateActiveNavLink();

    // Navbar background
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }

    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Interactive Circle with Mouse Following
function initializeInteractiveCircle() {
    const interactiveCircle = document.getElementById('interactive-circle');
    const wordCircle = document.querySelector('.word-circle');
    const wordItems = document.querySelectorAll('.word-item');

    if (!interactiveCircle || !wordCircle) return;

    // Position words around the circle
    function positionWords() {
        const circleRect = interactiveCircle.getBoundingClientRect();
        const isMobile = window.innerWidth <= 768;

        const radius = isMobile ? 95 : 150; // Distance from center
        const centerX = isMobile ? 125 : 200; // Half of circle width
        const centerY = isMobile ? 125 : 200; // Half of circle height

        wordItems.forEach((item, index) => {
            const angle = (360 / wordItems.length) * index;
            const radian = (angle * Math.PI) / 180;

            const x = centerX + radius * Math.cos(radian) - item.offsetWidth / 2;
            const y = centerY + radius * Math.sin(radian) - item.offsetHeight / 2;

            item.style.left = x + 'px';
            item.style.top = y + 'px';
        });
    }

    // Mouse interaction
    function handleMouseMove(e) {
        const rect = interactiveCircle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation angle based on mouse position
        const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

        // Rotate the word circle to follow mouse
        wordCircle.style.transform = `rotate(${angle}deg)`;

        // Counter-rotate words to keep them readable
        wordItems.forEach(item => {
            item.style.transform = `rotate(${-angle}deg)`;
        });
    }

    // Touch interaction for mobile
    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        handleMouseMove(touch);
    }

    // Touch start for mobile
    function handleTouchStart(e) {
        e.preventDefault();
        isInteracting = true;
        stopAutoRotate();
        const touch = e.touches[0];
        handleMouseMove(touch);
    }

    // Touch end for mobile
    function handleTouchEnd(e) {
        e.preventDefault();
        isInteracting = false;
        setTimeout(() => {
            if (!isInteracting) {
                wordCircle.style.transform = 'rotate(0deg)';
                wordItems.forEach(item => {
                    item.style.transform = 'rotate(0deg)';
                });
                startAutoRotate();
            }
        }, 1000);
    }

    // Initialize
    positionWords();

    // Event listeners
    interactiveCircle.addEventListener('mousemove', handleMouseMove);
    interactiveCircle.addEventListener('touchmove', handleTouchMove);

    // Reset on mouse leave
    interactiveCircle.addEventListener('mouseleave', () => {
        wordCircle.style.transform = 'rotate(0deg)';
        wordItems.forEach(item => {
            item.style.transform = 'rotate(0deg)';
        });
    });

    // Auto-rotate when not interacting
    let autoRotateInterval;
    let isInteracting = false;

    function startAutoRotate() {
        if (isInteracting) return;

        let rotation = 0;
        autoRotateInterval = setInterval(() => {
            if (!isInteracting) {
                rotation += 0.5;
                wordCircle.style.transform = `rotate(${rotation}deg)`;
                wordItems.forEach(item => {
                    item.style.transform = `rotate(${-rotation}deg)`;
                });
            }
        }, 50);
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    interactiveCircle.addEventListener('mouseenter', () => {
        isInteracting = true;
        stopAutoRotate();
    });

    interactiveCircle.addEventListener('mouseleave', () => {
        isInteracting = false;
        setTimeout(() => {
            if (!isInteracting) startAutoRotate();
        }, 2000);
    });

    // Start auto-rotate initially
    startAutoRotate();

    // Resize handler
    window.addEventListener('resize', positionWords);
}

// 3D Globe with Mouse Interaction
function initialize3DGlobe() {
    const globeContainer = document.getElementById('globe-container');
    const globeSphere = document.getElementById('globe-sphere');

    if (!globeContainer || !globeSphere) return;

    let isInteracting = false;
    let currentRotationX = -10;
    let currentRotationY = 0;

    // Mouse interaction
    function handleMouseMove(e) {
        if (!isInteracting) return;

        const rect = globeContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = (e.clientX - centerX) / rect.width;
        const mouseY = (e.clientY - centerY) / rect.height;

        const rotationY = mouseX * 60; // Horizontal rotation
        const rotationX = -10 + (mouseY * 30); // Vertical rotation with base tilt

        currentRotationX = rotationX;
        currentRotationY = rotationY;

        globeSphere.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }

    // Touch interaction for mobile
    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        handleMouseMove(touch);
    }

    // Start interaction
    function startInteraction(e) {
        isInteracting = true;
        globeSphere.style.animationPlayState = 'paused';
    }

    // End interaction
    function endInteraction() {
        isInteracting = false;

        // Resume auto-rotation after a delay
        setTimeout(() => {
            if (!isInteracting) {
                globeSphere.style.animationPlayState = 'running';
                globeSphere.style.transform = 'rotateX(-10deg) rotateY(0deg)';
            }
        }, 1000);
    }

    // Mouse events
    globeContainer.addEventListener('mousedown', startInteraction);
    globeContainer.addEventListener('mousemove', handleMouseMove);
    globeContainer.addEventListener('mouseup', endInteraction);
    globeContainer.addEventListener('mouseleave', endInteraction);

    // Touch events
    globeContainer.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startInteraction(e);
    }, { passive: false });

    globeContainer.addEventListener('touchmove', handleTouchMove, { passive: false });

    globeContainer.addEventListener('touchend', (e) => {
        e.preventDefault();
        endInteraction();
    }, { passive: false });

    // Enhanced logo hover effects and click functionality
    const logoItems = document.querySelectorAll('.logo-item');
    logoItems.forEach(item => {
        // Store original transform for each item
        const originalTransform = getComputedStyle(item).transform;
        item.dataset.originalTransform = originalTransform;

        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
            this.style.transform = this.dataset.originalTransform + ' scale(1.3)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '10';
            this.style.transform = this.dataset.originalTransform;
        });

        // Add click interaction
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            console.log('Clicked skill:', lang); // Debug log
            if (lang) {
                showHackerTerminal(lang);
            }
        });
    });
}

// Skill Information Database
const skillsDatabase = {
    javascript: {
        name: 'JavaScript',
        category: 'Frontend Development',
        level: 95,
        description: 'Dynamic programming language for interactive web applications',
        experience: '5+ years',
        projects: ['E-commerce Platform', 'Task Management System', 'Real-time Chat App'],
        frameworks: ['React', 'Vue.js', 'Node.js', 'Express'],
        specialties: ['ES6+', 'Async Programming', 'DOM Manipulation', 'API Integration']
    },
    python: {
        name: 'Python',
        category: 'Backend Development & Security',
        level: 90,
        description: 'Versatile language for backend development and security automation',
        experience: '4+ years',
        projects: ['Security Scanner Tool', 'Data Analysis Platform', 'API Development'],
        frameworks: ['Django', 'Flask', 'FastAPI', 'Pandas'],
        specialties: ['Web Scraping', 'Security Scripts', 'Data Analysis', 'Automation']
    },
    react: {
        name: 'React.js',
        category: 'Frontend Framework',
        level: 92,
        description: 'Component-based library for building user interfaces',
        experience: '3+ years',
        projects: ['Dashboard Applications', 'E-commerce Frontend', 'Portfolio Sites'],
        frameworks: ['Next.js', 'Gatsby', 'React Router', 'Redux'],
        specialties: ['Hooks', 'State Management', 'Performance Optimization', 'SSR']
    },
    html: {
        name: 'HTML5',
        category: 'Web Foundation',
        level: 98,
        description: 'Semantic markup language for web structure',
        experience: '6+ years',
        projects: ['All Web Projects', 'Responsive Layouts', 'Accessibility Features'],
        frameworks: ['Semantic HTML', 'Web Components', 'Progressive Web Apps'],
        specialties: ['Accessibility', 'SEO Optimization', 'Forms', 'Media Elements']
    },
    css: {
        name: 'CSS3',
        category: 'Styling & Animation',
        level: 94,
        description: 'Advanced styling and animation for modern web interfaces',
        experience: '6+ years',
        projects: ['Responsive Designs', 'Animation Libraries', 'Component Systems'],
        frameworks: ['Tailwind CSS', 'Sass/SCSS', 'CSS Grid', 'Flexbox'],
        specialties: ['Animations', '3D Transforms', 'Responsive Design', 'Custom Properties']
    },
    node: {
        name: 'Node.js',
        category: 'Backend Runtime',
        level: 88,
        description: 'JavaScript runtime for server-side development',
        experience: '3+ years',
        projects: ['RESTful APIs', 'Real-time Applications', 'Microservices'],
        frameworks: ['Express.js', 'Fastify', 'Socket.io', 'Mongoose'],
        specialties: ['API Development', 'Real-time Communication', 'Database Integration', 'Authentication']
    },
    angular: {
        name: 'Angular',
        category: 'Frontend Framework',
        level: 85,
        description: 'Full-featured framework for large-scale applications',
        experience: '2+ years',
        projects: ['Enterprise Applications', 'Admin Dashboards', 'Progressive Web Apps'],
        frameworks: ['Angular CLI', 'RxJS', 'Angular Material', 'NgRx'],
        specialties: ['TypeScript', 'Dependency Injection', 'Routing', 'Forms']
    },
    vue: {
        name: 'Vue.js',
        category: 'Frontend Framework',
        level: 87,
        description: 'Progressive framework for building user interfaces',
        experience: '2+ years',
        projects: ['Task Management App', 'Interactive Dashboards', 'Component Libraries'],
        frameworks: ['Vuex', 'Vue Router', 'Nuxt.js', 'Vuetify'],
        specialties: ['Composition API', 'State Management', 'SSR', 'Component Design']
    },
    docker: {
        name: 'Docker',
        category: 'DevOps & Containerization',
        level: 82,
        description: 'Containerization platform for application deployment',
        experience: '2+ years',
        projects: ['Microservices Architecture', 'CI/CD Pipelines', 'Development Environments'],
        frameworks: ['Docker Compose', 'Kubernetes', 'Container Registry', 'Multi-stage Builds'],
        specialties: ['Container Orchestration', 'Image Optimization', 'Networking', 'Volume Management']
    },
    git: {
        name: 'Git',
        category: 'Version Control',
        level: 91,
        description: 'Distributed version control system for code management',
        experience: '5+ years',
        projects: ['All Development Projects', 'Team Collaboration', 'Open Source Contributions'],
        frameworks: ['GitHub', 'GitLab', 'Bitbucket', 'Git Workflows'],
        specialties: ['Branching Strategies', 'Merge Conflicts', 'Rebasing', 'Hooks']
    },
    github: {
        name: 'GitHub',
        category: 'Code Hosting & Collaboration',
        level: 89,
        description: 'Platform for version control and collaborative development',
        experience: '4+ years',
        projects: ['Open Source Projects', 'Team Repositories', 'CI/CD Integration'],
        frameworks: ['GitHub Actions', 'GitHub Pages', 'GitHub API', 'Pull Requests'],
        specialties: ['Actions Workflows', 'Repository Management', 'Code Review', 'Issue Tracking']
    },
    database: {
        name: 'Database Management',
        category: 'Data Storage',
        level: 86,
        description: 'Design and management of database systems',
        experience: '3+ years',
        projects: ['E-commerce Databases', 'User Management Systems', 'Analytics Platforms'],
        frameworks: ['MongoDB', 'PostgreSQL', 'Redis', 'Mongoose'],
        specialties: ['Schema Design', 'Query Optimization', 'Data Modeling', 'Indexing']
    },
    security: {
        name: 'Cybersecurity',
        category: 'Information Security',
        level: 93,
        description: 'Comprehensive security analysis and protection strategies',
        experience: '4+ years',
        projects: ['Security Audits', 'Penetration Testing', 'Vulnerability Assessments'],
        frameworks: ['OWASP', 'Metasploit', 'Burp Suite', 'Nmap'],
        specialties: ['Threat Analysis', 'Risk Assessment', 'Security Protocols', 'Incident Response']
    },
    lock: {
        name: 'Encryption & Cryptography',
        category: 'Data Security',
        level: 88,
        description: 'Advanced encryption methods and cryptographic protocols',
        experience: '3+ years',
        projects: ['Secure Communication Systems', 'Data Protection Solutions', 'Authentication Systems'],
        frameworks: ['OpenSSL', 'JWT', 'bcrypt', 'AES'],
        specialties: ['Public Key Infrastructure', 'Hash Functions', 'Digital Signatures', 'Key Management']
    },
    key: {
        name: 'Authentication Systems',
        category: 'Access Control',
        level: 90,
        description: 'Multi-factor authentication and access control implementation',
        experience: '3+ years',
        projects: ['User Authentication APIs', 'SSO Solutions', 'OAuth Implementation'],
        frameworks: ['OAuth 2.0', 'JWT', 'Passport.js', 'Auth0'],
        specialties: ['Multi-factor Authentication', 'Session Management', 'Role-based Access', 'SSO']
    },
    bug: {
        name: 'Penetration Testing',
        category: 'Ethical Hacking',
        level: 91,
        description: 'Systematic security testing and vulnerability exploitation',
        experience: '4+ years',
        projects: ['Web Application Testing', 'Network Security Assessment', 'Mobile App Security'],
        frameworks: ['Metasploit', 'Burp Suite', 'OWASP ZAP', 'Nessus'],
        specialties: ['Web App Testing', 'Network Scanning', 'Social Engineering', 'Report Writing']
    },
    c: {
        name: 'C Programming',
        category: 'System Programming',
        level: 85,
        description: 'Low-level programming language for system development',
        experience: '3+ years',
        projects: ['Operating System Components', 'Embedded Systems', 'Performance-Critical Applications'],
        frameworks: ['GCC', 'Make', 'Valgrind', 'GDB'],
        specialties: ['Memory Management', 'Pointers', 'System Calls', 'Performance Optimization']
    },
    cpp: {
        name: 'C++',
        category: 'Object-Oriented Programming',
        level: 87,
        description: 'Powerful language for high-performance applications',
        experience: '3+ years',
        projects: ['Game Development', 'Desktop Applications', 'Algorithm Implementation'],
        frameworks: ['STL', 'Boost', 'Qt', 'CMake'],
        specialties: ['OOP Design', 'Template Programming', 'STL', 'Performance Tuning']
    },
    express: {
        name: 'Express.js',
        category: 'Web Framework',
        level: 89,
        description: 'Fast and minimalist web framework for Node.js',
        experience: '3+ years',
        projects: ['REST APIs', 'Web Applications', 'Microservices'],
        frameworks: ['Express', 'Middleware', 'Router', 'Helmet'],
        specialties: ['API Development', 'Middleware Design', 'Error Handling', 'Security']
    },
    aws: {
        name: 'Amazon Web Services',
        category: 'Cloud Computing',
        level: 83,
        description: 'Comprehensive cloud platform for scalable applications',
        experience: '2+ years',
        projects: ['Web Hosting', 'Database Services', 'Serverless Functions'],
        frameworks: ['EC2', 'S3', 'Lambda', 'RDS'],
        specialties: ['Cloud Architecture', 'Auto Scaling', 'Load Balancing', 'Cost Optimization']
    },
    php: {
        name: 'PHP',
        category: 'Server-Side Scripting',
        level: 84,
        description: 'Popular server-side scripting language for web development',
        experience: '3+ years',
        projects: ['Dynamic Websites', 'Content Management Systems', 'E-commerce Platforms'],
        frameworks: ['Laravel', 'Symfony', 'CodeIgniter', 'WordPress'],
        specialties: ['Web Development', 'Database Integration', 'Session Management', 'API Development']
    },
    penetration: {
        name: 'Penetration Testing',
        category: 'Ethical Hacking',
        level: 93,
        description: 'Authorized simulated cyberattack to evaluate security',
        experience: '4+ years',
        projects: ['Web App Pentesting', 'Network Assessment', 'Mobile Security Testing'],
        frameworks: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Nmap'],
        specialties: ['OWASP Top 10', 'Network Scanning', 'Exploit Development', 'Security Reporting']
    },
    encryption: {
        name: 'Encryption & Cryptography',
        category: 'Data Security',
        level: 88,
        description: 'Advanced encryption methods and cryptographic protocols',
        experience: '3+ years',
        projects: ['Secure Communication Systems', 'Data Protection Solutions', 'Authentication Systems'],
        frameworks: ['OpenSSL', 'JWT', 'bcrypt', 'AES'],
        specialties: ['Public Key Infrastructure', 'Hash Functions', 'Digital Signatures', 'Key Management']
    },
    vulnerability: {
        name: 'Vulnerability Assessment',
        category: 'Security Analysis',
        level: 90,
        description: 'Systematic identification and analysis of security weaknesses',
        experience: '4+ years',
        projects: ['Infrastructure Scanning', 'Web App Assessment', 'Compliance Audits'],
        frameworks: ['Nessus', 'OpenVAS', 'Qualys', 'Rapid7'],
        specialties: ['Vulnerability Scanning', 'Risk Assessment', 'Patch Management', 'Compliance']
    },
    network: {
        name: 'Network Security',
        category: 'Infrastructure Security',
        level: 86,
        description: 'Protecting network infrastructure from threats and attacks',
        experience: '3+ years',
        projects: ['Firewall Configuration', 'Intrusion Detection', 'Network Monitoring'],
        frameworks: ['Wireshark', 'pfSense', 'Snort', 'Suricata'],
        specialties: ['Firewall Management', 'IDS/IPS', 'Network Monitoring', 'Protocol Analysis']
    },
    hacking: {
        name: 'Ethical Hacking',
        category: 'White Hat Security',
        level: 92,
        description: 'Authorized hacking to identify and fix security vulnerabilities',
        experience: '4+ years',
        projects: ['Bug Bounty Programs', 'Security Audits', 'Red Team Operations'],
        frameworks: ['Kali Linux', 'Parrot OS', 'BlackArch', 'Custom Tools'],
        specialties: ['Social Engineering', 'Physical Security', 'Web Exploitation', 'Privilege Escalation']
    },
    auditing: {
        name: 'Security Auditing',
        category: 'Compliance & Assessment',
        level: 87,
        description: 'Comprehensive security assessment and compliance verification',
        experience: '3+ years',
        projects: ['ISO 27001 Audits', 'PCI DSS Compliance', 'GDPR Assessment'],
        frameworks: ['NIST', 'ISO 27001', 'CIS Controls', 'COBIT'],
        specialties: ['Compliance Frameworks', 'Risk Management', 'Policy Development', 'Audit Reporting']
    },
    sqlinjection: {
        name: 'SQL Injection',
        category: 'Web Application Security',
        level: 94,
        description: 'Code injection technique used to attack data-driven applications',
        experience: '4+ years',
        projects: ['Web App Testing', 'Database Security Assessment', 'Secure Coding Training'],
        frameworks: ['SQLMap', 'Burp Suite', 'OWASP ZAP', 'Manual Testing'],
        specialties: ['Union-based Injection', 'Blind SQL Injection', 'Time-based Attacks', 'Prevention Techniques']
    },
    attacks: {
        name: 'Attack Types & Methods',
        category: 'Threat Intelligence',
        level: 91,
        description: 'Comprehensive knowledge of various cyber attack methodologies',
        experience: '4+ years',
        projects: ['Threat Modeling', 'Attack Simulation', 'Security Awareness Training'],
        frameworks: ['MITRE ATT&CK', 'Kill Chain', 'Diamond Model', 'Threat Intelligence'],
        specialties: ['Phishing', 'Malware Analysis', 'Social Engineering', 'Advanced Persistent Threats']
    }
};

// Hacker Terminal Functions
function showHackerTerminal(skill) {
    console.log('showHackerTerminal called with skill:', skill); // Debug log
    const terminal = document.getElementById('hacker-terminal');
    const output = document.getElementById('terminal-output');

    if (!terminal || !output) {
        console.error('Terminal elements not found!');
        return;
    }

    // Clear previous output
    output.innerHTML = '';

    // Show terminal
    terminal.classList.add('active');
    console.log('Terminal should now be visible'); // Debug log

    // Start hacker typing animation
    hackTypeSkillInfo(skill, output);
}

function closeHackerTerminal() {
    const terminal = document.getElementById('hacker-terminal');
    terminal.classList.remove('active');
}

function hackTypeSkillInfo(skillKey, outputElement) {
    const skill = skillsDatabase[skillKey];
    if (!skill) return;

    const messages = [
        `<span class="info">[INFO]</span> Initiating skill scan...`,
        `<span class="warning">[SCAN]</span> Target: ${skill.name}`,
        `<span class="success">[FOUND]</span> Skill acquired: <span class="highlight">${skill.name}</span>`,
        `<span class="info">[DATA]</span> Category: ${skill.category}`,
        `<span class="success">[LEVEL]</span> Proficiency: ${skill.level}%`,
        `<span class="info">[DESC]</span> ${skill.description}`,
        `<span class="warning">[EXP]</span> Experience: ${skill.experience}`,
        `<span class="info">[FRAMEWORKS]</span> Technologies: ${skill.frameworks.join(', ')}`,
        `<span class="success">[PROJECTS]</span> Applied in: ${skill.projects.join(', ')}`,
        `<span class="highlight">[SPECIALTIES]</span> ${skill.specialties.join(' • ')}`,
        `<span class="success">[STATUS]</span> Skill scan completed successfully!`
    ];

    let currentMessage = 0;

    function typeNextMessage() {
        if (currentMessage >= messages.length) {
            // Add skill bar at the end
            setTimeout(() => {
                addSkillBar(skill, outputElement);
            }, 500);
            return;
        }

        const message = messages[currentMessage];
        let currentChar = 0;
        const messageDiv = document.createElement('div');
        outputElement.appendChild(messageDiv);

        function typeChar() {
            if (currentChar < message.length) {
                messageDiv.innerHTML = message.substring(0, currentChar + 1);
                currentChar++;
                setTimeout(typeChar, Math.random() * 50 + 20); // Random typing speed
            } else {
                currentMessage++;
                setTimeout(typeNextMessage, Math.random() * 300 + 200);
            }
        }

        typeChar();
    }

    typeNextMessage();
}

function addSkillBar(skill, outputElement) {
    const skillBarHTML = `
        <div class="skill-bar">
            <div class="skill-bar-name">${skill.name}</div>
            <div class="skill-bar-container">
                <div class="skill-bar-fill" data-level="${skill.level}"></div>
            </div>
            <div class="skill-bar-percent">${skill.level}%</div>
        </div>
    `;

    outputElement.innerHTML += skillBarHTML;

    // Animate skill bar
    setTimeout(() => {
        const skillBarFill = outputElement.querySelector('.skill-bar-fill[data-level="' + skill.level + '"]');
        if (skillBarFill) {
            skillBarFill.style.width = skill.level + '%';
        }
    }, 100);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initial active link
    updateActiveNavLink();

    // Initialize 3D globe
    initialize3DGlobe();

    // Initialize logo click events (fallback if not initialized in globe function)
    setTimeout(() => {
        const logoItems = document.querySelectorAll('.logo-item');
        console.log('Found logo items:', logoItems.length); // Debug log

        logoItems.forEach((item, index) => {
            console.log(`Logo ${index}:`, item.getAttribute('data-lang')); // Debug log

            // Store original CSS transform to prevent jumping
            const computedStyle = getComputedStyle(item);
            const originalTransform = computedStyle.transform;
            item.dataset.originalTransform = originalTransform;

            // Ensure click event is attached
            item.style.cursor = 'pointer';

            // Add proper hover effects that preserve 3D positioning
            item.addEventListener('mouseenter', function() {
                this.style.zIndex = '100';
                this.style.transform = this.dataset.originalTransform + ' scale(1.3)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.zIndex = '10';
                this.style.transform = this.dataset.originalTransform;
            });

            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                console.log('Globe logo clicked:', lang); // Debug log
                if (lang && skillsDatabase[lang]) {
                    showHackerTerminal(lang);
                } else {
                    console.log('Skill not found in database:', lang);
                }
            }, { passive: false });
        });
    }, 500);

    // Initialize skills click functionality
    initializeSkillsClickHandlers();

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


// Initialize Skills Click Handlers
function initializeSkillsClickHandlers() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(skillItem => {
        skillItem.addEventListener('click', function() {
            const skillName = this.querySelector('span').textContent.toLowerCase().trim();

            // Map skill names to database keys
            const skillMap = {
                'html5': 'html',
                'css3': 'css',
                'javascript': 'javascript',
                'react': 'react',
                'c': 'c',
                'c++': 'cpp',
                'angular': 'angular',
                'github': 'github',
                'node.js': 'node',
                'python': 'python',
                'mongodb': 'database',
                'express.js': 'express',
                'aws': 'aws',
                'docker': 'docker',
                'database': 'database',
                'php': 'php',
                'penetration testing': 'penetration',
                'encryption': 'encryption',
                'vulnerability assessment': 'vulnerability',
                'network security': 'network',
                'ethical hacking': 'hacking',
                'security auditing': 'auditing',
                'sql injection': 'sqlinjection',
                'type of attacks': 'attacks'
            };

            const skillKey = skillMap[skillName];
            if (skillKey && skillsDatabase[skillKey]) {
                showHackerTerminal(skillKey);
            } else {
                console.log('Skill not found:', skillName);
            }
        });
    });
}