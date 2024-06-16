import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

table: events
    id: number
    created_at: string
    name: string
    date: string
    venue: number // foreign key to venues.id

table: comments
    id: number
    created_at: string
    content: string
    event_id: number // foreign key to events.id
    is_pinned: boolean
    is_highlighted: boolean

table: venues
    id: number
    created_at: string
    name: string
    capacity: number
    type: string

*/

// Hooks for events table


