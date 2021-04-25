import React from 'react'
import CardRow from './CardRow'
import * as ReactRedux from 'react-redux'
import { Provider } from 'react-redux'
import { render, fireEvent, within } from '@testing-library/react'
import { createStore } from 'redux'
import { rootReducer } from '../../store/redux'
import { build, fake } from '@jackfranklin/test-data-bot'
import { ICard } from '../../store/models/card/types'

// Builder
const cardBuilder = build<ICard>('Card', {
  fields: {
    _id: fake(f => f.random.uuid()),
    name: fake(f => f.lorem.word()),
    imageUrl: fake(f => `${f.internet.url()}/`),
    count: {
      total: fake(f => f.random.number({ min: 0, max: 10 }))
    }
  }
})

// Test suite
describe('Test: <CardRow/>', () => {
  // Render row elements
  it('should render name, image, total', () => {
    // Arrange
    const { queryByTestId } = render(
      <Provider store={createStore(rootReducer)}>
        <CardRow card={cardBuilder()} />
      </Provider>
    )
    // Act & Assert
    expect(queryByTestId('card-image')).toBeTruthy()
    expect(queryByTestId('card-name')).toBeTruthy()
    expect(queryByTestId('card-total')).toBeTruthy()
  })

  // Render card values.
  it('should render card values', () => {
    // Arrange
    const card = cardBuilder()
    const { getByTestId } = render(
      <Provider store={createStore(rootReducer)}>
        <CardRow card={card} />
      </Provider>
    )
    // Act
    const imageHtml = getByTestId('card-image') as HTMLImageElement
    const nameHtml = within(getByTestId('card-name'))
    const totalHtml = within(getByTestId('card-total'))
    // Assert
    expect(imageHtml.src).toBe(card.imageUrl)
    expect(nameHtml.getByText(card.name)).toBeDefined()
    expect(totalHtml.getByText(card.count.total)).toBeDefined()
  })

  // Click edit card.
  it('should call edit card', () => {
    // Arrange
    const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch')
    const mockDispatchFn = jest.fn()
    useDispatchSpy.mockReturnValue(mockDispatchFn)
    const card = cardBuilder()
    const { getByText } = render(
      <Provider store={createStore(rootReducer)}>
        <CardRow card={card} />
      </Provider>
    )
    // Act
    const editButton = getByText(/edit/i)
    fireEvent.click(editButton)
    // Assert
    expect(useDispatchSpy).toHaveBeenCalledTimes(1)
    // Teardown
    useDispatchSpy.mockClear()
  })

  // Click delete card.
  it('shoul call delete card', () => {
    // Arrange
    const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch')
    const mockDispatchFn = jest.fn()
    useDispatchSpy.mockReturnValue(mockDispatchFn)
    const card = cardBuilder()
    const { getByText } = render(
      <Provider store={createStore(rootReducer)}>
        <CardRow card={card} />
      </Provider>
    )
    // Act
    const deleteButton = getByText(/delete/i)
    fireEvent.click(deleteButton)
    // Assert
    expect(useDispatchSpy).toHaveBeenCalledTimes(1)
    // Teardown
    useDispatchSpy.mockClear()
  })
})
