import React, { useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Platform,
	TouchableOpacity,
	Image,
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
		docNum: '',
		check_textInputChange: false,
		secureTextEntry: true,
		isValidUser: true,
	});

	const loginHandle = async (docNum) => {
		const responseDataApi = await getVoucherApi(docNum);
		let validResponse = 'no';

		if (responseDataApi.error === false) {
			validResponse = 'si';
		} else {
			validResponse = 'no';
		}

		console.log(
			'%c LoginScreen / loginHandle /responseDataApi : ',
			'color: #136CBF; background: #D9E7F5',
			responseDataApi,
			validResponse
		);

		signIn(validResponse, responseDataApi);
	};

	const { signIn } = useContext(AuthContext);

	const [error, setError] = useState('');

	const textInputChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				docNum: val,
				check_textInputChange: true,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				docNum: val,
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
			<Image
				style={styles.logo}
				source={require('../../assets/Assistmed_HomeLogo.png')}
			/>
			<Text style={styles.title}>Hola viajero</Text>
			<Text style={styles.subtitle}>
				Esta es tu cobertura. Sólo te queda disfrutar.
			</Text>
			<TextInput
				placeholder='Ingrese su número de documento'
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

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					loginHandle(data.docNum);
				}}
			>
				<Text style={styles.buttonText}>Empezar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#33569A',
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: '#ffffff',
	},
	logo: {
		marginTop: 50,
		width: 300,
		height: 78,
	},
	title: {
		marginTop: 50,
		fontSize: 28,
		color: '#606060',
	},
	subtitle: {
		fontSize: 17,
		marginTop: 15,
		marginBottom: 35,
		color: '#606060',
	},
	input: {
		borderColor: '#606060',
		color: '#606060',
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
