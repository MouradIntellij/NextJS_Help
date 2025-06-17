import styles from './introSection.module.css';

export default function IntroSection() {
    return(
        <div className={styles.section}>
          <h1 className={styles.heading}>What is BTG intelligence?</h1>
          <p className={styles.text}>BTG Intelligence stands for Bridging the Gap Intelligence—a philosophy and a platform that brings together Clinical Expertise, Educational Leadership, and Strategic Business Thinking to deliver innovative and sustainable solutions in healthcare and professional development.</p>
        </div>
    );
}