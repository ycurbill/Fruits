import { configureStore } from '@reduxjs/toolkit';
import fruitListReducer from './fruitListSlice';

export default configureStore({
    reducer: {
        fruitList: fruitListReducer
    }
}) 
