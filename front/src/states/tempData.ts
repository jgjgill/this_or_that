import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export interface DateState {
  value: number
}

const INITIAL_STATE: DateState = {
  value: 0,
}

const systemSlice = createSlice({
  name: 'temp',
  initialState: INITIAL_STATE,
  reducers: {},
})

export const {} = systemSlice.actions

export default systemSlice.reducer
