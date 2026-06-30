import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import dashboardReducer from "./dashboardSlice";
import forecastReducer from "./forecastSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    dashboard: dashboardReducer,
    forecast: forecastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
