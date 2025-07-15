import Cookies from "js-cookie";
import * as auth from "../services/supabase/auth/auth";
import { redirect } from "react-router";

interface User {
  id: string;
}

const mode = import.meta.env.MODE;

/**
 * Sets the user cookie with a 15-minute expiration.
 * @param user - The user object to store.
 */
const setUserCookie = async (user: User): Promise<void> => {
  const signedData = btoa(JSON.stringify(user));
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  Cookies.set("user", signedData, {
    path: "/",
    sameSite: "strict",
    expires: expiresAt,
    secure: mode === "production",
  });
};

/**
 * Gets the raw user cookie string, if present.
 * @returns The base64-encoded user cookie or undefined.
 */
const getUserCookie = (): string | undefined => {
  return Cookies.get("user");
};

/**
 * Removes the user cookie.
 */
const clearUserCookie = (): void => {
  Cookies.remove("user");
};

/**
 * Parses and returns the decoded user object from the cookie.
 * @returns The user object or null if not found or invalid.
 */
const getUserFromCookie = (): User | null => {
  const signedData = getUserCookie();
  if (!signedData) return null;

  try {
    const data = atob(signedData);
    return JSON.parse(data) as User;
  } catch (error) {
    console.error("Invalid user cookie", error);
    return null;
  }
};

/**
 * Gets the currently authenticated user from Supabase and stores it in the cookie.
 * @returns The user object if authenticated, otherwise null.
 */
const fetchAndStoreUser = async (): Promise<User | null> => {
  const user = await auth.getAuthenticatedUser();
  if (!user) return null;

  await setUserCookie({ id: user.id });
  return { id: user.id };
};

/**
 * Returns the current user session from cookie if valid,
 * otherwise fetches from Supabase and sets the cookie.
 * @returns The user object or null.
 */
export const getUserSession = async (): Promise<User | null> => {
  const user = getUserFromCookie();
  if (user) return user;

  return await fetchAndStoreUser();
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