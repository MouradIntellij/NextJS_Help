'use client'

import React, { useState } from 'react';
import styles from './btgSection.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

interface Slide {
  title: string;
  subHeading: string;
  content: string;
  finish?: string | null;
}

interface SectionProps{
  slides: Slide[];
}

export default function BtgSection({ slides }: SectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500); // Animation duration
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className={styles.carouselSection}>
      <button 
        onClick={goToPrev} 
        className={styles.navButton}
        disabled={isAnimating}
      >
        <FaAngleLeft/>
      </button>
      
      <div 
        className={`${styles.slideContent} ${
          direction === 'right' ? styles.slideEnterRight : styles.slideEnterLeft
        }`}
        key={currentIndex}
      >
        <h2 className={styles.slideTitle}>{currentSlide.title}</h2>
        <h3 className={styles.slideSubHeading}>{currentSlide.subHeading}</h3>
        <ul className={styles.slideText}>
          {currentSlide.content.split('\n').map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
        {currentSlide.finish && <h3 className={styles.slideFinish}>{currentSlide.finish}</h3>}
      </div>

      <button 
        onClick={goToNext} 
        className={styles.navButton}
        disabled={isAnimating}
      >
        <FaAngleRight/>
      </button>
    </section>
  );
}