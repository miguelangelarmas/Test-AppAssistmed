import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { openExternalLink } from '../services/openExternalLink';
import { AuthContext } from '../context/AuthContext';

export default function FloatCircleButton() {
	const { voucherStorageData } = useContext(AuthContext);

	return (
		<FAB
			style={styles.fab}
			medium
			icon='whatsapp'
			color='white'
			onPress={() =>
				openExternalLink(
					'whatsapp',
					'https://wa.me/541150409882?text=Estoy%20interesado%20en%20pruebaprueba'
				)
			}
		/>
	);
}

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: '#25D366',
	},
});
