import {configureStore} from '@reduxjs/toolkit';
import MenuReduce from './slice/menuSlice';
export const store = configureStore({
    reducer:{
        menu: MenuReduce
    }
})