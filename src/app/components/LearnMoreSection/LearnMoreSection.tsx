// import styles from './learnMoreSection.module.css';

// export default function LearnMoreSection() {
//   return (
//     <section className={styles.section}>
//       <h2 className={styles.heading}>To learn more</h2>
//       <a
//         href="https://www.dropbox.com/scl/fo/n03ifbhvi4lhagfwfgrb7/AP1VsZmE4nyWj82-4YFogyQ?rlkey=508ffdzosapd25eo836prlnyc&e=1&st=42k98kna&dl=0"
//         target="_blank"
//         rel="noopener noreferrer"
//         className={styles.button}
//       >
//         Access my CV
//       </a>
//     </section>
//   );
// }

import styles from './learnMoreSection.module.css';
import "../../parallax.css";

export default function LearnMoreSection() {
  return (
    <section className={`${styles.section} parallax-container`}>
      <div
        className="parallax-background"
        style={{ backgroundImage: "url('/imgs/clinical.png')"}}
      ></div>
      <div className={styles.content}>
        <h2 className={styles.heading}>To learn more</h2>
        <a
          href="https://www.dropbox.com/scl/fo/n03ifbhvi4lhagfwfgrb7/AP1VsZmE4nyWj82-4YFogyQ?rlkey=508ffdzosapd25eo836prlnyc&e=1&st=42k98kna&dl=0"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Access my CV
        </a>
      </div>
    </section>
  );
}
