
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '../../api/categoryApi';
import storagekeys from '../../constants/storageKeys';

export const fetchCategory = createAsyncThunk('category', async () => {
  // call api to register
  const data = await categoryApi.getAll();
  // save data to local storage
  // const categoryName = []
  // data.map((category)=> categoryName.push(category.name))
  // localStorage.setItem(storagekeys.CATEGORIES, JSON.stringify(categoryName));
  // return user data 
  
  return data;
});



const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    current: JSON.parse(localStorage.getItem(storagekeys.CATEGORIES)) || [],
    loading: true
  },
  reducers: {
    
    
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCategory.fulfilled]: (state, action) => {
      // Add user to the state array
      state.current = action.payload;
      state.loading = false;
      return state
    },
    
  },
});

const {reducer } = categorySlice;
export default reducer;
