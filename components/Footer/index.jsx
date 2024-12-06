import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footerContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.footerText}>Desenvolvido por Gabriel Carvalho</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.footerText}>Powered by https://www.themoviedb.org/</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black'

    },
    textContainer: {
        marginHorizontal: 50,
        marginVertical: 10,
    },
    footerText: {
        color: '#fff',
        fontStyle: 'italic'
    }
});

export default Footer;