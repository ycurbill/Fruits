import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fruitListSlice = createSlice({
    name: 'fruitList',
    initialState: {
        fruitList: [],
        status: 'idle',
        error: null
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const index = state.fruitList.findIndex(fruit => fruit.id === action.payload.id);
            if (index !== -1) {
                state.fruitList[index].favorite = (state.fruitList[index].favorite === 'favorite' ? 'favorite-border' : 'favorite');
            }
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchFruits.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchFruits.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.fruitList = action.payload;
          })
          .addCase(fetchFruits.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      }
})

export const { toggleFavorite } = fruitListSlice.actions

export default fruitListSlice.reducer

export const selectAllFruits = state => state.fruitList.fruitList

export const fetchFruits = createAsyncThunk('fruits/fetchFruits', async () => {
    const response = await fetch('https://www.fruityvice.com/api/fruit/all')
    if (!response.ok) {
        throw new Error('Not found');
    }
    const data = await response.json();
    const newData = data.map(item => ({ ...item, favorite: 'favorite-border' }));
    return newData;
})
