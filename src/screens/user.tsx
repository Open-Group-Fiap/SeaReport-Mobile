import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { userContext } from "utils/context";
export default function UserScreen() {
    const { user, setUser } = useContext(userContext)!
    if (!user) return null 
    const level = Math.floor(user.xp / 50)
    console.log(user)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nome: {user.username}</Text>
            <Text style={styles.text}>Level: {level}</Text>
            <Text style={styles.text}>Xp: {user.xp} xp</Text>
            <Button
                title="Logout"
                onPress={() => {
                    const auth = getAuth()
                    auth.signOut()
                    console.log('logout')
                }}  
            />
 
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})
