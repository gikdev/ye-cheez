// HOF
// Higher Order Function
function generateRandomMessageGenerator(messages: string[]) {
	return () => {
		const length = messages.length;
		if (length === 0) throw new Error("messages array is empty!");

		const randomIndex = Math.floor(Math.random() * length);

		return messages[randomIndex];
	};
}

const inspiringMessages = [
	"انجامش بده 💪",
	"تو می‌تونی 💪",
	"من بهت ایمان دارم 💪",
];

export const generateRandomInspiringMessage =
	generateRandomMessageGenerator(inspiringMessages);

const celebrationMessages = [
	"باریکلا!",
	"عالی بود!",
	"آفرین به تو!",
	"دمت گرم رفیق!",
	"فوق‌العاده بودی!",
	"ایولا داری!",
];

export const generateRandomCelebrationMessage =
	generateRandomMessageGenerator(celebrationMessages);
