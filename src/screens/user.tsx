import { getAuth } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { apiUrl } from 'utils/api'
import { userContext } from 'utils/context'
export default function UserScreen() {
    const { user, setUser } = useContext(userContext)!
    if (!user) return null
    const [pendingXP, setPendingXP] = useState(0)
    useEffect(() => {
        fetch(`${apiUrl}/report/user/${user.id}`)
            .then((response) => {
                if (!response.ok) {
                    return { content: [] }
                }
                return response.json()
            })
            .then((data) => {
                if (data.content.length > 0) {
                    setPendingXP(data.content.filter((report: any) => !report.approved).length * 50)
                }
            })
    }, [])
    const level = Math.floor(user.xp / 50)
    console.log(user)
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.text}>Nome: {user.username}</Text>
                <Text style={styles.text}>Level: {level}</Text>
                <Text style={styles.text}>Xp: {user.xp} xp</Text>
                <Text style={styles.text}>Pendente: {pendingXP} xp</Text>
                <Button
                    title="Logout"
                    onPress={() => {
                        const auth = getAuth()
                        auth.signOut()
                        console.log('logout')
                    }}
                />
            </View>
            <Text style={styles.text}>
                Dica: O XP pendente é calculado com base no número de denúnciass pendentes
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 70,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
