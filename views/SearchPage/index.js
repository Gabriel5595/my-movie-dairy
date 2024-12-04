import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Platform, Dimensions } from 'react-native';
import tmdbApi from '../../service/tmdbApi';
import MovieCard from '../../components/MovieCard';

const MovieSearchPage = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [movies, setMovies] = useState([]);

    const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

    const fetchMovies = (query, year) => {
        const headers = tmdbApi();
        let url = `${BASE_URL}?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
        if (year) {
            url += `&year=${year}`;
        }
        fetch(url, headers)
            .then(response => response.json())
            .then(json => setMovies(json.results || []))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (name.length > 0) {
            const delayDebounceFn = setTimeout(() => {
                fetchMovies(name, year);
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setMovies([]);
        }
    }, [name, year]);

    const isWeb = Platform.OS === 'web';
    const numColumns = isWeb ? 8 : 2;

    const renderItem = ({ item }) => (
        <MovieCard
            poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            score={item.vote_average}
            title={item.title}
            releaseDate={item.release_date}
            id={item.id}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#ccc"
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Year"
                    placeholderTextColor="#ccc"
                    keyboardType="numeric"
                    onChangeText={text => setYear(text)}
                    value={year}
                />
            </View>
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={numColumns}
                key={numColumns}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2833',
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#0B0C10',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    list: {
        alignItems: 'center',
    },
});

export default MovieSearchPage;
