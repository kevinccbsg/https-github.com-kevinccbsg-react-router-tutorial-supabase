import { createClient, User } from "@supabase/supabase-js";
import type { Database } from "../../../src/services/supabase/client/database.types";

const SERVICE_ROLE = process.env.VITE_SUPABASE_SERVICE_ROLE as string;
const PROJECT_URL = process.env.VITE_SUPABASE_PROJECT_URL as string;

const supabaseAdmin = createClient<Database>(PROJECT_URL, SERVICE_ROLE, {
  auth: {
    persistSession: false,
    detectSessionInUrl: false,
    storageKey: "supabase.auth.token",
  },
});

export const deleteUser = async (user: User) => {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
  if (error) {
    throw error;
  }
};

export const cleanup = async () => {
  const { data } = await supabaseAdmin.auth.admin.listUsers();
  for (const user of data.users) {
    await deleteUser(user);
  }
};

const generateRandomHash = (length = 16) => {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (dec) => dec.toString(36))
    .join("")
    .substring(0, length);
};

export const randomUserData = () => ({
  email: `${generateRandomHash()}@example.com`,
  password: "password",
  firstName: "John",
  lastName: "Doe",
});
