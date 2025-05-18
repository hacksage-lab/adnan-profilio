document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('active');
        
        // Burger Animation
        burger.classList.toggle('toggle');
        
        // Animate Links
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
            navItems.forEach(link => {
                link.style.animation = '';
            });
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Typed.js Effect
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const textArray = ["Ethical Hacker", "Web Developer", "Software Engineer", "Mobile App Developer", "Security Expert"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 1500;
        let textArrayIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 100);
            }
        }
        
        setTimeout(type, newTextDelay + 100);
    }
    
    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectGrid = document.querySelector('.project-grid');
    
    // Sample projects data - replace with your actual projects
    const projects = [
        {
            title: "Secure Banking App",
            description: "A mobile banking application with advanced security features and penetration testing.",
            image: "secure.webp",
            tags: ["security", "mobile"],
            github: "#",
            live: "#"
        },
        {
            title: "E-commerce Website",
            description: "A full-stack e-commerce platform built with React.js and Node.js.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0eyDaCiWgB4Ac-HiIiUrA7giu4yUS3L7BEA&s",
            tags: ["web"],
            github: "#",
            live: "#"
        },
        {
            title: "Vulnerability Scanner",
            description: "A Python tool for automated vulnerability scanning of web applications.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MOnt6D9-HUSEoNQTu5X1tMIgTgAnASJQmA&s",
            tags: ["security", "software"],
            github: "#",
            live: "#"
        },
        {
            title: "Task Management App",
            description: "A cross-platform task management application built with React Native.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWhuEQJ9H9diA6lgsVPeoTjVIoo5mHaugzfQ&s",
            tags: ["mobile"],
            github: "#",
            live: "#"
        },
        {
            title: "Portfolio Template",
            description: "A responsive portfolio template for developers and designers.",
            image: "https://marketplace.canva.com/EAFwckKNjDE/2/0/1600w/canva-black-white-grayscale-portfolio-presentation-vzScEqAI__M.jpg",
            tags: ["web"],
            github: "#",
            live: "#"
        },
        {
            title: "Network Monitoring Tool",
            description: "A C++ application for real-time network monitoring and analysis.",
            image: "https://www.motadata.com/wp-content/uploads/2024/05/network-monitoring.png",
            tags: ["software", "security"],
            github: "#",
            live: "#"
        }
    ];
    
    // Display projects
    function displayProjects(filter = 'all') {
        projectGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.tags.includes(filter));
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';
            projectCard.setAttribute('data-tags', project.tags.join(','));
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank"><i class="fab fa-github"></i> Code</a>
                        <a href="${project.live}" target="_blank"><i class="fas fa-external-link-alt"></i> Live</a>
                    </div>
                </div>
            `;
            
            projectGrid.appendChild(projectCard);
        });
    }
    
    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            displayProjects(filter);
        });
    });
    
    // Initialize with all projects
    displayProjects();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-content, .skills-container, .project-grid, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('slide-up');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});