import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockForecastData } from "@/lib/mocks/forecastData";
import type { Assumption, ForecastData, ForecastHorizon, NewAssumptionInput } from "@/types/cash";

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

function makeAssumptionId() {
  return `assume-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

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
    addAssumption(state, action: PayloadAction<NewAssumptionInput>) {
      state.data.assumptions.push({ id: makeAssumptionId(), ...action.payload });
    },
    updateAssumption(state, action: PayloadAction<Assumption>) {
      const idx = state.data.assumptions.findIndex((a) => a.id === action.payload.id);
      if (idx !== -1) state.data.assumptions[idx] = action.payload;
    },
    deleteAssumption(state, action: PayloadAction<string>) {
      state.data.assumptions = state.data.assumptions.filter((a) => a.id !== action.payload);
    },
  },
});

export const { setActiveHorizon, setChartView, addAssumption, updateAssumption, deleteAssumption } =
  forecastSlice.actions;
export default forecastSlice.reducer;
