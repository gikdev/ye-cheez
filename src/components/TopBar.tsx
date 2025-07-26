import { XIcon } from "@phosphor-icons/react";

type TopBarProps = {
	title: string;
	onCloseBtnClick?: () => void;
};

export function TopBar({ title, onCloseBtnClick }: TopBarProps) {
	return (
		<header className="flex gap-2 px-4 py-2 min-h-16 items-center justify-between bg-stone-100">
			{onCloseBtnClick ? (
				<button
					type="button"
					onClick={onCloseBtnClick}
					className="p-3 size-12 flex justify-center items-center cursor-pointer"
				>
					<XIcon size={24} />
				</button>
			) : (
				<div className="size-12" />
			)}

			<p className="font-bold text-stone-900">{title}</p>

			<div className="size-12" />
		</header>
	);
}
