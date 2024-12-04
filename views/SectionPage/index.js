import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Platform } from "react-native";
import MovieCard from "../../components/MovieCard";
import Footer from "../../components/Footer";
import tmdbApi from "../../service/tmdbApi";

const SectionPage = ({ route }) => {
    const { sectionId, sectionName } = route.params;

    const [sectionMovies, setSectionMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const BASE_URL = "https://api.themoviedb.org/3";

    const fetchMovies = async (pageNumber) => {
        try {
            setLoading(true);
            const headers = tmdbApi();
            const response = await fetch(
                `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&with_genres=${sectionId}`,
                headers
            );
            const json = await response.json();
            setSectionMovies((prevMovies) => [...prevMovies, ...json.results]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isAtBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

        if (isAtBottom && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <ScrollView
            style={[
                styles.container,
                Platform.OS === "ios" ? styles.iosContainer : styles.androidContainer,
            ]}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{sectionName}</Text>
            </View>

            <View style={styles.gridContainer}>
                {sectionMovies.map((item) => (
                    <View style={styles.card} key={item.id}>
                        <MovieCard
                            id={item.id}
                            title={item.title}
                            poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            releaseDate={item.release_date}
                            score={item.vote_average}
                        />
                    </View>
                ))}
            </View>

            {loading && <ActivityIndicator size="large" color="#66FCF1" />}
            <Footer />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1F2833",
        flex: 1,
    },
    iosContainer: {
        paddingTop: 50, // Ajuste específico para iOS
    },
    androidContainer: {
        paddingTop: 20, // Ajuste específico para Android
    },
    titleContainer: {
        marginLeft: 16,
        marginBottom: 20,
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#66FCF1",
    },
    gridContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly", // Distribui o espaço entre os itens
        alignItems: "flex-start",
        paddingHorizontal: 8,
    },
    card: {
        width: "45%", // Cada cartão ocupa quase metade da largura da tela
        marginBottom: 16,
    },
});

export default SectionPage;