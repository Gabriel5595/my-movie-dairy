import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import MovieCard from '../MovieCard';
import tmdbApi from '../../service/tmdbApi';
import { useNavigation } from '@react-navigation/native';

const NUM_CARDS_WEB = 8;
const NUM_CARDS_MOBILE = 10;

const SectionShort = ({ backgroundActive, sectionId, sectionName }) => {

    const [movieInCategory, setMovieInCategory] = useState([])

    const navigation = useNavigation();
    const BASE_URL = 'https://api.themoviedb.org/3'

    useEffect(() => {
        const headers = tmdbApi();

        fetch(`${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${sectionId}`, headers)
            .then(response => response.json())
            .then(json => setMovieInCategory(json.results))
            .catch(err => console.log(err))
    }, []);

    if (Platform.OS === 'web') {
        return (
            <View style={[styles.sectionContainer, { backgroundColor: backgroundActive ? "#1F2833" : "black" }]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{sectionName}</Text>
                </View>

                <View style={styles.gridContainer}>
                    {movieInCategory.slice(0, NUM_CARDS_WEB).map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            releaseDate={movie.release_date}
                            score={movie.vote_average} />
                    ))}
                </View>

                <Pressable 
                    onPress={() => navigation.navigate('Category', {sectionId, sectionName})}
                    style={styles.sectionLink}
                >
                    <Text style={styles.linkText}>Ver mais...</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={[styles.sectionContainer, { backgroundColor: backgroundActive ? "#1F2833" : "black" }]}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{sectionName}</Text>
            </View>

            <ScrollView horizontal contentContainerStyle={styles.rowContainer}>
                {movieInCategory.slice(0, NUM_CARDS_MOBILE).map((item) => (
                    <MovieCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        releaseDate={item.release_date}
                        score={item.vote_average}
                    />
                ))}
            </ScrollView>

            <Pressable 
                    onPress={() => navigation.navigate('SectionPage', {sectionId, sectionName})}
                    style={styles.sectionLink}
                >
                    <Text style={styles.linkText}>Ver mais...</Text>
            </Pressable>

        </View>

    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        width: "100%",
    },

    titleContainer: {
        margin: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#66FCF1"
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 8,
    },
    carousel: {
        paddingHorizontal: 8,
    },
    sectionLink: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        padding: 10,
        justifyContent: 'flex-end',
    },
    linkText: {
        fontSize: 16,
        color: "#66FCF1"
    }
});

export default SectionShort;
