//

import { NotificationState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: NotificationState = {
  notifications: [],
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotifications: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { setNotifications, addNotifications } = NotificationSlice.actions;
export default NotificationSlice.reducer;
