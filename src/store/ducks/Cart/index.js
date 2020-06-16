import { createAction, createReducer} from '@reduxjs/toolkit'

const initial_state = []

export const addItem = createAction('ADD_ITEM')
export const removeItem = createAction('REMOVE_ITEM')
export const increment =  createAction('INCREMENT')
export const decrement = createAction('DECREMENT')

export default createReducer(initial_state, {
    [addItem.type]: (state, action) => [...state,  action.payload],

    [removeItem.type]: (state, action) => state.filter(item => item.productid.code_color !== action.payload),  
});

