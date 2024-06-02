import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { colorPalette } from 'utils/colors';
import { RootStackParamList } from '~/navigation';

type RegisterScreenProps = StackNavigationProp<RootStackParamList, 'register'>;

export default function RegisterScreen() {
    const navigation = useNavigation<RegisterScreenProps>();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };
    const submit = () => {
        console.log(formData);
        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Erro ao criar conta', 'As senhas não coincidem');
            return;
        }
        if (formData.password.length < 6) {
            Alert.alert('Erro ao criar conta', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }
        for (const key in formData) {
            if (formData[key as keyof typeof formData] === '') {
                Alert.alert('Erro ao criar conta', 'Preencha todos os campos');
                return;
            }
        }
    };

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
    );
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
});

