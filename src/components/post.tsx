import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Markdown from 'react-native-markdown-display'
import { colorPalette } from 'utils/colors'

export default function Post({ post }: { post: { id: number; contentPost: string; date: Date } }) {
    const [liked, setLiked] = useState(false)
    return (
        <View>
            <View key={post.id} style={styles.post}>
                <Markdown>{post.contentPost}</Markdown>
                <Text>Postado em: {post.date.toLocaleString()}</Text>
                <View style={styles.likeButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setLiked(!liked)
                        }}>
                        <AntDesign name={liked ? 'heart' : 'hearto'} size={24} color={colorPalette.main} />
                    </TouchableOpacity>
                </View>
            </View>
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
    likeButtonContainer: {
        alignItems: 'flex-end',
    },
})
