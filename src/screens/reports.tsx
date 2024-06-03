import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { colorPalette } from 'utils/colors'
import ReportButton from '~/components/reportButton'

const reports = [
    {
        id: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        date: new Date(),
        approved: true,
        latitude: 0,
        longitude: 0,
    },
    {
        id: 2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        date: new Date(),
        approved: false,
        latitude: 0,
        longitude: 0,
    },
]

export default function ReportsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Denuncias</Text>
            <SafeAreaView>
                <ScrollView>
                    {reports.map((report) => (
                        <View key={report.id} style={styles.reportsContainer}>
                            <Text style={styles.text}>
                                Denuncia feita em: {report.date.toLocaleString()}
                            </Text>
                            <Text style={styles.text}>
                                Status:{' '} 
                                <Text style={[report.approved ? styles.approved : styles.pending]}>
                                    {report.approved ? 'Aprovado' : 'Pendente'}{' '}
                                </Text>
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        height: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        color: '#fff',
    },
    approved: {
        color: '#00ff00',
    },
    pending: {
        color: '#ED1D24',
    },
    reportsContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: colorPalette.main,
        borderRadius: 10,
    },
})
