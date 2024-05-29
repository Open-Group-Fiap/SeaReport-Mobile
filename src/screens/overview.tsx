import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { RootStackParamList } from '../navigation'
import UserIcon from 'assets/svgs/userIcon'
import WaveIcon from 'assets/svgs/waveIcon'
import HomeIcon from 'assets/svgs/homeIcon'

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>

export default function Overview() {
    const navigation = useNavigation<OverviewScreenNavigationProps>()

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View>
                    <UserIcon color="#000" />
                    <Image
                        source={require('assets/logo.png')}
                        style={{
                            backgroundColor: '#000',
                        }}
                    />
                    <WaveIcon color="#000" />
                    <HomeIcon color="#000" />
                    <Text style={styles.title}>Hello World</Text>
                    <Text style={styles.subtitle}>This is the first page of your app.</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Show Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#6366F1',
        borderRadius: 24,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: 24,
    },
    main: {
        flex: 1,
        maxWidth: 960,
        marginHorizontal: 'auto',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 64,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#38434D',
        fontSize: 36,
    },
})
