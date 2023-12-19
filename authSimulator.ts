import {
  ClientMetadata,
  CodeDeliveryDetails,
  CognitoUser,
  CognitoUserAttribute,
  ISignUpResult,
  NodeCallback,
} from "amazon-cognito-identity-js";

interface MockError extends Error {
  code: string;
}

export class SignUpResult implements ISignUpResult {
  user: MockCognitoUser;
  userConfirmed: boolean;
  userSub: string;
  codeDeliveryDetails: CodeDeliveryDetails;

  constructor(user: MockCognitoUser) {
    this.user = user;
    this.userConfirmed = false;
    this.userSub = user.getUsername();
    this.codeDeliveryDetails = {
      AttributeName: "email",
      DeliveryMedium: "EMAIL",
      Destination: user.getUsername(),
    };
  }
}

export class MockCognitoUser extends CognitoUser {
  constructor(email: string) {
    super({
      Username: email,
      Pool: {
        getUserPoolId: () => "mock-user-pool-id",
        getClientId: () => "mock-client-id",
        getUserPoolName: function (): string {
          throw new Error("Function not implemented.");
        },
        signUp: function (): void {
          throw new Error("Function not implemented.");
        },
        getCurrentUser: function (): CognitoUser | null {
          throw new Error("Function not implemented.");
        },
      },
    });
  }
}

const createAndThrowError = (code: string, message: string) => {
  const error = new Error(message) as MockError;
  error.code = code;
  throw error;
};

interface MockUser {
  email: string;
  password: string;
  confirmed: boolean;
  verifyCode: string;
}

export let mockUsers: Record<string, MockUser> = {
  "validuser@greenconnect.com": {
    email: "validuser@greenconnect.com",
    password: "123456",
    confirmed: true,
    verifyCode: "123456",
  },
  "unconfirmed@greenconnect.com": {
    email: "unconfirmed@greenconnect.com",
    password: "123456",
    confirmed: false,
    verifyCode: "123456",
  },
};

export let mockAuthUser: MockCognitoUser | null = null;

export const resetAuthValues = (): void => {
  mockAuthUser = null;
  mockUsers = {
    "validuser@greenconnect.com": {
      email: "validuser@greenconnect.com",
      password: "123456",
      confirmed: true,
      verifyCode: "123456",
    },
  };
};

const MockAuthentication = {
  signUp: async ({
    username: email,
    password,
    attributes,
  }: {
    username: string;
    password: string;
    attributes: object;
  }): Promise<ISignUpResult> => {
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
    const res: ISignUpResult = new SignUpResult(new MockCognitoUser(email));
    return res;
  },

  signIn: async (email: string, password: string): Promise<MockCognitoUser> => {
    email = email.toLowerCase().trim();

    const user = mockUsers[email];

    if (!user) {
      createAndThrowError(
        "UserNotFoundException",
        "User not found. Please sign up."
      );
    } else {
      if (user.password !== password) {
        createAndThrowError("NotAuthorizedException", "Incorrect password.");
      }

      if (!user.confirmed) {
        createAndThrowError(
          "UserNotConfirmedException",
          "User is not confirmed."
        );
      }
    }

    mockAuthUser = new MockCognitoUser(email);
    return mockAuthUser;
  },

  currentAuthenticatedUser: async (): Promise<MockCognitoUser | null> => {
    if (!mockAuthUser) {
      return null;
    }
    return mockAuthUser;
  },

  signOut: async (): Promise<void> => {
    resetAuthValues();
  },
  forgotPasswordSubmit: async (
    email: string,
    code: string,
    newPassword: string
  ): Promise<string> => {
    email = email.toLowerCase().trim();
    const user = mockUsers[email];

    if (!user) {
      createAndThrowError(
        "UserNotFoundException",
        "User not found. Please sign up."
      );
    }
    // Check if the provided verification code matches the stored one
    if (mockUsers[email]?.verifyCode !== code) {
      throw new Error("Invalid verification code");
    }

    // Simulate changing the password
    if (mockUsers[email] !== undefined || mockUsers[email] !== null) {
      mockUsers[email]!.password = newPassword;
    }
    return "";
  },
  confirmSignUp: async (
    email: string,
    verificationCode: string
  ): Promise<void> => {
    email = email.toLowerCase().trim();
    const user = mockUsers[email];

    if (!user) {
      createAndThrowError(
        "UserNotFoundException",
        "User not found. Please sign up."
      );
    }
    // Check if the provided verification code matches the stored one
    if (mockUsers[email]?.verifyCode !== verificationCode) {
      throw new Error("Invalid verification code");
    }
    // Simulate changing the password
    if (mockUsers[email] !== undefined || mockUsers[email] !== null) {
      mockUsers[email]!.confirmed = true;
    }
  },
  forgotPassword: async (email: string): Promise<any> => {
    email = email.toLowerCase().trim();
    const user = mockUsers[email];

    if (!user) {
      createAndThrowError(
        "UserNotFoundException",
        "User not found. Please sign up."
      );
    }
    // Simulate generating a verification code
    const mockVerificationCode = "123456"; // Replace with a dynamic generation if needed
    if (mockUsers[email] !== undefined || mockUsers[email] !== null) {
      mockUsers[email]!.verifyCode = mockVerificationCode;
    }
    return;
  },
};

export default MockAuthentication;
