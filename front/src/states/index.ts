import { configureStore } from '@reduxjs/toolkit'

import imageData from './imageData'
import reCommentModalData from './reCommentModalData'
import loginRequestModalData from './loginRequestModalData'

export const store = configureStore({
  reducer: { imageData, reCommentModalData, loginRequestModalData },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
