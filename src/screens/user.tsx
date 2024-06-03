import { StyleSheet, Text, View } from "react-native";
const user = {
    id: 1,
    username: "John Doe",
    phone: "1234567890",
    xp: 100,
}

export default function UserScreen() {
    const level = Math.floor(user.xp / 50)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nome: {user.username}</Text>
            <Text style={styles.text}>Telefone: {user.phone}</Text>
            <Text style={styles.text}>Level: {level}</Text>
            <Text style={styles.text}>Xp: {user.xp} xp</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})
