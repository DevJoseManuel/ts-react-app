import _ from 'lodash'
import React from 'react'
import styles from './deck-table-no-data.module.css'
import DeckTableAlert from './DeckTableAlert'
import { Dispatch } from 'redux'
import { Store } from '../../store/redux'
import { useDispatch, useSelector } from 'react-redux'
import { CardReduxEvent, CardState } from '../../store/models/card/types'
import { clearFilter, fetchData } from '../../store/models/card/actions'

const DeckTableNoData: React.FC = () => {
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()
  const { model } = useSelector<Store, CardState>(state => state.cards)

  const noCards = _.isEmpty(model.result)

  return (
    <div className={styles.wrapper}>
      <DeckTableAlert />
      <h3>{noCards ? 'No cards left' : 'Sorry! no data found'}</h3>
      <h4>Try something else</h4>
      <button
        className='secondary'
        onClick={() =>
          noCards ? dispatch(fetchData()) : dispatch(clearFilter())
        }
      >
        {noCards ? 'Reload all cards' : 'Clear filter'}
      </button>
    </div>
  )
}

export default DeckTableNoData
