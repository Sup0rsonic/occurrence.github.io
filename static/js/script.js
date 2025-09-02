// Browser theme detection and auto dark mode
function detectAndApplyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('dark-mode');
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
});

// Manual theme toggle (keyboard shortcut)
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + D for manual theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Ctrl/Cmd + R to reset to auto theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'r' && e.shiftKey) {
        e.preventDefault();
        localStorage.removeItem('theme');
        detectAndApplyTheme();
    }
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    detectAndApplyTheme();
    
    // Add some subtle loading animation
    const logos = document.querySelectorAll('img');
    logos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform += ' translateY(20px)';
        
        setTimeout(() => {
            logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            logo.style.opacity = '1';
            logo.style.transform = logo.style.transform.replace('translateY(20px)', 'translateY(0)');
        }, index * 200);
    });
});

// Handle image loading errors gracefully
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            this.style.opacity = '0.3';
        });
        
        img.addEventListener('load', function() {
            console.log(`Successfully loaded: ${this.src}`);
        });
    });
});

// Add some easter eggs
let clickCount = 0;
document.addEventListener('click', function(e) {
    clickCount++;
    
    // Easter egg: 10 clicks anywhere toggles theme
    if (clickCount === 10) {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        clickCount = 0;
        
        // Show temporary message
        const message = document.createElement('div');
        message.textContent = '🎉 Theme toggled!';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 9999;
            font-size: 18px;
            pointer-events: none;
            animation: fadeInOut 2s ease forwards;
        `;
        
        // Add fadeInOut animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            style.remove();
        }, 2000);
    }
});

// Smooth mouse parallax effect with proper caching
let parallaxElements = {};
let rafId = null;
let mouseX = 0.5;
let mouseY = 0.5;

// Initialize parallax elements
document.addEventListener('DOMContentLoaded', function() {
    parallaxElements = {
        logoCenter: document.querySelector('.logo-center'),
        logoBottomLeft: document.querySelector('.logo-bottom-left'),
        bgOverlay: document.querySelector('.bg-overlay'),
        charCropped: document.querySelector('.char-cropped')
    };
});

// Mouse movement handler
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    // Cancel previous animation frame if it exists
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
    
    // Schedule new animation frame
    rafId = requestAnimationFrame(updateParallax);
});

function updateParallax() {
    // Calculate movement amounts (max 100px in any direction for fast, dramatic effect)
    const moveX = (mouseX - 0.5) * 200;
    const moveY = (mouseY - 0.5) * 200;
    
    // Apply parallax with different intensities
    if (parallaxElements.logoCenter) {
        parallaxElements.logoCenter.style.transform = `translate(calc(-50% + ${moveX * 1.8}px), calc(-50% + ${moveY * 1.8}px))`;
    }
    
    if (parallaxElements.logoBottomLeft) {
        parallaxElements.logoBottomLeft.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    }
    
    if (parallaxElements.bgOverlay) {
        parallaxElements.bgOverlay.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
    }
    
    if (parallaxElements.charCropped) {
        parallaxElements.charCropped.style.transform = `translate(${moveX * 0.4}px, ${moveY * 0.4}px)`;
    }
    
    rafId = null;
}

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
});
