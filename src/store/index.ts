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
import authSlice from "./auth/authSlice"
import orderSlice from '@store/order/orderSlice'
import ReviewsSlice from "@store/reviews/ReviewsSlice"

const rootPersistConfig = {
    key:"root",
    storage: storage,
    whitelist:["cart", "auth"],
    blacklist:["categories" , "products", "wishlist"]
};

const authPersistConfig = {
    key: "auth",
    storage:storage,
    whitelist:["user", "accessToken" ]
}
const cartPersistConfig = {
    key:"cart",
    storage: storage,
    whitelist:["items"],
};

const rootReducer = combineReducers(
    {
        categories:categoriesSlice,
        products: productsSlice,
        cart: persistReducer(cartPersistConfig,  cartSlice),
        wishlist: wishListSlice,
        auth: persistReducer(authPersistConfig, authSlice),
        order:orderSlice,
        reviews: ReviewsSlice,
    }
)

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
    // reducer: persistedReducer,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store);

export   {store, persistor};