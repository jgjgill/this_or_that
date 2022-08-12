import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'states'
import { IImage } from 'types/image'

export interface DateState {
  value: {
    thisImage: IImage | null
    thatImage: IImage | null
  }
}

const INITIAL_STATE: DateState = {
  value: {
    thisImage: null,
    thatImage: null,
  },
}

const systemSlice = createSlice({
  name: 'image',
  initialState: INITIAL_STATE,
  reducers: {
    setThisImagePath: (state, action: PayloadAction<IImage>) => {
      state.value.thisImage = action.payload
    },
    setThatImagePath: (state, action: PayloadAction<IImage>) => {
      state.value.thatImage = action.payload
    },
  },
})

export const { setThisImagePath, setThatImagePath } = systemSlice.actions

export default systemSlice.reducer

export const getThisImage = (state: RootState) => state.imageData.value.thisImage
export const getThatImage = (state: RootState) => state.imageData.value.thatImage
