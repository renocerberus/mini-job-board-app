/**
 * Application Configuration Constants
 * 
 * This file contains all application-wide configuration constants that can be reused
 * across different components and pages. This centralizes configuration management
 * and makes it easier to maintain and update application settings.
 * 
 * Usage:
 * - Import individual constants: import { ITEMS_PER_PAGE } from "@/lib/config";
 * - Import the entire config: import { APP_CONFIG } from "@/lib/config";
 * 
 * Benefits:
 * - Single source of truth for configuration values
 * - Easy to modify application behavior globally
 * - Prevents hardcoded values scattered throughout the codebase
 * - Type-safe configuration with TypeScript
 */

// Supabase configuration
export const SUPABASE_CONFIG = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const;

// Application configuration constants
export const APP_CONFIG = {
  // Pagination settings
  PAGINATION: {
    ITEMS_PER_PAGE: 10,
  },
  
  // Search settings
  SEARCH: {
    MIN_SEARCH_LENGTH: 2,
    MAX_SEARCH_LENGTH: 100,
  },
  
  // Job types - centralized job type constants
  JOB_TYPES: {
    FULL_TIME: "full-time",
    PART_TIME: "part-time", 
    CONTRACT: "contract",
  },
  
  // Default values for forms and components
  DEFAULTS: {
    JOB_TYPE: "full-time",
  },
} as const;

// Export individual constants for easier imports
export const ITEMS_PER_PAGE = APP_CONFIG.PAGINATION.ITEMS_PER_PAGE;
export const MIN_SEARCH_LENGTH = APP_CONFIG.SEARCH.MIN_SEARCH_LENGTH;
export const MAX_SEARCH_LENGTH = APP_CONFIG.SEARCH.MAX_SEARCH_LENGTH; 