import { createContext, useState } from "react";
import type { Task } from "./tasks.context";

type IStarContext = {
	starredTaskId: Task["id"] | null;
	setStarredTaskId: (tasks: Task["id"] | null) => void;
};

export const StarContext = createContext<IStarContext>({
	starredTaskId: null,
	setStarredTaskId: () => {},
});

export function StarProvider({ children }: { children: React.ReactNode }) {
	const [starredTaskId, setStarredTaskId] = useState<null | Task["id"]>(null);

	return (
		<StarContext value={{ starredTaskId, setStarredTaskId }}>
			{children}
		</StarContext>
	);
}
