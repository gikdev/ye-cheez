import { CheckCircleIcon, CircleIcon, StarIcon } from "@phosphor-icons/react";
import { use, useState } from "react";
import { StarContext } from "../../shared/star.context";
import { type Task, TasksContext } from "../../shared/tasks.context";
import { TaskDetailsSheet } from "./-TaskDetailsSheet";

type TaskItemProps = {
	id: Task["id"];
	title: Task["title"];
	isCompleted: Task["isCompleted"];
};

export function TaskItem({ id, isCompleted, title }: TaskItemProps) {
	const { toggleTaskCompleted } = use(TasksContext);
	const { setStarredTaskId, starredTaskId } = use(StarContext);
	const [isTaskDetailsSheetOpen, setTaskDetailsSheetOpen] = useState(false);

	const IsCompletedIcon = isCompleted ? CheckCircleIcon : CircleIcon;
	const isThisTaskStarred = starredTaskId === id;

	const closeTaskDetailsSheet = () => setTaskDetailsSheetOpen(false);
	const openTaskDetailsSheet = () => setTaskDetailsSheetOpen(true);
	const handleCompletedBtnClick = () => toggleTaskCompleted(id);
	const handleStarBtnClick = () => {
		setStarredTaskId(isCompleted ? "" : isThisTaskStarred ? "" : id);
	};

	return (
		<>
			{isTaskDetailsSheetOpen && (
				<TaskDetailsSheet
					id={id}
					title={title}
					isCompleted={isCompleted}
					onClose={closeTaskDetailsSheet}
				/>
			)}

			<div
				className={`flex w-full h-12 ${isCompleted ? "text-stone-600" : "text-stone-900"}`}
			>
				<button
					type="button"
					className="cursor-pointer p-3"
					onClick={handleCompletedBtnClick}
				>
					<IsCompletedIcon size={24} />
				</button>

				<button
					type="button"
					onClick={openTaskDetailsSheet}
					className={`cursor-pointer flex-1 text-start px-3 ${isCompleted ? "line-through" : ""}`}
				>
					{title}
				</button>

				<button
					type="button"
					className={`cursor-pointer p-3 ${isThisTaskStarred ? "text-orange-500" : ""}`}
					onClick={handleStarBtnClick}
				>
					<StarIcon size={24} weight={isThisTaskStarred ? "fill" : "regular"} />
				</button>
			</div>
		</>
	);
}
