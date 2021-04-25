import _ from 'lodash'
import { normalize, schema } from 'normalizr'
import { Reducer, AnyAction } from 'redux'
import { CardActionTypes, CardState } from './types'

// Define card schema.
const cardSchema = new schema.Entity('card', {}, { idAttribute: '_id' })
export const deckSchema = [cardSchema]

/** Card initial state. */
export const initialState: CardState = {
  model: { entities: { card: {} }, result: [] },
  ui: { loading: false }
}

/** Card reducer. */
const reducer: Reducer<CardState> = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case CardActionTypes.CLEAR_ALERT:
      return {
        ...state,
        ui: _.omit(state.ui, 'message')
      }

    case CardActionTypes.CLEAR_CARD_ID:
      return {
        ...state,
        ui: _.omit(state.ui, 'cardId')
      }

    case CardActionTypes.CLEAR_FILTER:
      return {
        ...state,
        ui: _.omit(state.ui, 'filter')
      }

    case CardActionTypes.DELETE_CARD: {
      const card = _.omit(state.model.entities.card, action.payload.cardId)
      const result = state.model.result.filter(e => e !== action.payload.cardId)
      const model = { entities: { card }, result }

      const ui = { ..._.omit(state.ui, 'cardId'), message: 'Card deleted!' }
      if (!_.isUndefined(ui.filter)) {
        ui.filter.results = ui.filter.results.filter(
          _id => _id !== action.payload.cardId
        )
      }

      return { model, ui }
    }

    case CardActionTypes.EDIT_CARD: {
      const edited = _.merge(
        {},
        state.model.entities.card[action.payload.cardId],
        action.payload
      )
      const card = _.merge({}, state.model.entities.card, {
        [action.payload.cardId]: edited
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
        ui: { ...state.ui, error: action.payload.error }
      }

    case CardActionTypes.SET_FILTER:
      const results = Object.values(state.model.entities.card)
        .filter(
          card =>
            card.name
              .toLowerCase()
              .indexOf(action.payload.filter.toLowerCase()) !== -1
        )
        .map(card => card._id)
      return {
        ...state,
        ui: {
          ...state.ui,
          filter: { text: action.payload.filter, results }
        }
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
