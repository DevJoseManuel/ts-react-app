import { all, fork } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { cardReducer } from './models/card/reducer'
import { watchFetchCards } from './models/card/sagas'

// Reducers.
export const rootReducer = combineReducers({
  cards: cardReducer
})

export type RootReducer = ReturnType<typeof rootReducer>

// Sagas.
export const rootSaga = function* root() {
  yield all([fork(watchFetchCards)])
}
