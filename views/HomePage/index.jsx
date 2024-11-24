import { ScrollView, StyleSheet, Text } from 'react-native';
import SectionShort from '../../components/sectionShort';
import { View } from 'react-native';

const HomePage = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>Welcome to your Movie Dairy!</Text>
            </View>
            
            <SectionShort backgroundActive={true} />
            <SectionShort backgroundActive={false} />
            <SectionShort backgroundActive={true} />
            <SectionShort backgroundActive={false} />
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