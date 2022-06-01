import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_HOST } from '../utils/constants';
import { VOUCHER_STORAGE } from '../utils/constants';

export async function getVoucherApi(docNum) {
	try {
		const url = `${API_HOST}/booking/${docNum}`;
		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		return error;
	}
}

export async function storageVoucherApi() {
	try {
		const apiVoucher = await getVoucherApi();
		await AsyncStorage.setItem(VOUCHER_STORAGE, JSON.stringify(apiVoucher));
	} catch (error) {
		return error;
	}
}

export async function getDataStorage() {
	try {
		const dataStorage = await AsyncStorage.getItem(VOUCHER_STORAGE);
		if (dataStorage !== null) {

		}
	} catch (e) {
		return error;
	}
}
