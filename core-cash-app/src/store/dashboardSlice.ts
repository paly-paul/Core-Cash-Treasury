import { createSlice } from "@reduxjs/toolkit";
import { mockDashboardData } from "@/features/dashboard/mockData";
import type { DashboardData } from "@/types/cash";

interface DashboardState {
  data: DashboardData;
}

const initialState: DashboardState = {
  data: mockDashboardData,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;
