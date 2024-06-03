import { getAuth } from 'firebase/auth'
import { Button, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Markdown from 'react-native-markdown-display'
import { SafeAreaView } from 'react-native-safe-area-context'
const posts = [
    {
        id: 1,
        content: `# Lorem ipsum 
        dolor sit amet, consectetur adipiscing elit`,
        date: new Date(),
    },
    {
        id: 2,
        content: `# Lorem ipsum 
        dolor sit amet, consectetur adipiscing elit`,
        date: new Date(),
    },
    {
        id: 3,
        content: `# Lorem ipsum
        dolor sit amet, consectetur adipiscing elit`,
        date: new Date(),
    },
    {
        id: 4,
        content: `# Lorem ipsum 
        dolor sit amet, consectetur adipiscing elit`,
        date: new Date(),
    },
    {
        id: 5,
        content: `# Lorem ipsum 
        dolor sit amet, consectetur adipiscing elit`,
        date: new Date(),
    },
    {
        id: 6,
        content: `# Lorem ipsum 
        dolor sit amet, consectetur adipiscing elit`,
        date: new Date(),
    },
    {
        id: 7,
        content: `# Lorem ipsum 
        dolor sit amet, consectetur adipiscing elit`,
        date: new Date(),
    },
    {
        id: 8,
        content: `# Lorem ipsum 
        dolor sit amet, consectetur adipiscing elit`,
        date: new Date(),
    },
]
export default function DashboardScreen() {
    return (
        <View>
            <Text>Dashboard</Text>
            <Button
                title="Logout"
                onPress={() => {
                    const auth = getAuth()
                    auth.signOut()
                }}
            />
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ height: '92%' }}>
                    {posts.map((post) => (
                        <View key={post.id} style={styles.post}>
                            <Markdown>{post.content}</Markdown>
                            <Text>Postado em: {post.date.toLocaleString()}</Text>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    post: {
        padding: 10,
        margin: 10,
        backgroundColor: '#ccc',
        borderRadius: 10,
    },
})
