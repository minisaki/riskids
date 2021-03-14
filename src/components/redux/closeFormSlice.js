import { createSlice} from '@reduxjs/toolkit';

const CloseFormSlice = createSlice({
    name: 'toggle-form',
    initialState: false,
    reducers : {
        onClickClose(state) {
            return false;
        },
        onClickOpen() {
            return true
        }
    }
})
const {actions, reducer} = CloseFormSlice;
// console.log(action)
export const {onClickClose, onClickOpen} = actions;
export default reducer;

