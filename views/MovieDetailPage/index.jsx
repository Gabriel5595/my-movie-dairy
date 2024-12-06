import { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View } from 'react-native';
import tmdbApi from "../../service/tmdbApi";
import Footer from "../../components/Footer";

const MovieDetailPage = ({ route }) => {
    const { poster, score, title, releaseDate, id } = route.params;

    const [movieDetails, setMovieDetails] = useState([]);
    const [movieCast, setMovieCast] = useState([]);

    const BASE_URL = "https://api.themoviedb.org/3";

    const fetchDetails = (id, BASE_URL) => {
        const headers = tmdbApi();

        console.log(`${BASE_URL}/movie/${id}`)
        fetch(`${BASE_URL}/movie/${id}`, headers)
            .then(response => response.json())
            .then(json => setMovieDetails(json))
            .catch(err => console.log(err))
    };

    const fetchCast = (id, BASE_URL) => {
        const headers = tmdbApi();

        console.log(`${BASE_URL}/movie/${id}/credits`)
        fetch(`${BASE_URL}/movie/${id}/credits`, headers)
            .then(response => response.json())
            .then(json => setMovieCast(json))
            .catch(err => console.log(err))
    };

    useEffect(() => {
        fetchDetails(id, BASE_URL)
        fetchCast(id, BASE_URL)
    }, []);

    useEffect(() => {
        console.log(movieDetails)
        console.log(movieCast)
    }, [movieDetails]);


    return (
        <View style={styles.container}>

            <View style={styles.mainContainer}>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: poster }}
                    />
                </View>

                <View style={styles.mainInfoContainer}>

                    <View style={styles.basicInfoContainer}>
                        <Text style={styles.textTitle}>{title}</Text>
                        <Text style={styles.textAddInfo}>{releaseDate.split('-').reverse().join('.')} - {movieDetails.genres ? movieDetails.genres.map(genre => genre.name).join(', ') : "Sem gênero"} - {movieDetails.runtime}min</Text>
                    </View>

                    <View style={styles.scoreSynopsisContainer}>
                        <View style={styles.scoreContainer}>
                            <View style={styles.scoreBox}>
                                <Text style={styles.scoreText}>{parseFloat(score).toFixed(1)}</Text>
                            </View>
                        </View>

                        <View style={styles.SynopsisContainer}>
                            <Text style={styles.SynopsisTitle}>Synopsis</Text>
                            <Text style={styles.SynopsisText}>{movieDetails.overview}</Text>
                        </View>
                    </View>

                    <View style={styles.actorsContainer}>
                        <Text style={styles.actorsTitle}>Actors</Text>
                        {movieCast.cast && Array.isArray(movieCast.cast) && movieCast.cast.length > 0 ? (
                            movieCast.cast.slice(0, 8).map((castMember, index) => (
                                <Text key={index} style={styles.actorsNames}>
                                    {castMember.name} - {castMember.character}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.actorsNames}>No cast available</Text>
                        )}
                    </View>


                </View>

            </View>

            <Footer />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1F2833",
        display: 'flex',
        flexDirection: 'column',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '85vh',
    },
    imageContainer: {
        width: '33vw',
        marginTop: 20,
    },
    image: {
        height: 500,
        resizeMode: "contain"
    },
    mainInfoContainer: {
        width: '67vw'
    },
    basicInfoContainer: {
        height: '15vh'
    },
    textTitle: {
        margin: 10,
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    },
    textAddInfo: {
        marginLeft: 20,
        color: 'white'
    },
    scoreSynopsisContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    scoreContainer: {
        width: '10vw',
        height: '20vh',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreBox: {
        width: 100,
        height: 100,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    scoreText: {
        color: "white",
        fontSize: 60,
        fontWeight: 'bold'
    },
    SynopsisContainer: {
        width: '55vw',
        height: '30vh'
    },
    SynopsisTitle: {
        color: "white",
        fontSize: 35,
        fontWeight: 'bold',
        margin: 10,
    },
    SynopsisText: {
        color: "white",
        fontSize: 16,
        margin: 10,
        textAlign: 'justify'
    },
    actorsContainer: {
        height: '20vh'
    },
    actorsTitle: {
        color: "white",
        fontSize: 35,
        fontWeight: 'bold',
        margin: 10,
    },
    actorsNames: {
        color: "white",
        fontSize: 16,
        margin: 10,
        textAlign: 'justify',
    }
})

export default MovieDetailPage;