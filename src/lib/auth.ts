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
