import MockAuthentication, {
  MockCognitoUser,
  mockAuthUser,
  mockUsers,
  resetAuthValues,
} from "../authSimulator.js";

describe("MockAuthentication", () => {
  beforeEach(() => {
    resetAuthValues();
  });

  describe("signUp", () => {
    test("should sign up a new user", async () => {
      const newUser = await MockAuthentication.signUp({
        username: "newuser@example.com",
        password: "newpassword",
        attributes: { email: "newuser@example.com" },
      });

      expect(newUser).toBeInstanceOf(MockCognitoUser);

      expect(newUser.user.email).toBe("newuser@example.com");
      expect(mockUsers["newuser@example.com"]).toBeDefined();
    });

    test("should throw an error if user already exists", async () => {
      await expect(
        MockAuthentication.signUp({
          username: "validuser@rhaeos.com",
          password: "testpassword",
          attributes: { email: "newuser@example.com" },
        })
      ).rejects.toThrow("User already exists");
    });
  });

  describe("signIn", () => {
    test("should sign in an existing and confirmed user", async () => {
      const authenticatedUser = await MockAuthentication.signIn(
        "validuser@rhaeos.com",
        "12345"
      );

      expect(authenticatedUser).toBeInstanceOf(MockCognitoUser);
      expect(authenticatedUser.user.email).toBe("validuser@rhaeos.com");
      expect(mockAuthUser?.user.email).toBe("validuser@rhaeos.com");
    });

    test("should throw an error if user does not exist", async () => {
      await expect(
        MockAuthentication.signIn("nonexistent@example.com", "password")
      ).rejects.toThrow("User not found. Please sign up.");
    });

    test("should throw an error if password is incorrect", async () => {
      await expect(
        MockAuthentication.signIn("validuser@rhaeos.com", "wrongpassword")
      ).rejects.toThrow("Incorrect password.");
    });

    test("should throw an error if user is not confirmed", async () => {
      mockUsers["unconfirmed@example.com"] = {
        email: "unconfirmed@example.com",
        password: "password",
        confirmed: false,
        verifyCode: "12345",
      };

      await expect(
        MockAuthentication.signIn("unconfirmed@example.com", "password")
      ).rejects.toThrow("User is not confirmed.");
    });
  });

  describe("currentAuthenticatedUser", () => {
    it("should return null if no authenticated user", async () => {
      const result = await MockAuthentication.currentAuthenticatedUser();
      expect(result).toBeNull();
    });

    it("should return the authenticated user", async () => {
      await MockAuthentication.signIn("validuser@rhaeos.com", "12345");
      const result = await MockAuthentication.currentAuthenticatedUser();
      expect(result).toBe(mockAuthUser);
    });
  });

  describe("signOut", () => {
    it("should sign out the user", async () => {
      await MockAuthentication.signIn("validuser@rhaeos.com", "12345");

      await MockAuthentication.signOut();

      expect(mockAuthUser).toBeNull();
    });
  });

  describe("forgotPasswordSubmit", () => {
    it("should change the password when verification code is valid", async () => {
      mockUsers["forgotpassword@example.com"] = {
        email: "forgotpassword@example.com",
        password: "oldpassword",
        confirmed: true,
        verifyCode: "12345",
      };

      await MockAuthentication.forgotPasswordSubmit(
        "forgotpassword@example.com",
        "12345",
        "newpassword"
      );

      expect(mockUsers["forgotpassword@example.com"].password).toBe(
        "newpassword"
      );
    });

    it("should throw an error if user does not exist", async () => {
      await expect(
        MockAuthentication.forgotPasswordSubmit(
          "nonexistent@example.com",
          "12345",
          "newpassword"
        )
      ).rejects.toThrow("User not found. Please sign up.");
    });

    it("should throw an error if verification code is invalid", async () => {
      mockUsers["invalidcode@example.com"] = {
        email: "invalidcode@example.com",
        password: "oldpassword",
        confirmed: true,
        verifyCode: "12345",
      };

      await expect(
        MockAuthentication.forgotPasswordSubmit(
          "invalidcode@example.com",
          "67890",
          "newpassword"
        )
      ).rejects.toThrow("Invalid verification code");
    });
  });

  describe("confirmSignUp", () => {
    it("should confirm the user when verification code is valid", async () => {
      mockUsers["unconfirmeduser@example.com"] = {
        email: "unconfirmeduser@example.com",
        password: "password",
        confirmed: false,
        verifyCode: "12345",
      };

      await MockAuthentication.confirmSignUp(
        "unconfirmeduser@example.com",
        "12345"
      );

      expect(mockUsers["unconfirmeduser@example.com"].confirmed).toBe(true);
    });

    it("should throw an error if user does not exist", async () => {
      await expect(
        MockAuthentication.confirmSignUp("nonexistent@example.com", "12345")
      ).rejects.toThrow("User not found. Please sign up.");
    });

    it("should throw an error if verification code is invalid", async () => {
      mockUsers["invalidcode@example.com"] = {
        email: "invalidcode@example.com",
        password: "password",
        confirmed: false,
        verifyCode: "12345",
      };

      await expect(
        MockAuthentication.confirmSignUp("invalidcode@example.com", "67890")
      ).rejects.toThrow("Invalid verification code");
    });
  });

  describe("forgotPassword", () => {
    it("should generate a verification code for the user", async () => {
      mockUsers["forgotpassword@example.com"] = {
        email: "forgotpassword@example.com",
        password: "oldpassword",
        confirmed: true,
        verifyCode: "12345",
      };

      await MockAuthentication.forgotPassword("forgotpassword@example.com");

      expect(mockUsers["forgotpassword@example.com"].verifyCode).not.toBe(
        "12345"
      );
    });

    it("should throw an error if user does not exist", async () => {
      await expect(
        MockAuthentication.forgotPassword("nonexistent@example.com")
      ).rejects.toThrow("User not found. Please sign up.");
    });
  });
});
