import { CheckCircleIcon, CircleIcon, StarIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { BottomBar } from "../components/BottomBar";
import { TopBar } from "../components/TopBar";
import { type Task, tasks } from "./-tasks";

export const Route = createFileRoute("/tasks")({
	component: RouteComponent,
});

function RouteComponent() {
	const isEmpty = tasks.length <= 0;

	return (
		<div className="flex flex-col h-dvh">
			<TopBar title="کارها" />

			{isEmpty ? (
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
			)}

			<BottomBar />
		</div>
	);
}

type TaskItemProps = {
	id: Task["id"];
	title: Task["title"];
	isCompleted: Task["isCompleted"];
};

function TaskItem({ id, isCompleted, title }: TaskItemProps) {
	id;

	const IsCompletedIcon = isCompleted ? CheckCircleIcon : CircleIcon;

	return (
		<div
			className={`flex w-full h-12 ${isCompleted ? "text-stone-600" : "text-stone-900"}`}
		>
			<button type="button" className="cursor-pointer p-3">
				<IsCompletedIcon size={24} />
			</button>

			<button
				type="button"
				className={`cursor-pointer flex-1 text-start px-3 ${isCompleted ? "line-through" : ""}`}
			>
				{title}
			</button>

			<button type="button" className="cursor-pointer p-3">
				<StarIcon size={24} />
			</button>
		</div>
	);
}
