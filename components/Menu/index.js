import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Menu = ({ userPhoto, navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.links}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Text style={styles.linkText}>Pesquisa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
                    <Text style={styles.linkText}>Meus Favoritos</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileContainer}>
                <Image source={{ uri: userPhoto }} style={styles.profileImage} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    links: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 16,
        color: '#333',
        marginHorizontal: 10,
    },
    profileContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default Menu;