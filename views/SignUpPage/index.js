import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../service/emailAuth/supabaseClient';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não conferem.');
            return;
        }

        const { error } = await supabase.auth.signUp({
            email: email.trim(),
            password: password.trim(),
        });

        if (error) {
            setError(error.message);
        } else {
            Alert.alert(
                'Cadastro realizado',
                'Verifique seu email para confirmar o cadastro.'
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.signUpBox}>
                <Text style={styles.title}>Sign Up</Text>
                {error ? <Text style={{color: 'red', marginBottom: 10}}>{error}</Text> : null}
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <View style={styles.buttonContainer}>
                    <Button title="SEND" onPress={handleSignUp} />
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
    signUpBox: {
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

export default SignUpPage;