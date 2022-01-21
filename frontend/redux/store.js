import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userRedux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createStore } from 'redux'


const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, userReducer)

const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export default store;
