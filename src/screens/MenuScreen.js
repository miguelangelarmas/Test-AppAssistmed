import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import {
	useTheme,
	Avatar,
	Title,
	Caption,
	Paragraph,
	Drawer,
	Text,
	TouchableRipple,
	Switch,
	Divider,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { openExternalLink } from '../services/openExternalLink';

export default function MenuScreen(props) {
	const { signOut } = useContext(AuthContext);
	const { colors } = useTheme();

	// console.log(
	// 	'%c MenuScreen / AuthContext: ',
	// 	'color: #DF6200; background: #FFF7F0',
	// 	props
	// );

	const {
		menu: { mas },
	} = props;

	return (
		<SafeAreaView>
			<View style={[styles.header, { backgroundColor: colors.accent }]}>
				<Text style={styles.headerText}>Menu</Text>
			</View>
			{mas.map((item, i) => {
				return (
					<Drawer.Item
						key={i}
						// icon={item.icon}
						label={item.key}
						onPress={() => openExternalLink(item.type, item.value)}
					/>
				);
			})}
			<Divider></Divider>
			<Drawer.Item
				style={styles.logoutButton}
				icon='exit-to-app'
				label='Cerrar sesion'
				onPress={() => signOut()}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		height: 50,
		width: '100%',
		justifyContent: 'center',
		paddingLeft: 20,
	},
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
	},
	logoutButton: {
		marginTop: 100,
	},
});
