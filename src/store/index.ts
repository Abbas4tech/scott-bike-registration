import bikeRegistrationApi from "@/app/registeration/services/bikeRegisterationApi";
import serialNumberApi from "@/app/registeration/services/serialNumberApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [serialNumberApi.reducerPath]: serialNumberApi.reducer,
    [bikeRegistrationApi.reducerPath]: bikeRegistrationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      serialNumberApi.middleware,
      bikeRegistrationApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
