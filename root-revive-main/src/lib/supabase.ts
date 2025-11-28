
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Use the provided Supabase URL and anonymous key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create the Supabase client with proper type definitions
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey;
};

// Storage bucket constants
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  PUBLIC: 'public',
  STORAGE: 'storage',
};

// Get all available buckets
export const getAvailableBuckets = async () => {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error('Error listing buckets:', error);
      return [];
    }

    console.log('Available buckets:', buckets?.map(b => b.name));
    return buckets || [];
  } catch (error) {
    console.error('Failed to list buckets:', error);
    return [];
  }
};

// Initialize storage buckets
export const initializeStorage = async () => {
  try {
    console.log('Initializing storage...');

    // Get available buckets
    const buckets = await getAvailableBuckets();

    if (buckets.length === 0) {
      console.log('No buckets found. Using default approach.');
      return {
        bucketName: null,
        initialized: false
      };
    }

    // Check if any of our preferred buckets exist
    const preferredBuckets = [
      STORAGE_BUCKETS.AVATARS,
      STORAGE_BUCKETS.PUBLIC,
      STORAGE_BUCKETS.STORAGE
    ];

    for (const bucketName of preferredBuckets) {
      if (buckets.some(b => b.name === bucketName)) {
        console.log(`Using existing bucket: ${bucketName}`);
        return {
          bucketName,
          initialized: true
        };
      }
    }

    // If we reached here, none of our preferred buckets exist
    // Use the first available bucket
    if (buckets.length > 0) {
      console.log(`Using fallback bucket: ${buckets[0].name}`);
      return {
        bucketName: buckets[0].name,
        initialized: true
      };
    }

    console.log('No usable buckets found');
    return {
      bucketName: null,
      initialized: false
    };
  } catch (err) {
    console.error('Storage initialization error:', err);
    return {
      bucketName: null,
      initialized: false
    };
  }
};
