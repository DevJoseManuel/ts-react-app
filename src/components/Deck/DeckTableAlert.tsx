import _ from 'lodash'
import React from 'react'
import styles from './deck-table-alert.module.css'
import useIsMounted from '../../hooks/useIsMounted'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { CardState, CardReduxEvent } from '../../store/models/card/types'
import { Store } from '../../store/redux'
import { clearAlert } from '../../store/models/card/actions'

const DeckTableAlert: React.FC = () => {
  const isMounted = useIsMounted()
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()
  const { ui } = useSelector<Store, CardState>(state => state.cards)

  React.useEffect(() => {
    if (isMounted() && !_.isEmpty(ui.message)) {
      setTimeout(() => {
        dispatch(clearAlert())
      }, 2000)
    }
  }, [isMounted, ui.message, dispatch])

  return (
    <>
      {_.isEmpty(ui.message) ? null : (
        <div className={styles.alert}>{ui.message}</div>
      )}
    </>
  )
}

export default DeckTableAlert
