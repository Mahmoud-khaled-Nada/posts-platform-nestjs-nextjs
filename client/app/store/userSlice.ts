import { UserType } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserType = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthUser } = userSlice.actions;
export default userSlice.reducer;
