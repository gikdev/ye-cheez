import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { use, useState } from "react";
import { Btn } from "../../components/Btn";
import { BottomSheet } from "../../components/Sheet";
import { Switch } from "../../components/Switch";
import { TopBar } from "../../components/TopBar";
import { type Task, TasksContext } from "../../shared/tasks.context";
import { DeleteTaskSheet } from "./-DeleteTaskSheet";
import { EditTaskSheet } from "./-EditTaskSheet";

type TaskDetailsSheetProps = {
	id: Task["id"];
	title: Task["title"];
	isCompleted: Task["isCompleted"];
	onClose: () => void;
};

export function TaskDetailsSheet({
	onClose,
	id,
	isCompleted,
	title,
}: TaskDetailsSheetProps) {
	const { toggleTaskCompleted } = use(TasksContext);
	const [isEditMode, setEditMode] = useState(false);
	const [isDeleteMode, setDeleteMode] = useState(false);

	const openDeleteSheet = () => setDeleteMode(true);
	const closeDeleteSheet = () => setDeleteMode(false);
	const openEditSheet = () => setEditMode(true);
	const closeEditSheet = () => setEditMode(false);
	const handleToggleClick = () => toggleTaskCompleted(id);

	return (
		<>
			{isDeleteMode && (
				<DeleteTaskSheet onClose={closeDeleteSheet} taskId={id} />
			)}

			{isEditMode && (
				<EditTaskSheet onClose={closeEditSheet} taskId={id} title={title} />
			)}

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

					<Btn
						title="ویرایش"
						IconEnd={PencilSimpleIcon}
						onClick={openEditSheet}
					/>
					<Btn
						onClick={openDeleteSheet}
						title="حذف کن"
						color="danger"
						IconEnd={TrashIcon}
					/>
				</div>
			</BottomSheet>
		</>
	);
}
