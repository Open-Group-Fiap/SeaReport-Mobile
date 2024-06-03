import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { RootStackParamList } from '../navigation'
import { colorPalette } from 'utils/colors'
import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'initial'>

export default function InitialScreen() {
    const navigation = useNavigation<OverviewScreenNavigationProps>()
    const auth = getAuth()
    const [isLogged, setIsLogged] = useState(false)
    const user = auth.currentUser
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLogged(true)
            } else {
                setIsLogged(false)
            }
        })
    }, [auth, navigation])
    useEffect(() => {
        if (isLogged) navigation.push('home')
    }, [isLogged, navigation])
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.content}>
                    <Image source={require('assets/logo.png')} />
                    <Text style={styles.title}>Sea Report</Text>
                    <Text style={styles.subtitle}>Seu aplicativo de denuncias maritimas.</Text>
                </View>
                {isLogged && user && (
                    <View>
                        <Text style={{ color: '#fff' }}>Você está logado como {user.email}</Text>
                    </View>
                )}
                {!isLogged && (
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => {
                                navigation.push('login')
                            }}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => {
                                navigation.push('register')
                            }}>
                            <Text style={styles.registerText}>Registrar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginButton: {
        alignItems: 'center',
        backgroundColor: colorPalette.main,
        borderRadius: 24,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 16,
        marginBottom: 0,
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    loginText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    registerButton: {
        alignItems: 'center',
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 16,
        marginTop: 0,
    },
    registerText: {
        color: '#eeeeee',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    buttons: {
        gap: 0,
        width: '100%',
    },
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        backgroundColor: colorPalette.darkerMain,
    },
    content: {
        alignItems: 'center',
        padding: 36,
        justifyContent: 'center',
        textAlign: 'center',
    },
    main: {
        flex: 1,
        maxWidth: 960,
        marginHorizontal: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 64,
        paddingTop: 36,
        lineHeight: 44,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: '#c4c4c4',
        fontSize: 36,
        textAlign: 'center',
    },
})
