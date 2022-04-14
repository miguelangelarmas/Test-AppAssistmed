import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default function ItemsList(props) {
	const { data, title } = props;

	const renderItem = ({ item }) => (
		<View style={styles.item}>
			<Text style={styles.title}>{item.name}</Text>
			<Text style={styles.subTitle}>
				{item.money} {item.value}
			</Text>
		</View>
	);

	return (
		<>
			<Text style={styles.mainTitle}>{title}</Text>
			<FlatList data={data} renderItem={renderItem} />;
		</>
	);
}

const styles = StyleSheet.create({
	flatListContentContainer: {
		paddingHorizontal: 5,
	},
	container: {
		flex: 1,
		marginTop: 10,
	},
	item: {
		padding: '10px 5px',
		marginVertical: 8,
		marginHorizontal: 16,
	},
	mainTitle: {
		fontSize: 24,
		color: '#06326B',
	},
	title: {
		fontSize: 18,
		color: '#06326B',
	},
	subTitle: {
		fontWeight: 'bold',
		fontSize: 18,
	},
});
