import { all, fork } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { CardState } from './models/card/types'
import { cardReducer } from './models/card/reducer'
import { watchFetchCards } from './models/card/sagas'
import { watchCallEvents } from './models/events/sagas'
import { userReducer } from './models/user/reducer'
import { UserState } from './models/user/types'
import { SagaIterator } from 'redux-saga'

// Redux.
export interface Store {
  cards: CardState
  user: UserState
}

export const rootReducer = combineReducers({
  cards: cardReducer,
  user: userReducer
})

export type RootReducer = ReturnType<typeof rootReducer>

// Sagas.
export const rootSaga = function* root(): SagaIterator<void> {
  yield all([fork(watchFetchCards), fork(watchCallEvents)])
}
