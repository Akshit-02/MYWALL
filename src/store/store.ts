import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";
import { authSlice } from "./slices/auth/authSlice";
import { configureSlice } from "./slices/configure/configureSlice";
import { onboardingSlice } from "@/store/slices/onboarding/onboardingSlice";
import storage from "redux-persist/lib/storage";
import rootSaga from "./sagas";
import persistStore from "redux-persist/es/persistStore";
import { themeSlice } from "./slices/themeValue/themeValueSlice";
import { activeSectionSlice } from "./slices/activeSection/activeSectionSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [configureSlice.name]: configureSlice.reducer,
  [onboardingSlice.name]: onboardingSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [activeSectionSlice.name]: activeSectionSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "mywall",
  whitelist: ["configure", "onboarding", "theme", "activeSection"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
