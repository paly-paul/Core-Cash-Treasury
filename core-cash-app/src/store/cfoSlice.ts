import { createSlice } from "@reduxjs/toolkit";
import { mockCfoData } from "@/lib/mocks/cfoData";
import type { CfoData } from "@/types/cash";

interface CfoState {
  data: CfoData;
  lastUpdatedAt: string;
}

const initialState: CfoState = {
  data: mockCfoData,
  lastUpdatedAt: mockCfoData.asOf.split(" · ")[1],
};

const cfoSlice = createSlice({
  name: "cfo",
  initialState,
  reducers: {
    refreshInsights(state) {
      state.lastUpdatedAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const runwayInsight = state.data.insights.find((i) => i.id === "runway");
      if (runwayInsight) {
        const days = 45 + Math.floor(Math.random() * 6);
        runwayInsight.value = `${days} days`;
      }
      const accuracyInsight = state.data.insights.find((i) => i.id === "accuracy");
      if (accuracyInsight) {
        const pct = (90.5 + Math.random() * 1.5).toFixed(1);
        accuracyInsight.value = `${pct}%`;
      }
    },
  },
});

export const { refreshInsights } = cfoSlice.actions;
export default cfoSlice.reducer;
