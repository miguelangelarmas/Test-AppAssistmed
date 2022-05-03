import { API_HOST } from '../utils/constants';

export async function flexDates(reservationId, dateFrom, dateTo) {
	try {
		// const url = `${API_HOST}/booking/123456789`;

		const url = `${API_HOST}/changeReservation/${reservationId}/${dateFrom}/${dateTo}`;
		const response = await fetch(url);
		const result = await response.json();
		console.log('%c // flexDates / result: ', 'color: #008080', result);
		return result;
	} catch (error) {
		throw error;
	}
}
