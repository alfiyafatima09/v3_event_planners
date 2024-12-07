import React, { useEffect, useRef } from 'react';
import { createStarAnimation } from '@/utils/starAnimation';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const animation = createStarAnimation(canvas);
    if (!animation) return;

    const { initStars, animate, cleanup, resizeCanvas } = animation;
    
    // Initialize and start animation
    initStars();
    animate();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      cleanup();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full bg-black"
      style={{ zIndex: -1 }}
    />
  );
};

export default StarBackground;