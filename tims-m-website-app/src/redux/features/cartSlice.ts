import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CartState {
  datas: Array<any>
}

// Define the initial state using that type
const initialState: CartState = {
  datas: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCart: (state) => {
      const result = localStorage.getItem('6tims_e_commerce_cart');
      if(result!==null) {
        state.datas = JSON.parse(result);
      }
    },
    setCart: (state, action: PayloadAction<any>) => {
        const result = localStorage.getItem('6tims_e_commerce_cart');
        if(result !== null) {
            const checkProductExist = JSON.parse(result)?.filter((prod: any) => prod?._id === action.payload?.product?._id)?.length > 0 ? true : false;
            if(checkProductExist) {
                let cartData: any[] = [];

                for (let c of JSON.parse(result)) {
                    if(c?._id === action.payload?.product?._id) {
                        cartData.push({
                          ...action.payload?.product,
                          allQuantity :  action.payload?.type === 'minus' ? c.allQuantity - 1 : c.allQuantity + 1
                        })
                    }else cartData.push(c)
                }
                state.datas = cartData
                localStorage.setItem('6tims_e_commerce_cart', JSON.stringify(state.datas))
            }else {
                state.datas =  [...JSON.parse(result), action.payload?.product]
                localStorage.setItem('6tims_e_commerce_cart', JSON.stringify(state.datas))
            }
            
        }else {
          state.datas = [action.payload?.product]
          localStorage.setItem('6tims_e_commerce_cart', JSON.stringify(state.datas))
        }
    },
    updateCart: (state) => {
       const result = localStorage.getItem('6tims_e_commerce_cart');
        if(result) {
          localStorage.removeItem('6tims_e_commerce_cart')
          window.location.href="/"
        }
    },
    deleteCart: (state) => {
      state.datas = []
      localStorage.removeItem('6tims_e_commerce_cart')
    },
  }
})

export const { setCart, getCart, updateCart, deleteCart } = cartSlice.actions


export default cartSlice.reducer
