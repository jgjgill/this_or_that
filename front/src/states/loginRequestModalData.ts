import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'states'

export interface DateState {
  value: { isView: boolean }
}

const INITIAL_STATE: DateState = {
  value: { isView: false },
}

const systemSlice = createSlice({
  name: 'loginRequestModal',
  initialState: INITIAL_STATE,
  reducers: {
    setIsViewTrue: (state) => {
      state.value.isView = true
    },
    setIsViewFalse: (state) => {
      state.value.isView = false
    },
  },
})

export const { setIsViewTrue, setIsViewFalse } = systemSlice.actions

export default systemSlice.reducer

export const getloginRequestModalValue = (state: RootState) => state.loginRequestModalData.value
