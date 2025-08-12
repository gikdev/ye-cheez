import { ArrowCounterClockwiseIcon, HeadsetIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { Btn } from "../components/Btn";

type ErrorPageProps = {
	error: Error;
};

export function ErrorPage({ error }: ErrorPageProps) {
	const router = useRouter();

	const retry = () => router.invalidate();

	return (
		<div className="flex flex-col p-4 gap-8 justify-center items-center h-dvh">
			<img src="/images/bug-fix.png" alt="" className="" />

			<div className="flex flex-col gap-2 text-center">
				<p className="text-stone-900 font-black text-3xl">اوه اوه...</p>
				<p className="">
					مثل اینکه یه مشکلی پیش اومده؛ <br />
					میتونی دوباره امتحان کنی؛ <br />
					یا اینکه به ما اطلاع بدی!
				</p>
				<p>{error?.message}</p>
			</div>

			<div className="flex flex-col gap-2 w-full">
				<Btn
					color="brand"
					style="light"
					title="امتحان دوباره"
					IconEnd={ArrowCounterClockwiseIcon}
					onClick={retry}
				/>

				<Btn
					color="neutral"
					style="light"
					title="ارتباط با پشتیبانی (ایتا)"
					IconEnd={HeadsetIcon}
				/>
			</div>
		</div>
	);
}
