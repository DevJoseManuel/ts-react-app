import { put, call, takeEvery } from 'redux-saga/effects'
import { ICard, CardActionTypes } from './types'
import { apiFetchCards } from '../../../api/api-cards'
import { setLoading, setCards, setError } from './actions'
import { setTotalCards } from '../user/actions'
import { SagaIterator } from 'redux-saga'

// Watchers.
export function* watchFetchCards(): SagaIterator {
  yield takeEvery(CardActionTypes.FETCH_DATA, fetchCards)
}

// Working.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* fetchCards(): any {
  try {
    yield put(setLoading(true))
    const data: ICard[] = yield call(apiFetchCards)
    yield put(setCards(data))
    yield put(setTotalCards(data.reduce((acc, e) => (acc += e.count.total), 0)))
  } catch (err) {
    yield put(setError(err.message))
  } finally {
    yield put(setLoading(false))
  }
}
