import * as auth from "../services/supabase/auth/auth";
import { redirect } from "react-router";

export const requireUserSession = async () => {
  const user = await auth.getAuthenticatedUser();

  if (!user) {
    throw redirect('/login');
  }
  return user;
};

export const logout = async () => {
  await auth.logout();
};

export const loginUser = async (email: string, password: string) => {
  await auth.signInWithPassword(email, password);
};

export const signUpUser = async (userPayload: { email: string; password: string }) => {
  await auth.signUpUser({
    email: userPayload.email,
    password: userPayload.password,
  });
};