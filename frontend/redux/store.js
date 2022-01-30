import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userRedux';
import cartSlice from './cartSlice.js';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createStore } from 'redux'


const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, userReducer, cartSlice)

const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export default store;
