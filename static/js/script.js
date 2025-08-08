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

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
});
