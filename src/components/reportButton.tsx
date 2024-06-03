import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colorPalette } from "utils/colors";

export default function ReportButton() {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
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
