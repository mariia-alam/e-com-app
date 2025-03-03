import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categoriesSlice from "./categories/categoriesSlice"
import productsSlice from "@store/products/productsSlice"
import cartSlice from "./Cart/cartSlice"
import {persistReducer,
        persistStore,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER
                } from "redux-persist"
import storage from "redux-persist/lib/storage";
import wishListSlice from "@store/WishList/wishListSlice"

// const rootPersistConfig = {
//     key:"root",
//     storage: storage,
//     whiteList:["cart"],
// };
const cartPersistConfig = {
    key:"cart",
    storage: storage,
    whiteList:["items"],
};
const wishlistPersistConfig = {
    key:"wishlist",
    storage: storage,
    whiteList:["itemsId"],
};

const rootReducer = combineReducers(
    {
        categories:categoriesSlice,
        products: productsSlice,
        cart: persistReducer(cartPersistConfig,  cartSlice),
        wishlist: persistReducer(wishlistPersistConfig,  wishListSlice),
    }
)

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
    // reducer: persistedReducer,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],  // ✅ استثناء الـ actions الخاصة بـ persist
            },
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store);

export   {store, persistor};