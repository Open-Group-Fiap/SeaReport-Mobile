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
        
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setPosts(data)
            })
    }, [])
    return (
        <View>
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollArea}>
                    {posts.length > 0 ? (
                        posts.map((post) => <Post key={post.id} post={post} />)
                    ) : (
                        <Text>Carregando...</Text>
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
})
