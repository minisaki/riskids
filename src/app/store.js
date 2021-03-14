import counterReducer from '../components/redux/CounterSlice';
import userReducer from '../components/redux/userSlice';
import closeForm from '../components/redux/closeFormSlice';
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = { // bao gom tat ca cac reducer minh co
    count: counterReducer,
    user: userReducer,
    closeForm: closeForm,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;