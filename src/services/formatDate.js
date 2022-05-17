export function formatDate(yourDate, inputType, outputType) {
	try {
		console.log(
			'%c ////// formatDate() / yourDate, inputType, outputType : ',
			'color: #bbbb14f5',
			yourDate,
			inputType,
			outputType
		);
		if (inputType === 'date') {
			yourDate = yourDate;
			yourDate.setMinutes(yourDate.getMinutes() + yourDate.getTimezoneOffset());

			// console.log(
			// 	'%c /// formatDate() / inputType === date : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate
			// );
		} else if (inputType === 'string') {
			yourDate = new Date(yourDate);
			yourDate.setMinutes(yourDate.getMinutes() + yourDate.getTimezoneOffset());

			// console.log(
			// 	'%c /// formatDate() / inputType === string : ',
			// 	'color: #bc14f5; background: #faebff',
			// 	yourDate
			// );
		} else {
			console.log('--- error formatDate()');
			return 'error';
		}

		console.log(
			'%c ////// formatDate() / yourDate, inputType, outputType : ',
			'color: #bbbb14f5',
			yourDate,
			inputType,
			outputType
		);

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
		} else if (outputType === 'yearmonthday') {
			console.log(
				'%c /// formatDate() / outputType ===  string / yourDate:  ',
				'color: #bc14f5; background: #faebff',
				yourDate
			);
			let year = yourDate.getFullYear();
			let month = yourDate.getMonth();
			let day = yourDate.getDate();

			let yearmontday = [];
			yearmontday[0] = year;
			yearmontday[1] = month;
			yearmontday[2] = day;

			yearmontday = new Date(yearmontday[0], yearmontday[1], yearmontday[2]);

			console.log(
				'%c /// formatDate() / outputType ===  yearrmontday : ',
				'color: #bc14f5; background: #faebff',
				yearmontday
			);

			return yearmontday;
		} else {
			console.log('--- error formatDate()');
			return 'error';
		}
	} catch (error) {
		console.log('error: ', error);
		throw error;
	}
}
