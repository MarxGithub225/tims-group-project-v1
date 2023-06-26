import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../slices/themeSlicer';

export const store = configureStore({
  reducer: {
    theme: themeReducer
  }
})
