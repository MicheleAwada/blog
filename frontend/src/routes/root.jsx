import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/header";
import React, { useEffect, useState } from "react";

import { getAuthInfo, getUser } from "../auth-api";

import { Alert } from "flowbite-react";
import {
	HiInformationCircle,
	HiOutlineExclamationCircle,
	HiOutlineExclamation,
	HiOutlineCheckCircle,
} from "react-icons/hi";

export function loader() {
	return null;
}
function simpleMakeMessage(
	message,
	type,
	boldMessage = "",
	dismissFunction = () => {}
) {
	let color;
	let icon;
	if (type === "error") {
		color = "failure";
		icon = HiOutlineExclamation;
		boldMessage = "Error, " + boldMessage;
	} else if (type === "success") {
		color = "success";
		icon = HiOutlineCheckCircle;
	} else if (type === "info") {
		color = "info";
		icon = HiInformationCircle;
	} else if (type === "warning") {
		color = "warning";
		icon = HiOutlineExclamationCircle;
	}
	return (
		<Alert color={color} icon={icon} onDismiss={dismissFunction}>
			{boldMessage && <span className="font-medium">{boldMessage + " "}</span>}
			{message}
		</Alert>
	);
}

function addMessageWithSetMessage(messageElement, messages, setMessages) {
	const index = messages.length;
	console.log("message should've messaged");
	setMessages((prevList) => [...prevList, messageElement]);
	const timeClearMessage = setTimeout(() => {
		setMessages((prevList) => prevList.splice(index, 1));
	}, 4500);
	return function dismissNow() {
		clearTimeout(timeClearMessage);
		setMessages((prevList) => prevList.splice(index, 1));
	};
}

export default function Root() {
	const loaderData = useLoaderData();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [messages, setMessages] = useState([]);
	const addMessage = (message) =>
		addMessageWithSetMessage(message, messages, setMessages);
	const simpleAddMessage = (message, type, boldMessage = "") =>
		addMessage(simpleMakeMessage(message, type, boldMessage));
	useEffect(() => {
		const auth_info = getAuthInfo();
		setIsAuthenticated(auth_info.is_authenticated);
		setCurrentUser(auth_info.user);
	}, []);
	return (
		<>
			<div id="root-divider">
				<Header
					context={{
						auth: [isAuthenticated, setIsAuthenticated],
						user: [currentUser, setCurrentUser],
					}}
				/>
				<div className="relative">
					<div
						id="messages"
						className="absolute top-0 right-0 flex flex-col items-center"
					>
						{messages
							.slice()
							.reverse()
							.map((message) => message)}
					</div>
					<Outlet
						context={{
							auth: [isAuthenticated, setIsAuthenticated],
							user: [currentUser, setCurrentUser],
							messages: { messages, setMessages, addMessage, simpleAddMessage },
						}}
					/>
				</div>
			</div>
		</>
	);
}
