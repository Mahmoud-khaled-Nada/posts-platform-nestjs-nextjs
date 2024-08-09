import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TabState = {
  sidebarTabs: string;
  notificationsTab: string;
  chatTab: string;
};

const initialState: TabState = {
  sidebarTabs: "sidebar-tabs",
  notificationsTab: "",
  chatTab: "",
};

export const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "sidebar-tabs":
          state.sidebarTabs = "sidebar-tabs";
          state.notificationsTab = "";
          state.chatTab = "";
          break;
        case "notifications":
          state.notificationsTab = "notifications";
          state.sidebarTabs = "";
          state.chatTab = "";
          break;
        case "chat":
          state.chatTab = "chat";
          state.sidebarTabs = "";
          state.notificationsTab = "";
          break;
        default:
          return state;
      }
      return state;
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
