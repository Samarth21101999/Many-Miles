import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
// import localStorage from "redux-persist/lib/storage";
// import storage from 'redux-persist/lib/storage';
// import {persistStore, persistReducer} from 'redux-persist';
// import {persistStore, persistReducer} from "redux-persist";
// import { useState } from "react";
// const storage=getStorage();
// const persistConfig={
//     key:'root',
//     storage,
//     whiteList:['auth']    
// }

// const persistReducer=persistReducer(persistConfig, authSlice);

const appStore=configureStore({
    reducer:{
        auth:authSlice,
    },
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware(),
});
// const persistor=persistStore(appStore);
export default appStore;