import { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View, Modal, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native';
import tmdbApi from "../../service/tmdbApi";
import Footer from "../../components/Footer";
import ImageViewer from "react-native-image-zoom-viewer";

const MovieDetailPage = ({ route }) => {
    const { poster, score, title, releaseDate, id } = route.params;

    const [movieDetails, setMovieDetails] = useState([]);
    const [movieCast, setMovieCast] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const BASE_URL = "https://api.themoviedb.org/3";

    const fetchDetails = (id, BASE_URL) => {
        const headers = tmdbApi();
        fetch(`${BASE_URL}/movie/${id}`, headers)
            .then(response => response.json())
            .then(json => setMovieDetails(json))
            .catch(err => console.log(err));
    };

    const fetchCast = (id, BASE_URL) => {
        const headers = tmdbApi();
        fetch(`${BASE_URL}/movie/${id}/credits`, headers)
            .then(response => response.json())
            .then(json => setMovieCast(json))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchDetails(id, BASE_URL);
        fetchCast(id, BASE_URL);
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Detect platform
    const isWeb = Platform.OS === 'web';

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={isWeb ? styles.mainContainerWeb : styles.mainContainerMobile}>
                    <View style={isWeb ? styles.imageContainerWeb : styles.imageContainerMobile}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                style={isWeb ? styles.imageWeb : styles.imageMobile}
                                source={{ uri: poster }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={isWeb ? styles.mainInfoContainerWeb : styles.mainInfoContainerMobile}>
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
            </ScrollView>

            <Footer />

            <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={toggleModal}
            >
                <ImageViewer
                    imageUrls={[{ url: poster }]}
                    enableSwipeDown={true}
                    onSwipeDown={toggleModal}
                />
            </Modal>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1F2833",
        flex: 1,
    },
    mainContainerWeb: {
        flexDirection: 'row',
        height: '85vh',
    },
    mainContainerMobile: {
        flexDirection: 'column',
        padding: 10,
    },
    imageContainerWeb: {
        width: '33vw',
        marginTop: 20,
    },
    imageContainerMobile: {
        alignSelf: 'center',
        marginVertical: 10,
    },
    imageWeb: {
        height: 500,
        resizeMode: "contain",
    },
    imageMobile: {
        width: width * 0.8,
        height: width * 1.2,
        resizeMode: "contain",
    },
    mainInfoContainerWeb: {
        width: '67vw',
    },
    mainInfoContainerMobile: {
        marginVertical: 10,
    },
    basicInfoContainer: {
        marginVertical: 10,
    },
    textTitle: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textAddInfo: {
        color: 'white',
        textAlign: 'center',
        marginVertical: 5,
    },
    scoreSynopsisContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    scoreBox: {
        width: 80,
        height: 80,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    scoreText: {
        color: "white",
        fontSize: 24,
        fontWeight: 'bold',
    },
    SynopsisContainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    SynopsisTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    SynopsisText: {
        color: "white",
        fontSize: 16,
        textAlign: 'justify',
    },
    actorsContainer: {
        marginVertical: 10,
    },
    actorsTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    actorsNames: {
        color: "white",
        fontSize: 16,
        textAlign: 'center',
    },
});

export default MovieDetailPage;