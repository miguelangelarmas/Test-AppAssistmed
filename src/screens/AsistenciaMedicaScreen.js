import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	DefaultTheme,
	Subheading,
	Appbar,
	Text,
	Title,
	Card,
	Divider,
	Caption,
	Headline,
	Paragraph,
} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

export default function ScreenAsistenciaMedica() {
	const { voucherStorageData } = useContext(AuthContext);

	console.log(
		'%c AsistenciaMedicaScreen / voucherStorageData: ',
		'color: #478B20; background: #E7FFD9',
		voucherStorageData
	);

	// const MapParagraph = voucherStorageData.notes.map((paragraph) => (
	// 	<Text>{paragraph.value}</Text>
	// ));

	return (
		<View style={styles.container}>
			{/* <MapParagraph /> */}
			<Card elevation={2}>
				<Card.Content>
					<Title>Procedimiento para el uso de tu asistencia</Title>

					{voucherStorageData.notes.map((condition, i) => {
						return (
							<>
								<Divider style={styles.divider}></Divider>
								<Paragraph>{condition.value}</Paragraph>{' '}
							</>
						);
					})}
				</Card.Content>
			</Card>

			<Subheading>Subheading</Subheading>
			<Text>Text</Text>
			<Caption>Caption</Caption>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
		padding: 15,
	},
	mainTitle: {
		fontSize: 24,
		color: '#06326B',
	},
	divider: {
		marginTop: 5,
		marginBottom: 5,
	},
	title: {
		fontSize: 18,
		color: '#06326B',
	},
	subTitle: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#06326B',
	},
	paragraph: {
		fontSize: 14,
		color: '#06326B',
	},
});
