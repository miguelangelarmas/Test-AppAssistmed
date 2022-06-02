import { API_HOST } from '../utils/constants';

export async function sendFlexates(reservationId, dateFrom, dateTo) {
	try {
		const url = `${API_HOST}/changeReservation/${reservationId}/${dateFrom}/${dateTo}`;
		const response = await fetch(url);
		const result = await response.json();

		return result;
	} catch (error) {
		return "error";
	}
}
