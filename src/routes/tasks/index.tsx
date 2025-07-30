import { createFileRoute } from "@tanstack/react-router";
import { BottomBar } from "../../components/BottomBar";
import { TopBar } from "../../components/TopBar";
import { TasksList } from "./-TaskList";

export const Route = createFileRoute("/tasks/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col h-dvh">
			<TopBar title="کارها" />

			<TasksList />

			<BottomBar />
		</div>
	);
}
