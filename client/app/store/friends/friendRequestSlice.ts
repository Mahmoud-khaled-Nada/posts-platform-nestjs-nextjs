import { FriendRequestState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FriendRequestState = {
  friendRequests: [],
};

export const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {
    setFriendRequests: (state, action) => {
      state.friendRequests = action.payload;
    },
    addFriendRequest: (state, action) => {
      state.friendRequests.push(action.payload);
    },
    removeFriendRequest: (state, action) => {
      state.friendRequests = state.friendRequests.filter(
        (friendRequest) => friendRequest.id !== action.payload
      );
    },
    acceptFriendRequest: (state, action) => {
      state.friendRequests = state.friendRequests.filter(
        (friendRequest) => friendRequest.id !== action.payload.id
      );
    },
    rejectFriendRequest: (state, action) => {
      state.friendRequests = state.friendRequests.filter(
        (friendRequest) => friendRequest.id !== action.payload.id
      );
    },
  },
});

export const { setFriendRequests, addFriendRequest, acceptFriendRequest, rejectFriendRequest } =
  friendRequestSlice.actions;

export default friendRequestSlice.reducer;
