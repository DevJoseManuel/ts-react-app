import _ from 'lodash'
import { normalize, schema } from 'normalizr'
import { Reducer } from 'redux'
import { CardActionTypes, CardState } from './types'

// Define card schema.
const cardSchema = new schema.Entity('card', {}, { idAttribute: '_id' })
const deckSchema = [cardSchema]

/** Card initial state. */
const initialState: CardState = {
  model: { entities: { card: {} }, result: [] },
  ui: { loading: false }
}

/** Card reducer. */
const reducer: Reducer<CardState> = (state = initialState, action) => {
  switch (action.type) {
    case CardActionTypes.CLEAR_CARD_ID:
      return {
        ...state,
        ui: _.omit(state.ui, 'cardId')
      }

    case CardActionTypes.DELETE_CARD: {
      const card = _.omit(state.model.entities.card, action.payload.cardId)
      const result = state.model.result.filter(e => e !== action.payload.cardId)
      return {
        ...state,
        model: { entities: { card }, result }
      }
    }

    case CardActionTypes.EDIT_CARD: {
      const edited = _.merge(
        {},
        state.model.entities.card[action.payload._id],
        action.payload
      )
      const card = _.merge({}, state.model.entities.card, {
        [action.payload._id]: edited
      })
      return {
        model: { ...state.model, entities: { card } },
        ui: { ..._.omit(state.ui, 'cardId'), message: 'Card edited!' }
      }
    }

    case CardActionTypes.SET_CARD_ID: {
      return {
        ...state,
        ui: { ...state.ui, cardId: action.payload.cardId }
      }
    }
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
