import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import deviceReducer from "../slices/device";
const reducer = {
	auth: authReducer,
	message: messageReducer,
	device: deviceReducer,
};
const store = configureStore({
	reducer: reducer,
	devTools: true,
});
export default store;
