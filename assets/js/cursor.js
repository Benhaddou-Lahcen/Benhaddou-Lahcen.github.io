// Sparkle Trail Effect Only - NO CIRCLES
class SparkleTrail {
    constructor() {
        this.lastSparkleTime = 0;
        this.sparkleInterval = 25; // milliseconds between sparkles
        this.isDesktop = window.innerWidth > 1024;
        
        if (!this.isDesktop) return;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.createSparkle(e.clientX, e.clientY);
        });
        
        // Update on resize
        window.addEventListener('resize', () => {
            this.isDesktop = window.innerWidth > 1024;
        });
    }
    
    createSparkle(x, y) {
        if (!this.isDesktop) return;
        
        const now = Date.now();
        if (now - this.lastSparkleTime < this.sparkleInterval) return;
        
        this.lastSparkleTime = now;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random offset for natural movement
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.setProperty('--tx', offsetX + 'px');
        sparkle.style.setProperty('--ty', offsetY + 'px');
        
        // Random size variation
        const size = 3 + Math.random() * 3;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        document.body.appendChild(sparkle);
        
        // Remove after animation completes
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// Initialize sparkle trail when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SparkleTrail();
});
