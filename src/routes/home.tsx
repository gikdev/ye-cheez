import { CaretLeftIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { BottomBar } from "../components/BottomBar";
import { Btn } from "../components/Btn";
import { TopBar } from "../components/TopBar";

export const Route = createFileRoute("/home")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col h-dvh">
			<TopBar title="یه چیز!" />

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
				/>
			</main>

			<BottomBar />
		</div>
	);
}
