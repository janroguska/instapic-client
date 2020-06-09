import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { theme } from './app/theme/theme'
import './index.css'
import App from './App'
import { store, persistor } from './app/store/store'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
