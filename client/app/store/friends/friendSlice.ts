import { FriendState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FriendState = {
  friends: [],
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
  },
});

export const { setFriends, addFriend } = friendSlice.actions;

export default friendSlice.reducer;
