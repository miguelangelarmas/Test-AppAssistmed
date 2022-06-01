import { API_HOST } from '../utils/constants';

export async function sendFlexates(reservationId, dateFrom, dateTo) {
	try {
		console.log(
			'flexDate() / reservationId, dateFrom, dateTo :',
			reservationId,
			dateFrom,
			dateTo
		);

		const url = `${API_HOST}/changeReservation/${reservationId}/${dateFrom}/${dateTo}`;
		const response = await fetch(url);
		const result = await response.json();

		// const result = {
		// 	status: 'ok',
		// 	respuesta:
		// 		'La nueva fecha de tu voucher se ha registrado con éxito. Tus nuevas fechas son:.',
		// };
		// const result = {
		// 	status: 'ko',
		// 	respuesta: 'El cambio no ha podido ser registrado correctamente, comuníquese con ventas@assist-med.net',
		// };

		return result;
	} catch (error) {
		return "error";
	}
}
