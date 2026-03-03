import styles from './LoadingFallback.module.css'

export const LoadingFallback = () => (
  <div className={styles.loadingScreen}>
    <div className={styles.spinner}></div>
    <p>Loading...</p>
  </div>
)
