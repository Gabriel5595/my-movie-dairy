import React from 'react';
import { FlatList, View, Text, StyleSheet, Platform } from 'react-native';
import MovieCard from '../MovieCard';

const NUM_CARDS_WEB = 8;
const NUM_CARDS_MOBILE = 10;

const SectionShort = ({ backgroundActive, sectionId, sectionName }) => {
    const cardsData = Array.from({ length: Platform.OS === 'web' ? NUM_CARDS_WEB : NUM_CARDS_MOBILE }, (_, index) => ({
        id: index.toString(),
        title: `Movie ${index + 1}`,
    }));

    if (Platform.OS === 'web') {
        return (
            <View style={[styles.sectionContainer, { backgroundColor: backgroundActive ? "#1F2833" : "black" }]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{sectionName}</Text>
                </View>
                
                <View style={styles.gridContainer}>
                    {cardsData.map((card) => (
                        <MovieCard key={card.id} title={card.title} />
                    ))}
                </View>

                <View style={styles.sectionLink}>
                    <Text style={styles.linkText}>Ver mais...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.sectionContainer, { backgroundColor: backgroundActive ? "#1F2833" : "black" }]}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Section Name</Text>
            </View>

            <View style={styles.rowContainer}>
                <FlatList
                data={cardsData}
                renderItem={({ item }) => <MovieCard title={item.title} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.carousel}
                />
            </View>

            <View style={styles.sectionLink}>
                    <Text style={styles.linkText}>Ver mais...</Text>
            </View>
            
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
    rowContainer: {},
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
