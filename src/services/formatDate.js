const DIAS = [
	"Domingo",
	"Lunes",
	"Martes",
	"Miercoles",
	"Jueves",
	"Viernes",
	"Sábado"
];

const MESES = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];

export function formatDate(yourDate, inputType, outputType) {
	try {
		// console.log(
		// 	'%c ////// formatDate() / yourDate, inputType, outputType : ',
		// 	'color: #bbbb14f5',
		// 	yourDate,
		// 	inputType,
		// 	outputType
		// );
		// input type
		if (inputType === 'date') {
			yourDate = yourDate;
			yourDate.setMinutes(yourDate.getMinutes() + yourDate.getTimezoneOffset());
		} else if (inputType === 'string') {
			yourDate = new Date(yourDate);
			yourDate.setMinutes(yourDate.getMinutes() + yourDate.getTimezoneOffset());
		} else {
			console.log('--- error formatDate()');
			return 'error';
		}

		// console.log(
		// 	'%c ////// formatDate() / yourDate, inputType, outputType : ',
		// 	'color: #bbbb14f5',
		// 	yourDate,
		// 	inputType,
		// 	outputType
		// );

		// output type
		if (outputType === 'date') {
			return yourDate;
		} else if (outputType === 'text') {
			const day = DIAS[yourDate.getDay()];
			const month = MESES[yourDate.getMonth()];
			const year = yourDate.getFullYear();
			const dateText = `${day} ${yourDate.getDate()} de ${month}, ${year}`;
			// console.log(
			// 	'%c /// formatDate() / outputType ===  text / day: ',
			// 	'color: #bc14f5; background: #faebff', yourDate, dateText
			// );
			return dateText
		} else if (outputType === 'string') {
			return yourDate.toISOString().split('T')[0];
		} else {
			console.log('--- error formatDate()');
			return 'error';
		}
	} catch (error) {
		console.log('error: ', error);
		throw error;
	}
}
