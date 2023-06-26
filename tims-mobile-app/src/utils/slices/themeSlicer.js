import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light'
  },
  reducers: {
    getMode: (state, action) => {
      state.mode = action.payload;
    },
    switchMode: (state, action) =>  {
        state.mode = action.payload;
    },
  },
});

export const { getMode, switchMode} = slice.actions
export default slice.reducer