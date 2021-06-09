import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storagekeys from '../../constants/storageKeys';
import orderApi from '../../api/orderApi';
import userApi from '../../api/userApi';

export const create = createAsyncThunk('users/createOrder', async (payload) => {
  // call api to register
  const data = await orderApi.create(payload);
  let token = localStorage.getItem('access_token')
  if (!token) {
    token = await userApi.login(payload);
    localStorage.setItem(storagekeys.TOKEN, token.access);
  }
 
  // save data to local storage
  localStorage.removeItem(storagekeys.CART);
  
  // return user data
  return data.data;
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    current: {},
    settings: {},
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [create.fulfilled]: (state, action) => {
      // Add user to the state array
      console.log(action.payload)
      state.current = action.payload;
    },

  },
});

const { reducer } = orderSlice;
export default reducer;