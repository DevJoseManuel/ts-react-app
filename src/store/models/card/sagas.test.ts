import sagaHelper from 'redux-saga-testing'
import { put, call } from 'redux-saga/effects'
import { setCards, setError, setLoading } from './actions'
import { fetchCards } from './sagas'
import { mock } from '../../../api/mock-data'
import { apiFetchCards } from '../../../api/api-cards'
import { setTotalCards } from '../user/actions'

// Mocks
jest.mock('../../../api/api-cards', () => {
  return {
    apiFetchCards: jest.fn()
  }
})

afterAll(() => jest.clearAllMocks())

// Test Suite - Working Sagas
describe('[Model: Card] Sagas', () => {
  // Happy path
  describe('Scenario 1: Happy path', () => {
    const it = sagaHelper(fetchCards())
    it('1st - should call setLoading', result => {
      expect(result).toEqual(put(setLoading(true)))
    })
    it('2nd - should call API', result => {
      expect(result).toEqual(call(apiFetchCards))
      return mock
    })
    it('3rd - should call setCards', result => {
      expect(result).toEqual(put(setCards(mock)))
    })
    it('4th - should call setTotalCards', result => {
      const total = mock.reduce((acc, e) => (acc += e.count.total), 0)
      expect(result).toEqual(put(setTotalCards(total)))
    })
    it('5th - should call setLoading', result => {
      expect(result).toEqual(put(setLoading(false)))
    })
  })

  // API Broken
  describe('Scenario 2: API Broken', () => {
    const it = sagaHelper(fetchCards())
    it('1st - should call setLoading', result => {
      expect(result).toEqual(put(setLoading(true)))
    })
    it('2nd - should call API', result => {
      expect(result).toEqual(call(apiFetchCards))
      return new Error('Something went wrong')
    })
    it('3rd - should call setError', result => {
      expect(result).toEqual(put(setError('Something went wrong')))
    })
    it('4th - should call setLoading', result => {
      expect(result).toEqual(put(setLoading(false)))
    })
  })
})
