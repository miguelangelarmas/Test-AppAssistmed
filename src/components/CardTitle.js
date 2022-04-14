import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native';

export default function CardWithTitle(props) {
	const { data } = props;

	console.log('CardWithTitle: ', props);
	return (
		<View style={styles.card}>
			<View style={styles.namePanel}>
				<Text style={styles.nameText}>{data.name}</Text>
			</View>
			<View style={styles.divisionTop}>
				<View style={styles.divisionMiddle}></View>
				<View style={styles.divisionMiddle}>
					<Text>Precio total: </Text>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						<Text style={styles.bigPrice}>USD {data.value}</Text>
					</View>
				</View>
			</View>
			<View style={styles.divisionBottom}>
				<Text>{data.name}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		color: '#404040',
		backgroundColor: '#ffffff',
		padding: 15,
		margin: 5,
		borderRadius: 5,
	},
	button: {
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 4,
		backgroundColor: '#ff6f00',
		borderWidth: 0,
		alignSelf: 'flex-start',
		marginHorizontal: '1%',
		marginBottom: 6,
		width: '100%',
	},
	buttonLabel: {
		fontSize: 14,
		fontWeight: '500',
		color: 'white',
		textAlign: 'center',
	},
	smallText: {},
	bigPrice: {
		fontWeight: 'bold',
		fontSize: 26,
		color: '#0d406e',
	},
	stars: {
		flexDirection: 'row',
		width: 20,
		height: 20,
		marginLeft: 10,
		top: 5,
	},
	divisionMiddle: {
		flex: 1,
		width: '50%',
	},
	divisionTop: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	divisionBottom: {
		flex: 1,
		overflow: 'hidden',
	},
	namePanel: {
		height: 15,
		top: -10,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	nameText: {
		fontWeight: 'bold',
		color: 'grey',
		fontSize: 18,
		color: '#2b73b4',
	},
});
