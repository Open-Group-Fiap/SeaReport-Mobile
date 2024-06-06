import AsyncStorage from '@react-native-async-storage/async-storage'
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

type TPostStorage = {
    posts: TPost[]
    timestamp: number
}

export default function DashboardScreen() {
    const [posts, setPosts] = useState<TPost[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getPosts() {
            console.log('getPosts')
            try {
                const posts = await AsyncStorage.getItem('posts')
                console.log(posts)
                if (posts) {
                    const postsStorage = JSON.parse(posts) as TPostStorage
                    if (postsStorage.timestamp + 300000 > Date.now()) {
                        setPosts(postsStorage.posts)
                        setIsLoading(false)
                        return
                    }
                }
                const response = await fetch(`${apiUrl}/post`)
                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }
                const data = await response.json()
                console.log(data)
                await AsyncStorage.setItem(
                    'posts',
                    JSON.stringify({ posts: data.content, timestamp: Date.now() })
                )
                setPosts(data.content)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        getPosts()
    }, [])

    return (
        <View>
            <Text style={styles.title}>Dashboard</Text>
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollArea}>
                    {isLoading ? (
                        <Text style={styles.fallbackText}>Loading...</Text>
                    ) : posts.length > 0 ? (
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
