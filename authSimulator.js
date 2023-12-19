export class MockCognitoUser {
  constructor(email) {
    this.user = {
      email: email,
    };
    this.confirmed = false;
  }

  resendConfirmationCode(callback) {
    // Simulate behavior of resendConfirmationCode
    setTimeout(() => {
      callback(null); // Return the code in the callback
    }, 100);
  }
}

function createAndThrowError(code, message) {
  const error = new Error(message);
  error.code = code;
  throw error;
}

export let mockUsers = {
  "validuser@rhaeos.com": {
    email: "validuser@rhaeos.com",
    password: "123456",
    confirmed: true,
    verifyCode: "123456",
  },
  "unconfirmed@rhaeos.com": {
    email: "unconfirmed@rhaeos.com",
    password: "123456",
    confirmed: false,
    verifyCode: "123456",
  },
};

export let mockAuthUser = null;

export const resetAuthValues = () => {
  mockAuthUser = null;
  mockUsers = {
    "validuser@rhaeos.com": {
      email: "validuser@rhaeos.com",
      password: "123456",
      confirmed: true,
      verifyCode: "123456",
    },
  };
};

const MockAuthentication = {
  signUp: async ({ username: email, password, attributes }) => {
    email = email.toLowerCase().trim();
    if (mockUsers[email]) {
      createAndThrowError("UsernameExistsException", "User already exists");
    }
    if (!attributes) {
      createAndThrowError(
        "InvalidParameterException",
        "Attributes are required"
      );
    }
    mockUsers[email] = {
      email,
      password,
      confirmed: false,
      verifyCode: "123456",
    };
    return new MockCognitoUser(email);
  },

  signIn: async (email, password) => {
    email = email.toLowerCase().trim();

    const user = mockUsers[email];

    if (!user) {
      createAndThrowError(
        "UserNotFoundException",
        "User not found. Please sign up."
      );
    }

    if (user.password !== password) {
      createAndThrowError("NotAuthorizedException", "Incorrect password.");
    }

    if (!user.confirmed) {
      createAndThrowError(
        "UserNotConfirmedException",
        "User is not confirmed."
      );
    }

    mockAuthUser = new MockCognitoUser(email);
    return mockAuthUser;
  },

  currentAuthenticatedUser: async () => {
    if (!mockAuthUser) {
      return null;
    }
    return mockAuthUser;
  },

  signOut: async () => {
    resetAuthValues();
  },
  forgotPasswordSubmit: async (email, code, newPassword) => {
    email = email.toLowerCase().trim();
    const user = mockUsers[email];

    if (!user) {
      createAndThrowError(
        "UserNotFoundException",
        "User not found. Please sign up."
      );
    }

    if (mockUsers[email].verifyCode !== code) {
      throw new Error("Invalid verification code");
    }

    mockUsers[email].password = newPassword;
  },
  confirmSignUp: async (email, verificationCode) => {
    email = email.toLowerCase().trim();
    const user = mockUsers[email];

    if (!user) {
      createAndThrowError(
        "UserNotFoundException",
        "User not found. Please sign up."
      );
    }

    if (mockUsers[email].verifyCode !== verificationCode) {
      throw new Error("Invalid verification code");
    }

    mockUsers[email].confirmed = true;
  },
  forgotPassword: async (email) => {
    email = email.toLowerCase().trim();
    const user = mockUsers[email];

    if (!user) {
      createAndThrowError(
        "UserNotFoundException",
        "User not found. Please sign up."
      );
    }

    const mockVerificationCode = "123456";
    mockUsers[email].verifyCode = mockVerificationCode;
  },
};

module.exports = MockAuthentication;
