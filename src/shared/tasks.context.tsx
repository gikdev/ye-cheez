import { createContext } from "react";
import useLocalStorage from "use-local-storage";
import { v4 as uuidv4 } from "uuid";

export type Task = {
	id: string;
	title: string;
	isCompleted: boolean;
};

export const sampleTasks: Task[] = [
	{
		id: "1e8c9c7e-4f7d-4c3c-8433-2d02b0c0adf1",
		title: "نوشتن پروپوزال پروژه",
		isCompleted: false,
	},
	{
		id: "2a3e84a7-9579-45de-bab1-d38d9398c00a",
		title: "مرور درخواست‌های ادغام",
		isCompleted: true,
	},
	{
		id: "36cfd362-3e3c-4e58-b9a0-70c2b05e97e6",
		title: "رفع مشکل ورود به سیستم",
		isCompleted: false,
	},
	{
		id: "ffebd438-f62a-4e18-9a1f-70a98fdd84d3",
		title: "به‌روزرسانی مستندات",
		isCompleted: true,
	},
	{
		id: "b92d5e09-65fb-4e00-89a0-097a10b2d1b5",
		title: "طراحی صفحه لندینگ",
		isCompleted: false,
	},
	{
		id: "8e70c090-3282-4a03-a6b1-92b1d9338cfd",
		title: "راه‌اندازی CI/CD",
		isCompleted: false,
	},
	{
		id: "7a676f2c-4ea9-441c-83a8-f37677b22dcb",
		title: "تست ثبت‌نام کاربران",
		isCompleted: true,
	},
	{
		id: "6c71a452-b7ee-4f84-91d8-63ad12b0dc17",
		title: "بازنویسی کد داشبورد",
		isCompleted: false,
	},
	{
		id: "5fa9f818-32ed-4fd6-8913-905a591fc13f",
		title: "برنامه‌ریزی وظایف اسپرینت",
		isCompleted: true,
	},
	{
		id: "a5312288-8651-470b-ae57-44f68b1a9077",
		title: "ارسال گزارش هفتگی",
		isCompleted: true,
	},
	{
		id: "d7e2ed6a-b80b-4c6e-9676-94f03d4b3b4b",
		title: "ایجاد راهنمای ورود",
		isCompleted: false,
	},
	{
		id: "fa3aa84c-3698-4f06-9c94-51ff59ab12d9",
		title: "اصلاح غلط املایی صفحه اصلی",
		isCompleted: true,
	},
	{
		id: "bfa24679-6c59-44bc-99ad-5c3d1d5300dc",
		title: "پیاده‌سازی حالت تاریک",
		isCompleted: false,
	},
	{
		id: "ef87213c-3e75-4ef5-a3aa-21e933f91ec5",
		title: "تحلیل بازخورد کاربران",
		isCompleted: true,
	},
	{
		id: "c2c73a62-9899-4b46-8326-e1d3d5a4c389",
		title: "پاک‌سازی کدهای اضافی",
		isCompleted: false,
	},
	{
		id: "1adcf28b-01fc-43c1-83bb-6919b74e6453",
		title: "بهینه‌سازی تصاویر",
		isCompleted: true,
	},
	{
		id: "841b89d6-5cb0-4f34-b53a-cbb07d282d9d",
		title: "راه‌اندازی آنالیتیکس",
		isCompleted: false,
	},
	{
		id: "1ee1c8e7-5802-4dc9-8f16-c15b8cb97a03",
		title: "به‌روزرسانی وابستگی‌ها",
		isCompleted: true,
	},
	{
		id: "32d6c55c-9425-47c5-bc32-248b8b4dc054",
		title: "بررسی مشکلات دسترسی‌پذیری",
		isCompleted: false,
	},
	{
		id: "dc31897b-45d5-44ae-93a1-c893758a412a",
		title: "تنظیم جلسه تیمی",
		isCompleted: true,
	},
];

type ITasksContext = {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
	toggleTaskCompleted: (taskId: Task["id"]) => void;
	createTask: (taskTitle: Task["title"]) => void;
};

export const TasksContext = createContext<ITasksContext>({
	tasks: [],
	setTasks: () => {},
	toggleTaskCompleted: () => {},
	createTask: () => {},
});

export function TasksProvider({ children }: { children: React.ReactNode }) {
	const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [...sampleTasks]);

	const toggleTaskCompleted = (taskId: Task["id"]) => {
		const clonedTasks = [...tasks];
		const changedTasks = clonedTasks.map((ct) =>
			ct.id === taskId ? { ...ct, isCompleted: !ct.isCompleted } : ct,
		);
		setTasks(changedTasks);
	};

	const createTask = (taskTitle: Task["title"]) => {
		const newTask: Task = {
			id: uuidv4(),
			title: taskTitle,
			isCompleted: false,
		};

		const newTasks = [...tasks, newTask];
		setTasks(newTasks);
	};

	return (
		<TasksContext value={{ tasks, setTasks, toggleTaskCompleted, createTask }}>
			{children}
		</TasksContext>
	);
}
