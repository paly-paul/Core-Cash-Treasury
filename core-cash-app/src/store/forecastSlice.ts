import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockForecastData } from "@/features/forecast/mockData";
import type { ForecastData, ForecastHorizon } from "@/types/cash";

interface ForecastState {
  data: ForecastData;
  activeHorizon: ForecastHorizon;
  chartView: "bar" | "line" | "waterfall";
}

const initialState: ForecastState = {
  data: mockForecastData,
  activeHorizon: 7,
  chartView: "bar",
};

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setActiveHorizon(state, action: PayloadAction<ForecastHorizon>) {
      state.activeHorizon = action.payload;
    },
    setChartView(state, action: PayloadAction<ForecastState["chartView"]>) {
      state.chartView = action.payload;
    },
  },
});

export const { setActiveHorizon, setChartView } = forecastSlice.actions;
export default forecastSlice.reducer;
