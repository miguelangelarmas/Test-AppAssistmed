export function restarDias(fecha, dias) {
	const offset = fecha.getTimezoneOffset();
	fecha = new Date(fecha.getTime() - offset * 60 * 1000);
	fecha.setDate(fecha.getDate() - dias);
	return fecha;
}
