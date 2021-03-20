import { createSlice} from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: 'cart-item',
    initialState: {
        current: {},
        settings: {},
      },
    reducers : {
        addCartItem(state, action) {
            state.current = action.payload;
            return state;
        },
        
    }
})
const {actions, reducer} = CartSlice;
// console.log(action)
export const {addCartItem} = actions;
export default reducer;

