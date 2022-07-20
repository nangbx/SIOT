import axios from "axios";
import { API_URL } from "../constraints/const";

const register = (firstname, lastname, email, password) => {
	return axios.post(API_URL + "api/auth/register", {
		firstname,
		lastname,
		email,
		password,
	});
};
const login = (email, password) => {
	return axios
		.post(API_URL + "api/auth/login", {
			email,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		});
};
const logout = () => {
	localStorage.removeItem("user");
};
const reset = (email) => {
	return axios.post(API_URL + "reset", {
		email,
	});
};
const authService = {
	register,
	login,
	logout,
	reset,
};
export default authService;
