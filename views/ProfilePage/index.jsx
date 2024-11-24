import { View, Text, StyleSheet } from 'react-native';

const ProfilePage = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Página de Perfil</Text>
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

export default ProfilePage;
