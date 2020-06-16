import { configureStore } from '@reduxjs/toolkit'


import cartReducer from '../store/ducks/Cart/index'

export default configureStore({
    reducer : {
        cart: cartReducer
    }
})