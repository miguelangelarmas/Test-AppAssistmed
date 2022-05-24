import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
	DefaultTheme,
	Appbar,
	Text,
	Card,
	Title,
	Subheading,
	Divider,
	Caption,
	TouchableRipple,
	Headline,
	List,
	IconButton,
	Paragraph,
} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { openExternalLink } from '../services/openExternalLink';

const PhoneCard = (props) => {
	const { phone } = props;

	return (
		<View style={{ flexDirection: 'row', marginTop: 10 }}>
			<View style={{ flex: 4 }}>
				<Text>{phone.key}</Text>
				<Title>{phone.value}</Title>
			</View>
			<View style={{ flex: 1 }}>
				<IconButton
					style={{ backgroundColor: '#f7f7f7' }}
					icon={phone.icon}
					// color={'green'}
					size={25}
				/>
			</View>

			{/* <List.Item
				title={phone.value}
				description={phone.key}
				right={(props) => (
					<List.Icon {...props} icon='whatsapp' color={'green'} size={80} />
				)}
			/> */}
		</View>
	);
};

export default function ScreenAsistenciaMedica() {
	const { voucherStorageData } = useContext(AuthContext);

	// console.log(
	// 	'%c AsistenciaMedicaScreen / voucherStorageData: ',
	// 	'color: #478B20; background: #E7FFD9',
	// 	voucherStorageData
	// );

	// const MapParagraph = voucherStorageData.notes.map((paragraph) => (
	// 	<Text>{paragraph.value}</Text>
	// ));

	return (
		<ScrollView style={styles.container}>
			{/* <MapParagraph /> */}
			<Card elevation={2} style={styles.card}>
				<Card.Content>
					<Title>Procedimiento para el uso de tu asistencia</Title>

					{voucherStorageData.notes.map((condition, i) => {
						return (
							<View key={i}>
								<Divider style={styles.divider}></Divider>
								<Paragraph>{condition.value}</Paragraph>
							</View>
						);
					})}
				</Card.Content>
			</Card>

			<Card elevation={2} style={styles.card}>
				<Card.Content>
					<Title>Teléfonos</Title>

					{voucherStorageData.phones.map((phone, i) => {
						return (
							<View key={i}>
								<Divider style={styles.divider}></Divider>
								<TouchableRipple
									key={i}
									onPress={() => openExternalLink(phone.type, phone.phone)}
								>
									<PhoneCard phone={phone} />
								</TouchableRipple>
							</View>
						);
					})}
				</Card.Content>
			</Card>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f9f9f9',
		flex: 1,
		padding: 15,
	},
	card: {
		marginBottom: 25,
	},
	separador: {
		marginBottom: 10,
	},
	divider: {
		marginTop: 5,
		marginBottom: 5,
	},
});
