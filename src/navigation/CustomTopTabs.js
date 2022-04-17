import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
import MiCoberturaVouchersScreen from '../screens/MiCoberturaVouchersScreen';
import MiCoberturaCoberturasScreen from '../screens/MiCoberturaCoberturasScreen';

export default function CustomTopTabs() {
	const [activeTab, setActiveTab] = useState('tab1');
	console.log('activeTab: ', activeTab);
	const selectTab = (tab) => {
		setActiveTab(tab);
	};

	return (
		<View style={styles.container}>
			<View style={styles.tabPanel}>
				<TouchableRipple style={styles.tab} onPress={() => selectTab('tab1')}>
					<View
						style={[
							styles.tab,
							activeTab === 'tab1' ? styles.tabActive : styles.tabInactive,
						]}
					>
						<Text>VOUCHERS</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple style={styles.tab} onPress={() => selectTab('tab2')}>
					<View
						style={[
							styles.tab,
							activeTab === 'tab2' ? styles.tabActive : styles.tabInactive,
						]}
					>
						<Text>COBERTURA</Text>
					</View>
				</TouchableRipple>
			</View>
			<View style={styles.bodyPanel}>
				{activeTab === 'tab1' ? (
					<MiCoberturaVouchersScreen />
				) : (
					<MiCoberturaCoberturasScreen />
				)}
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabPanel: {
		flexGrow: 0,
		flexShrink: 0,
		flexBasis: 'auto',
		flexDirection: 'row',
	},
	bodyPanel: {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 'auto',
	},
	tab: {
		flex: 1,
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	tabActive: {
		borderBottomColor: 'red',
		borderBottomWidth: 2,
	},
	tabInactive: {
		borderBottomColor: 'red',
		borderBottomWidth: 0,
	},
});
