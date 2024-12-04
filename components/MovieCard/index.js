import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MovieCard = ({ poster, score, title, releaseDate, id }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() => navigation.navigate('Movie Details', { poster, score, title, releaseDate, id })}
        >
            <View style={styles.cardContainer}>
                <View style={styles.basicContainer}>
                    <View style={styles.posterContainer}>
                        <Image
                            style={styles.poster}
                            source={{ uri: poster }}
                        />
                    </View>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>{parseFloat(score).toFixed(1)}</Text>
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text
                            style={styles.titleText}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {title}
                        </Text>
                    </View>

                    <View style={styles.releaseContainer}>
                        <Text>{releaseDate ? releaseDate.split('-').reverse().join('.') : 'N/A'}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
        height: 350,
        width: 160,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 10,
    },
    basicContainer: {
        width: 150,
        height: 200,
        margin: 10,
    },
    poster: {
        height: 200,
        resizeMode: 'contain',
    },
    scoreContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#45A29E',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: -20,
        borderRadius: 50,
    },
    scoreText: {
        color: 'white',
        fontSize: 20,
    },
    textContainer: {
        margin: 10,
        width: 140,
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    releaseContainer: {
        marginTop: 5,
    },
});

export default MovieCard;
