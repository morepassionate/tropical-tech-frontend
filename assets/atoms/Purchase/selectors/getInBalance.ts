import { selector } from "recoil";
import PurchaseAtom from "..";
import CashbackAtom from "../cashback";

const getInBalance = selector({
	key: "GetInBalance",
	get: ({ get }) => {
		const inBalance = get(CashbackAtom);
		const filter = inBalance?.map((item, index) => ({
			key: index,
			value: item.inValue,
			day: item.day,
			transactionName: item.transactionName,
			type: "IN",
		}));

		return filter;
	},
});

export default getInBalance;
