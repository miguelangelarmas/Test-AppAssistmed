import { API_HOST } from '../utils/constants';

export async function flexDates(reservationId, dateFrom, dateTo) {
	try {
		console.log(
			'flexDate() / reservationId, dateFrom, dateTo :',
			reservationId,
			dateFrom,
			dateTo
		);

		// const url = `${API_HOST}/changeReservation/${reservationId}/${dateFrom}/${dateTo}`;
		// const response = await fetch(url);
		// const result = await response.json();

		const result = {
			status: 'ok',
			respuesta: 'lalala',
		};

		// console.log('%c // flexDates / result: ', 'color: #008080', result);
		return result;
	} catch (error) {
		throw error;
	}
}
