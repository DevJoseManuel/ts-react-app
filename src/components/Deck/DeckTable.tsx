import _ from 'lodash'
import React from 'react'
import DeckTableFilter from './DeckTableFilter'
import DeckTableNoData from './DeckTableNoData'
import DeckTableBody from './DeckTableBody'
import DeckTableAlert from './DeckTableAlert'
import styles from './deck-table.module.css'
import { useSelector } from 'react-redux'
import { CardState } from '../../store/models/card/types'
import { Store } from '../../store/redux'
import { UserReduxUI } from '../../store/models/user/types'

const DeckTable: React.FC = () => {
  const { model, ui } = useSelector<Store, CardState>(state => state.cards)
  const { totalCards } = useSelector<Store, UserReduxUI>(state => state.user.ui)

  const rows = _.isUndefined(ui.filter) ? model.result : ui.filter.results
  const text = _.isUndefined(ui.filter) ? '' : ui.filter.text

  return (
    <>
      <div className={styles.navbar}>
        <div>
          <div className={styles.topBar}>
            <h2>Card List</h2>
            <div className={styles.countName}>Total cards</div>
            <div className={styles.count}>{totalCards}</div>
          </div>
        </div>
        <DeckTableFilter text={text} />
        <DeckTableAlert />
      </div>
      <div className={styles.main}>
        {_.isEmpty(rows) ? <DeckTableNoData /> : <DeckTableBody rows={rows} />}
      </div>
    </>
  )
}

export default DeckTable
