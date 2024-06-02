import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import InitialScreen from '../screens/initial'
import RegisterScreen from '~/screens/register'
import { firebaseApp } from 'utils/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as firebaseAuth from 'firebase/auth'

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence

export type RootStackParamList = {
    initial: undefined
    register: undefined
}

export const auth = firebaseAuth.initializeAuth(firebaseApp, {
    persistence: reactNativePersistence(AsyncStorage),
})

const Stack = createStackNavigator<RootStackParamList>()

export default function RootStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="initial"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="initial" component={InitialScreen} />
                <Stack.Screen name="register" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
