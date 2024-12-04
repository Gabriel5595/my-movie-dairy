import { FlatList, StyleSheet, Text, View } from 'react-native';
import SectionShort from '../../components/SectionShort';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import tmdbApi from '../../service/tmdbApi';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    const BASE_URL = 'https://api.themoviedb.org/3';

    useEffect(() => {
        const headers = tmdbApi();

        fetch(`${BASE_URL}/genre/movie/list`, headers)
            .then((response) => response.json())
            .then((json) => setMovies(json.genres))
            .catch((err) => console.log(err));
    }, []);

    return (
        <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>Welcome to your Movie Dairy!</Text>
                </View>
            }
            renderItem={({ item, index }) => {
                const backgroundActive = index % 2 === 0;
                return (
                    <SectionShort
                        backgroundActive={backgroundActive}
                        sectionId={item.id}
                        sectionName={item.name}
                    />
                );
            }}
            ListFooterComponent={<Footer />}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#0B0C10',
    },
    textContainer: {
        height: 80,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#66FCF1',
    },
});

export default HomePage;
