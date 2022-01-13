import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import messageReducer from "./message"

export default configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer
  }
})