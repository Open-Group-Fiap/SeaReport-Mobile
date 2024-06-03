import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'
import DashboardScreen from '~/screens/dashboard'
import { RootStackParamList } from '.'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackScreenProps } from '@react-navigation/stack'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
const posts = [
    {
        id: 1,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        date: new Date(),
    },
    {
        id: 2,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        date: new Date(),
    },
    {
        id: 3,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        date: new Date(),
    },
    {
        id: 4,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        date: new Date(),
    },
    {
        id: 5,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        date: new Date(),
    },
]
const Tab = createBottomTabNavigator()
type homeScreenProps = StackNavigationProp<RootStackParamList, 'home'>
export default function HomeScreen() {
    const navigation = useNavigation<homeScreenProps>()
    useEffect(() => {
        const auth = getAuth()
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigation.replace('initial')
            }
        })
    })
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={({ route }) => {
                    return {
                        tabBarIcon: ({ focused }) => {
                            let iconName
                            if (route.name === 'dashboard') {
                                iconName = focused ? '🏠' : '🏡'
                            }
                            return <Text style={{ fontSize: 24 }}>{iconName}</Text>
                        },
                    }
                }}>
                <Tab.Screen name="dashboard" component={DashboardScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
