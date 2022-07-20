import axios from "axios";
import { API_URL } from "../constraints/const";
const slug = (name) => {
	return axios.post(API_URL + "api/slug/suggest", {
		name,
	});
};

export default slug;
