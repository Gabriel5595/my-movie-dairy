import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../service/emailAuth/supabaseClient';

const SignInPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim(),
        });

        if (error) {
            setError(error.message);
        } else {
            // Sucesso no login
            // Navegue para a tela principal, por exemplo: 
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.title}>Login</Text>
                {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Send" onPress={handleSignIn} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign Up"
                        onPress={() => navigation.navigate('SignUp')}
                        color="#841584"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    loginBox: {
        width: '80%',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default SignInPage;