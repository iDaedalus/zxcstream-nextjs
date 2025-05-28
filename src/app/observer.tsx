"use client";

import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string | null;
}

const LazyImage = ({
  src,
  alt,
  className,
  placeholder = null,
}: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Don't render the <img> until either placeholder or src is ready
  const imageSrc = isVisible ? src : placeholder;

  if (!imageSrc) return null;

  return <img ref={imgRef} src={imageSrc} alt={alt} className={className} />;
};

export default LazyImage;
