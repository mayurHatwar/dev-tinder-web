import { createSlice } from "@reduxjs/toolkit";

const UserFeedSlice = createSlice({
  name: "userFeed",
  initialState: { feed: null },
  reducers: {
    addUserFeed: (state, action) => {
      state.feed = action.payload;
    },
    removeUserFeed: (state) => {
      state.feed = null;
    },
  },
});

export const { addUserFeed, removeUserFeed } = UserFeedSlice.actions;
export default UserFeedSlice.reducer;
