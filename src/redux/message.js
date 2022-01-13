import { createSlice } from "@reduxjs/toolkit";
import { FaLessThanEqual } from "react-icons/fa";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    showMsg: false,
    completed: false,
    message: '',
  },
  reducers: {
    setMsg: (state, action) => {
      state.showMsg = true
      state.completed = action.payload.completed
      state.message = action.payload.message
    },
    removeMsg: (state) => {
      state.showMsg = false
      state.completed = false
      state.message = ''
    }
  }
})

export const { setMsg, removeMsg } = messageSlice.actions

export default messageSlice.reducer