import styles from './postCard.module.css';

interface PostCardProps {
  title: string;
}

export default function PostCard({ title }: PostCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.placeholder} />
      <p className={styles.title}>{title}</p>
    </div>
  );
}
