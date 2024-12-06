import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfegzyaaayeeacarehsl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZWd6eWFhYXllZWFjYXJlaHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MDg4MjUsImV4cCI6MjA0OTA4NDgyNX0.je67EA3Z76cQAF8QsITuhj3h0fIVf6FQndO_Jz1hbnE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
