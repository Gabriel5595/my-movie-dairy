import { ScrollView, StyleSheet, Text } from 'react-native';
import SectionShort from '../../components/SectionShort';
import { View } from 'react-native';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import tmdbApi from '../../service/tmdbApi';

const HomePage = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = 'https://api.themoviedb.org/3'

    useEffect(() => {
        fetch(`${BASE_URL}/genre/movie/list`, tmdbApi)
            .then(response => response.json())
            .then(json => setMovies(json))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        console.log(movies)
    }, [movies])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>Welcome to your Movie Dairy!</Text>
            </View>
            
            <SectionShort backgroundActive={true} />
            <SectionShort backgroundActive={false} />
            <SectionShort backgroundActive={true} />
            <SectionShort backgroundActive={false} />

            <Footer />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0C10',
    },
    textContainer: {
        height: 80,
        justifyContent: "center"
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: "#66FCF1"
    },
});

export default HomePage;