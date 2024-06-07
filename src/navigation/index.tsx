import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import InitialScreen from '../screens/initial'
import RegisterScreen from '~/screens/register'
import { firebaseApp } from 'utils/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as firebaseAuth from 'firebase/auth'
import LoginScreen from '~/screens/login'
import HomeScreen from './homeTabs'
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { userContext } from 'utils/context'
import { apiUrl } from 'utils/api'

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

const Stack = createStackNavigator<RootStackParamList>()
export default function RootStack() {
    const [user, setUser] = useState(null as TUser | null)
    useEffect(() => {
        auth.onAuthStateChanged(async (firebaseUser) => {
            if (!user && firebaseUser && firebaseUser.email) {
                const userRequest = await fetch(`${apiUrl}/user/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: firebaseUser.uid,
                        email: firebaseUser.email,
                    }),
                }).catch((err) => {
                    console.error(err)
                })
                if (userRequest) {
                    const dataUserText = await userRequest.text()
                    try {
                        const dataUser = JSON.parse(dataUserText)
                        setUser(dataUser)
                    } catch (err) {
                        auth.signOut()
                    }
                }
            } else {
                setUser(null)
            }
        })
    }, [])

    return (
        <userContext.Provider value={{
            user,
            setUser,
        }}>
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
