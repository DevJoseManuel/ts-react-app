import { normalize, schema } from 'normalizr'
import { Reducer } from 'redux'
import { CardActionTypes, CardState } from './types'

// Define card schema.
const cardSchema = new schema.Entity('card', {}, { idAttribute: '_id' })
const deckSchema = [cardSchema]

/** Card initial state. */
const initialState: CardState = {
  model: { entities: { card: {} }, result: [] },
  ui: { loading: false, error: undefined }
}

/** Card reducer. */
const reducer: Reducer<CardState> = (state = initialState, action) => {
  switch (action.type) {
    case CardActionTypes.SET_CARDS:
      return {
        ...state,
        model: normalize(action.payload.cards, deckSchema)
      }

    case CardActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload.error
      }

    case CardActionTypes.SET_LOADING:
      return {
        ...state,
        ui: { ...state.ui, loading: action.payload.isLoading }
      }

    default:
      return state
  }
}

export { reducer as cardReducer }
