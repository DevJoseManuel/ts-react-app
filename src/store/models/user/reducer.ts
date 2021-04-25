import { Reducer, AnyAction } from 'redux'
import { UserActionTypes, UserState } from './types'

/** User initial state. */
export const initialState: UserState = {
  model: { userId: '' },
  ui: { totalCards: 0 }
}

/** User reducer. */
const reducer: Reducer<UserState> = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case UserActionTypes.SET_TOTAL_CARDS:
      return {
        ...state,
        ui: {
          ...state.ui,
          totalCards: action.payload.totalCards
        }
      }

    case UserActionTypes.SET_USER:
      return {
        ...state,
        model: {
          ...state.model,
          userId: action.payload.userId
        }
      }

    case UserActionTypes.SUBTRACT_TOTAL_CARDS:
      return {
        ...state,
        ui: {
          ...state.ui,
          totalCards: state.ui.totalCards - action.payload.totalCards
        }
      }

    default:
      return state
  }
}

export { reducer as userReducer }
