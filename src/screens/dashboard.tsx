import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiUrl } from 'utils/api'
import Post from '~/components/post'
type TPost = {
    id: number
    contentPost: string
    date: Date
}
export default function DashboardScreen() {
    const [posts, setPosts] = useState<TPost[]>([])
    useEffect(() => {
        fetch(`${apiUrl}/post`)
            .then((response) => {
                if (!response.ok) {
                    return { content: [] }
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setPosts(data.content)
            })
    }, [])
    return (
        <View>
            <Text style={styles.title}>Dashboard</Text>
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollArea}>
                    {posts && posts.length > 0 ? (
                        posts.map((post) => <Post key={post.id} post={post} />)
                    ) : (
                        <Text style={styles.fallbackText}>Nada aqui por enquanto...</Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    scrollArea: {
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 48,
    },
    fallbackText: {
        fontSize: 20,
        textAlign: 'center',
    },
})
