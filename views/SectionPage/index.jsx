import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
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
            style={styles.container}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
            <View style={{ marginLeft: 30, margin: 50 }}>
                <Text style={styles.titleText}>{sectionName}</Text>
            </View>

            <View style={styles.gridContainer}>
                {sectionMovies.map((item) => (
                    <MovieCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        releaseDate={item.release_date}
                        score={item.vote_average}
                    />
                ))}
            </View>

            {loading && <ActivityIndicator size="large" color="#66FCF1" />}
            <Footer />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100vh',
        backgroundColor: "#1F2833",
    },
    titleText: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#66FCF1",
    },
    gridContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 8,
        marginBottom: 10,
    },
});

export default SectionPage;


// import { useEffect, useState } from "react"
// import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
// import MovieCard from '../../components/MovieCard'
// import Footer from '../../components/Footer';
// import tmdbApi from "../../service/tmdbApi"

// const SectionPage = ({ route }) => {

//     const { sectionId, sectionName } = route.params;

//     const [sectionMovies, setSectionMovies] = useState([])
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);

//     const BASE_URL = 'https://api.themoviedb.org/3'

//     const fetchMovies = async (pageNumber) => {
//         try {
//             setLoading(true);
//             const headers = tmdbApi();
//             const response = await fetch(
//                 `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&with_genres=${sectionId}`,
//                 headers
//             );
//             const json = await response.json();
//             setSectionMovies((prevMovies) => [...prevMovies, ...json.results]);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchMovies(page)
//     }, [page])

//     const loadMoreMovies = () => {
//         if (!loading) {
//             setPage((prevPage) => prevPage + 1);
//         }
//     };

//     return (

//         <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 65 }}>

//             <View style={{marginLeft: 30, margin: 50}}>
//                 <Text style={styles.titleText}>{sectionName}</Text>
//             </View>
            

//             <View >
//                 <FlatList
//                     data={sectionMovies}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => (
//                         <MovieCard
//                             id={item.id}
//                             title={item.title}
//                             poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//                             releaseDate={item.release_date}
//                             score={item.vote_average}
//                         />
//                     )}
//                     contentContainerStyle={styles.gridContainer}
//                     onEndReached={loadMoreMovies}
//                     onEndReachedThreshold={0.01}
//                     ListFooterComponent={loading && <ActivityIndicator size="large" color="#66FCF1" />}
//                     numColumns={null}
//                     style={styles.listContent}
//                 />
//             </View>

//             <View>
//                 <Footer />
//             </View>
            
//         </ScrollView >
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         // flex:1,
//         height: '100vh',
//         backgroundColor: '#1F2833'
//     },
//     // gridContainer: {
//     //     flexDirection: 'row',
//     //     flexWrap: 'wrap',
//     //     justifyContent: 'center',
//     //     padding: 8,
//     //     flex: 1,
//     // },
//     titleContainer: {
//         margin: 10,
//     },
//     titleText: {
//         fontSize: 50,
//         fontWeight: "bold",
//         color: "#66FCF1"
//     },

//     listContent: {
//         paddingHorizontal: 8,
//         marginBottom:10,
//     },
//     gridContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap', // Permite quebra automática de linha
//     },
// });

// export default SectionPage;
