import { View, Text } from 'react-native';
import React from 'react';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

// const prefix = Linking.createURL('/');

export function openExternalLink(type, link) {
	if (type === 'webpage') {
		WebBrowser.openBrowserAsync(link);
	} else if (type === 'none') {
		return;
	} else {
		Linking.openURL(link);
	}
}
