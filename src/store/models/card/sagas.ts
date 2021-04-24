import { put, call, takeEvery } from 'redux-saga/effects'
import { ICard, CardActionTypes } from './types'
import { apiFetchCards } from '../../../api/api-cards'
import { setLoading, setCards } from './actions'
import { setTotalCards } from '../user/actions'
import { SagaIterator } from 'redux-saga'

// Watchers.
export function* watchFetchCards(): SagaIterator<void> {
  yield takeEvery(CardActionTypes.FETCH_DATA, fetchCards)
}

// Working.
function* fetchCards() {
  try {
    yield put(setLoading(true))
    const data: ICard[] = yield call(apiFetchCards)
    yield put(setCards(data))
    yield put(setTotalCards(data.reduce((acc, e) => (acc += e.count.total), 0)))
  } catch (err) {
    // TODO
    console.error(err)
  } finally {
    yield put(setLoading(false))
  }
}
