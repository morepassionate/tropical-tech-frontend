import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { useRecoilState } from "recoil";
import UserData from "../../assets/atoms/UserData";
import BankCardIcon from "../../assets/icons/BankCard";
import MasterCardIcon from "../../assets/icons/MasterCard";
import COLORS from "../../Constants/styles";

// import { Container } from './styles';

const ManagePayment = ({ navigation }: { navigation: any }) => {
	const [userData, setUserData] = useRecoilState(UserData);
	return (
		<View>
			{userData?.creditCard.length === 0 ||
			userData?.creditCard.length === undefined ? (
				<View style={styles.container}>
					<IconButton
						style={styles.close}
						icon={"close"}
						size={24}
						color={"#8296CA"}
						onPress={() => navigation.navigate("Profile")}
					/>
					<Text style={styles.title}>Set up a payment method</Text>
					<Text style={styles.text16}>
						Use you payment methods to make purchases.
					</Text>

					<TouchableOpacity
						activeOpacity={0.5}
						style={styles.nextButton}
						onPress={() => navigation.navigate("PayWith")}
					>
						<Text style={styles.textAdd}>Add payment method</Text>
						<IconButton
							style={styles.notMargin}
							icon={"chevron-right"}
							size={32}
							color={"#979FA9"}
						/>
					</TouchableOpacity>
				</View>
			) : userData?.creditCard?.length > 0 ? (
				<View style={styles.container}>
					<IconButton
						style={styles.close}
						icon={"close"}
						size={24}
						color={"#8296CA"}
						onPress={() => navigation.navigate("Profile")}
					/>
					<Text style={styles.title}>Edit your payment methods</Text>
					{userData?.creditCard?.map((item, index) => (
						<TouchableOpacity
							style={styles.button}
							key={index}
							onPress={() =>
								navigation.navigate("SelectCardDefault", {
									cardId: index,
								})
							}
						>
							<View style={styles.innerButton}>
								<MasterCardIcon />
								<Text
									style={{ fontFamily: "Corbel", fontSize: 16, marginLeft: 15 }}
								>{`**** ${item.cardNumber.slice(15, 19)}`}</Text>
							</View>
							<IconButton
								icon={"chevron-right"}
								style={styles.notMargin}
								size={24}
								color={"#979FA9"}
							/>
						</TouchableOpacity>
					))}

					<TouchableOpacity onPress={() => navigation.navigate("PayWith")}>
						<Text style={styles.add}>Add payment method</Text>
					</TouchableOpacity>
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 45,
		marginHorizontal: 22,
	},
	close: {
		alignSelf: "flex-end",
		margin: 0,
	},
	nextButton: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: COLORS.blue,
		borderBottomColor: COLORS.blue,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	notMargin: {
		margin: 0,
	},
	textAdd: {
		color: COLORS.blue,
		fontFamily: "Corbel",
		fontSize: 16,
	},
	text16: {
		fontFamily: "Corbel",
		fontSize: 16,
		marginBottom: 44,
	},
	title: {
		fontSize: 32,
		fontFamily: "Corbel-Bold",
		marginBottom: 20,
	},
	button: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.blue,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 10,
		paddingBottom: 15,
	},
	innerButton: {
		flexDirection: "row",
		alignItems: "center",
	},
	add: {
		fontFamily: "Corbel",
		fontSize: 16,
		color: "#1B4298",
	},
});

export default ManagePayment;
