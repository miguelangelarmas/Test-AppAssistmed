import React from 'react';
import { View } from 'react-native';
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
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MenuScreen(props) {
	const {
		menu: { mas },
	} = props;
	console.log('menuItems', mas);
	return (
		<DrawerContentScrollView>
			<View>
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
			</View>
		</DrawerContentScrollView>
	);
}
