import _ from 'lodash'
import React from 'react'
import styles from './deck-table-alert.module.css'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { CardState, CardReduxEvent } from '../../store/models/card/types'
import { Store } from '../../store/redux'
import { clearAlert } from '../../store/models/card/actions'

const DeckTableAlert: React.FC = () => {
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()
  const { ui } = useSelector<Store, CardState>(state => state.cards)

  return (
    <>
      {_.isEmpty(ui.message) ? null : (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{ui.message}</h3>
            <button className='link' onClick={() => dispatch(clearAlert())}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DeckTableAlert
