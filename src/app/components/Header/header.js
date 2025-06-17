"use client";

import React, { useState } from 'react';
import styles from './header.module.css';
import { FaBars, FaWhatsapp } from 'react-icons/fa';
import { FaXmark } from "react-icons/fa6";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const t = useTranslations('Header');

  return (
    <header className={styles.header}>
      <a
        href="https://wa.me/17053336682"
        className={styles.whatsappButton}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <h3 className={styles.title}>Marcos Rodrigues</h3>
      <div className={styles.headerButtons}>
        <Link href="/" className={styles.headerButton}>{t('home')}</Link>
        <div
          className={`${styles.headerButton} ${styles.dropdownContainer}`}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className={styles.dropdownToggle}>Expertise</span>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <Link href="/clinical" className={styles.dropdownItem}>{t('clinical')}</Link>
              <Link href="/education" className={styles.dropdownItem}>{t('education')}</Link>
              <Link href="/business" className={styles.dropdownItem}>{t('business')}</Link>
            </div>
          )}
        </div>
        <Link href="/mentorship" className={styles.headerButton}>{t('mentorship')}</Link>
        <Link
          href="https://marcosrodriguespro.blogspot.com/"
          className={styles.headerButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </Link>
        <Link href="/contact" className={styles.headerButton}>{t('contact')}</Link>
      </div>
      <button className={styles.hamburger} onClick={toggleSidebar} aria-label="Open sidebar">
        <FaBars />
      </button>
      {
        sidebarOpen && (
          <div className={`${styles.sidebar}`}>
            <button className={styles.sidebarItem} onClick={toggleSidebar} aria-label="Close sidebar"><FaXmark /></button>
            <a href="/" className={styles.sidebarItem}>Home</a>
            <a href="/clinical" className={styles.sidebarItem}>Clinical</a>
            <a href="/education" className={styles.sidebarItem}>Education</a>
            <a href="/business" className={styles.sidebarItem}>Business</a>
            <a href="/mentorship" className={styles.sidebarItem}>Mentorship</a>
            <a
              href="https://marcosrodriguespro.blogspot.com/"
              className={styles.sidebarItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>            
            <a href="/contact" className={styles.sidebarItem}>Contact</a>
            <Link
              href="https://www.dropbox.com/scl/fo/n03ifbhvi4lhagfwfgrb7/AP1VsZmE4nyWj82-4YFogyQ?rlkey=508ffdzosapd25eo836prlnyc&e=1&st=42k98kna&dl=0"
              className={styles.sidebarItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('cv')}
            </Link>
          </div>
        )}


      <Link
        href="https://www.dropbox.com/scl/fo/n03ifbhvi4lhagfwfgrb7/AP1VsZmE4nyWj82-4YFogyQ?rlkey=508ffdzosapd25eo836prlnyc&e=1&st=42k98kna&dl=0"
        className={styles.curriculumLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('cv')}
      </Link>

    </header>
  );
};

export default Header;

