export function restarDias(fecha, dias) {
	const offset = fecha.getTimezoneOffset();
	fecha = new Date(fecha.getTime() - offset * 60 * 1000);

	// yourDate = yourDate;
	// yourDate.setMinutes(yourDate.getMinutes() + yourDate.getTimezoneOffset());

	console.log(
		'%c ||| restarDias() / fecha : ',
		'color: #bc14f5; background: #faebff',
		fecha
	);
	fecha.setDate(fecha.getDate() - dias);
	// fecha = formatDate(fecha, 'date', 'date');
	console.log(
		'%c ||| restarDias() / fecha : ',
		'color: #bc14f5; background: #faebff',
		fecha
	);
	return fecha;
}
