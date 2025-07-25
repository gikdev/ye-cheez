import { CaretLeftIcon } from "@phosphor-icons/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Btn } from "../components/Btn";

export const Route = createFileRoute("/intro")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const handleGoToHomePageBtnClick = () => {
		localStorage.setItem("started", JSON.stringify(true));
		navigate({ to: "/home" });
	};

	return (
		<div className="flex flex-col p-4 gap-8 justify-center items-center h-dvh">
			<img
				src="/images/to-the-stars.png"
				alt="نقاشی موشکی که آماده برای پرتاپ هست!"
			/>

			<div className="flex flex-col gap-2 justify-center items-center">
				<img src="/images/logo-full-small.png" alt="لوگوی برنامه‌ی «یه چیز!»" />

				<p>وقت رسیدن به اهدافه! 🤩</p>
			</div>

			<Btn
				className="w-full"
				color="brand"
				style="filled"
				title="شروع"
				onClick={handleGoToHomePageBtnClick}
				IconEnd={CaretLeftIcon}
			/>
		</div>
	);
}
