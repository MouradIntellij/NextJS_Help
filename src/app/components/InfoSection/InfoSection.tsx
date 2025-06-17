import React from "react";
import Item from "./Item/Item";
import styles from "./infoSection.module.css";

interface Highlight {
  title: string;
  description: string;
  link?: string | null;
}

interface SectionProps {
  heading?: string | null;
  highlights: Highlight[];
}

export default function HighlightSection({ heading, highlights }: SectionProps) {
  return (
    <section className={`${styles.section} ${heading ? '' : styles.sectionCourse}`}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div className={styles.list}>
        {heading && highlights.map((item, index) => (
          <Item key={index} title={item.title} description={item.description} />
        ))}
        {!heading && highlights.map((item, index) => (
          <Item key={index} title={item.title} description={item.description} link={item.link}/>
        ))}
      </div>
    </section>
  );
}
