import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root, { loader as rootLoader } from "./routes/root";

import PostsListView, {
	loader as postsListViewLoader,
} from "./routes/postsListView";
import PostView, {
	loader as postViewLoader,
	action as postViewCommentAction,
} from "./routes/postView";
import PostCreateView, {
	action as postCreateAction,
} from "./routes/postCreate";
import PostEditView, {
	action as postEditAction,
	loader as postEditLoader,
} from "./routes/postEdit";
import { action as postDeleteAction } from "./routes/postDelete";

import { actionLikePost, actionLikeComment } from "./loaders_actions/like";
import { actionReportPost, actionReportComment } from "./loaders_actions/report";

import Signup, { action as signupAction } from "./routes/signup";
import Login, { action as loginAction } from "./routes/login";
import Logout, { action as logoutAction } from "./routes/logout";

import Author, {
	loader as authorLoader,
	action as followAction,
} from "./routes/author";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		loader: rootLoader,
		children: [
			{
				index: true,
				element: <PostsListView />,
				loader: postsListViewLoader,
			},
			{
				path: "author/:id/",
				element: <Author />,
				loader: authorLoader,
				action: followAction,
			},
			{
				path: "posts/:id/",
				element: <PostView />,
				loader: postViewLoader,
				action: postViewCommentAction,
			},
			{
				path: "posts/:id/report/",
				action: actionReportPost,
			},
			{
				path: "posts/:id/report/:comment_id/",
				action: actionReportComment,
			},
			{
				path: "posts/:id/like/",
				action: actionLikePost,
			},
			{
				path: "posts/:id/like/:comment_id/",
				action: actionLikeComment,
			},
			{
				path: "posts/create/",
				element: <PostCreateView />,
				action: postCreateAction,
			},
			{
				path: "posts/:id/edit/",
				element: <PostEditView />,
				action: postEditAction,
				loader: postEditLoader,
			},
			{
				path: "posts/:id/delete/",
				action: postDeleteAction,
			},
			{
				path: "login/",
				element: <Login />,
				action: loginAction,
			},
			{
				path: "signup/",
				element: <Signup />,
				action: signupAction,
			},
			{
				path: "logout/",
				element: <Logout />,
				action: logoutAction,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
