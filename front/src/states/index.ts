import { configureStore } from '@reduxjs/toolkit'

import imageData from './imageData'

export const store = configureStore({
  reducer: { imageData },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
