import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import React from 'react'

import reportWebVitals from 'reportWebVitals'
import App from 'routes'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'
import { store } from './states'

import './styles/index.scss'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
)

reportWebVitals()
