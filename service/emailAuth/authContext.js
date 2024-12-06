import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setUser(session?.user ?? null);

            const { data: subscription } = supabase.auth.onAuthStateChange(
                (_event, session) => {
                    setUser(session?.user ?? null);
                }
            );

            return () => subscription?.unsubscribe();
        };

        getSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
