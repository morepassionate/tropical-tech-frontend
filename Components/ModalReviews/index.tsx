import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import COLORS from "../../Constants/styles";
import LightButton from "../LightButton";

type ModalReviewsProps = {
	modalVisible: boolean;
	setModalVisible: () => void;
	//   getStars: (value: number) => void
};

const ModalReviews: React.FC<ModalReviewsProps> = (props) => {
	const { modalVisible, setModalVisible } = props;
	const [stars, setStars] = useState(0); // set result in back-end
	const [reviewMessage, setReviewMessage] = useState("");
	const starsMock = ["1", "2", "3", "4", "5"];
	return (
		<Modal
			animationType={"fade"}
			transparent={true}
			visible={modalVisible}
			onRequestClose={setModalVisible}
		>
			<View style={styles.container}>
				<View style={styles.modalInnerContainer}>
					<Text style={styles.title}>Add review</Text>
					<Text style={[styles.text, { marginBottom: 20 }]}>Rate experience</Text>
					<View style={styles.starsRow}>
						{starsMock.map((item, index) => (
							<TouchableOpacity
								style={[
									styles.starsContainer,
									stars === index + 1
										? { backgroundColor: COLORS.primary }
										: { backgroundColor: COLORS.white },
								]}
								onPress={() => {
									setStars(index + 1);
								}}
							>
								<IconButton
									icon={"star-outline"}
									style={styles.notMargin}
									size={30}
									color={stars === index + 1 ? COLORS.white : COLORS.primary}
								/>
								<Text
									style={[
										styles.starNumber,
										stars === index + 1
											? { color: COLORS.white }
											: { color: COLORS.primary },
									]}
								>
									{index + 1}
								</Text>
							</TouchableOpacity>
						))}
					</View>
					<Text style={styles.text}>Write review</Text>
					<TextInput
						multiline
						mode="flat"
						numberOfLines={10}
						style={styles.input}
						activeOutlineColor={"transparent"}
						outlineColor={"transparent"}
						underlineColor={"transparent"}
						activeUnderlineColor={"transparent"}
						value={reviewMessage}
						onChangeText={(e) => setReviewMessage(e)}
						theme={{
							fonts: {
								light: {
									fontFamily: "Corbel",
								},
								medium: {
									fontFamily: "Corbel",
								},
								regular: {
									fontFamily: "Corbel",
								},
								thin: {
									fontFamily: "Corbel",
								},
							},
						}}
					/>
					<LightButton
						text="Submit review"
						onPress={() => {
							console.log(
								`Você deu ${stars} estrelas, e sua mensagem foi: ${reviewMessage}`
							);
							setReviewMessage("");
							setStars(0);
							setModalVisible();
						}}
					/>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalInnerContainer: {
		backgroundColor: "white",
		width: "98%",
		height: "98%",
		borderRadius: 20,
		padding: 10,
	},
	title: {
		fontFamily: "Corbel-Bold",
		fontSize: 32,
		textAlign: "center",
		marginBottom: 30,
	},
	starsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	starsContainer: {
		borderWidth: 2,
		borderRadius: 12,
		width: 50,
		height: 55,
		borderColor: COLORS.primary,
	},
	notMargin: {
		margin: 0,
		marginBottom: -10,
		marginTop: -10,
	},
	starNumber: {
		textAlign: "center",
		fontFamily: "Corbel-Bold",
		fontSize: 18,
	},
	text: {
		fontFamily: "Corbel-Bold",
		fontSize: 18,
		marginTop: 45,
		marginBottom: 10,
	},
	input: {
		marginBottom: 28,
		backgroundColor: "#DEE9FF",
		borderTopRightRadius: 12,
		borderTopLeftRadius: 12,
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
	},
});

export default ModalReviews;
