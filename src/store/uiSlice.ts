import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  sidebarCollapsed: boolean;
  aiPanelCollapsed: boolean;
  aiPanelView: "primary" | "chat";
}

const initialState: UiState = {
  sidebarCollapsed: false,
  aiPanelCollapsed: false,
  aiPanelView: "primary",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    toggleAiPanel(state) {
      state.aiPanelCollapsed = !state.aiPanelCollapsed;
    },
    setAiPanelView(state, action: { payload: UiState["aiPanelView"] }) {
      state.aiPanelView = action.payload;
    },
  },
});

export const { toggleSidebar, toggleAiPanel, setAiPanelView } = uiSlice.actions;
export default uiSlice.reducer;
