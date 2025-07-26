import {
	CheckSquareIcon,
	HouseIcon,
	PlusCircleIcon,
	PlusIcon,
} from "@phosphor-icons/react";
import { Link, useLocation } from "@tanstack/react-router";
import { use, useState } from "react";
import { TasksContext } from "../shared/tasks.context";
import { Btn } from "./Btn";
import { Input } from "./Input";
import { BottomSheet } from "./Sheet";
import { TopBar } from "./TopBar";

export function BottomBar() {
	const [isCreateTaskSheetOpen, setCreateTaskSheetOpen] = useState(false);
	const location = useLocation();

	const openCreateTaskSheet = () => setCreateTaskSheetOpen(true);
	const closeCreateTaskSheet = () => setCreateTaskSheetOpen(false);

	return (
		<>
			{isCreateTaskSheetOpen && (
				<CreateTaskSheet onClose={closeCreateTaskSheet} />
			)}

			<nav className="flex items-center justify-between h-16 bg-stone-100">
				<Link
					to="/home"
					activeProps={{ className: "text-stone-900 font-bold" }}
					className="h-full flex-1 flex flex-col gap-1 items-center justify-center text-xs"
				>
					<HouseIcon
						size={24}
						weight={location.pathname === "/home" ? "fill" : "regular"}
					/>
					<span>خانه</span>
				</Link>

				<div className="h-full flex-1 flex items-center justify-center p-2">
					<button
						type="button"
						onClick={openCreateTaskSheet}
						className="size-12 p-3 flex items-center justify-center rounded-full bg-orange-500 text-stone-100 cursor-pointer"
					>
						<PlusIcon size={24} weight="regular" />
					</button>
				</div>

				<Link
					to="/tasks"
					activeProps={{ className: "text-stone-900 font-bold" }}
					className="h-full flex-1 flex flex-col gap-1 items-center justify-center text-xs"
				>
					<CheckSquareIcon
						size={24}
						weight={location.pathname === "/tasks" ? "fill" : "regular"}
					/>
					<span>کارها</span>
				</Link>
			</nav>
		</>
	);
}

type CreateTaskSheetProps = {
	onClose: () => void;
};

function CreateTaskSheet({ onClose }: CreateTaskSheetProps) {
	const { createTask } = use(TasksContext);
	const [taskName, setTaskName] = useState("");

	const handleCreateTaskBtnClick = () => {
		createTask(taskName);
		setTaskName("");
	};

	return (
		<BottomSheet
			onClose={onClose}
			topBar={<TopBar title="کار جدید" onCloseBtnClick={onClose} />}
		>
			{/** biome-ignore lint/a11y/noLabelWithoutControl: sth */}
			<label className="flex flex-col gap-2">
				<span>اسم کار:</span>
				<Input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
			</label>

			<Btn
				title="ایجاد کار"
				color="brand"
				style="filled"
				IconEnd={PlusCircleIcon}
				onClick={handleCreateTaskBtnClick}
			/>
		</BottomSheet>
	);
}
