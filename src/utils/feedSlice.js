import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    appendFeed: (state, action) => {
      const incomingProfiles = action.payload ?? [];

      if (!Array.isArray(state) || state.length === 0) {
        return incomingProfiles;
      }

      const profileMap = new Map();

      state.forEach((profile) => {
        profileMap.set(profile._id, profile);
      });

      incomingProfiles.forEach((profile) => {
        profileMap.set(profile._id, profile);
      });

      return [...profileMap.values()];
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, appendFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
