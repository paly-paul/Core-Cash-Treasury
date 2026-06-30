import { createSlice } from "@reduxjs/toolkit";
import { mockDashboardData } from "@/features/dashboard/mockData";
import type { DashboardData } from "@/types/cash";

interface DashboardState {
  data: DashboardData;
  reviewedRecommendationIds: Record<string, string>;
}

const initialState: DashboardState = {
  data: mockDashboardData,
  reviewedRecommendationIds: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    markRecommendationReviewed(state, action: { payload: string }) {
      state.reviewedRecommendationIds[action.payload] = new Date().toISOString();
    },
  },
});

export const { markRecommendationReviewed } = dashboardSlice.actions;
export default dashboardSlice.reducer;
