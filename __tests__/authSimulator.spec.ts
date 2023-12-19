import MockAuthentication, {
  resetAuthValues,
  MockCognitoUser,
  mockUsers,
  mockAuthUser,
} from "../authSimulator";

describe("MockAuthentication", () => {
  beforeEach(() => {
    resetAuthValues();
  });

  describe("signUp", () => {
    test("should sign up a new user", async () => {
      const newUser = await MockAuthentication.signUp({
        username: "newuser@greenconnect.com",
        password: "newpassword",
        attributes: { email: "newuser@greenconnect.com" },
      });

      expect(newUser).toBeInstanceOf(MockCognitoUser);

      expect(newUser.user.email).toBe("newuser@greenconnect.com");
      expect(mockUsers["newuser@greenconnect.com"]).toBeDefined();
    });

    test("should throw an error if user already exists", async () => {
      await expect(
        MockAuthentication.signUp({
          username: "validuser@greenconnect.com",
          password: "testpassword",
          attributes: { email: "newuser@greenconnect.com" },
        })
      ).rejects.toThrow("User already exists");
    });
  });

  describe("signIn", () => {
    test("should sign in an existing and confirmed user", async () => {
      const authenticatedUser = await MockAuthentication.signIn(
        "validuser@greenconnect.com",
        "123456"
      );

      expect(authenticatedUser).toBeInstanceOf(MockCognitoUser);
      expect(authenticatedUser.user.email).toBe("validuser@greenconnect.com");
      expect(mockAuthUser?.user.email).toBe("validuser@greenconnect.com");
    });

    test("should throw an error if user does not exist", async () => {
      await expect(
        MockAuthentication.signIn("nonexistent@greenconnect.com", "password")
      ).rejects.toThrow("User not found. Please sign up.");
    });

    test("should throw an error if password is incorrect", async () => {
      await expect(
        MockAuthentication.signIn("validuser@greenconnect.com", "wrongpassword")
      ).rejects.toThrow("Incorrect password.");
    });

    test("should throw an error if user is not confirmed", async () => {
      mockUsers["unconfirmed@greenconnect.com"] = {
        email: "unconfirmed@greenconnect.com",
        password: "password",
        confirmed: false,
        verifyCode: "12345",
      };

      await expect(
        MockAuthentication.signIn("unconfirmed@greenconnect.com", "password")
      ).rejects.toThrow("User is not confirmed.");
    });
  });

  describe("currentAuthenticatedUser", () => {
    it("should return null if no authenticated user", async () => {
      const result = await MockAuthentication.currentAuthenticatedUser();
      expect(result).toBeNull();
    });

    it("should return the authenticated user", async () => {
      await MockAuthentication.signIn("validuser@greenconnect.com", "123456");
      const result = await MockAuthentication.currentAuthenticatedUser();
      expect(result).toBe(mockAuthUser);
    });
  });

  describe("signOut", () => {
    it("should sign out the user", async () => {
      await MockAuthentication.signIn("validuser@greenconnect.com", "123456");

      await MockAuthentication.signOut();

      expect(mockAuthUser).toBeNull();
    });
  });

  describe("forgotPasswordSubmit", () => {
    it("should change the password when verification code is valid", async () => {
      mockUsers["forgotpassword@greenconnect.com"] = {
        email: "forgotpassword@greenconnect.com",
        password: "oldpassword",
        confirmed: true,
        verifyCode: "12345",
      };

      await MockAuthentication.forgotPasswordSubmit(
        "forgotpassword@greenconnect.com",
        "12345",
        "newpassword"
      );

      expect(mockUsers["forgotpassword@greenconnect.com"].password).toBe(
        "newpassword"
      );
    });

    it("should throw an error if user does not exist", async () => {
      await expect(
        MockAuthentication.forgotPasswordSubmit(
          "nonexistent@greenconnect.com",
          "12345",
          "newpassword"
        )
      ).rejects.toThrow("User not found. Please sign up.");
    });

    it("should throw an error if verification code is invalid", async () => {
      mockUsers["invalidcode@greenconnect.com"] = {
        email: "invalidcode@greenconnect.com",
        password: "oldpassword",
        confirmed: true,
        verifyCode: "12345",
      };

      await expect(
        MockAuthentication.forgotPasswordSubmit(
          "invalidcode@greenconnect.com",
          "67890",
          "newpassword"
        )
      ).rejects.toThrow("Invalid verification code");
    });
  });

  describe("confirmSignUp", () => {
    it("should confirm the user when verification code is valid", async () => {
      mockUsers["unconfirmeduser@greenconnect.com"] = {
        email: "unconfirmeduser@greenconnect.com",
        password: "password",
        confirmed: false,
        verifyCode: "12345",
      };

      await MockAuthentication.confirmSignUp(
        "unconfirmeduser@greenconnect.com",
        "12345"
      );

      expect(mockUsers["unconfirmeduser@greenconnect.com"].confirmed).toBe(
        true
      );
    });

    it("should throw an error if user does not exist", async () => {
      await expect(
        MockAuthentication.confirmSignUp(
          "nonexistent@greenconnect.com",
          "12345"
        )
      ).rejects.toThrow("User not found. Please sign up.");
    });

    it("should throw an error if verification code is invalid", async () => {
      mockUsers["invalidcode@greenconnect.com"] = {
        email: "invalidcode@greenconnect.com",
        password: "password",
        confirmed: false,
        verifyCode: "12345",
      };

      await expect(
        MockAuthentication.confirmSignUp(
          "invalidcode@greenconnect.com",
          "67890"
        )
      ).rejects.toThrow("Invalid verification code");
    });
  });

  describe("forgotPassword", () => {
    it("should generate a verification code for the user", async () => {
      mockUsers["forgotpassword@greenconnect.com"] = {
        email: "forgotpassword@greenconnect.com",
        password: "oldpassword",
        confirmed: true,
        verifyCode: "12345",
      };

      await MockAuthentication.forgotPassword(
        "forgotpassword@greenconnect.com"
      );

      expect(mockUsers["forgotpassword@greenconnect.com"].verifyCode).not.toBe(
        "12345"
      );
    });

    it("should throw an error if user does not exist", async () => {
      await expect(
        MockAuthentication.forgotPassword("nonexistent@greenconnect.com")
      ).rejects.toThrow("User not found. Please sign up.");
    });
  });
});
