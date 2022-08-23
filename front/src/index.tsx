import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import React from 'react'

import reportWebVitals from 'reportWebVitals'
import App from 'routes'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CookiesProvider } from 'react-cookie'
import { store } from './states'

import './styles/index.scss'

export const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID!}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </CookiesProvider>
  </React.StrictMode>
)

reportWebVitals()
