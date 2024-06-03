import { useState } from 'react'
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { colorPalette } from 'utils/colors'

export default function ReportButton() {
    const [modal, setModal] = useState(false)
    return (
        <TouchableOpacity style={styles.button}>
            <Modal animationType="slide" visible={modal} onRequestClose={() => setModal(false)}>
                <View style={styles.modal}>
                    <View style={styles.modalMainContainer}>
                        <Text style={styles.modalText}>Denunciar</Text>
                        <TextInput
                            placeholder="Descrição"
                            style={styles.modalInput}
                            multiline={true}
                        />
                        <Pressable onPress={() => setModal(false)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Enviar</Text>
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