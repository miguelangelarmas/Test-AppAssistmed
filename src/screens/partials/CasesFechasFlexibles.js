import { View, StyleSheet } from 'react-native';
import React from 'react';
import {
	Text,
	Card,
	Title,
	Subheading,
	Divider,
	Avatar,
	Caption,
	TouchableRipple,
	Headline,
	Button,
	Paragraph,
	Dialog,
	Portal,
	Provider,
} from 'react-native-paper';

export function CaseSuccess(props) {
	const { titulo } = props;

	return (
		<Card elevation={2} style={styles.card}>
			<Card.Title
				title={titulo}
				subtitle='Fecha de viaje'
				left={FlexdateIcon}
			/>
			<Card.Content>
				<Divider />
				<Separador />
				<TouchableRipple onPress={showDatepicker} style={styles.twoColumnData}>
					{/* <TwoColumnButton leftName='Desde: ' rightValue={dateStringFrom} /> */}
				</TouchableRipple>

				<TouchableRipple style={[styles.twoColumnData, styles.inputDisabled]}>
					{/* <TwoColumnButton leftName='Hasta: ' rightValue={dateStringTo} /> */}
				</TouchableRipple>

				<Separador />

				<Button
					raised
					mode={'contained'}
					onPress={() =>
						sendFlexDates(
							voucherStorageData.reservaId,
							dateStringFrom,
							dateStringTo
						)
					}
				>
					ENVIAR
				</Button>
			</Card.Content>
		</Card>
	);
}

export function CasoDos() {
	return (
		<View style={styles.card}>
			<Text>PRUEBA CasoDos</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fcfcfc',
		flex: 1,
		padding: 15,
	},
	card: {
		marginBottom: 25,
	},
	twoColumnData: {
		// borderBottomColor: '#ff00ff',
		// borderBottomWidth: 1,
		flexDirection: 'row',
		height: 45,
		alignItems: 'center',
	},
	column: {
		flexGrow: 1,
	},
	text: {
		fontSize: 18,
	},
	inputDisabled: {
		opacity: 0.6,
	},
	textAlignLeft: {
		alignContent: 'flex-start',
	},
	textAlignRight: {
		alignContent: 'flex-end',
	},
	separador: {
		marginBottom: 10,
	},
});
