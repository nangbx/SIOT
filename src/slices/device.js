import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage } from "./message";
import DeviceService from "../services/device.service";
const initialState = {
	devices: [],
};

export const getDevices = createAsyncThunk("api/devices", async (thunkAPI) => {
	try {
		const response = await DeviceService.getDevices();
		return { devices: response.data.devices };
	} catch (error) {
		thunkAPI.dispatch(errorMessage(error));
	}
});
const deviceSlice = createSlice({
	name: "device",
	initialState,
	extraReducers: {
		[getDevices.fulfilled]: (state, action) => {
			state.devices = action.payload.devices;
		},
		[getDevices.rejected]: (state, action) => {},
	},
});

const { reducer } = deviceSlice;
export default reducer;
