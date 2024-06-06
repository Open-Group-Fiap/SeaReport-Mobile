import React, { useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { colorPalette } from 'utils/colors'
import { RootStackParamList } from '~/navigation'
import { firebaseApp } from 'utils/firebase'
import { apiUrl } from 'utils/api'
import { userContext } from 'utils/context'

type RegisterScreenProps = StackNavigationProp<RootStackParamList, 'register'>

export default function RegisterScreen() {
    const { user, setUser } = useContext(userContext)!
    const navigation = useNavigation<RegisterScreenProps>()
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value })
    }
    const submit = async () => {
        console.log(formData)
        for (const key in formData) {
            if (formData[key as keyof typeof formData] === '') {
                setMsg('Preencha todos o campos')
                return
            }
        }
        if (formData.password !== formData.confirmPassword) {
            setMsg('As senhas não coincidem')
            return
        }
        if (formData.password.length < 6) {
            setMsg('A senha deve ter pelo menos 6 caracteres')
            return
        }
        const auth = getAuth(firebaseApp)
        setLoading(true)
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email.toLowerCase().trim(),
            formData.password
        ).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    setMsg('Email já existe')
                    break
                case 'auth/invalid-email':
                    setMsg('Email inválido')
                    break
                case 'auth/network-request-failed':
                    setMsg('Erro de rede')
                    break
                case 'auth/operation-not-allowed':
                    setMsg('Email inválido')
                    break
                case 'auth/user-disabled':
                    setMsg('Email inválido')
                    break
                case 'auth/invalid-credential':
                    setMsg('Email inválido')
                    break
                default:
                    setMsg(errorMessage)
            }
            setLoading(false)
            return
        })
        if (!userCredential) return
        const user = userCredential.user
        await fetch(`${apiUrl}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.name,
                phoneNumber: formData.phone,
                xp: 0,
                auth: {
                    id: user.uid,
                    email: user.email,
                },
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setUser(data)
                setLoading(false)
                navigation.pop()
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                setMsg('Erro ao criar conta no servidor')
            })
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
                    placeholder="Nome"
                    textContentType="name"
                    value={formData.name}
                    enabled={!loading}
                    onChangeText={(text) => handleChange('name', text)}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Email"
                    enabled={!loading}
                    textContentType="emailAddress"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Telefone"
                    enabled={!loading}
                    textContentType="telephoneNumber"
                    value={formData.phone}
                    onChangeText={(text) => handleChange('phone', text)}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Senha"
                    enabled={!loading}
                    textContentType="password"
                    secureTextEntry={true}
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Confirme sua senha"
                    textContentType="password"
                    secureTextEntry={true}
                    enabled={!loading}
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                />
                <TouchableOpacity style={[styles.formButton, loading && styles.formButtonDisabled]} onPress={submit}>
                    <Text style={styles.formButtonText}>{loading ? 'Carregando...' : 'Registrar'}</Text>
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
    formHeader: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
    },
    formMsg: {
        color: 'red',
        fontSize: 16,
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
    formButtonDisabled: {
        backgroundColor: '#aaa',
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
