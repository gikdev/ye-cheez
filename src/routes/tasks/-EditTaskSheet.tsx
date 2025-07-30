import { PencilSimpleIcon } from "@phosphor-icons/react";
import { use, useState } from "react";
import { Btn } from "../../components/Btn";
import { Input } from "../../components/Input";
import { BottomSheet } from "../../components/Sheet";
import { TopBar } from "../../components/TopBar";
import { type Task, TasksContext } from "../../shared/tasks.context";

type EditTaskSheetProps = {
	taskId: Task["id"];
	title: Task["title"];
	onClose: () => void;
};

export function EditTaskSheet({ onClose, taskId, title }: EditTaskSheetProps) {
	const { editTask } = use(TasksContext);
	const [newTaskTitle, setNewTaskTitle] = useState(title);

	const handleEditTaskBtnClick = () => {
		editTask(taskId, newTaskTitle);
		setNewTaskTitle("");
		onClose();
	};

	return (
		<BottomSheet
			className="z-10"
			onClose={onClose}
			topBar={<TopBar title="ویرایش کار" onCloseBtnClick={onClose} />}
		>
			{/** biome-ignore lint/a11y/noLabelWithoutControl: sth */}
			<label className="flex flex-col gap-2">
				<span>اسم کار:</span>
				<Input
					value={newTaskTitle}
					onChange={(e) => setNewTaskTitle(e.target.value)}
				/>
			</label>

			<Btn
				title="ویرایش کار"
				color="brand"
				style="filled"
				IconEnd={PencilSimpleIcon}
				onClick={handleEditTaskBtnClick}
			/>
		</BottomSheet>
	);
}
