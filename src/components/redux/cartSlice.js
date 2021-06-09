import { createSlice} from '@reduxjs/toolkit';
import storagekeys from '../../constants/storageKeys';

const data = JSON.parse(localStorage.getItem(storagekeys.CART))


const CartSlice = createSlice({
    name: 'cart-item',
    initialState: {
        current: data ? data : [],
        message: '',
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
            localStorage.setItem(storagekeys.CART, JSON.stringify(state.current))
            return state;
            
        },
        increaseCartQuantity(state, action) {
            
            let check = state.current.findIndex((element) => element.id === action.payload) 
            
            state.current[check].quantity += 1
            state.message = 'Tăng số lượng thành công'
            localStorage.setItem('CART', JSON.stringify(state.current))
            return state;
            
        },
        decreaseCartQuantity(state, action) {
            let check = state.current.findIndex((element) => element.id === action.payload) 
            if (state.current[check].quantity > 1){
                state.current[check].quantity -= 1
                state.message = 'Giảm số lượng thành công'
            } else {
                state.message = 'Bạn không thể giảm hơn mức tối thiểu'
            }
            
            localStorage.setItem('CART', JSON.stringify(state.current))
            return state;
        },
        removeCartItem(state, action) {
            let check = state.current.findIndex((element) => element.id === action.payload)
            if (check !== -1) {
                state.current.splice(check,1)
            }
            
            localStorage.setItem('CART', JSON.stringify(state.current))
            return state;
        },
        editQuantityCartItem(state, action) {
            let check = state.current.findIndex((element) => element.id === action.payload.id)
            let quantity = parseInt(action.payload.quantity)
            if (quantity > 0) {
                state.current[check].quantity = quantity
            } else {
                state.current[check].quantity = 0
            }
            
            localStorage.setItem('CART', JSON.stringify(state.current))
            return state;
        },
        deleteCartOrder(state){
            state.current = []
        }
    }
})
const {actions, reducer} = CartSlice;
// console.log(action)
export const {addCartItem, increaseCartQuantity, decreaseCartQuantity, removeCartItem, editQuantityCartItem, deleteCartOrder} = actions;
export default reducer;

