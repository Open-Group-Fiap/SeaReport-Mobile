import React, { useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { colorPalette } from 'utils/colors'
import { RootStackParamList } from '~/navigation'
import { firebaseApp } from 'utils/firebase'
import { userContext } from 'utils/context'
import { apiUrl } from 'utils/api'

type LoginScreenProps = StackNavigationProp<RootStackParamList, 'login'>

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenProps>()
    const [msg, setMsg] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { user, setUser } = useContext(userContext)!
    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value })
    }
    const submit = async () => {
        console.log(formData)
        for (const key in formData) {
            if (formData[key as keyof typeof formData] === '') {
                Alert.alert('Erro ao logar', 'Preencha todos os campos')
                return
            }
        }
        const auth = getAuth(firebaseApp)
        const user = await signInWithEmailAndPassword(
            auth,
            formData.email.trim(),
            formData.password
        ).catch((error) => {
            if (error.code === 'auth/wrong-password') {
                setMsg('Senha inválida')
            } else if (error.code === 'auth/user-not-found') {
                setMsg('Email inválido')
            } else if (error.code === 'auth/invalid-email') {
                setMsg('Email inválido')
            } else if (error.code === 'auth/network-request-failed') {
                setMsg('Erro de rede')
            } else if (error.code === 'auth/operation-not-allowed') {
                setMsg('Email inválido')
            } else if (error.code === 'auth/user-disabled') {
                setMsg('Email inválido')
            } else if (error.code === 'auth/invalid-credential') {
                setMsg('Email inválido')
            } else setMsg(error.message)
        })
        if (!user) {
            return
        }
        if (user.user.email) {
            console.log(
                `${apiUrl}/user/auth`,
                JSON.stringify({
                    id: user.user.uid,
                    email: formData.email,
                })
            )
            const dataUserRequest = await fetch(`${apiUrl}/user/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user.user.uid,
                    email: formData.email,
                }),
            })
            const dataUser = await dataUserRequest.json()
            console.log(dataUser)
            setUser(dataUser)
            navigation.pop()
        }
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <AntDesign name="arrowleft" size={24} />
            </TouchableOpacity>
            <View style={styles.form}>
                <Text style={styles.formHeader}>Digite suas informações: </Text>
                {msg && <Text style={styles.formMsg}>{msg}</Text>}
                <TextInput
                    style={styles.formInput}
                    placeholder="Email"
                    textContentType="emailAddress"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Senha"
                    textContentType="password"
                    secureTextEntry={true}
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                />
                <TouchableOpacity style={styles.formButton} onPress={submit}>
                    <Text style={styles.formButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 42,
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    formMsg: {
        color: 'red',
        fontSize: 16,
        marginBottom: 16,
    },
    formHeader: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
    },
    formInput: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 16,
        padding: 8,
        width: '80%',
        borderWidth: 1,
    },
    formButton: {
        backgroundColor: colorPalette.main,
        borderRadius: 8,
        padding: 16,
        width: '80%',
    },
    formButtonText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
})
