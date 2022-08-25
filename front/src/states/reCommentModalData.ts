import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'states'

export interface DateState {
  value: {
    isView: boolean
    commentId?: number
  }
}

const INITIAL_STATE: DateState = {
  value: {
    isView: false,
  },
}

const systemSlice = createSlice({
  name: 'reCommentModal',
  initialState: INITIAL_STATE,
  reducers: {
    setToggleReCommentModal: (state, action: PayloadAction<{ commentId: number }>) => {
      if (state.value.commentId !== action.payload.commentId) {
        state.value.isView = true
      } else {
        state.value.isView = !state.value.isView
      }

      state.value.commentId = action.payload.commentId
    },
    setIsViewFalse: (state) => {
      state.value.isView = false
    },
  },
})

export const { setToggleReCommentModal, setIsViewFalse } = systemSlice.actions

export default systemSlice.reducer

export const getReCommentModalValue = (state: RootState) => state.reCommentModalData.value
