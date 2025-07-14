import Cookies from "js-cookie";
import * as auth from "../services/supabase/auth/auth";
import { redirect } from "react-router";

interface User {
  id: string;
}

const mode = import.meta.env.MODE;

const storeUser = async (user: User) => {
  const signedData = btoa(JSON.stringify(user));
  const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
  Cookies.set("user", signedData, {
    path: "/",
    sameSite: "strict",
    expires: inFifteenMinutes,
    secure: mode === "production",
  });
};

const getUserCookie = () => {
  return Cookies.get("user");
};

const getUser = () => {
  const signedData = getUserCookie();
  if (!signedData) return null;

  const data = atob(signedData);
  return data ? JSON.parse(data) as User : null;
};

const clearUserCookie = () => {
  Cookies.remove("user");
};

const storeUserCookie = async (): Promise<User | null> => {
  const user = await auth.getAuthenticatedUser();
  if (!user) return null;
  storeUser({
    id: user.id,
  });
  return { id: user.id };
};

export const getUserSession = async () => {
  const user = getUser();

  if (!user) {
    const storedUser = await storeUserCookie();
    return storedUser;
  }

  return user;
};

export const requireUserSession = async () => {
  const user = await getUserSession();

  if (!user) {
    throw redirect('/login');
  }
  return user;
};

export const logout = async () => {
  await auth.logout();
  clearUserCookie();
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