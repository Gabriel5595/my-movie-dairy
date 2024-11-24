import { View, StyleSheet, Text } from 'react-native';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <View styles={styles.content}>
                <Text>Bem-vindo à pagina inicial!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomePage;