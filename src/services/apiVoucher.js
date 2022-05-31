import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_HOST } from '../utils/constants';
import { VOUCHER_STORAGE } from '../utils/constants';

export async function getVoucherApi(docNum) {
	try {
		// const url = `${API_HOST}/booking/123456789`;
		const url = `${API_HOST}/booking/${docNum}`;
		const response = await fetch(url);
		const result = await response.json();
		console.log('%c // getVoucherApi', 'color: #008080');
		return result;
	} catch (error) {
		return error;
	}
}

export async function storageVoucherApi() {
	try {
		const apiVoucher = await getVoucherApi();
		await AsyncStorage.setItem(VOUCHER_STORAGE, JSON.stringify(apiVoucher));
		console.log('%c // storageVoucherApi', 'color: #008080');
	} catch (error) {
		return error;
	}
}

export async function getDataStorage() {
	try {
		const dataStorage = await AsyncStorage.getItem(VOUCHER_STORAGE);
		if (dataStorage !== null) {
			// value previously stored
			console.log('%c // getDataStorage', 'color: #008080', dataStorage);
		}
	} catch (e) {
		return error;
	}
}
