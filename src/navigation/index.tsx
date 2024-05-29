import { Feather } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Text, View, StyleSheet } from 'react-native'

import Overview from '../screens/overview'

export type RootStackParamList = {
    Overview: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export default function RootStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Overview">
                <Stack.Screen name="Overview" component={Overview} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    backButtonText: {
        color: '#007AFF',
        marginLeft: 4,
    },
})
