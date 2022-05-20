import axios from "axios";
import { API_URL } from "../constraints/const";

const register = (firstname, lastname, email, password) => {
	return axios.post(API_URL + "register", {
		firstname,
		lastname,
		email,
		password,
	});
};
const login = (email, password) => {
	return axios
		.post(API_URL + "login", {
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
const authService = {
	register,
	login,
	logout,
};
export default authService;
