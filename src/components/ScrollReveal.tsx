import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 800,
  threshold = 0.15,
  className = '',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Check if element is already in viewport on mount (for tab switching)
    const rect = currentElement.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInViewport && !hasAnimated) {
      setTimeout(() => {
        setIsVisible(true);
        if (once) setHasAnimated(true);
      }, delay);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true);
            if (once) setHasAnimated(true);
          }, delay);
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold, once, hasAnimated]);

  const getInitialStyle = () => {
    if (isVisible) return {};
    
    switch (direction) {
      case 'up':
        return { transform: 'translateY(40px)', opacity: 0 };
      case 'down':
        return { transform: 'translateY(-40px)', opacity: 0 };
      case 'left':
        return { transform: 'translateX(40px)', opacity: 0 };
      case 'right':
        return { transform: 'translateX(-40px)', opacity: 0 };
      case 'scale':
        return { transform: 'scale(0.9)', opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { transform: 'translateY(40px)', opacity: 0 };
    }
  };

  const getVisibleStyle = () => {
    return {
      transform: 'translateY(0) translateX(0) scale(1)',
      opacity: 1
    };
  };

  return (
    <div 
      ref={elementRef} 
      className={className}
      style={{
        ...(!isVisible ? getInitialStyle() : getVisibleStyle()),
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;