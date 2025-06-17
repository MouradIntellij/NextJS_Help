// "use client"

// import React, { useState } from "react";
// import styles from "./item.module.css";

// interface ItemProps {
//   title: string;
//   description: string;
//   link?: string | null
// }

// export default function Item({ title, description, link }: ItemProps) {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div className={styles.item}>
//       <div className={styles.heading}>
//         <span className={styles.dot}></span>
//         <h3 className={styles.title}>{title}</h3>
//       </div>
//       <p className={`${styles.description} ${expanded ? styles.expanded : styles.collapsed} ${link ? styles.expanded : ''}`}>
//         {description}
//       </p>
//       {link ? (
//         <div className={styles.buttonWrapper}>
//         <a
//           href={link}
//           className={styles.courseButton}
//           rel="noopener noreferrer"
//           aria-label="Open course"
//           target="_blank"
//         >
//           Learn More
//         </a>
//         </div>
//       ) : (
//         description.length > 100 && (
//           <button className={styles.toggleButton} onClick={() => setExpanded(!expanded)}>
//             {expanded ? "Show less" : "Read more"}
//           </button>
//         )
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./item.module.css";

interface ItemProps {
  title: string;
  description: string;
  link?: string | null;
}

export default function Item({ title, description, link }: ItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = descRef.current;
    if (el) {
      const isTextClamped = el.scrollHeight > el.clientHeight + 2;
      setIsOverflowing(isTextClamped);
    }
  }, [description]);

  return (
    <div className={styles.item}>
      <div className={styles.heading}>
        <span className={styles.dot}></span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p
        ref={descRef}
        className={`${styles.description} ${expanded ? styles.expanded : styles.collapsed} ${
          link ? styles.expanded : ""
        }`}
      >
        {description}
      </p>
      {link ? (
        <div className={styles.buttonWrapper}>
          <a
            href={link}
            className={styles.courseButton}
            rel="noopener noreferrer"
            aria-label="Open course"
            target="_blank"
          >
            Learn More
          </a>
        </div>
      ) : (
        isOverflowing && (
          <button
            className={styles.toggleButton}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )
      )}
    </div>
  );
}
