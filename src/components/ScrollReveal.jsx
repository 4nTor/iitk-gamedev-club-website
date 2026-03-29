import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  distance = 28,
  threshold = 0.16,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms`, '--reveal-distance': `${distance}px` }}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
