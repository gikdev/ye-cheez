import { use } from "react";
import { TasksContext } from "../../shared/tasks.context";
import { TaskItem } from "./-TaskItem";

export function TasksList() {
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
