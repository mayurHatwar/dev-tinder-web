import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userFeedReducer from "./userFeedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    userFeed: userFeedReducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});
export default appStore;
