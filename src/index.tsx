import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer, rootSaga } from './store/redux'

// Sagas & Redux
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

// Simulating user-id
localStorage.setItem('userId', 'user-test')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
