import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";

// persit our store.
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist';
import thunk from "redux-thunk";

//reducers
const reducer=combineReducers({
    user:userSlice,
    products:productSlice,
    [appApi.reducerPath]:appApi.reducer,
});

const persistConfig={
    key:'root',
    storage,
    blackList:[appApi.reducerPath,'products'], //  With the blacklist property, we can specify which part of state not to persist, while the whitelist property does the opposite, specifying which part of the state to persist.
};

//persist our store
const persistedReducer=persistReducer(persistConfig,reducer);

//create the store

const store=configureStore({
    reducer:persistedReducer,
    middleware:[thunk,appApi.middleware],
})

export default store;