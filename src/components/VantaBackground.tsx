import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

interface VantaBackgroundProps {
  effect?: 'NET' | 'WAVES' | 'BIRDS' | 'DOTS';
  className?: string;
}

export function VantaBackground({ effect = 'NET', className = '' }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Only run on client side and on larger screens
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    // Dynamically import Vanta.js to avoid SSR issues
    const loadVanta = async () => {
      try {
        // Load Three.js first
        if (!window.THREE) {
          const THREE = await import('three');
          window.THREE = THREE;
        }

        // Load Vanta effect
        let vantaModule;
        switch (effect) {
          case 'NET':
            vantaModule = await import('vanta/dist/vanta.net.min');
            break;
          case 'WAVES':
            vantaModule = await import('vanta/dist/vanta.waves.min');
            break;
          case 'BIRDS':
            vantaModule = await import('vanta/dist/vanta.birds.min');
            break;
          case 'DOTS':
            vantaModule = await import('vanta/dist/vanta.dots.min');
            break;
          default:
            vantaModule = await import('vanta/dist/vanta.net.min');
        }

        if (vantaRef.current && vantaModule.default) {
          vantaEffect.current = vantaModule.default({
            el: vantaRef.current,
            THREE: window.THREE,
            color: 0x00c2a8,
            backgroundColor: 0x071028,
            points: 8,
            maxDistance: 20,
            spacing: 16,
            showDots: false,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 0.50
          });
        }
      } catch (error) {
        console.warn('Failed to load Vanta.js:', error);
      }
    };

    loadVanta();

    // Cleanup
    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error);
        }
      }
    };
  }, [effect]);

  return (
    <div
      ref={vantaRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ 
        opacity: 0.6,
        pointerEvents: 'none'
      }}
    />
  );
}
