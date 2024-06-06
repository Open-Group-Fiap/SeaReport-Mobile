import { useContext, useEffect, useState } from 'react'
import { Alert, Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { categories } from 'utils/categories'
import { colorPalette } from 'utils/colors'
import * as Location from 'expo-location'
import { apiUrl } from 'utils/api'
import { userContext } from 'utils/context'

export default function ReportButton() {
    const [modal, setModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [description, setDescription] = useState('')
    const { user } = useContext(userContext)!
    const [locationInfo, setLocationInfo] = useState({ permission: false, msg: '' })
    const submit = async () => {
        console.log('a')
        if (!locationInfo.permission) {
            Alert.alert('Erro ao enviar', 'Permissão de localização negada')
            return
        }
        if (selectedCategory === '') {
            Alert.alert('Erro ao enviar', 'Selecione uma categoria')
            return
        }
        if (description === '') {
            Alert.alert('Erro ao enviar', 'Preencha a descrição')
            return
        }
        if (!user) {
            Alert.alert('Erro ao enviar', 'Usuário não logado')
            return
        }
        const location = await Location.getCurrentPositionAsync()
        const response = await fetch(`${apiUrl}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: categories.get(selectedCategory),
                location: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                description,
                userId: user.id,
            }),
        })
        if (response.status === 201) {
            Alert.alert('Denúncia enviada', 'Sua denúncia foi enviada com sucesso')
            setModal(false)
        }
    }

    useEffect(() => {
        const effect = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setLocationInfo({ permission: false, msg: 'Permissão negada' })
            } else {
                setLocationInfo({ permission: true, msg: '' })
            }
        }
        if (modal) effect()
        else {
            setDescription('')
            setSelectedCategory('')
        }
    }, [modal])
    return (
        <TouchableOpacity style={styles.button}>
            <Modal animationType="slide" visible={modal} onRequestClose={() => setModal(false)}>
                <View style={styles.modal}>
                    {!locationInfo.permission ? <Text>{locationInfo.msg}</Text> : null}
                    <View style={styles.modalMainContainer}>
                        <Text style={styles.modalText}>Selecione a categoria</Text>
                        <Text style={styles.modalText}>Denunciar</Text>
                        <TextInput
                            placeholder="Descrição"
                            style={styles.modalInput}
                            multiline={true}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <View style={styles.modalCategoryContainer}>
                            {Array.from(categories).map(([key, value]) => (
                                <Pressable
                                    key={key}
                                    onPress={() => setSelectedCategory(key)}
                                    style={[
                                        styles.modalCategory,
                                        selectedCategory === key && styles.modalCategorySelected,
                                    ]}>
                                    <Text
                                        style={[
                                            styles.modalCategoryText,
                                            selectedCategory === key &&
                                            styles.modalCategoryTextSelected,
                                        ]}>
                                        {key}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <Pressable onPress={submit} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>
                                {locationInfo.permission ? 'Enviar' : 'Sem localização'}
                            </Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={() => setModal(false)}>
                        <Text style={styles.modalExitButton}>Fechar</Text>
                    </Pressable>
                </View>
            </Modal>
            <Text style={styles.text} onPress={() => setModal(true)}>
                +
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    modal: {
        backgroundColor: colorPalette.main,
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    },
    modalMainContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
    },
    modalText: {
        color: '#fff',
        fontSize: 30,
    },
    modalInput: {
        backgroundColor: '#fff',
        width: '90%',
        textAlignVertical: 'top',
        height: 200,
        borderRadius: 5,
        margin: 10,
        padding: 10,
    },
    modalCategoryContainer: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    modalCategory: {
        backgroundColor: '#fff',
        width: '35%',
        borderRadius: 5,
        margin: 10,
        padding: 10,
    },
    modalCategoryText: {
        color: '#000',
        fontSize: 16,
    },
    modalCategorySelected: {
        backgroundColor: colorPalette.darker,
    },
    modalCategoryTextSelected: {
        color: '#fff',
    },
    modalButton: {
        backgroundColor: colorPalette.darker,
        borderRadius: 5,
        width: 100,
        padding: 10,
    },
    modalButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
    modalExitButton: {
        backgroundColor: '#ED1D24',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        fontSize: 20,
    },
    button: {
        position: 'absolute',
        bottom: 85,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colorPalette.main,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30,
    },
})
