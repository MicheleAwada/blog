import axios from "axios";

function getTokenInHeader() {
	const token = getToken();
	if (token) {
		return { Authorization: `Token ${token}` };
	}
	return {};
}

function getToken() {
	return localStorage.getItem("token");
}

export function getPosts() {
	return axios.get("http://127.0.0.1:8000/api/posts/");
}

export function getPost(id) {
	return axios.get(`http://127.0.0.1:8000/api/posts/${id}/`);
}

export async function postPost(data) {
	try {
		const response = await axios.post(
			"http://127.0.0.1:8000/api/posts/",
			data,
			{ headers: getTokenInHeader() }
		);
		console.log("gud");
		console.log(response);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
}
