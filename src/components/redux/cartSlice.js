import { createSlice} from '@reduxjs/toolkit';

const data = JSON.parse(localStorage.getItem('CART'))
console.log(data)

const CartSlice = createSlice({
    name: 'cart-item',
    initialState: {
        current: data ? data : [],
        settings: {},
      },
    reducers : {
        addCartItem(state, action) {
            if (!state.current.length > 0) {
                state.current.push(action.payload);
            }
            else {
                let check = state.current.findIndex((element) => element.id === action.payload.id) 
                if (check !== -1) {
                    state.current[check].quantity += action.payload.quantity
                    state.current[check].color = action.payload.color
                    state.current[check].size = action.payload.size

                } else {
                    state.current.push(action.payload);
                }
            }
            localStorage.setItem('CART', JSON.stringify(state.current))
            return state;
            
        },
        
    }
})
const {actions, reducer} = CartSlice;
// console.log(action)
export const {addCartItem} = actions;
export default reducer;

