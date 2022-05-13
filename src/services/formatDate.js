export function formatDate(yourDate, inputType, outputType) {
	try {
		// console.log(
		// 	'%c ////// formatDate() / yourDate, inputType, outputType : ',
		// 	'color: #bc14f5; background: #faebff',
		// 	yourDate,
		// 	inputType,
		// 	outputType
		// );
		if (inputType === 'date') {
			const offset = yourDate.getTimezoneOffset();
			yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
			// console.log(
			// 	'%c /// formatDate() / inputType === date : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate
			// );
		} else if (inputType === 'string') {
			yourDate = new Date(yourDate);
			const offset = yourDate.getTimezoneOffset();
			yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
			// console.log(
			// 	'%c /// formatDate() / inputType === string : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate
			// );
		} else {
			console.log('--- error formatDate()');
			return 'error';
		}

		if (outputType === 'date') {
			// console.log(
			// 	'%c /// formatDate() / outputType === date : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate
			// );
			return yourDate;
		} else if (outputType === 'string') {
			// console.log(
			// 	'%c /// formatDate() / outputType ===  string : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate.toISOString().split('T')[0]
			// );
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
