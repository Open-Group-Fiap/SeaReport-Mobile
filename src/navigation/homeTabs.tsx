import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { Alert, BackHandler, Text, View } from 'react-native'
import DashboardScreen from '~/screens/dashboard'
import { RootStackParamList } from '.'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackScreenProps } from '@react-navigation/stack'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import HomeIcon from 'assets/svgs/homeIcon'
import { colorPalette } from 'utils/colors'
import UserIcon from 'assets/svgs/userIcon'
import UserScreen from '~/screens/user'
import ReportsScreen from '~/screens/reports'
import WaveIcon from 'assets/svgs/waveIcon'
import ReportButton from '~/components/reportButton'

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
    }, [navigation])
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
            return true
        })
    }, [])
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName="dashboard"
                screenOptions={({ route }) => {
                    return {
                        tabBarIcon: ({ focused }) => {
                            if (route.name === 'dashboard') return <HomeIcon color={'#fff'} />
                            if (route.name === 'user') return <UserIcon color={'#fff'} />
                            if (route.name === 'reports') return <WaveIcon color={'#fff'} />
                            return <Text>Icon</Text>
                        },
                        tabBarLabel: () => {
                            return <></>
                        },
                        tabBarStyle: {
                            backgroundColor: colorPalette.main,
                            paddingTop: 10,
                            paddingBottom: 10,
                            height: '9%',
                        },
                        headerShown: false,
                    }
                }}>
                <Tab.Screen name="reports" component={ReportsScreen} />
                <Tab.Screen name="dashboard" component={DashboardScreen} />
                <Tab.Screen name="user" component={UserScreen} />
            </Tab.Navigator>
            <ReportButton />
        </NavigationContainer>
    )
}
