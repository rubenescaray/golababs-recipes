import { createSlice } from "@reduxjs/toolkit";

const defaultUser = {
  id: null,
  username: null,
  email: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: defaultUser,
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.isAuthenticated = true
      state.user = action.payload.user
      state.toke = action.payload.token
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.isAuthenticated = false
      state.user = defaultUser
      state.token = null
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer