import { CaretLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { Btn } from "../components/Btn";

export function NotFound() {
	const navigate = useNavigate();

	const goToHomePage = () => {
		navigate({ to: "/home" });
	};

	return (
		<div className="flex flex-col p-4 gap-8 justify-center items-center h-dvh">
			<img src="/images/not-found.png" alt="" />

			<div className="flex flex-col gap-1 text-center">
				<p className="font-black text-3xl text-stone-900">
					ارور ۴۰۴ - پیدا نشد!
				</p>
				<p>
					صفحه‌ای که دنبالش هستی،
					<br />
					یا وجود نداره، یا اینکه گم شده 🥲
				</p>
			</div>

			<Btn
				title="برگردیم به خونه"
				style="light"
				color="brand"
				className="w-full"
				onClick={goToHomePage}
				IconEnd={CaretLeftIcon}
			/>
		</div>
	);
}
