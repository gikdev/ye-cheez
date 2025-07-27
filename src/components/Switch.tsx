type SwitchProps = {
	checked?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	readOnly?: boolean;
};

export function Switch({
	checked = false,
	disabled = false,
	readOnly = false,
	onClick,
}: SwitchProps) {
	const containerStyles = calculateContainerStyles(checked, disabled, readOnly);
	const handleStyles = calculateHandleStyles(checked);

	const Tag = readOnly ? "div" : "button";
	const buttonProps = { onClick, disabled };

	return (
		<Tag className={containerStyles} {...(Tag === "button" ? buttonProps : {})}>
			<div className={handleStyles} />
		</Tag>
	);
}

function calculateContainerStyles(
	checked: boolean,
	disabled: boolean,
	readOnly: boolean,
) {
	let finalStyles = "";

	const baseStyles = "rounded-full border-2 h-8 w-13 items-center flex ";
	const onStyles = "bg-orange-500 border-orange-500 p-1 justify-end ";
	const offStyles = "bg-stone-300 border-stone-500 p-2 justify-start ";

	finalStyles += baseStyles;
	finalStyles += readOnly ? "" : "cursor-pointer ";
	finalStyles += checked ? onStyles : offStyles;
	finalStyles += disabled
		? checked
			? "bg-stone-500 opacity-50 border-stone-500 "
			: "opacity-50 "
		: "";

	return finalStyles;
}

function calculateHandleStyles(checked: boolean) {
	let finalStyles = "";

	const baseStyles = "rounded-full ";
	const onStyles = "size-6 bg-stone-50 ";
	const offStyles = "size-4 bg-stone-500 ";

	finalStyles += baseStyles;
	finalStyles += checked ? onStyles : offStyles;

	return finalStyles;
}
