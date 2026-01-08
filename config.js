// ========================================
// SUPABASE CONFIGURATION
// ========================================
// Replace these with your actual Supabase credentials

const SUPABASE_URL = 'https://aroafigxwjoqgmgfaabl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_H_jEPZ9zDEszYBfFvobtnA_0ThKzf8v';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
