export function sumarDias(fecha, dias) {
	const offset = fecha.getTimezoneOffset();
	fecha = new Date(fecha.getTime() - offset * 60 * 1000);

	// yourDate = yourDate;
	// yourDate.setMinutes(yourDate.getMinutes() + yourDate.getTimezoneOffset());

	// console.log(
	// 	'%c ||| sumarDias() / fecha : ',
	// 	'color: #bc14f5; background: #faebff',
	// 	fecha
	// );
	fecha.setDate(fecha.getDate() + (dias - 1));
	// fecha = formatDate(fecha, 'date', 'date');
	// console.log(
	// 	'%c ||| sumarDias() / fecha : ',
	// 	'color: #bc14f5; background: #faebff',
	// 	fecha
	// );
	return fecha;
}
