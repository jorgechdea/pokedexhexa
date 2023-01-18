import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';
import Navigation from './src/navigation/Navigation';

function App() {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}



export default App;
