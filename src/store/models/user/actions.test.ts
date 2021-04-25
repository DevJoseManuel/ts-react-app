import * as actions from './actions'
import faker from 'faker'
import { build, fake } from '@jackfranklin/test-data-bot'
import { IUser, UserAction, UserActionPayloads, UserActionTypes } from './types'

// Fake Builder
const userBuilder = build<IUser>('User', {
  fields: {
    userId: fake(f => f.random.uuid())
  }
})

const randomCards = () => faker.random.number({ min: 0, max: 100 })

// Action Builder
const actionBuilder = (
  type: UserActionTypes,
  payload: UserActionPayloads
): UserAction => ({
  type,
  payload
})

// Test Suite
describe('[Model: User] Action Creators', () => {
  // SET_TOTAL_CARDS = 'user/SET_TOTAL_CARDS',
  it('should create an action to set total cards', () => {
    const totalCards = randomCards()
    const expectedAction = actionBuilder(UserActionTypes.SET_TOTAL_CARDS, {
      totalCards
    })
    expect(actions.setTotalCards(totalCards)).toEqual(expectedAction)
  })

  // SET_USER
  it('should create an action to set user', () => {
    const userId = userBuilder().userId
    const expectedAction = actionBuilder(UserActionTypes.SET_USER, { userId })
    expect(actions.setUser(userId)).toEqual(expectedAction)
  })

  // SUBTRACT_TOTAL_CARDS = 'user/SUBTRACT_TOTAL_CARDS'
  it('should create an action to subtract total cards', () => {
    const totalCards = randomCards()
    const expectedAction = actionBuilder(UserActionTypes.SUBTRACT_TOTAL_CARDS, {
      totalCards
    })
    expect(actions.subtractTotalCards(totalCards)).toEqual(expectedAction)
  })
})
