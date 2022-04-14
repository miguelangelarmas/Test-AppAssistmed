import React, { useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Platform,
	Button,
	Keyboard,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { user, userDetails } from '../utils/userDB';
import useAuth from '../hooks/useAuth';
import {
	getVoucherApi,
	storageVoucherApi,
	getDataStorage,
} from '../services/apiVoucher';
import { AuthContext } from '../context/AuthContext';
import { Users } from '../model/users';

export default function LoginScreen({ navigation }) {
	const [data, setData] = React.useState({
		username: '',
		check_textInputChange: false,
		secureTextEntry: true,
		isValidUser: true,
	});

	const loginHandle = (userName) => {
		console.log('LoginScreen / loginHandle :', userName);
		const foundUser = Users.filter((item) => {
			console.log('LoginScreen / item :', item);
			console.log('LoginScreen / item :', userName == item.username);
			return userName == item.username;
		});
		console.log('LoginScreen / foundUser :', foundUser);

		if (data.username.length == 0) {
			console.log(
				'Wrong Input!',
				'Username or password field cannot be empty.',
				[{ text: 'Okay' }]
			);
			return;
		}

		if (foundUser.length == 0) {
			console.log('Invalid User!', 'Username or password is incorrect.', [
				{ text: 'Okay' },
			]);
			return;
		}
		signIn(foundUser);
	};

	const { signIn } = useContext(AuthContext);

	const [error, setError] = useState('');

	const textInputChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				username: val,
				check_textInputChange: true,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				username: val,
				check_textInputChange: false,
				isValidUser: false,
			});
		}
	};

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};

	const handleValidUser = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				isValidUser: false,
			});
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iniciar sesión</Text>
			<TextInput
				placeholder='Your Username'
				placeholderTextColor='#666666'
				style={[
					styles.input,
					{
						// color: colors.text,
					},
				]}
				autoCapitalize='none'
				onChangeText={(val) => textInputChange(val)}
				onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
			/>

			<Button
				title='SING IN'
				onPress={() => {
					loginHandle(data.username);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 28,
		fontWeight: 'bold',
		marginTop: 50,
		marginBottom: 15,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},
	error: {
		textAlign: 'center',
		color: '#f00',
		marginTop: 20,
	},
});
