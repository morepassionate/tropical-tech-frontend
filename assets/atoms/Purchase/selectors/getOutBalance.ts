import { selector } from "recoil";
import PurchaseAtom from "..";

const getOutBalance = selector({
	key: "GetOutBalance",
	get: ({ get }) => {
		const inBalance = get(PurchaseAtom);
		const filter = inBalance?.map((item, index) => ({
			key: index,
			value: item.outValue,
			day: item.day,
			transactionName: item.transactionName,
			type: "OUT",
		}));

		return filter;
	},
});

export default getOutBalance;
