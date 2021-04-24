import React from 'react'
import Spinner from '../Spinner/Spinner'
import styles from './welcome.module.css'

const Welcome: React.FC = () => (
  <div className={styles.wrapper}>
    <img
      className={styles.welcomeLogo}
      src='https://static.streamloots.com/1ee0e8bc-5be9-4cd0-ae7f-f2ceb707ab44/brand/streamloots-ver_coral.svg'
    />
    <h3>Loading cards...</h3>
    <Spinner />
  </div>
)

export default Welcome
