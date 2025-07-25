import {
	CaretLeftIcon,
	CheckFatIcon,
	LightningIcon,
} from "@phosphor-icons/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { use, useState } from "react";
import { BottomBar } from "../components/BottomBar";
import { Btn } from "../components/Btn";
import { TopBar } from "../components/TopBar";
import { StarContext } from "../shared/star.context";
import { type Task, TasksContext } from "../shared/tasks.context";

export const Route = createFileRoute("/home")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col h-dvh">
			<TopBar title="یه چیز!" />

			<Main />

			<BottomBar />
		</div>
	);
}

function Main() {
	const { tasks, toggleTaskCompleted } = use(TasksContext);
	const { starredTaskId, setStarredTaskId } = use(StarContext);
	const [isCelebration, setCelebration] = useState(false);
	const navigate = useNavigate();

	const starredTask: Task | undefined = tasks.filter(
		(t) => t.id === starredTaskId,
	)?.[0];

	const handleGoToTasksPageBtnClick = () => navigate({ to: "/tasks" });
	const handleDidItBtnClick = () => {
		if (!starredTaskId) return;
		setStarredTaskId("");
		toggleTaskCompleted(starredTaskId);
		setCelebration(true);
	};

	if (isCelebration)
		return (
			<CelebrationContent onContinueBtnClick={() => setCelebration(false)} />
		);

	return starredTask ? (
		<main className="flex flex-col p-4 gap-8 justify-center items-center flex-1 text-center">
			<p>انجامش بده 💪</p>

			<p className="font-black text-3xl text-stone-900">{starredTask.title}</p>

			<Btn
				className="w-full"
				color="brand"
				style="filled"
				title="انجامش دادم!"
				IconTextStart={CheckFatIcon}
				onClick={handleDidItBtnClick}
			/>
		</main>
	) : (
		<main className="flex flex-col p-4 gap-8 justify-center items-center flex-1">
			<p className="font-bold text-stone-900 text-center">
				«چیز» بعدی‌مون چیه؟
				<br />
				(برو و از توی لیست کارها انتخابش کن!)
			</p>

			<Btn
				className="w-full"
				color="brand"
				title="مشاهده لیست کارها"
				IconEnd={CaretLeftIcon}
				onClick={handleGoToTasksPageBtnClick}
			/>
		</main>
	);
}

type CelebrationContentProps = {
	onContinueBtnClick: () => void;
};

function CelebrationContent({ onContinueBtnClick }: CelebrationContentProps) {
	return (
		<main className="flex flex-col p-4 gap-8 justify-center items-center flex-1">
			<img src="/images/celebration.png" alt="" />

			<p className="font-black text-stone-900 text-center text-3xl">
				آفرین به تو! 🎉
			</p>

			<Btn
				onClick={onContinueBtnClick}
				className="w-full"
				color="brand"
				title="ادامه بدیم"
				IconTextStart={LightningIcon}
			/>
		</main>
	);
}
