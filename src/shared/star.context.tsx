import { createContext } from "react";
import useLocalStorage from "use-local-storage";
import type { Task } from "./tasks.context";

type IStarContext = {
	starredTaskId: Task["id"] | "";
	setStarredTaskId: (tasks: Task["id"] | "") => void;
};

export const StarContext = createContext<IStarContext>({
	starredTaskId: "",
	setStarredTaskId: () => {},
});

export function StarProvider({ children }: { children: React.ReactNode }) {
	const [starredTaskId, setStarredTaskId] = useLocalStorage<Task["id"]>(
		"starred-task-id",
		"",
	);

	return (
		<StarContext value={{ starredTaskId, setStarredTaskId }}>
			{children}
		</StarContext>
	);
}
