import counterReducer from '../components/redux/CounterSlice';
import userReducer from '../components/redux/userSlice';
import closeForm from '../components/redux/closeFormSlice';
import cartReducer from '../components/redux/cartSlice';
import categoryReducer from '../components/redux/categorySlice';
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = { // bao gom tat ca cac reducer minh co
    count: counterReducer,
    user: userReducer,
    closeForm: closeForm,
    cartItem: cartReducer,
    categories: categoryReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;