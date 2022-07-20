import axios from "axios";
import { API_URL } from "../constraints/const";
import authHeader from "./auth-header";

const addNewDevice = (name, slug, imgUrl, attributes) => {
	return axios({
		method: "post",
		url: API_URL + "api/devices/",
		headers: authHeader(),
		data: {
			name,
			slug,
			imgUrl,
			attributes,
		},
	});
};
const getDevices = () => {
	return axios({
		method: "get",
		url: API_URL + "api/devices",
		headers: authHeader(),
	});
};

const deviceService = {
	getDevices,
	addNewDevice,
};
export default deviceService;
