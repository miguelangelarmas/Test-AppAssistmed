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
import Separador from '../../components/Separador';
import { RoundedIcon } from '../../components/RoundedIcon';
export function CardFlexCases(props) {
	const {
		screen,
		title,
		subtitle,
		titleIcon,
		message,
		dateFrom,
		dateTo,
		headerIcon,
		iconSource,
		button,
		callbackBtnRetry
	} = props;

	const TwoColumnButton = (props) => {
		return (
			<>
				<View style={styles.column}>
					<Text style={styles.text}>{props.leftName}</Text>
				</View>
				<View style={(styles.column, styles.textAlignRight)}>
					<Text style={styles.text}>{props.rightValue}</Text>
				</View>
			</>
		);
	};





	return (
		<Card elevation={2} style={styles.card}>
			<Card.Title
				title={title}
				subtitle={subtitle}
				left={(props) => (
					<RoundedIcon {...props} style={props.leftStyle} icon={headerIcon} iconSource={iconSource} />
				)}
			/>
			<Card.Content>
				<Divider />
				{message && <Subheading style={styles.message}>{message}</Subheading>}
				<Separador />
				{dateFrom && (
					<TouchableRipple style={styles.twoColumnData}>
						<TwoColumnButton leftName='Desde: ' rightValue={dateFrom} />
					</TouchableRipple>
				)}
				{dateTo && (
					<TouchableRipple style={styles.twoColumnData}>
						<TwoColumnButton leftName='Hasta: ' rightValue={dateTo} />
					</TouchableRipple>
				)}

				<Separador />

				{button && (
					<Button
						raised
						mode={'contained'}
						onPress={callbackBtnRetry}
					>
						Reintentar
					</Button>
				)}
			</Card.Content>
		</Card>
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
	title: {
		color: 'red',
	},
	column: {
		flexGrow: 1,
	},
	message: {
		marginTop: 15
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
	iconWrap: {
		backgroundColor: 'green',
		borderRadius: 20,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		color: 'white',
		fontSize: 22,
	},
});
