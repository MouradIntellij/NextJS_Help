import styles from './searchBar.module.css';

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search posts..." className={styles.input} />
      <button className={styles.filterButton}>Filter</button>
    </div>
  );
}
