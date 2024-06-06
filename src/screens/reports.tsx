import { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { apiUrl } from 'utils/api'
import { colorPalette } from 'utils/colors'
import { userContext } from 'utils/context'

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
    const {user} = useContext(userContext)!
    useEffect(() => {
        if(!user) return
        fetch(`${apiUrl}/report/user/${user.id}`)
            .then((response) => response.json())
            .then((data) => {
                setReports(data.content)
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
                                    Denuncia feita em: {new Date(report.dateReport).toLocaleString()}
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
        paddingTop: 50,
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
