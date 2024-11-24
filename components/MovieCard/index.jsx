import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MovieCard = ({ title }) => {
    return (
        <View style={styles.cardContainer}>
            
            <View style={styles.basicContainer}>
                <View style={styles.posterContainer}>
                    <Image 
                        style={styles.poster}
                        source={{ uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/443b18186095503.656f58fc0b6e1.png"}}/>
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>88</Text>
                </View>
            </View>

            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Arcane</Text>
                </View>

                <View style={styles.releaseContainer}>
                    <Text>06 de nov de 2021</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
        height: 280,
        width: 160,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        margin: 10
    },
    poster: {
        height: 200,
        resizeMode: "contain"
    },
    scoreContainer: {
        width: 35,
        backgroundColor: "black",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: -20,
        borderRadius: 50
    },
    scoreText: {
        color: "white",
        fontSize: 24
    },


    textContainer: {
        margin: 10,
        width: 140
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default MovieCard;
