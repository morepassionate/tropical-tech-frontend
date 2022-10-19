import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: 20,
	},
	containerBtn: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 50,
	},
	btn: {
		backgroundColor: '#4A5CAE',
		borderRadius: 25,
		width: 300,
		paddingTop: 14,
		paddingBottom: 14,
		paddingLeft: 25,
		paddingRight: 25,
	},
	txtBtn: {
		textAlign: 'center',
		color: 'white',
		fontSize: 18,
		fontFamily: 'Corbel',
		fontWeight: 'bold',
	},
	txtAccount: {
		color: '#DEE9FF',
		marginTop: 15,
		fontSize: 16,
		fontFamily: 'Corbel',
	},
	linkLogin: {
		paddingLeft: 8,
		marginTop: 15,
		color: 'white',
	},
	txtLogin: {
		color: '#B8D8EB',
		fontWeight: 'bold',
		fontSize: 16,
		fontFamily: 'Corbel',
	},
});

export default styles;
