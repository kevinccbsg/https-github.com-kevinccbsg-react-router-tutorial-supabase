import supabase from "../client/supabase";

interface UserPayload {
  email: string;
  password: string;
}

const REDIRECT_URL = import.meta.env.VITE_SUPABASE_REDIRECT_URL as string;

interface ProfileDBO {
  id: string;
  email: string;
}

export const getAuthenticatedUser = async (): Promise<ProfileDBO | null> => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    return null;
  }

  return data.user ? {
    id: data.user.id,
    email: data.user.email || "",
  } : null;
};

export const signUpUser = async (userPayload: UserPayload) => {  
  const { data, error } = await supabase.auth.signUp({
    email: userPayload.email,
    password: userPayload.password,
    options: {
      emailRedirectTo: REDIRECT_URL,
      data: {
        email: userPayload.email,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signInWithPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};
