import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const config = {
    storageTokenKeyName: 'accessToken',
    storageRefreshTokenKeyName: 'refreshToken'
}

// Define a type for the slice state
interface AuthState {
    userData: any
}

// Define the initial state using that type
const initialState: AuthState = {
    userData: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
    login: (state, action: PayloadAction<any>) => {
        
        state = {userData: action.payload.data,
            [config.storageTokenKeyName]: action.payload.data['token'],
            [config.storageRefreshTokenKeyName]: action.payload.data[config.storageRefreshTokenKeyName]
        }

        localStorage.setItem('userData', JSON.stringify(action.payload.data))
        localStorage.setItem(config.storageTokenKeyName, action.payload.data['token'])
        localStorage.setItem(config.storageRefreshTokenKeyName, action.payload.data[config.storageRefreshTokenKeyName])
    },

    updateUser: (state, action: PayloadAction<any>) => {
        state = {userData: action.payload.data}
        localStorage.setItem('userData', JSON.stringify(action.payload.data))
    },

    updateData: (state, action: PayloadAction<any>) => {
        state = {userData: action.payload.data}
        localStorage.setItem('userData', JSON.stringify(action.payload.data))
    },

    logout: (state, action: PayloadAction<any>) => {
        state = {userData : {},
            [config.storageTokenKeyName]: null,
            [config.storageRefreshTokenKeyName]: null
        }
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem('userData')
        localStorage.removeItem(config.storageTokenKeyName)
        localStorage.removeItem(config.storageRefreshTokenKeyName)
    },
    
  }
})

export const { login, logout, updateData, updateUser} = authSlice.actions


export default authSlice.reducer
