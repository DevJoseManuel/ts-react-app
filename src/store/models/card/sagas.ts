import { put, call, takeEvery } from 'redux-saga/effects'
import { ICard, CardActionTypes } from './types'
import { apiFetchCards } from '../../../api/api-cards'
import { setLoading, setCards } from './actions'

// Watchers.
export function* watchFetchCards() {
  yield takeEvery(CardActionTypes.FETCH_DATA, fetchCards)
}

// Working.
function* fetchCards() {
  try {
    yield put(setLoading(true))
    const data: ICard[] = yield call(apiFetchCards)
    yield put(setCards(data))
  } catch (err) {
    // TODO
    console.log('se ha producido un error')
  } finally {
    yield put(setLoading(false))
  }
}
