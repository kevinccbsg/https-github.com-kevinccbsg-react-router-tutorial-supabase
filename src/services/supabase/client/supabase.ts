import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL as string;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient<Database>(PROJECT_URL, ANON_KEY);

export default supabase;
