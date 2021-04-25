import React from 'react'
import CardForm from './CardForm'
import * as ReactRedux from 'react-redux'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import { build, fake } from '@jackfranklin/test-data-bot'
import { ICard } from '../../store/models/card/types'
import { createStore } from 'redux'
import { rootReducer } from '../../store/redux'

// Builder
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

// Test suite
describe('Test: <CardForm/>', () => {
  // Render form elements.
  it('should render name, image and submit', () => {
    // Arrange
    const { queryByLabelText, queryByText } = render(
      <Provider store={createStore(rootReducer)}>
        <CardForm card={cardBuilder()} />
      </Provider>
    )
    // Act & Assert
    expect(queryByLabelText(/card name:/i)).toBeTruthy()
    expect(queryByLabelText(/image url:/i)).toBeTruthy()
    expect(queryByText(/edit card/i)).toBeTruthy()
  })

  // Render form elements with card values.
  it('Render form elements with card values', () => {
    // Arrange
    const card = cardBuilder()
    const { getByLabelText } = render(
      <Provider store={createStore(rootReducer)}>
        <CardForm card={card} />
      </Provider>
    )
    // Act
    const inputName = getByLabelText(/card name:/i) as HTMLInputElement
    const inputImage = getByLabelText(/image url:/i) as HTMLInputElement
    // Assert
    expect(inputName.value).toBe(card.name)
    expect(inputImage.value).toBe(card.imageUrl)
  })

  // Form submit
  it('should submit form', () => {
    // Arrange
    const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch')
    const mockDispatchFn = jest.fn()
    useDispatchSpy.mockReturnValue(mockDispatchFn)
    const card = cardBuilder()
    const { getByText } = render(
      <Provider store={createStore(rootReducer)}>
        <CardForm card={card} />
      </Provider>
    )
    // Act
    const submit = getByText(/edit card/i)
    fireEvent.click(submit)
    // Assert
    expect(useDispatchSpy).toHaveBeenCalledTimes(1)
    // Teardown
    useDispatchSpy.mockClear()
  })
})
