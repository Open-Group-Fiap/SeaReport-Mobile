import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'
import DashboardScreen from '~/screens/dashboard'
import { RootStackParamList } from '.'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackScreenProps } from '@react-navigation/stack'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import HomeIcon from 'assets/svgs/homeIcon'
import { colorPalette } from 'utils/colors'

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
    }, [])
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={({ route }) => {
                    return {
                        tabBarIcon: ({ focused }) => {
                            if (route.name === 'dashboard') 
                                return <HomeIcon color={'#fff'} />
                            return <Text>Icon</Text>
                        },
                        tabBarLabel: () => {
                            return <></>
                        },
                        tabBarStyle: {
                            backgroundColor: colorPalette.main,
                            paddingTop: 10,
                            height: "8%",
                        },
                    }
                }}>
                <Tab.Screen name="dashboard" component={DashboardScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
