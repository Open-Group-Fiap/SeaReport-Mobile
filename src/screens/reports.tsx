import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { colorPalette } from 'utils/colors'

type TReport = {
    id: number
    description: string
    dateReport: Date
    category: number
    approved: boolean
    location: {
        latitude: number
        longitude: number
    }
}

export default function ReportsScreen() {
    const [reports, setReports] = useState<TReport[]>([])
    useEffect(() => {
        fetch('https://api.example.com/report')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setReports(data)
            })
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Denuncias</Text>
            <SafeAreaView>
                <ScrollView>
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <View key={report.id} style={styles.reportsContainer}>
                                <Text style={styles.text}>
                                    Denuncia feita em: {report.dateReport.toLocaleString()}
                                </Text>
                                <Text style={styles.text}>
                                    Status:{' '}
                                    <Text
                                        style={[
                                            report.approved ? styles.approved : styles.pending,
                                        ]}>
                                        {report.approved ? 'Aprovado' : 'Pendente'}{' '}
                                    </Text>
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text>Sem denuncias!</Text>
                    )}
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
