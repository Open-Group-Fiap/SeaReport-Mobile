import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import InitialScreen from '../screens/initial'
import RegisterScreen from '~/screens/register'

export type RootStackParamList = {
    initial: undefined
    register: undefined
}

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
