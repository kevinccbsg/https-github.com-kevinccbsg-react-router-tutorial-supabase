import {
  getAuthenticatedUser,
  logout,
  signUpUser,
  signInWithPassword,
} from "../../../../src/services/supabase/auth/auth";
import { cleanup, randomUserData } from "../setup";

describe("Auth Services", () => {
  beforeEach(async () => {
    await cleanup();
  });
  describe("signUpUser", () => {
    it("should register a user with a password", async () => {
      const response = await signUpUser(randomUserData());
      expect(response.session).toBeDefined();
      expect(response.user).toBeDefined();
    });
  });

  describe("getAuthenticatedUser", () => {
    it("should not get the current authenticated user if not signed in", async () => {
      const user = await getAuthenticatedUser();
      expect(user).toBeNull();
    });
    it("should get the current authenticated user", async () => {
      const userPayload = randomUserData();
      await signUpUser(userPayload);
      const response = await signInWithPassword(userPayload.email, userPayload.password);
      const user = await getAuthenticatedUser();
      expect(user?.id).toEqual(response.user.id);
    });

    it("should not get the current authenticated user if not signed in", async () => {
      await logout();
      const user = await getAuthenticatedUser();
      expect(user).toBeNull();
    });
  });
});
