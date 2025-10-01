import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, direction = 'up', delay = 0 }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default ScrollReveal;