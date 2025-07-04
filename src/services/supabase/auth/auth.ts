import supabase from "../client/supabase";

interface UserPayload {
  email: string;
  password: string;
}

const REDIRECT_URL = import.meta.env.VITE_SUPABASE_REDIRECT_URL as string;

export const registerPassword = async (userPayload: UserPayload) => {  
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
