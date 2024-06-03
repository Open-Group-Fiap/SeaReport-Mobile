import { getAuth } from "firebase/auth";
import { Button, Text, View } from "react-native";

export default function DashboardScreen() {
    return (
        <View>
            <Text>Dashboard</Text>
            <Button title="Logout" onPress={() => {
                const auth = getAuth()
                auth.signOut()
            }} />
        </View>
    )
}
