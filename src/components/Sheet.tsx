import type { ReactNode } from "react";

type BottomSheetProps = {
	onClose: () => void;
	topBar: ReactNode;
	children: ReactNode;
	className?: string;
};

export function BottomSheet({
	onClose,
	topBar,
	children,
	className,
}: BottomSheetProps) {
	return (
		<div
			className={`fixed max-w-120 mx-auto inset-0 w-full h-dvh flex flex-col bg-black/50 ${className}`}
		>
			<button
				type="button"
				className="flex-1 w-full cursor-pointer"
				onClick={onClose}
			/>

			<div className="bg-stone-50 rounded-t-2xl overflow-hidden">
				{topBar}

				<div className="flex flex-col p-4 gap-8">{children}</div>
			</div>
		</div>
	);
}
