import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import orders from "./orders/ordersSlice";
import toasts from "./toasts/toastSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: ["cart", "auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  wishlist: ["user", "accessToken"],
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items", "productsFullInfo"],
};

const rootReducer = combineReducers({
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist,
  auth: persistReducer(authPersistConfig, auth),
  orders,
  toasts,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "toast/addToast",
        ],
        ignoredPaths: [/^toasts\.records\.\d+\.onCloseToast$/],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };
