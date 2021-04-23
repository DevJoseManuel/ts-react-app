import { all, fork } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { CardState } from './models/card/types'
import { cardReducer } from './models/card/reducer'
import { watchFetchCards } from './models/card/sagas'

// Redux.
export interface Store {
  cards: CardState
}

export const rootReducer = combineReducers({
  cards: cardReducer
})

export type RootReducer = ReturnType<typeof rootReducer>

// Sagas.
export const rootSaga = function* root() {
  yield all([fork(watchFetchCards)])
}
