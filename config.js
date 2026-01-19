// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL = 'https://aroafigxwjoqgmgfaabl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyb2FmaWd4d2pvcWdtZ2ZhYWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDYxMjgsImV4cCI6MjA4MzQyMjEyOH0.VyGbHbuaMf1nZMgqNmbXrhOCHAkuIB4k3xK8xqTHP9U';

// Initialize Supabase client
let supabase;

// Check multiple ways the library might be available
const supabaseLib = window.supabase || window.Supabase;

if (supabaseLib && supabaseLib.createClient) {
    supabase = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized successfully');
} else {
    console.error('Supabase library not loaded from CDN');

    // Create a mock object that won't crash
    const mockQuery = {
        select: function() { return this; },
        eq: function() { return this; },
        order: function() { return Promise.resolve({ data: [], error: null }); },
        insert: function() { return Promise.resolve({ data: null, error: null }); },
        update: function() { return this; },
        delete: function() { return this; }
    };

    supabase = {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            signUp: (opts) => Promise.resolve({ data: null, error: { message: 'Supabase not available. Please refresh the page.' } }),
            signInWithPassword: (opts) => Promise.resolve({ data: null, error: { message: 'Supabase not available. Please refresh the page.' } }),
            signOut: () => Promise.resolve({ error: null }),
            onAuthStateChange: (callback) => {
                return { data: { subscription: { unsubscribe: () => {} } } };
            }
        },
        from: (table) => mockQuery
    };
}
