import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  threshold?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold]);

  const getRevealClass = () => {
    switch (direction) {
      case 'left':
        return 'scroll-reveal-left';
      case 'right':
        return 'scroll-reveal-right';
      case 'scale':
        return 'scroll-reveal-scale';
      default:
        return 'scroll-reveal';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getRevealClass()} ${isVisible ? 'revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;