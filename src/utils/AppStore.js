import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import userFeedReducer from "./UserFeedSlice";

const AppStore = configureStore({
  reducer: {
    user: userReducer,
    userFeed: userFeedReducer,
  },
});
export default AppStore;
