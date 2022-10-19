import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		textAlign: 'center',
		color: '#1B4298',
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 20,
		fontFamily: 'Corbel',
	},
	description: {
		textAlign: 'center',
		fontSize: 18,
		color: '#1B4298',
		width: 250,
		marginTop: 20,
	},
	logo: {
		width: 90,
		height: 90,
	},
	form: {
		width: '100%',
		top: 50,
	},
	input: {
		marginBottom: 10,
		textAlign: 'center',
		borderBottomColor: '#979FA9',
		backgroundColor: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		fontFamily: 'Corbel',
		color: '#1B4298',
	},

	loginButton: {
		backgroundColor: '#1B4298',
		paddingTop: 14,
		paddingBottom: 14,
		width: 320,
		borderRadius: 25,
	},
	loginButtonText: {
		textAlign: 'center',
		color: '#fff',
		fontFamily: 'Corbel',
		fontSize: 18,
	},
});

export default styles;
