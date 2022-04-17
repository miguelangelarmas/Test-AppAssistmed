import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
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

export default function MenuScreen(props) {
	const { signOut } = useContext(AuthContext);

	const {
		menu: { mas },
	} = props;
	console.log('menuItems', mas);
	return (
		<DrawerContentScrollView>
			<View>
				<View style={styles.header}>
					<Text style={styles.headerText}>Menu</Text>
				</View>
				{mas.map((item, i) => {
					return (
						<Drawer.Item
							key={i}
							icon={item.icon}
							label={item.key}
							onPress={() => {}}
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
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#DE481E',
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
