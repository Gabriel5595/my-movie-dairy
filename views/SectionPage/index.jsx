import { View, Text, StyleSheet } from 'react-native';

const SectionPage = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Página de Categoria</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default SectionPage;
