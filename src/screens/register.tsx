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
        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Erro ao criar conta', 'As senhas não coincidem')
            return
        }
        if (formData.password.length < 6) {
            Alert.alert('Erro ao criar conta', 'A senha deve ter pelo menos 6 caracteres')
            return
        }
        for (const key in formData) {
            if (formData[key as keyof typeof formData] === '') {
                Alert.alert('Erro ao criar conta', 'Preencha todos os campos')
                return
            }
        }
        const auth = getAuth(firebaseApp)
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.error(errorCode, errorMessage)
            Alert.alert('Erro ao criar conta', errorMessage)
        })
        if (!userCredential) return
        const user = userCredential.user
        console.log(`${apiUrl}/user`)
        console.log(user)
        console.log(
            JSON.stringify({
                username: formData.name,
                phoneNumber: formData.phone,
                auth: { id: user.uid, email: user.email },
            })
        )
        const a = await fetch(`${apiUrl}/user`)
        console.log(await (a.json()))
        await fetch(`${apiUrl}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.name,
                phoneNumber: formData.phone,
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
                navigation.pop()
            })
            .catch((error) => {
                console.error(error)
                Alert.alert('Erro ao criar conta', 'Erro ao criar conta no servidor')
            })
        console.log('user', user)
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <AntDesign name="arrowleft" size={24} />
            </TouchableOpacity>
            <View style={styles.form}>
                <Text style={styles.formHeader}>Digite suas informações: </Text>
                <TextInput
                    style={styles.formInput}
                    placeholder="Nome"
                    textContentType="name"
                    value={formData.name}
                    onChangeText={(text) => handleChange('name', text)}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Email"
                    textContentType="emailAddress"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Telefone"
                    textContentType="telephoneNumber"
                    value={formData.phone}
                    onChangeText={(text) => handleChange('phone', text)}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Senha"
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
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                />
                <TouchableOpacity style={styles.formButton} onPress={submit}>
                    <Text style={styles.formButtonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 32,
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
