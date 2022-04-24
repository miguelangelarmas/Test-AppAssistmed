import React, { useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	Platform,
	TouchableOpacity,
	Image,
	Keyboard,
} from 'react-native';
import {
	Text,
	DefaultTheme,
	Avatar,
	Button,
	Card,
	Headline,
	Subheading,
	Title,
	TextInput,
	Paragraph,
	ActivityIndicator,
} from 'react-native-paper';
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
		setLoadingButton(true);
		if (docNum) {
			console.log('docNum: ', docNum);

			const responseDataApi = await getVoucherApi(docNum);
			let validResponse = '';

			if (responseDataApi.error === false) {
				validResponse = docNum;
			} else {
				validResponse = '';
				setError(true);
				setErrorMesagge(
					'No encontramos cobertura asociada al número de documento'
				);
			}
			signIn(validResponse, responseDataApi);
		} else {
			console.log('else docNum: ', docNum);
			setError(true);
			setErrorMesagge('Debe ingresar un número de documento.');
		}
		setLoadingButton(false);
		// console.log(
		// 	'%c LoginScreen / loginHandle /responseDataApi : ',
		// 	'color: #136CBF; background: #D9E7F5',
		// 	responseDataApi,
		// 	validResponse
		// );
	};

	const { signIn } = useContext(AuthContext);

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMesagge] = useState('');
	const [loadingButton, setLoadingButton] = useState(false);

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
			<Headline style={styles.title}>Hola viajer@</Headline>
			<Subheading style={styles.subtitle}>
				Esta es tu cobertura. Sólo te queda disfrutar.
			</Subheading>

			<TextInput
				label='Ingrese número de documento'
				mode={'flat'}
				multiline={false}
				style={styles.textInput}
				value={data.docNum}
				onChangeText={(val) => textInputChange(val)}
			/>

			<Button
				raised
				loading={loadingButton}
				mode={'contained'}
				style={styles.button}
				onPress={() => {
					loginHandle(data.docNum);
				}}
			>
				Empezar
			</Button>
			{error && <Text style={styles.error}>{errorMessage}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fcfcfc',
		flex: 1,
		padding: 20,
	},
	logo: {
		width: 300,
		height: 78,
	},
	title: { marginTop: 50 },
	subtitle: { marginBottom: 50 },

	textInput: { marginBottom: 15 },
	button: { height: 35 },
	error: {
		textAlign: 'center',
		color: '#DE481E',
		marginTop: 20,
	},
});
