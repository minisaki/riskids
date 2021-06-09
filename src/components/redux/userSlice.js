import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import storagekeys from '../../constants/storageKeys';

export const register = createAsyncThunk('users/register', async (payload) => {
  // call api to register
  const data = await userApi.register(payload);
  const token = await userApi.login(payload);
  // save data to local storage
  localStorage.setItem(storagekeys.TOKEN, token.access);
  localStorage.setItem(storagekeys.USER, JSON.stringify(data.data));
  // return user data
  return data.data;
});

export const login = createAsyncThunk('users/login', async (payload) => {
  // call api to register
  const token = await userApi.login(payload);
  const data = await userApi.get(payload.username);
  // save data to local storage
  localStorage.setItem(storagekeys.TOKEN, token.access);
  localStorage.setItem(storagekeys.USER, JSON.stringify(data.data));
  // return user data
  return data.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(storagekeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state, action) {
      // clear local storage
      localStorage.removeItem(storagekeys.TOKEN);
      localStorage.removeItem(storagekeys.USER);

      // reset redux state.current

      state.current = {};
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [register.fulfilled]: (state, action) => {
      // Add user to the state array
      console.log(action.payload)
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      // Add user to the state array
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
