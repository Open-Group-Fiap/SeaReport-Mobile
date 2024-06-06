import { AntDesign } from '@expo/vector-icons'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Markdown from 'react-native-markdown-display'
import { apiUrl } from 'utils/api'
import { colorPalette } from 'utils/colors'
import { userContext } from 'utils/context'

export default function Post({ post }: { post: { id: number; contentPost: string; date: Date } }) {
    const [liked, setLiked] = useState(false)
    const date = new Date(post.date)
    const [likeId, setLikeId] = useState<number | null>(null)
    const { user } = useContext(userContext)!
    useEffect(() => {
        handleLiked()
    }, [])

    if (!user) return null

    const handleLiked = async () => {
        const response = await fetch(apiUrl + '/likes/user/' + user.id + '/post/' + post.id)
        if (response.ok) {
            response.json().then((data) => {
                setLiked(true)
                setLikeId(data.id)
            })
        }
    }

    const handleLike = async () => {
        const response = await fetch(apiUrl + '/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idPost: post.id, idUser: user.id }),
        })
        if (response.ok) {
            response.json().then((data) => {
                setLiked(true)
                setLikeId(data.id)
            })
        }
    }

    const handleUnlike = async () => {
        const response = await fetch(apiUrl + '/likes/' + likeId, {
            method: 'DELETE',
        })
        if (response.ok) {
            setLiked(false)
        }
    }

    return (
        <View>
            <View key={post.id} style={styles.post}>
                <Markdown>{post.contentPost}</Markdown>
                <Text>Postado em: {date.toLocaleString()}</Text>
                <View style={styles.likeButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            liked ? handleUnlike() : handleLike()
                        }}>
                        <AntDesign
                            name={liked ? 'heart' : 'hearto'}
                            size={24}
                            color={colorPalette.main}
                        />
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
