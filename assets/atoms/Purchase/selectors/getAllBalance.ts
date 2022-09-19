import { selector } from "recoil";
import PurchaseAtom from "..";
import CashbackAtom from "../cashback";

const getAllBalance = selector({
	key: "GetAllBalance",
	get: ({ get }) => {
		const inBalance = get(CashbackAtom);
		const outBalance = get(PurchaseAtom);
		const allBalance = [];

		const filter = inBalance?.map((item, index) => ({
			key: index,
			value: item.inValue,
			day: item.day,
			transactionName: item.transactionName,
			type: "IN",
		}));
		if (filter !== undefined) {
			allBalance.push(...filter);
		}

		const outFilter = outBalance?.map((item, index) => ({
			key: index,
			value: item.outValue,
			day: item.day,
			transactionName: item.transactionName,
			type: "OUT",
		}));

		if (outFilter !== undefined) {
			allBalance.push(...outFilter);
		}
		return allBalance;
	},
});

export default getAllBalance;
