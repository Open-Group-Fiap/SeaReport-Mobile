import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import InitialScreen from '../screens/initial'
import RegisterScreen from '~/screens/register'
import { firebaseApp } from 'utils/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as firebaseAuth from 'firebase/auth'
import LoginScreen from '~/screens/login'
import HomeScreen from './homeTabs'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence

export type RootStackParamList = {
    initial: undefined
    register: undefined
    login: undefined
    home: undefined
}

export const auth = firebaseAuth.initializeAuth(firebaseApp, {
    persistence: reactNativePersistence(AsyncStorage),
})
type UserState = [TUser | null, Dispatch<SetStateAction<TUser | null>>]
const Stack = createStackNavigator<RootStackParamList>()
export const userContext = createContext<UserState | null>(null)
export default function RootStack() {
    const user = useState(null as TUser | null)
    return (
        <userContext.Provider value={user}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="initial"
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="initial" component={InitialScreen} />
                    <Stack.Screen name="register" component={RegisterScreen} />
                    <Stack.Screen name="login" component={LoginScreen} />
                    <Stack.Screen name="home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </userContext.Provider>
    )
}
