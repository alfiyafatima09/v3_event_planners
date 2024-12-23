interface Star {
    x: number;
    y: number;
    size: number;
    brightness: number;
    twinkleSpeed: number;
    twinkleOffset: number;
    velocityX: number;
    velocityY: number;
    originalX: number;
    originalY: number;
    sparkleIntensity: number;
  }
  
  export const createStarAnimation = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
  
    const stars: Star[] = [];
    const numStars = 200; 
    let animationFrameId: number;
    let time = 0;
  
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
  
    const drawStarShape = (x: number, y: number, size: number, opacity: number, sparkleIntensity: number) => {
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size * 0.3;
      
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes;
        const pointX = x + Math.cos(angle - Math.PI / 2) * radius;
        const pointY = y + Math.sin(angle - Math.PI / 2) * radius;
        
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      
      // Brighter and more vibrant golden glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, outerRadius * 1.5);
      gradient.addColorStop(0, `rgba(255, 230, 130, ${opacity * sparkleIntensity * 1.0})`);
      gradient.addColorStop(0.3, `rgba(255, 200, 0, ${opacity * 0.9})`);
      gradient.addColorStop(0.6, `rgba(218, 180, 50, ${opacity * 0.7})`);
      gradient.addColorStop(1, `rgba(184, 150, 30, ${opacity * 0.5})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
    };
  
    const initStars = () => {
      resizeCanvas();
      stars.length = 0;
  
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({
          x,
          y,
          originalX: x,
          originalY: y,
          size: Math.random() * 3 + 1, 
          brightness: Math.random() * 0.8 + 0.4, // Increased brightness
          twinkleSpeed: Math.random() * 0.005 + 0.002,
          twinkleOffset: Math.random() * Math.PI * 2,
          velocityX: (Math.random() - 0.5) * 0.08,
          velocityY: (Math.random() - 0.5) * 0.08,
          sparkleIntensity: Math.random()
        });
      }
    };
  
    const updateStar = (star: Star) => {
      const maxDistance = 5;
      const dx = star.x - star.originalX;
      const dy = star.y - star.originalY;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance > maxDistance) {
        star.velocityX *= -0.9;
        star.velocityY *= -0.9;
      }
  
      star.x += star.velocityX;
      star.y += star.velocityY;
  
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
      const sparklePhase = (Math.sin(time * 2.5 + star.twinkleOffset) + 1) / 2;
      const opacity = star.brightness * (0.6 + twinkle * 0.4); // Increased opacity
      const currentSparkle = star.sparkleIntensity * (0.7 + sparklePhase * 0.3);
  
      drawStarShape(star.x, star.y, star.size, opacity, currentSparkle);
    };
  
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Even lighter trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      time += 0.016;
      stars.forEach(updateStar);
  
      animationFrameId = requestAnimationFrame(animate);
    };
  
    const cleanup = () => {
      cancelAnimationFrame(animationFrameId);
    };
  
    return {
      initStars,
      animate,
      cleanup,
      resizeCanvas
    };
  };






