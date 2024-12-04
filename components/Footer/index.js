import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

const Footer = () => {
    const isWeb = Platform.OS === 'web';
    const { width } = Dimensions.get('window');

    return (
        <View style={styles.footerContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.footerText}>Desenvolvido por Gabriel Carvalho</Text>
            </View>

            <View style={[styles.textContainer, { width: isWeb ? 'auto' : width * 0.8 }]}>
                <Text style={styles.footerText}>Powered by https://www.themoviedb.org/</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    footerText: {
        color: '#fff',
        fontStyle: 'italic',
        textAlign: 'center', // Centraliza o texto para telas menores
        flexWrap: 'wrap', // Permite quebra de linha
    },
});

export default Footer;