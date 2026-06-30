import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import dashboardReducer from "./dashboardSlice";
import forecastReducer from "./forecastSlice";
import uploadsReducer from "./uploadsSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    dashboard: dashboardReducer,
    forecast: forecastReducer,
    uploads: uploadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
