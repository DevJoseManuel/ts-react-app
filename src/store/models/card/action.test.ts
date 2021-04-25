import * as actions from './actions'
import faker from 'faker'
import { build, fake } from '@jackfranklin/test-data-bot'
import { CardAction, CardActionPayloads, CardActionTypes, ICard } from './types'

// Fake Builder
const cardBuilder = build<ICard>('Card', {
  fields: {
    _id: fake(f => f.random.uuid()),
    name: fake(f => f.lorem.word()),
    imageUrl: fake(f => f.internet.url()),
    count: {
      total: fake(f => f.random.number({ min: 0, max: 10 }))
    }
  }
})

const deckBuilder = (): ICard[] => {
  const total = faker.random.number({ min: 0, max: 10 })
  return Array.from({ length: total }).map(() => cardBuilder())
}

const errorBuilder = build<{ message: string }>('Error', {
  fields: { message: fake(f => f.lorem.word()) }
})

const filterBuilder = build<{ filter: string }>('Filter', {
  fields: { filter: fake(f => f.lorem.words()) }
})

// Action Builder
const actionBuilder = (
  type: CardActionTypes,
  payload?: CardActionPayloads
): CardAction => ({
  type,
  payload
})

// Test Suite
describe('[Model: Card] Action Creators', () => {
  // CLEAR_ALERT
  it('should create an action to clear alert', () => {
    const expectedAction = actionBuilder(CardActionTypes.CLEAR_ALERT)
    expect(actions.clearAlert()).toEqual(expectedAction)
  })

  // CLEAR_CARD_ID
  it('should create an action to clear card id', () => {
    const expectedAction = actionBuilder(CardActionTypes.CLEAR_CARD_ID)
    expect(actions.clearCardId()).toEqual(expectedAction)
  })

  // CLEAR_FILTER
  it('should create an action to clear filter', () => {
    const expectedAction = actionBuilder(CardActionTypes.CLEAR_FILTER)
    expect(actions.clearFilter()).toEqual(expectedAction)
  })

  // DELETE CARD
  it('should create an action to delete a card', () => {
    const { _id } = cardBuilder()
    const expectedAction = actionBuilder(CardActionTypes.DELETE_CARD, {
      cardId: _id
    })
    expect(actions.deleteCard(_id)).toEqual(expectedAction)
  })

  // EDIT CARD
  it('should create an action to edit a card', () => {
    const { _id, name, imageUrl } = cardBuilder()
    const expectedAction = actionBuilder(CardActionTypes.EDIT_CARD, {
      cardId: _id,
      name,
      imageUrl
    })
    expect(actions.editCard(_id, name, imageUrl)).toEqual(expectedAction)
  })

  // FETCH DATA
  it('should create an action to fetch data', () => {
    const expectedAction = actionBuilder(CardActionTypes.FETCH_DATA)
    expect(actions.fetchData()).toEqual(expectedAction)
  })

  // SET CARD ID
  it('c set card id', () => {
    const { _id } = cardBuilder()
    const expectedAction = actionBuilder(CardActionTypes.SET_CARD_ID, {
      cardId: _id
    })
    expect(actions.setCardId(_id)).toEqual(expectedAction)
  })

  // SET CARDS
  it('should create an action to set cards', () => {
    const cards = deckBuilder()
    const expectedAction = actionBuilder(CardActionTypes.SET_CARDS, { cards })
    expect(actions.setCards(cards)).toEqual(expectedAction)
  })

  // SET ERROR
  it('should create an action to set error', () => {
    const error = errorBuilder().message
    const expectedAction = actionBuilder(CardActionTypes.SET_ERROR, { error })
    expect(actions.setError(error)).toEqual(expectedAction)
  })

  // SET FILTER
  it('should create an action to set filter', () => {
    const filter = filterBuilder().filter
    const expectedAction = actionBuilder(CardActionTypes.SET_FILTER, { filter })
    expect(actions.setFilter(filter)).toEqual(expectedAction)
  })

  // SET LOADING
  it('should create an action set loading', () => {
    const isLoading = faker.random.number({ min: 0, max: 10 }) >= 5
    const expectedAction = actionBuilder(CardActionTypes.SET_LOADING, {
      isLoading
    })
    expect(actions.setLoading(isLoading)).toEqual(expectedAction)
  })
})
