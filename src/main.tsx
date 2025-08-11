import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

import { NotFound } from "./routes/-NotFound";
import { Pending } from "./routes/-Pending";
import { routeTree } from "./routeTree.gen";
import { StarProvider } from "./shared/star.context";
import { TasksProvider } from "./shared/tasks.context";

const router = createRouter({
	routeTree,
	defaultNotFoundComponent: NotFound,
	defaultPendingComponent: Pending,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const container = document.getElementById("root");

if (container == null) {
	throw new Error("Root element not found!");
}

const root = ReactDOM.createRoot(container);
root.render(
	<StrictMode>
		<TasksProvider>
			<StarProvider>
				<RouterProvider router={router} />
			</StarProvider>
		</TasksProvider>
	</StrictMode>,
);
