import React from 'react'
import styles from './spinner.module.css'

const Spinner: React.FC = () => (
  <div className={styles.spinner}>
    <div className={styles.loading}></div>
  </div>
)

export default Spinner
