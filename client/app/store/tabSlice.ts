import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TabState = {
  sidebarTabs: string;
  notificationsTab: string;
};

const initialState: TabState = {
  sidebarTabs: "sidebar-tabs",
  notificationsTab: "",
};

export const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      if (action.payload === "sidebar-tabs") {
        state.sidebarTabs = "sidebar-tabs";
        state.notificationsTab = "";
      } else if (action.payload === "notifications") {
        state.notificationsTab = "notifications";
        state.sidebarTabs = "";
      }
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;

