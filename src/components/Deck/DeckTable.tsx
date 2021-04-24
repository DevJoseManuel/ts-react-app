import _ from 'lodash'
import React from 'react'
import DeckTableFilter from './DeckTableFilter'
import DeckTableNoData from './DeckTableNoData'
import DeckTableBody from './DeckTableBody'
import styles from './deck-table.module.css'
import { useSelector } from 'react-redux'
import { CardState } from '../../store/models/card/types'
import { Store } from '../../store/redux'

const DeckTable: React.FC = () => {
  const { model, ui } = useSelector<Store, CardState>(state => state.cards)

  const rows = _.isUndefined(ui.filter) ? model.result : ui.filter.results
  const text = _.isUndefined(ui.filter) ? '' : ui.filter.text

  return (
    <>
      <div className={styles.navbar}>
        <h2>Card List</h2>
        <DeckTableFilter text={text} />
      </div>
      <div className={styles.main}>
        {_.isEmpty(rows) ? <DeckTableNoData /> : <DeckTableBody rows={rows} />}
      </div>
    </>
  )
}

export default DeckTable
