import { useState } from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Markdown from 'react-native-markdown-display'
import { SafeAreaView } from 'react-native-safe-area-context'
import Post from '~/components/post'
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
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollArea}>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />    
                    ))}
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
