import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { successMessage, errorMessage } from "./message";
import AuthService from "../services/auth.service";
const user = JSON.parse(localStorage.getItem("user"));
export const register = createAsyncThunk(
	"api/auth/register",
	async ({ firstname, lastname, email, password }, thunkAPI) => {
		try {
			const response = await AuthService.register(
				firstname,
				lastname,
				email,
				password
			);
			thunkAPI.dispatch(successMessage(response.data.message));
			return response.data;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(errorMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);
export const login = createAsyncThunk(
	"api/auth/login",
	async ({ email, password }, thunkAPI) => {
		try {
			const data = await AuthService.login(email, password);
			return { user: data };
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(errorMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);
export const logout = createAsyncThunk("api/auth/logout", async () => {
	await AuthService.logout();
});

const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };
const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: {
		[register.fulfilled]: (state, action) => {
			state.isLoggedIn = false;
		},
		[register.rejected]: (state, action) => {
			state.isLoggedIn = false;
		},
		[login.fulfilled]: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.user;
		},
		[login.rejected]: (state, action) => {
			state.isLoggedIn = false;
			state.user = null;
		},
		[logout.fulfilled]: (state, action) => {
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});
const { reducer } = authSlice;
export default reducer;
