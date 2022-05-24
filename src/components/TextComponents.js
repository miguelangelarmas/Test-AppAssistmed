import { View, Text } from 'react-native';
import React from 'react';

export const Headline = (props) => (
	<View style={styles.iconWrap}>
		<Text>{props.text}</Text>
	</View>
);

const styles = StyleSheet.create({
	text: {},
});
