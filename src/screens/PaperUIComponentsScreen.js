import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	DefaultTheme,
	Subheading,
	Appbar,
	Text,
	Title,
	Caption,
	Headline,
	Paragraph,
} from 'react-native-paper';

export default function PaperUIComponentsScreen() {
	return (
		<View style={style.container}>
			{/* <MapParagraph /> */}
			<Headline>Headline</Headline>
			<Title>Title</Title>
			<Subheading>Subheading</Subheading>
			<Text>Text</Text>
			<Paragraph>Paragraph</Paragraph>
			<Caption>Caption</Caption>
		</View>
	);
}

const style = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
	},
});
