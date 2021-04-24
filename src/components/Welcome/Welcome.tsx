import React from 'react'
import Spinner from '../Spinner/Spinner'
import styles from './welcome.module.css'

const Welcome: React.FC = () => (
  <div className={styles.wrapper}>
    <h3>Loading cards...</h3>
    <Spinner />
  </div>
)

export default Welcome
