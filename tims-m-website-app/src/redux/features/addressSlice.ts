import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const config = {
    storageTokenKeyName: 'accessToken',
    storageRefreshTokenKeyName: 'refreshToken'
}

// Define a type for the slice state
interface AuthState {
    selectedAddress: any
}

// Define the initial state using that type
const initialState: AuthState = {
    selectedAddress: null
}

export const authSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
   

    setAddress: (state, action: PayloadAction<any>) => {
        state.selectedAddress = action.payload
    },
    
  }
})

export const { setAddress} = authSlice.actions


export default authSlice.reducer
