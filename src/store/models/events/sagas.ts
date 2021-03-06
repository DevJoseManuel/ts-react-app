import { put, all, call, takeEvery } from 'redux-saga/effects'
import { deleteCard, editCard, setCardId, setError } from '../card/actions'
import { subtractTotalCards } from '../user/actions'
import { EventReduxEvent, EventActionTypes, IEvent } from './types'
import { SagaIterator } from 'redux-saga'
import {
  Analytics1EventNames,
  sendEvent as analytics1
} from '../../../api/analytics1'
import {
  Analytics2EventNames,
  sendEvent as analytics2
} from '../../../api/analytics2'

// watchFetch
export function* watchCallEvents(): SagaIterator {
  yield takeEvery('CALL_EVENT', callEvent)
}

// Working
function* callEvent(action: EventReduxEvent) {
  switch (action.payload.type) {
    case EventActionTypes.DELETE_CARD:
      yield deleteACard(action.payload.data)
      break
    case EventActionTypes.EDIT_CARD:
      yield editACard(action.payload.data)
      break
    case EventActionTypes.VIEW_CARD:
      yield viewACard(action.payload.data)
      break
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* deleteACard(data: IEvent) {
  try {
    yield put(deleteCard(data.cardId))
    yield put(subtractTotalCards(data.totalCards))
    yield all([
      call(analytics1, Analytics1EventNames.DELETE_CARD, data),
      call(analytics2, Analytics2EventNames.DELETE_CARD, data)
    ])
  } catch (err) {
    yield put(setError(err.message))
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* editACard(data: IEvent) {
  try {
    if (data.meta) {
      yield put(editCard(data.cardId, data.meta.name, data.meta.img))
      yield all([
        call(analytics1, Analytics1EventNames.EDIT_CARD, data),
        call(analytics2, Analytics2EventNames.EDIT_CARD, data)
      ])
    }
  } catch (err) {
    yield put(setError(err.message))
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* viewACard(data: IEvent) {
  try {
    yield put(setCardId(data.cardId))
    yield all([
      call(analytics1, Analytics1EventNames.VIEW_CARD, data),
      call(analytics2, Analytics2EventNames.VIEW_CARD, data)
    ])
  } catch (err) {
    yield put(setError(err.message))
  }
}
