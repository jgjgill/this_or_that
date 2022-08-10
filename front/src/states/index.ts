import { configureStore } from '@reduxjs/toolkit'

import tempData from './tempData'

export const store = configureStore({
  reducer: { tempData },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
