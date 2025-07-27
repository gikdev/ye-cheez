import {
	CheckCircleIcon,
	CircleIcon,
	PencilSimpleIcon,
	StarIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { use, useState } from "react";
import { BottomBar } from "../components/BottomBar";
import { Btn } from "../components/Btn";
import { BottomSheet } from "../components/Sheet";
import { Switch } from "../components/Switch";
import { TopBar } from "../components/TopBar";
import { StarContext } from "../shared/star.context";
import { type Task, TasksContext } from "../shared/tasks.context";

export const Route = createFileRoute("/tasks")({
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

function TasksList() {
	const { tasks } = use(TasksContext);
	const isEmpty = tasks.length <= 0;

	return isEmpty ? (
		<main className="flex flex-col p-4 gap-8 justify-center items-center flex-1">
			<img src="/images/clipboards.png" alt="" />

			<div className="flex flex-col gap-1 text-center">
				<p className="font-bold text-2xl text-stone-900">
					فعلا کاری نداریم! 😁
				</p>
				<p>
					میتونی از اون پایین
					<br />
					کار جدید تعریف کنی!
				</p>
			</div>

			<img src="/images/arrow-down.png" alt="" />
		</main>
	) : (
		<main className="flex flex-col p-4 gap-8 justify-start items-center flex-1 overflow-y-auto">
			<div className="flex flex-col gap-2 w-full">
				{tasks.map((t) => (
					<TaskItem
						key={t.id}
						title={t.title}
						id={t.id}
						isCompleted={t.isCompleted}
					/>
				))}
			</div>
		</main>
	);
}

type TaskItemProps = {
	id: Task["id"];
	title: Task["title"];
	isCompleted: Task["isCompleted"];
};

function TaskItem({ id, isCompleted, title }: TaskItemProps) {
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

type TaskDetailsSheetProps = {
	id: Task["id"];
	title: Task["title"];
	isCompleted: Task["isCompleted"];
	onClose: () => void;
};

function TaskDetailsSheet({
	onClose,
	id,
	isCompleted,
	title,
}: TaskDetailsSheetProps) {
	const { toggleTaskCompleted } = use(TasksContext);

	const handleToggleClick = () => toggleTaskCompleted(id);

	return (
		<BottomSheet
			onClose={onClose}
			topBar={<TopBar title="مشخصات" onCloseBtnClick={onClose} />}
		>
			<p className="text-stone-900 font-bold text-2xl text-center">{title}</p>

			<div className="flex flex-col gap-2">
				<button
					type="button"
					onClick={handleToggleClick}
					className="p-2 ps-4 flex items-center justify-between font-bold border-2 border-dashed border-stone-300 rounded-full cursor-pointer"
				>
					<span>وضعیت:</span>
					<Switch readOnly checked={isCompleted} />
				</button>

				<Btn disabled title="ویرایش" IconEnd={PencilSimpleIcon} />
				<Btn disabled title="حذف کن" color="danger" IconEnd={TrashIcon} />
			</div>
		</BottomSheet>
	);
}
